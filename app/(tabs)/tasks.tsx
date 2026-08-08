import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/PrimaryButton";
import { Screen } from "@/src/components/Screen";
import { StatusBarRow } from "@/src/components/StatusBarRow";
import { dailyQuests } from "@/src/data/learningContent";
import { loadProgress, ProgressSnapshot } from "@/src/lib/progressStore";
import { colors, radii, shadow, spacing } from "@/src/styles/theme";

const questColors = {
  blue: colors.blue,
  green: colors.green,
  purple: colors.purple,
  yellow: colors.yellow
} as const;

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

export default function TasksScreen() {
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

  return (
    <Screen>
      <StatusBarRow progress={progress} />

      <View style={styles.header}>
        <Text style={styles.title}>今日任务</Text>
        <Text style={styles.subtitle}>完成小目标，拿 XP 和宝石。</Text>
      </View>

      <View style={styles.list}>
        {dailyQuests.map((quest) => {
          const value = getQuestValue(quest.id, progress);
          const ratio = Math.min(value / quest.target, 1);

          return (
            <View key={quest.id} style={styles.quest}>
              <View style={[styles.icon, { backgroundColor: questColors[quest.color] }]}>
                <Text style={styles.iconText}>{quest.title.slice(0, 1)}</Text>
              </View>
              <View style={styles.questBody}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${ratio * 100}%`,
                        backgroundColor: questColors[quest.color]
                      }
                    ]}
                  />
                </View>
                <Text style={styles.questMeta}>{value}/{quest.target}</Text>
              </View>
              <Text style={styles.reward}>{quest.reward}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>离线学习</Text>
        <Text style={styles.tipText}>
          第一单元课程、词库和练习题都在本地数据里，断网后仍可继续学习并保存进度。
        </Text>
        <PrimaryButton variant="green" onPress={() => router.push("/learn")}>去学习</PrimaryButton>
      </View>
    </Screen>
  );
}

function getQuestValue(id: string, progress: ProgressSnapshot) {
  if (id === "one-lesson") {
    return progress.lessonsCompletedToday;
  }

  if (id === "answer-five") {
    return progress.correctAnswersToday;
  }

  if (id === "review-three") {
    return progress.reviewedMistakesToday;
  }

  return 0;
}

const styles = StyleSheet.create({
  header: {
    marginTop: spacing.lg,
    marginBottom: spacing.md
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 14
  },
  list: {
    gap: spacing.sm
  },
  quest: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  icon: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md
  },
  iconText: {
    color: colors.panel,
    fontSize: 16,
    fontWeight: "900"
  },
  questBody: {
    flex: 1
  },
  questTitle: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  progressTrack: {
    height: 8,
    marginTop: spacing.xs,
    overflow: "hidden",
    borderRadius: radii.pill,
    backgroundColor: "#E2EDF6"
  },
  progressFill: {
    height: "100%",
    borderRadius: radii.pill
  },
  questMeta: {
    marginTop: spacing.xxs,
    color: colors.muted,
    fontSize: 11,
    fontWeight: "800"
  },
  reward: {
    color: colors.ink,
    fontSize: 13,
    fontWeight: "900"
  },
  tipCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  tipTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  tipText: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20
  }
});
