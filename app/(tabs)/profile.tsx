import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "@/src/components/PrimaryButton";
import { Screen } from "@/src/components/Screen";
import {
  loadProgress,
  ProgressSnapshot,
  saveProgress,
  toggleLearningMode,
  toggleSound
} from "@/src/lib/progressStore";
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

export default function ProfileScreen() {
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

  const accuracy = useMemo(() => {
    const results = Object.values(progress.lessonResults);
    const correct = results.reduce((sum, result) => sum + result.correctCount, 0);
    const total = results.reduce((sum, result) => sum + result.totalCount, 0);
    return total > 0 ? Math.round((correct / total) * 100) : 0;
  }, [progress.lessonResults]);

  const updateProgress = async (next: ProgressSnapshot) => {
    setProgress(next);
    await saveProgress(next);
  };

  return (
    <Screen>
      <View style={styles.profileCard}>
        <View style={styles.profileCopy}>
          <Text style={styles.name}>本地学习者</Text>
          <Text style={styles.detail}>不登录也能体验第一单元，进度保存在本机。</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{progress.completedLessonIds.length}</Text>
          <Text style={styles.statLabel}>已完成课程</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{progress.streak}</Text>
          <Text style={styles.statLabel}>连续天数</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{accuracy}%</Text>
          <Text style={styles.statLabel}>正确率</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{progress.totalStudyMinutes}</Text>
          <Text style={styles.statLabel}>学习分钟</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{progress.masteredVocabularyIds.length}</Text>
          <Text style={styles.statLabel}>已掌握词汇</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{progress.xp}</Text>
          <Text style={styles.statLabel}>总 XP</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>学习模式</Text>
        <Text style={styles.cardText}>
          儿童模式减少解释文字；成人模式会在课程页展示例句和更多提示。
        </Text>
        <View style={styles.segmented}>
          <Pressable
            style={[styles.segment, progress.mode === "child" && styles.segmentActive]}
            onPress={() => progress.mode !== "child" && updateProgress(toggleLearningMode(progress))}
          >
            <Text style={[styles.segmentText, progress.mode === "child" && styles.segmentTextActive]}>儿童</Text>
          </Pressable>
          <Pressable
            style={[styles.segment, progress.mode === "adult" && styles.segmentActive]}
            onPress={() => progress.mode !== "adult" && updateProgress(toggleLearningMode(progress))}
          >
            <Text style={[styles.segmentText, progress.mode === "adult" && styles.segmentTextActive]}>成人</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>音频设置</Text>
        <Text style={styles.cardText}>
          当前已接入统一播放控制，真人音频文件到位后会沿用同一开关和资源编号。
        </Text>
        <PrimaryButton variant={progress.soundEnabled ? "green" : "ghost"} onPress={() => updateProgress(toggleSound(progress))}>
          {progress.soundEnabled ? "音频已开启" : "音频已关闭"}
        </PrimaryButton>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>内容审核状态</Text>
        <Text style={styles.cardText}>
          当前蒙古文、图片和音频均为开发占位。正式课程需要语言、音频和字体授权三项审核。
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>技术验证</Text>
        <Text style={styles.cardText}>
          检查蒙古文字形、音频按钮和本地进度保存，便于接入正式资源前逐项确认。
        </Text>
        <PrimaryButton variant="ghost" onPress={() => router.push("/validation")}>
          打开验证页
        </PrimaryButton>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  profileCopy: {
    flex: 1
  },
  name: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  detail: {
    marginTop: spacing.xxs,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19
  },
  stats: {
    flexDirection: "row",
    gap: spacing.xs,
    marginTop: spacing.lg
  },
  stat: {
    flex: 1,
    minHeight: 86,
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
    fontSize: 22,
    fontWeight: "900"
  },
  statLabel: {
    marginTop: spacing.xxs,
    color: colors.muted,
    fontSize: 12,
    textAlign: "center"
  },
  card: {
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
    marginBottom: spacing.lg,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20
  },
  segmented: {
    height: 52,
    flexDirection: "row",
    padding: spacing.xxs,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.md,
    backgroundColor: colors.backgroundSoft
  },
  segment: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.sm
  },
  segmentActive: {
    backgroundColor: colors.blue
  },
  segmentText: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "900"
  },
  segmentTextActive: {
    color: colors.panel
  }
});
