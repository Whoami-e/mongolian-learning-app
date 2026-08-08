import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { FoodIllustration } from "@/src/components/FoodIllustration";
import { LessonProgressHeader } from "@/src/components/LessonProgressHeader";
import { Screen } from "@/src/components/Screen";
import { VerticalMongolianText } from "@/src/components/VerticalMongolianText";
import { Exercise, exercises, getExercisesForLesson, getLessonById } from "@/src/data/learningContent";
import { useAudioPlayback } from "@/src/lib/audioPlayer";
import {
  loadProgress,
  ProgressSnapshot,
  recordLessonResult,
  recordMistakeReview,
  saveProgress
} from "@/src/lib/progressStore";
import { colors, radii, shadow, spacing } from "@/src/styles/theme";

type AnswerState = "idle" | "correct" | "wrong" | "complete";

export default function ExerciseScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLessonById(id ?? "direction");
  const isReview = id === "review";
  const [progress, setProgress] = useState<ProgressSnapshot | null>(null);
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [answerState, setAnswerState] = useState<AnswerState>("idle");
  const [xp, setXp] = useState(0);
  const [correctIds, setCorrectIds] = useState<string[]>([]);
  const [wrongIds, setWrongIds] = useState<string[]>([]);
  const { activeAudioId, stopAudio, toggleAudio } = useAudioPlayback(progress?.soundEnabled ?? true);

  useEffect(() => {
    let active = true;
    loadProgress().then((snapshot) => {
      if (active) {
        setProgress(snapshot);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  const lessonExercises = useMemo(() => {
    if (isReview && !progress) {
      return [];
    }

    if (!isReview || !progress) {
      return getExercisesForLesson(lesson.id);
    }

    const mistakeIds = Object.keys(progress.mistakes);
    return exercises.filter((exercise) => mistakeIds.includes(exercise.id));
  }, [isReview, lesson.id, progress]);

  const current = lessonExercises[index];
  const progressValue = lessonExercises.length > 0 ? (index + 1) / lessonExercises.length : 1;
  const hasAnswer = current?.type === "triple-match" ? selectedItems.length > 0 : Boolean(selectedOption);

  const confirmAnswer = () => {
    if (!current || !hasAnswer) {
      return;
    }

    const correct = isCorrect(current, selectedOption, selectedItems);
    if (correct) {
      setXp((value) => value + current.xp);
      setCorrectIds((ids) => (ids.includes(current.id) ? ids : [...ids, current.id]));
      setAnswerState("correct");
      return;
    }

    setWrongIds((ids) => (ids.includes(current.id) ? ids : [...ids, current.id]));
    setAnswerState("wrong");
  };

  const nextQuestion = () => {
    if (index + 1 >= lessonExercises.length) {
      setAnswerState("complete");
      return;
    }

    setIndex((value) => value + 1);
    setSelectedOption(null);
    setSelectedItems([]);
    stopAudio();
    setAnswerState("idle");
  };

  const toggleItem = (value: string) => {
    setSelectedItems((items) =>
      items.includes(value) ? items.filter((item) => item !== value) : [...items, value]
    );
  };

  if (!current && answerState !== "complete") {
    return (
      <Screen>
        <View style={styles.emptyWrap}>
          <Text style={styles.completeTitle}>{isReview ? "暂无错题" : "本课暂无练习"}</Text>
          <Text style={styles.completeSub}>{isReview ? "完成课程后，答错的题会自动进入这里。" : "请先补充本课练习数据。"}</Text>
          <Pressable style={styles.continueButton} onPress={() => router.replace("/learn")}>
            <Text style={styles.continueText}>返回首页</Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  if (answerState === "complete") {
    return (
      <CompletionView
        isReview={isReview}
        lessonId={lesson.id}
        resultPath={
          isReview
            ? `/result/review?reviewed=${lessonExercises.length}&cleared=${correctIds.length}&wrong=${wrongIds.length}`
            : `/result/${lesson.id}`
        }
        lessonTitle={isReview ? "错题复习" : lesson.title}
        xp={xp}
        totalCount={lessonExercises.length}
        correctIds={correctIds}
        wrongIds={wrongIds}
        progress={progress}
      />
    );
  }

  return (
    <Screen scroll={false}>
      <View style={styles.page}>
        <LessonProgressHeader
          progress={progressValue}
          energy={progress?.hearts ?? 5}
          streak={answerState === "correct" ? correctIds.length : undefined}
          color={answerState === "correct" ? "orange" : "green"}
        />

        <Text style={styles.question}>{current.prompt}</Text>

        <ExerciseBody
          exercise={current}
          selectedOption={selectedOption}
          selectedItems={selectedItems}
          locked={answerState !== "idle"}
          playingAudio={activeAudioId}
          onSelect={setSelectedOption}
          onToggleItem={toggleItem}
          onToggleAudio={toggleAudio}
        />

        {answerState === "idle" ? (
          <Pressable
            style={[styles.checkButton, !hasAnswer && styles.checkButtonDisabled]}
            onPress={confirmAnswer}
          >
            <Text style={[styles.checkText, !hasAnswer && styles.checkTextDisabled]}>检查</Text>
          </Pressable>
        ) : (
          <FeedbackSheet answerState={answerState} explanation={current.explanation} onNext={nextQuestion} />
        )}
      </View>
    </Screen>
  );
}

function ExerciseBody({
  exercise,
  selectedOption,
  selectedItems,
  locked,
  playingAudio,
  onSelect,
  onToggleItem,
  onToggleAudio
}: {
  exercise: Exercise;
  selectedOption: string | null;
  selectedItems: string[];
  locked: boolean;
  playingAudio: string | null;
  onSelect: (value: string) => void;
  onToggleItem: (value: string) => void;
  onToggleAudio: (value: string) => void;
}) {
  if (exercise.type === "picture-choice") {
    return (
      <View style={styles.pictureBlock}>
        <View style={styles.pictureStage}>
          {exercise.image ? <FoodIllustration kind={exercise.image} /> : null}
          <Text style={styles.pictureHint}>{exercise.chinese}</Text>
        </View>
        <ChoiceGrid exercise={exercise} selectedOption={selectedOption} locked={locked} onSelect={onSelect} />
      </View>
    );
  }

  if (exercise.type === "fill-letter") {
    return (
      <View style={styles.fillBlock}>
        <View style={styles.glyphStage}>
          <VerticalMongolianText text={exercise.missingText ?? ""} size={58} color={colors.ink} />
        </View>
        <ChoiceGrid exercise={exercise} selectedOption={selectedOption} locked={locked} onSelect={onSelect} compact />
      </View>
    );
  }

  if (exercise.type === "triple-match") {
    return (
      <View style={styles.matchBlock}>
        <View style={styles.matchTarget}>
          <Ionicons name="git-compare" size={28} color={colors.purple} />
          <Text style={styles.matchTitle}>选择同一词条的中文、蒙古文和音频编号</Text>
        </View>
        <View style={styles.selectedLine}>
          {selectedItems.map((item) => (
            <Pressable key={item} style={[styles.wordChip, styles.wordChipSelected]} disabled={locked} onPress={() => onToggleItem(item)}>
              <Text style={styles.wordChipText}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.wordBank}>
          {exercise.options.map((option) => {
            const selected = selectedItems.includes(option.label);

            return (
              <Pressable
                key={option.id}
                style={[styles.wordChip, selected && styles.wordChipHidden]}
                disabled={locked}
                onPress={() => onToggleItem(option.label)}
              >
                <Text style={[styles.wordChipText, selected && styles.wordChipHiddenText]}>{option.label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.choiceBlock}>
      <View style={styles.audioWordRow}>
        {exercise.type === "audio-choice" ? (
          <Pressable style={[styles.audioSquare, playingAudio === exercise.audioHint && styles.audioSquarePlaying]} onPress={() => onToggleAudio(exercise.audioHint ?? exercise.id)}>
            <Ionicons name={playingAudio === exercise.audioHint ? "pause" : "volume-high"} size={34} color={colors.panel} />
          </Pressable>
        ) : null}
        {exercise.mongolian ? (
          <View style={styles.promptGlyph}>
            <VerticalMongolianText text={exercise.mongolian} size={46} color={colors.purple} />
          </View>
        ) : null}
        <View style={styles.audioCopy}>
          <Text style={styles.audioLabel}>{exercise.type === "audio-choice" ? "音频编号" : "题目内容"}</Text>
          <Text style={styles.pronunciation}>{exercise.audioHint ?? exercise.mongolian ?? "本地练习"}</Text>
        </View>
      </View>
      <ChoiceGrid exercise={exercise} selectedOption={selectedOption} locked={locked} onSelect={onSelect} />
    </View>
  );
}

function ChoiceGrid({
  exercise,
  selectedOption,
  locked,
  compact,
  onSelect
}: {
  exercise: Exercise;
  selectedOption: string | null;
  locked: boolean;
  compact?: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <View style={[styles.optionGrid, compact && styles.optionGridCompact]}>
      {exercise.options.map((option) => (
        <Pressable
          key={option.id}
          style={[
            compact ? styles.letterOption : styles.optionCard,
            selectedOption === option.id && styles.optionSelected
          ]}
          disabled={locked}
          onPress={() => onSelect(option.id)}
        >
          {option.image ? <FoodIllustration kind={option.image} /> : null}
          {option.mongolian ? <VerticalMongolianText text={option.mongolian} size={compact ? 40 : 32} color={colors.ink} /> : null}
          <Text style={styles.optionLabel}>{option.label}</Text>
          {option.helper ? <Text style={styles.optionHelper}>{option.helper}</Text> : null}
        </Pressable>
      ))}
    </View>
  );
}

function isCorrect(exercise: Exercise, selectedOption: string | null, selectedItems: string[]) {
  if (exercise.type === "triple-match" && Array.isArray(exercise.answer)) {
    return exercise.answer.length === selectedItems.length && exercise.answer.every((item) => selectedItems.includes(item));
  }

  if (typeof exercise.answer === "string") {
    const chosen = exercise.options.find((option) => option.id === selectedOption);
    return selectedOption === exercise.answer || chosen?.label === exercise.answer;
  }

  return false;
}

function FeedbackSheet({
  answerState,
  explanation,
  onNext
}: {
  answerState: Exclude<AnswerState, "idle" | "complete">;
  explanation: string;
  onNext: () => void;
}) {
  const isCorrectAnswer = answerState === "correct";

  return (
    <View style={[styles.feedbackSheet, !isCorrectAnswer && styles.feedbackSheetWrong]}>
      <View style={styles.feedbackTop}>
        <View style={[styles.feedbackMark, !isCorrectAnswer && styles.feedbackMarkWrong]}>
          <Ionicons name={isCorrectAnswer ? "checkmark" : "close"} size={26} color={colors.panel} />
        </View>
        <Text style={[styles.feedbackTitle, !isCorrectAnswer && styles.feedbackTitleWrong]}>
          {isCorrectAnswer ? "非常好！" : "再看解释"}
        </Text>
      </View>
      <Text style={styles.feedbackCopy}>{explanation}</Text>
      <Pressable style={[styles.continueButton, !isCorrectAnswer && styles.continueButtonWrong]} onPress={onNext}>
        <Text style={styles.continueText}>继续</Text>
      </Pressable>
    </View>
  );
}

function CompletionView({
  isReview,
  lessonId,
  resultPath,
  lessonTitle,
  xp,
  totalCount,
  correctIds,
  wrongIds,
  progress
}: {
  isReview: boolean;
  lessonId: string;
  resultPath: string;
  lessonTitle: string;
  xp: number;
  totalCount: number;
  correctIds: string[];
  wrongIds: string[];
  progress: ProgressSnapshot | null;
}) {
  const [saved, setSaved] = useState(false);
  const score = totalCount > 0 ? Math.round((correctIds.length / totalCount) * 100) : 100;
  const stars = score >= 90 ? 3 : score >= 70 ? 2 : score > 0 ? 1 : 0;

  useEffect(() => {
    if (!progress || saved) {
      return;
    }

    const nextProgress = isReview
      ? recordMistakeReview(progress, correctIds, wrongIds)
      : recordLessonResult(progress, {
          lessonId,
          totalCount,
          correctExerciseIds: correctIds,
          wrongExerciseIds: wrongIds,
          focusVocabularyIds: getLessonById(lessonId).focusVocabularyIds,
          xpEarned: xp
        });

    saveProgress(nextProgress).then(() => {
      setSaved(true);
      router.replace(resultPath);
    });
  }, [correctIds, isReview, lessonId, progress, resultPath, saved, totalCount, wrongIds, xp]);

  return (
    <Screen>
      <View style={styles.completeWrap}>
        <View style={styles.completeBadge}>
          <Ionicons name="star" size={64} color={colors.panel} />
        </View>
        <Text style={styles.completeTitle}>{isReview ? "复习完成" : "课程完成"}</Text>
        <Text style={styles.completeSub}>{lessonTitle} · 正确率 {score}% · +{xp} XP</Text>

        <View style={styles.resultGrid}>
          <ResultItem label="星星" value={`${stars}/3`} />
          <ResultItem label="新错题" value={`${wrongIds.length}`} />
          <ResultItem label="答对" value={`${correctIds.length}/${totalCount}`} />
        </View>

        <Pressable style={styles.continueButton} onPress={() => router.replace("/learn")}>
          <Text style={styles.continueText}>返回学习路径</Text>
        </Pressable>
        {wrongIds.length > 0 ? (
          <Pressable style={styles.reviewButton} onPress={() => router.replace("/practice")}>
            <Text style={styles.reviewText}>去复习错题</Text>
          </Pressable>
        ) : null}
      </View>
    </Screen>
  );
}

function ResultItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.resultItem}>
      <Text style={styles.resultValue}>{value}</Text>
      <Text style={styles.resultLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    backgroundColor: colors.background
  },
  question: {
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 36
  },
  choiceBlock: {
    flex: 1
  },
  pictureBlock: {
    flex: 1
  },
  pictureStage: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel
  },
  pictureHint: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  },
  audioWordRow: {
    minHeight: 116,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.lg
  },
  audioSquare: {
    width: 66,
    height: 66,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.blue,
    borderBottomWidth: 6,
    borderBottomColor: colors.blueDark
  },
  audioSquarePlaying: {
    backgroundColor: colors.orange,
    borderBottomColor: "#D97800"
  },
  promptGlyph: {
    minWidth: 86,
    minHeight: 96,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radii.md,
    backgroundColor: colors.panel
  },
  audioCopy: {
    flex: 1
  },
  audioLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800"
  },
  pronunciation: {
    marginTop: spacing.xs,
    color: colors.purple,
    fontSize: 22,
    fontWeight: "900"
  },
  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: spacing.md
  },
  optionGridCompact: {
    justifyContent: "center"
  },
  optionCard: {
    width: "47%",
    minHeight: 150,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: "#D7D7D7",
    borderRadius: radii.lg,
    backgroundColor: colors.panel
  },
  optionSelected: {
    borderColor: colors.blue,
    backgroundColor: colors.selectedSoft
  },
  optionLabel: {
    color: colors.ink,
    fontSize: 19,
    fontWeight: "900",
    textAlign: "center"
  },
  optionHelper: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center"
  },
  fillBlock: {
    flex: 1,
    justifyContent: "center"
  },
  glyphStage: {
    minHeight: 170,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel
  },
  letterOption: {
    width: 92,
    minHeight: 104,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    padding: spacing.sm,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: "#D4D4D4",
    borderRadius: radii.md,
    backgroundColor: colors.panel
  },
  matchBlock: {
    flex: 1
  },
  matchTarget: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radii.lg,
    backgroundColor: "#F6EAFF"
  },
  matchTitle: {
    flex: 1,
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "800"
  },
  selectedLine: {
    minHeight: 94,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.line
  },
  wordBank: {
    minHeight: 160,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.xl
  },
  wordChip: {
    minHeight: 56,
    minWidth: 76,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
    borderWidth: 2,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: "#D4D4D4",
    borderRadius: radii.md,
    backgroundColor: colors.panel
  },
  wordChipSelected: {
    borderColor: "#89E66A",
    backgroundColor: "#D7FFB8",
    borderBottomColor: "#79D45C"
  },
  wordChipHidden: {
    backgroundColor: colors.line,
    borderColor: colors.line,
    borderBottomColor: colors.line
  },
  wordChipHiddenText: {
    color: "transparent"
  },
  wordChipText: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900"
  },
  checkButton: {
    height: 66,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.green,
    borderBottomWidth: 6,
    borderBottomColor: colors.greenDark
  },
  checkButtonDisabled: {
    backgroundColor: "#E1E1E1",
    borderBottomColor: "#D1D1D1"
  },
  checkText: {
    color: colors.panel,
    fontSize: 21,
    fontWeight: "900"
  },
  checkTextDisabled: {
    color: "#A9A9A9"
  },
  feedbackSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    backgroundColor: colors.successSoft,
    ...shadow
  },
  feedbackSheetWrong: {
    backgroundColor: "#FFDCDC"
  },
  feedbackTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  feedbackMark: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
    backgroundColor: colors.greenDark
  },
  feedbackMarkWrong: {
    backgroundColor: colors.red
  },
  feedbackTitle: {
    flex: 1,
    color: colors.greenDark,
    fontSize: 27,
    fontWeight: "900"
  },
  feedbackTitleWrong: {
    color: colors.redDark
  },
  feedbackCopy: {
    marginTop: spacing.md,
    color: colors.ink,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  },
  continueButton: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.md,
    borderRadius: radii.md,
    backgroundColor: colors.green,
    borderBottomWidth: 6,
    borderBottomColor: colors.greenDark
  },
  continueButtonWrong: {
    backgroundColor: colors.red,
    borderBottomColor: colors.redDark
  },
  continueText: {
    color: colors.panel,
    fontSize: 21,
    fontWeight: "900"
  },
  reviewButton: {
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radii.md,
    backgroundColor: colors.panel
  },
  reviewText: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: "900"
  },
  emptyWrap: {
    alignItems: "center",
    paddingTop: 90
  },
  completeWrap: {
    alignItems: "center",
    paddingTop: 70
  },
  completeBadge: {
    width: 132,
    height: 132,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
    backgroundColor: colors.green,
    borderBottomWidth: 10,
    borderBottomColor: colors.greenDark
  },
  completeTitle: {
    marginTop: spacing.xl,
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center"
  },
  completeSub: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center"
  },
  resultGrid: {
    width: "100%",
    flexDirection: "row",
    gap: spacing.sm
  },
  resultItem: {
    flex: 1,
    minHeight: 76,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel
  },
  resultValue: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  resultLabel: {
    marginTop: spacing.xxs,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  }
});
