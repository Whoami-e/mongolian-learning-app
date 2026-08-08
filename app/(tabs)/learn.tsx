import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/src/components/Screen";
import { getLessonStatus, getNextLessonId, lessons } from "@/src/data/learningContent";
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

// 学习页按产品方案直接进入学习路径，不做营销型首页。
export default function LearnHomeScreen() {
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

  const nextLessonId = getNextLessonId(progress.completedLessonIds);
  const currentLesson = lessons.find((lesson) => lesson.id === nextLessonId) ?? lessons[0];
  const mistakeCount = Object.keys(progress.mistakes).length;

  return (
    <Screen contentStyle={styles.screen}>
      <View style={styles.topStats}>
        <StatIcon icon="flame" value={progress.streak} color="#FF9600" />
        <StatIcon icon="heart" value={progress.hearts} color={colors.red} />
        <StatIcon icon="diamond" value={progress.gems} color={colors.blue} />
        <StatIcon icon="flash" value={progress.xp} color={colors.energy} />
      </View>

      <View style={styles.unitBar}>
        <View style={styles.unitCopy}>
          <Text style={styles.unitMeta}>第一单元</Text>
          <Text style={styles.unitTitle}>认识蒙古文</Text>
          <Text style={styles.unitSub}>下一节：{currentLesson.title}</Text>
        </View>
        <Pressable style={styles.unitAction} onPress={() => router.push("/ranking")}>
          <Ionicons name="book" size={34} color={colors.panel} />
        </Pressable>
      </View>

      <View style={styles.summaryRow}>
        <InfoCard title="今日目标" value={`${progress.lessonsCompletedToday}/1 节`} />
        <InfoCard title="最近错题" value={`${mistakeCount} 道`} onPress={() => router.push("/practice")} />
      </View>

      <View style={styles.map}>
        {lessons.map((lesson, index) => {
          const status = getLessonStatus(lesson.id, progress.completedLessonIds);
          const left = index % 2 === 0 ? 66 : 205;

          return (
            <Pressable
              key={lesson.id}
              style={[
                styles.lessonNode,
                { top: index * 102, left },
                status === "done" && styles.lessonNodeDone,
                status === "current" && styles.lessonNodeCurrent,
                status === "challenge" && styles.lessonNodeChallenge,
                status === "locked" && styles.lessonNodeLocked
              ]}
              disabled={status === "locked"}
              onPress={() => router.push(`/lesson/${lesson.id}`)}
            >
              <Ionicons
                name={status === "done" ? "checkmark" : status === "locked" ? "lock-closed" : "star"}
                size={34}
                color={status === "locked" ? "#AFAFAF" : colors.panel}
              />
              <Text style={[styles.nodeOrder, status === "locked" && styles.nodeOrderLocked]}>{lesson.order}</Text>
            </Pressable>
          );
        })}

        <View style={styles.lessonCallout}>
          <Text style={styles.calloutTitle}>{currentLesson.title}</Text>
          <Text style={styles.calloutMeta}>{currentLesson.objective}</Text>
          <Pressable style={styles.startButton} onPress={() => router.push(`/lesson/${currentLesson.id}`)}>
            <Text style={styles.startText}>开始 +{currentLesson.xp} XP</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

type StatIconProps = {
  icon: keyof typeof Ionicons.glyphMap;
  value: number;
  color: string;
};

function StatIcon({ icon, value, color }: StatIconProps) {
  return (
    <View style={styles.statItem}>
      <Ionicons name={icon} size={28} color={color} />
      <Text style={[styles.statValue, { color }]}>{value}</Text>
    </View>
  );
}

function InfoCard({ title, value, onPress }: { title: string; value: string; onPress?: () => void }) {
  return (
    <Pressable style={styles.infoCard} onPress={onPress}>
      <Text style={styles.infoTitle}>{title}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: 1180,
    paddingTop: spacing.md,
    paddingBottom: 0,
    backgroundColor: colors.background
  },
  topStats: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  statItem: {
    minWidth: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900"
  },
  unitBar: {
    minHeight: 112,
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: radii.xl,
    backgroundColor: colors.green,
    borderBottomWidth: 8,
    borderBottomColor: colors.greenDark
  },
  unitCopy: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: spacing.lg,
    paddingRight: spacing.sm
  },
  unitMeta: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 15,
    fontWeight: "900"
  },
  unitTitle: {
    marginTop: spacing.xxs,
    color: colors.panel,
    fontSize: 26,
    fontWeight: "900"
  },
  unitSub: {
    marginTop: spacing.xs,
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    fontWeight: "800"
  },
  unitAction: {
    width: 78,
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 2,
    borderLeftColor: "rgba(0,0,0,0.12)"
  },
  summaryRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.md
  },
  infoCard: {
    flex: 1,
    minHeight: 76,
    justifyContent: "center",
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  infoTitle: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  infoValue: {
    marginTop: spacing.xs,
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  map: {
    minHeight: 970,
    position: "relative",
    marginTop: spacing.lg
  },
  lessonNode: {
    position: "absolute",
    width: 94,
    height: 94,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
    backgroundColor: "#E5E5E5",
    borderBottomWidth: 9,
    borderBottomColor: "#BFBFBF"
  },
  lessonNodeDone: {
    backgroundColor: colors.blue,
    borderBottomColor: colors.blueDark
  },
  lessonNodeCurrent: {
    backgroundColor: colors.green,
    borderWidth: 10,
    borderColor: "#E8E8E8",
    borderBottomWidth: 14,
    borderBottomColor: colors.greenDark,
    ...shadow
  },
  lessonNodeChallenge: {
    backgroundColor: colors.purple,
    borderBottomColor: "#A75BD9"
  },
  lessonNodeLocked: {
    backgroundColor: "#E5E5E5",
    borderBottomColor: "#BFBFBF"
  },
  nodeOrder: {
    position: "absolute",
    bottom: 13,
    color: colors.panel,
    fontSize: 12,
    fontWeight: "900"
  },
  nodeOrderLocked: {
    color: "#9B9B9B"
  },
  lessonCallout: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.lg,
    borderRadius: radii.xl,
    backgroundColor: colors.green,
    ...shadow
  },
  calloutTitle: {
    color: colors.panel,
    fontSize: 26,
    fontWeight: "900"
  },
  calloutMeta: {
    marginTop: spacing.sm,
    color: "rgba(255,255,255,0.82)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  },
  startButton: {
    height: 60,
    marginTop: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.lg,
    backgroundColor: colors.panel
  },
  startText: {
    color: colors.greenDark,
    fontSize: 18,
    fontWeight: "900"
  }
});
