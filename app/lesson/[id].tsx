import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { LessonProgressHeader } from "@/src/components/LessonProgressHeader";
import { Screen } from "@/src/components/Screen";
import { VerticalMongolianText } from "@/src/components/VerticalMongolianText";
import { getExercisesForLesson, getLessonById, getVocabularyForLesson } from "@/src/data/learningContent";
import { useAudioPlayback } from "@/src/lib/audioPlayer";
import { loadProgress, ProgressSnapshot } from "@/src/lib/progressStore";
import { colors, radii, shadow, spacing } from "@/src/styles/theme";

export default function LessonStartScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = getLessonById(id ?? "direction");
  const vocabulary = getVocabularyForLesson(lesson.id);
  const exercises = getExercisesForLesson(lesson.id);
  const [progress, setProgress] = useState<ProgressSnapshot | null>(null);
  const { activeAudioId, toggleAudio } = useAudioPlayback(progress?.soundEnabled ?? true);

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

  return (
    <Screen contentStyle={styles.screen}>
      <LessonProgressHeader progress={0} energy={progress?.hearts ?? 5} />

      <View style={styles.heroCard}>
        <View style={styles.heroCopy}>
          <Text style={styles.heroMeta}>第 1 单元 · 第 {lesson.order} 课</Text>
          <Text style={styles.heroTitle}>{lesson.title}</Text>
          <Text style={styles.heroText}>{lesson.objective}</Text>
        </View>
        <View style={styles.heroGlyph}>
          <VerticalMongolianText text={lesson.glyph} size={42} color={colors.greenDark} />
        </View>
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>本课学习内容</Text>
        <Text style={styles.summaryText}>{lesson.subtitle}</Text>

        <View style={styles.stats}>
          <Stat value={lesson.newItems} label="新内容" />
          <Stat value={exercises.length} label="练习" />
          <Stat value={lesson.xp} label="XP" />
        </View>
      </View>

      <View style={styles.wordList}>
        {vocabulary.map((item) => (
          <View key={item.id} style={styles.wordItem}>
            <View style={styles.wordGlyph}>
              <VerticalMongolianText text={item.mongolian} size={30} color={colors.ink} />
            </View>
            <View style={styles.wordCopy}>
              <Text style={styles.wordChinese}>{item.chinese}</Text>
              <Text style={styles.wordHint}>发音提示：{item.pronunciationHint}</Text>
              {progress?.mode === "adult" ? (
                <Text style={styles.example}>例句：{item.exampleChinese}</Text>
              ) : null}
            </View>
            <Pressable style={[styles.audioBadge, activeAudioId === item.audioHint && styles.audioBadgeActive]} onPress={() => toggleAudio(item.audioHint)}>
              <Ionicons
                name={progress?.soundEnabled === false ? "volume-mute" : activeAudioId === item.audioHint ? "pause" : "volume-high"}
                size={22}
                color={activeAudioId === item.audioHint ? colors.panel : colors.blue}
              />
            </Pressable>
          </View>
        ))}
      </View>

      <Text style={styles.auditNote}>当前内容为开发样例，正式发布前需要完成蒙古文、发音、字体授权审核。</Text>

      <Pressable style={styles.startButton} onPress={() => router.push(`/exercise/${lesson.id}`)}>
        <Text style={styles.startText}>开始练习</Text>
      </Pressable>
    </Screen>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    minHeight: 760,
    paddingTop: spacing.lg,
    backgroundColor: colors.background
  },
  heroCard: {
    minHeight: 140,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radii.xl,
    backgroundColor: colors.green,
    borderBottomWidth: 8,
    borderBottomColor: colors.greenDark,
    ...shadow
  },
  heroCopy: {
    flex: 1
  },
  heroMeta: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 15,
    fontWeight: "900"
  },
  heroTitle: {
    marginTop: spacing.xs,
    color: colors.panel,
    fontSize: 28,
    fontWeight: "900"
  },
  heroText: {
    marginTop: spacing.sm,
    color: "rgba(255,255,255,0.84)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700"
  },
  heroGlyph: {
    width: 82,
    minHeight: 96,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.lg,
    backgroundColor: colors.panel
  },
  summaryCard: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radii.xl,
    backgroundColor: colors.panel
  },
  summaryTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  },
  summaryText: {
    marginTop: spacing.sm,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "700"
  },
  stats: {
    flexDirection: "row",
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  stat: {
    flex: 1,
    minHeight: 70,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radii.md,
    backgroundColor: colors.panel
  },
  statValue: {
    color: colors.greenDark,
    fontSize: 22,
    fontWeight: "900"
  },
  statLabel: {
    marginTop: spacing.xxs,
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  wordList: {
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  wordItem: {
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel
  },
  wordGlyph: {
    width: 58,
    minHeight: 68,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.backgroundSoft
  },
  wordCopy: {
    flex: 1
  },
  wordChinese: {
    color: colors.ink,
    fontSize: 17,
    fontWeight: "900"
  },
  wordHint: {
    marginTop: spacing.xxs,
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  },
  example: {
    marginTop: spacing.xxs,
    color: colors.blueDark,
    fontSize: 12,
    lineHeight: 18
  },
  audioBadge: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.selectedSoft
  },
  audioBadgeActive: {
    backgroundColor: colors.blue
  },
  auditNote: {
    marginTop: spacing.md,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18
  },
  startButton: {
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing.lg,
    borderRadius: radii.lg,
    backgroundColor: colors.green,
    borderBottomWidth: 6,
    borderBottomColor: colors.greenDark
  },
  startText: {
    color: colors.panel,
    fontSize: 21,
    fontWeight: "900"
  }
});
