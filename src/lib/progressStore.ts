import AsyncStorage from "@react-native-async-storage/async-storage";

import { LearningMode } from "@/src/data/learningContent";
import { loadProgressFromSQLite, saveProgressToSQLite } from "@/src/lib/sqliteProgressStore";

const STORAGE_KEY = "mongolian-learning-progress-v2";

export type MistakeRecord = {
  exerciseId: string;
  lessonId: string;
  wrongCount: number;
  correctStreak: number;
  nextReviewAt: string;
};

export type LessonResult = {
  lessonId: string;
  score: number;
  stars: number;
  correctCount: number;
  totalCount: number;
  studiedAt: string;
};

export type ProgressSnapshot = {
  completedLessonIds: string[];
  lessonResults: Record<string, LessonResult>;
  mistakes: Record<string, MistakeRecord>;
  xp: number;
  hearts: number;
  gems: number;
  streak: number;
  totalStudyMinutes: number;
  masteredVocabularyIds: string[];
  correctAnswersToday: number;
  reviewedMistakesToday: number;
  lessonsCompletedToday: number;
  lastStudiedAt?: string;
  mode: LearningMode;
  soundEnabled: boolean;
};

const defaultProgress: ProgressSnapshot = {
  completedLessonIds: [],
  lessonResults: {},
  mistakes: {},
  xp: 0,
  hearts: 5,
  gems: 0,
  streak: 0,
  totalStudyMinutes: 0,
  masteredVocabularyIds: [],
  correctAnswersToday: 0,
  reviewedMistakesToday: 0,
  lessonsCompletedToday: 0,
  mode: "child",
  soundEnabled: true
};

export async function loadProgress(): Promise<ProgressSnapshot> {
  const sqliteProgress = await loadProgressFromSQLite();
  if (sqliteProgress) {
    return sqliteProgress;
  }

  const raw = await AsyncStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return defaultProgress;
  }

  try {
    const progress = normalizeProgress(JSON.parse(raw));
    await saveProgressToSQLite(progress);
    return progress;
  } catch {
    return defaultProgress;
  }
}

export async function saveProgress(progress: ProgressSnapshot) {
  const normalized = normalizeProgress(progress);
  await saveProgressToSQLite(normalized);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
}

export function normalizeProgress(value: Partial<ProgressSnapshot>): ProgressSnapshot {
  return {
    ...defaultProgress,
    ...value,
    completedLessonIds: Array.isArray(value.completedLessonIds) ? value.completedLessonIds : [],
    lessonResults: value.lessonResults ?? {},
    mistakes: value.mistakes ?? {},
    masteredVocabularyIds: Array.isArray(value.masteredVocabularyIds) ? value.masteredVocabularyIds : [],
    hearts: Math.min(Math.max(value.hearts ?? defaultProgress.hearts, 0), 5),
    mode: value.mode === "adult" ? "adult" : "child",
    soundEnabled: value.soundEnabled ?? true
  };
}

