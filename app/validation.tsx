import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/src/components/Screen";
import { VerticalMongolianText } from "@/src/components/VerticalMongolianText";
import { useAudioPlayback } from "@/src/lib/audioPlayer";
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

const fontSamples = [
  { label: "独立字母", text: "ᠠ ᠡ ᠢ ᠣ ᠤ ᠥ ᠮ ᠨ ᠪ" },
  { label: "字母连接", text: "ᠮᠠ ᠨᠠ ᠪᠠ ᠴᠠᠢ" },
  { label: "位置变化", text: "ᠪᠠ ᠠᠪᠠ ᠠᠪ" },
  { label: "简单句", text: "ᠴᠠᠢ ᠨᠠᠳᠠᠳ ᠥᠭ" }
];

const audioSamples = [
  { id: "letter-a", label: "字母 A" },
  { id: "mother", label: "妈妈" },
  { id: "sentence-give-me-tea", label: "请给我茶" }
];

export default function ValidationScreen() {
  const [progress, setProgress] = useState<ProgressSnapshot>(fallbackProgress);
  const { activeAudioId, toggleAudio } = useAudioPlayback(progress.soundEnabled);

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
    <Screen>
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={24} color={colors.blue} />
        <Text style={styles.backText}>返回</Text>
      </Pressable>

      <Text style={styles.title}>技术验证</Text>
      <Text style={styles.subtitle}>字形、音频和本地进度。</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>蒙古文字形</Text>
        {fontSamples.map((sample) => (
          <View key={sample.label} style={styles.sampleRow}>
            <View style={styles.sampleGlyph}>
              <VerticalMongolianText text={sample.text} size={28} color={colors.ink} />
            </View>
            <View style={styles.sampleCopy}>
              <Text style={styles.sampleTitle}>{sample.label}</Text>
              <Text style={styles.sampleText}>{sample.text}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>音频播放</Text>
        <View style={styles.audioGrid}>
          {audioSamples.map((sample) => {
            const active = activeAudioId === sample.id;

            return (
              <Pressable
                key={sample.id}
                style={[styles.audioButton, active && styles.audioButtonActive]}
                onPress={() => toggleAudio(sample.id)}
              >
                <Ionicons name={active ? "pause" : "volume-high"} size={22} color={active ? colors.panel : colors.blue} />
                <Text style={[styles.audioText, active && styles.audioTextActive]}>{sample.label}</Text>
              </Pressable>
            );
          })}
        </View>
        <Text style={styles.note}>{progress.soundEnabled ? "音频开关已开启" : "音频开关已关闭"}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>本地进度</Text>
        <View style={styles.stats}>
          <Stat label="课程" value={`${progress.completedLessonIds.length}`} />
          <Stat label="错题" value={`${Object.keys(progress.mistakes).length}`} />
          <Stat label="连续" value={`${progress.streak}`} />
        </View>
        <Text style={styles.note}>移动端优先 SQLite，Web 端使用本地存储回退。</Text>
      </View>
    </Screen>
  );
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    alignSelf: "flex-start",
    marginBottom: spacing.md
  },
  backText: {
    color: colors.blue,
    fontSize: 15,
    fontWeight: "900"
  },
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  },
  section: {
    width: "100%",
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  sectionTitle: {
    marginBottom: spacing.md,
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  sampleRow: {
    minHeight: 92,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.sm
  },
  sampleGlyph: {
    width: 74,
    minHeight: 82,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.backgroundSoft
  },
  sampleCopy: {
    flex: 1
  },
  sampleTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  sampleText: {
    marginTop: spacing.xxs,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20
  },
  audioGrid: {
    gap: spacing.sm
  },
  audioButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.md,
    backgroundColor: colors.panel
  },
  audioButtonActive: {
    borderColor: colors.blue,
    backgroundColor: colors.blue
  },
  audioText: {
    color: colors.blue,
    fontSize: 15,
    fontWeight: "900"
  },
  audioTextActive: {
    color: colors.panel
  },
  note: {
    marginTop: spacing.md,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18
  },
  stats: {
    flexDirection: "row",
    gap: spacing.sm
  },
  stat: {
    flex: 1,
    minHeight: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.backgroundSoft
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
  }
});
