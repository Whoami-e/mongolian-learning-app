import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/src/components/Screen";
import { getExercisesForLesson, getLessonById, getNextLessonId } from "@/src/data/learningContent";
import { loadProgress, ProgressSnapshot } from "@/src/lib/progressStore";
import { colors, radii, shadow, spacing } from "@/src/styles/theme";

const fallbackProgress: ProgressSnapshot = {
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

export default function ResultScreen() {
  const { lessonId, reviewed, cleared, wrong } = useLocalSearchParams<{
    lessonId: string;
    reviewed?: string;
    cleared?: string;
    wrong?: string;
  }>();
  const isReview = lessonId === "review";
  const lesson = isReview ? null : getLessonById(lessonId ?? "direction");
  const [progress, setProgress] = useState<ProgressSnapshot>(fallbackProgress);

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

  const lessonResult = lesson ? progress.lessonResults[lesson.id] : undefined;
  const score = lessonResult?.score ?? 0;
  const stars = lessonResult?.stars ?? 0;
  const reviewedCount = toCount(reviewed);
  const clearedCount = toCount(cleared);
  const wrongCount = toCount(wrong);
  const totalCount = isReview ? reviewedCount : lessonResult?.totalCount ?? getExercisesForLesson(lesson?.id ?? "direction").length;
  const correctCount = isReview ? clearedCount : lessonResult?.correctCount ?? 0;
  const needReviewCount = lesson ? getExercisesForLesson(lesson.id).filter((exercise) => progress.mistakes[exercise.id]).length : Object.keys(progress.mistakes).length;
  const nextLessonId = getNextLessonId(progress.completedLessonIds);

  const continueTarget = isReview ? `/lesson/${nextLessonId}` : nextLessonId === lesson?.id ? "/" : `/lesson/${nextLessonId}`;

  return (
    <Screen>
      <View style={styles.wrap}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{isReview ? "复习" : stars}</Text>
        </View>

        <Text style={styles.title}>{isReview ? "复习完成" : "课程完成"}</Text>
        <Text style={styles.subtitle}>
          {isReview
            ? `本次复习 ${reviewedCount} 道错题，答对 ${clearedCount} 道，红心恢复 +1。`
            : `${lesson?.title ?? "本课"} · 正确率 ${score}%`}
        </Text>

        <View style={styles.stats}>
          <Stat label="答对" value={`${correctCount}/${totalCount}`} />
          <Stat label="星星" value={isReview ? "—" : `${stars}/3`} />
          <Stat label="需要复习" value={`${needReviewCount}`} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>结果摘要</Text>
          <Text style={styles.cardText}>
            {isReview
              ? `答错 ${wrongCount} 道会留在本地错题池；连续答对两次后自动移除。`
              : `新学词汇 ${lesson?.newItems ?? 0} 个，累计 XP +${lesson?.xp ?? 0}。`}
          </Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.replace(continueTarget)}>
          <Text style={styles.primaryText}>继续学习</Text>
        </Pressable>

        {!isReview && needReviewCount > 0 ? (
          <Pressable style={styles.secondaryButton} onPress={() => router.replace("/practice")}>
            <Text style={styles.secondaryText}>去复习错题</Text>
          </Pressable>
        ) : null}
      </View>
    </Screen>
  );
}

function toCount(value: string | string[] | undefined) {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    paddingTop: spacing.lg
  },
  badge: {
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
    backgroundColor: colors.green,
    borderBottomWidth: 10,
    borderBottomColor: colors.greenDark,
    ...shadow
  },
  badgeText: {
    color: colors.panel,
    fontSize: 30,
    fontWeight: "900"
  },
  title: {
    marginTop: spacing.xl,
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900"
  },
  subtitle: {
    marginTop: spacing.sm,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: "center"
  },
  stats: {
    width: "100%",
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  stat: {
    flex: 1,
    minHeight: 76,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  statValue: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  statLabel: {
    marginTop: spacing.xxs,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  card: {
    width: "100%",
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  cardTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  cardText: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20
  },
  primaryButton: {
    width: "100%",
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.green,
    borderBottomWidth: 6,
    borderBottomColor: colors.greenDark
  },
  primaryText: {
    color: colors.panel,
    fontSize: 21,
    fontWeight: "900"
  },
  secondaryButton: {
    width: "100%",
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.md,
    backgroundColor: colors.panel
  },
  secondaryText: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: "900"
  }
});
