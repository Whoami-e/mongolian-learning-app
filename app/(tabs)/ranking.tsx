import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/src/components/Screen";
import { StatusBarRow } from "@/src/components/StatusBarRow";
import { VerticalMongolianText } from "@/src/components/VerticalMongolianText";
import { categoryLabels, simpleSentences, VocabularyCategory, vocabulary } from "@/src/data/learningContent";
import { loadProgress, ProgressSnapshot } from "@/src/lib/progressStore";
import { colors, radii, shadow, spacing } from "@/src/styles/theme";

const categories: Array<VocabularyCategory | "all"> = [
  "all",
  "letter",
  "family",
  "animal",
  "number",
  "food",
  "school"
];

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

export default function VocabularyScreen() {
  const [category, setCategory] = useState<VocabularyCategory | "all">("all");
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

  const visibleVocabulary = useMemo(
    () => vocabulary.filter((item) => category === "all" || item.category === category),
    [category]
  );

  return (
    <Screen>
      <StatusBarRow progress={progress} />

      <View style={styles.header}>
        <Text style={styles.title}>词库</Text>
        <Text style={styles.subtitle}>按分类浏览已配置的字母、词汇和例句。</Text>
      </View>

      <View style={styles.tabs}>
        {categories.map((item) => {
          const active = item === category;

          return (
            <Pressable
              key={item}
              style={[styles.tab, active && styles.tabActive]}
              onPress={() => setCategory(item)}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>{categoryLabels[item]}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryValue}>{progress.masteredVocabularyIds.length}/{vocabulary.length}</Text>
        <Text style={styles.summaryText}>已掌握词汇来自已完成课程的学习内容。当前已配置 {simpleSentences.length} 条简单句。</Text>
      </View>

      <View style={styles.list}>
        {visibleVocabulary.map((item) => {
          const mastered = progress.masteredVocabularyIds.includes(item.id);

          return (
            <View key={item.id} style={[styles.wordCard, mastered && styles.wordCardMastered]}>
              <View style={styles.glyphBox}>
                <VerticalMongolianText text={item.mongolian} size={30} color={colors.ink} />
              </View>
              <View style={styles.wordBody}>
                <View style={styles.wordTopLine}>
                  <Text style={styles.wordTitle}>{item.chinese}</Text>
                  <Text style={[styles.status, mastered && styles.statusMastered]}>
                    {mastered ? "已掌握" : "待学习"}
                  </Text>
                </View>
                <Text style={styles.wordHint}>发音提示：{item.pronunciationHint}</Text>
                <Text style={styles.example}>{item.exampleChinese}</Text>
                {progress.mode === "adult" ? (
                  <Text style={styles.audit}>审核状态：{item.reviewStatus === "published" ? "已发布" : "待审核"}</Text>
                ) : null}
              </View>
            </View>
          );
        })}
      </View>

      {category === "all" || category === "greeting" ? (
        <View style={styles.sentenceSection}>
          <Text style={styles.sectionTitle}>简单句</Text>
          {simpleSentences.map((item) => (
            <View key={item.id} style={styles.sentenceCard}>
              <View style={styles.sentenceGlyph}>
                <VerticalMongolianText text={item.mongolian} size={26} color={colors.ink} />
              </View>
              <View style={styles.wordBody}>
                <Text style={styles.wordTitle}>{item.chinese}</Text>
                <Text style={styles.wordHint}>发音提示：{item.pronunciationHint}</Text>
                {progress.mode === "adult" ? (
                  <Text style={styles.audit}>审核状态：{item.reviewStatus === "published" ? "已发布" : "待审核"}</Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </Screen>
  );
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
    fontSize: 14,
    lineHeight: 20
  },
  tabs: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: spacing.md
  },
  tab: {
    minHeight: 38,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.pill,
    backgroundColor: colors.panel
  },
  tabActive: {
    borderColor: colors.blue,
    backgroundColor: colors.selectedSoft
  },
  tabText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "900"
  },
  tabTextActive: {
    color: colors.blueDark
  },
  summaryCard: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  summaryValue: {
    color: colors.greenDark,
    fontSize: 26,
    fontWeight: "900"
  },
  summaryText: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20
  },
  list: {
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  },
  wordCard: {
    minHeight: 108,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  wordCardMastered: {
    borderColor: "#A7E98A",
    backgroundColor: "#FAFFF7"
  },
  glyphBox: {
    width: 64,
    minHeight: 82,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.backgroundSoft
  },
  wordBody: {
    flex: 1
  },
  wordTopLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm
  },
  wordTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  status: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900"
  },
  statusMastered: {
    color: colors.greenDark
  },
  wordHint: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800"
  },
  example: {
    marginTop: spacing.xxs,
    color: colors.ink,
    fontSize: 13,
    lineHeight: 19
  },
  audit: {
    marginTop: spacing.xxs,
    color: colors.blueDark,
    fontSize: 12,
    fontWeight: "800"
  },
  sentenceSection: {
    marginTop: spacing.lg
  },
  sentenceCard: {
    minHeight: 104,
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  sentenceGlyph: {
    width: 72,
    minHeight: 84,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: "#F6EAFF"
  }
});