export function recordLessonResult(
  progress: ProgressSnapshot,
  params: {
    lessonId: string;
    totalCount: number;
    correctExerciseIds: string[];
    wrongExerciseIds: string[];
    focusVocabularyIds: string[];
    xpEarned: number;
  }
): ProgressSnapshot {
  const now = new Date().toISOString();
  const score = params.totalCount > 0 ? Math.round((params.correctExerciseIds.length / params.totalCount) * 100) : 100;
  const stars = score >= 90 ? 3 : score >= 70 ? 2 : score > 0 ? 1 : 0;
  const mistakes = { ...progress.mistakes };

  params.wrongExerciseIds.forEach((exerciseId) => {
    const previous = mistakes[exerciseId];
    mistakes[exerciseId] = {
      exerciseId,
      lessonId: params.lessonId,
      wrongCount: (previous?.wrongCount ?? 0) + 1,
      correctStreak: 0,
      nextReviewAt: now
    };
  });

  params.correctExerciseIds.forEach((exerciseId) => {
    const previous = mistakes[exerciseId];
    if (!previous) {
      return;
    }

    const correctStreak = previous.correctStreak + 1;
    if (correctStreak >= 2) {
      delete mistakes[exerciseId];
      return;
    }

    mistakes[exerciseId] = {
      ...previous,
      correctStreak,
      nextReviewAt: now
    };
  });

  const completedLessonIds = progress.completedLessonIds.includes(params.lessonId)
    ? progress.completedLessonIds
    : [...progress.completedLessonIds, params.lessonId];

  return normalizeProgress({
    ...progress,
    completedLessonIds,
    lessonResults: {
      ...progress.lessonResults,
      [params.lessonId]: {
        lessonId: params.lessonId,
        score,
        stars,
        correctCount: params.correctExerciseIds.length,
        totalCount: params.totalCount,
        studiedAt: now
      }
    },
    mistakes,
    xp: progress.xp + params.xpEarned,
    gems: progress.gems + stars,
    hearts: Math.max(0, progress.hearts - params.wrongExerciseIds.length),
    streak: nextStreak(progress.lastStudiedAt, progress.streak),
    totalStudyMinutes: progress.totalStudyMinutes + 4,
    masteredVocabularyIds: Array.from(new Set([...progress.masteredVocabularyIds, ...params.focusVocabularyIds])),
    correctAnswersToday: progress.correctAnswersToday + params.correctExerciseIds.length,
    lessonsCompletedToday: progress.lessonsCompletedToday + 1,
    lastStudiedAt: now
  });
}

export function recordMistakeReview(
  progress: ProgressSnapshot,
  correctExerciseIds: string[],
  wrongExerciseIds: string[] = []
): ProgressSnapshot {
  const now = new Date().toISOString();
  const mistakes = { ...progress.mistakes };

  correctExerciseIds.forEach((exerciseId) => {
    const previous = mistakes[exerciseId];
    if (!previous) {
      return;
    }

    const correctStreak = previous.correctStreak + 1;
    if (correctStreak >= 2) {
      delete mistakes[exerciseId];
      return;
    }

    mistakes[exerciseId] = {
      ...previous,
      correctStreak,
      nextReviewAt: now
    };
  });

  wrongExerciseIds.forEach((exerciseId) => {
    const previous = mistakes[exerciseId];
    mistakes[exerciseId] = {
      exerciseId,
      lessonId: previous?.lessonId ?? "review",
      wrongCount: (previous?.wrongCount ?? 0) + 1,
      correctStreak: 0,
      nextReviewAt: now
    };
  });

  const reviewedCount = new Set([...correctExerciseIds, ...wrongExerciseIds]).size;

  return normalizeProgress({
    ...progress,
    mistakes,
    hearts: reviewedCount > 0 ? Math.min(5, progress.hearts + 1) : progress.hearts,
    streak: reviewedCount > 0 ? nextStreak(progress.lastStudiedAt, progress.streak) : progress.streak,
    correctAnswersToday: progress.correctAnswersToday + correctExerciseIds.length,
    reviewedMistakesToday: progress.reviewedMistakesToday + reviewedCount,
    lastStudiedAt: now
  });
}

export function toggleLearningMode(progress: ProgressSnapshot): ProgressSnapshot {
  return normalizeProgress({
    ...progress,
    mode: progress.mode === "child" ? "adult" : "child"
  });
}

export function toggleSound(progress: ProgressSnapshot): ProgressSnapshot {
  return normalizeProgress({
    ...progress,
    soundEnabled: !progress.soundEnabled
  });
}

function nextStreak(lastStudiedAt: string | undefined, streak: number) {
  if (!lastStudiedAt) {
    return 1;
  }

  const last = new Date(lastStudiedAt);
  const now = new Date();
  const day = 24 * 60 * 60 * 1000;
  const diff = startOfDay(now).getTime() - startOfDay(last).getTime();

  if (diff === 0) {
    return Math.max(1, streak);
  }

  if (diff === day) {
    return streak + 1;
  }

  return 1;
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
