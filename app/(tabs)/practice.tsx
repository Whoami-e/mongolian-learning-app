import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { CourseCard } from "@/src/components/CourseCard";
import { PrimaryButton } from "@/src/components/PrimaryButton";
import { Screen } from "@/src/components/Screen";
import { getExercisesForLesson, getNextLessonId, getLessonById, lessons } from "@/src/data/learningContent";
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

export default function PracticeScreen() {
  const [progress, setProgress] = useState<ProgressSnapshot>(fallbackProgress);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      loadProgress().then((snapshot) => {
        if (active) {
          setProgress(snapshot);
        }
      });

      return () => {
        active = false;
      };
    }, [])
  );

  const mistakeIds = Object.keys(progress.mistakes);
  const nextLessonId = getNextLessonId(progress.completedLessonIds);
  const currentLesson = getLessonById(nextLessonId);
  const reviewedCount = mistakeIds.length;
  const repeatLesson = getLessonById(progress.completedLessonIds.at(-1) ?? lessons[0].id);
  const reviewExerciseCount = useMemo(() => getExercisesForLesson(repeatLesson.id).filter((exercise) => mistakeIds.includes(exercise.id)).length, [mistakeIds, repeatLesson.id]);

  return (
    <Screen>
      <Text style={styles.title}>练习</Text>
      <Text style={styles.subtitle}>错题会自动进入复习池，答对后可以恢复红心并提高掌握度。</Text>

      <View style={styles.reviveCard}>
        <Text style={styles.kicker}>错题复习</Text>
        <Text style={styles.cardTitle}>{reviewedCount > 0 ? `有 ${reviewedCount} 道错题待复习` : "当前没有错题"}</Text>
        <Text style={styles.cardText}>
          {reviewedCount > 0
            ? `复习完成后可恢复 1 颗红心，当前可复习 ${reviewExerciseCount} 道。`
            : "先去完成一节课程，答错后这里会自动出现复习内容。"}
        </Text>
        <PrimaryButton onPress={() => router.push(reviewedCount > 0 ? "/exercise/review" : `/lesson/${currentLesson.id}`)}>
          {reviewedCount > 0 ? "开始复习" : "去学新课"}
        </PrimaryButton>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>推荐继续学习</Text>
        <CourseCard lesson={currentLesson} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>最近完成</Text>
        {progress.completedLessonIds.slice(-3).reverse().map((lessonId) => {
          const lesson = getLessonById(lessonId);
          return (
            <View key={lesson.id} style={styles.lessonRow}>
              <View style={styles.lessonIndex}>
                <Text style={styles.lessonIndexText}>{lesson.order}</Text>
              </View>
              <View style={styles.lessonBody}>
                <Text style={styles.lessonTitle}>{lesson.title}</Text>
                <Text style={styles.lessonDetail}>{lesson.subtitle}</Text>
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>连续学习</Text>
        <View style={styles.streakCard}>
          <Text style={styles.streakValue}>{progress.streak} 天</Text>
          <Text style={styles.streakText}>完成课程、复习错题和保持每日节奏都会刷新连续天数。</Text>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  reviveCard: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  kicker: {
    color: colors.purple,
    fontSize: 12,
    fontWeight: "900"
  },
  cardTitle: {
    marginTop: spacing.xs,
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900"
  },
  cardText: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20
  },
  section: {
    marginTop: spacing.lg
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  lessonRow: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  lessonIndex: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.selectedSoft
  },
  lessonIndexText: {
    color: colors.blueDark,
    fontSize: 16,
    fontWeight: "900"
  },
  lessonBody: {
    flex: 1
  },
  lessonTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  lessonDetail: {
    marginTop: spacing.xxs,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18
  },
  streakCard: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  streakValue: {
    color: colors.greenDark,
    fontSize: 26,
    fontWeight: "900"
  },
  streakText: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20
  }
});
