import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Lesson } from "@/src/data/learningContent";
import { colors, radii, shadow, spacing } from "@/src/styles/theme";
import { VerticalMongolianText } from "@/src/components/VerticalMongolianText";

type CourseCardProps = {
  lesson: Lesson;
};

// 课程入口卡片用于首页当前课和练习页推荐课。
export function CourseCard({ lesson }: CourseCardProps) {
  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/lesson/${lesson.id}`)}
    >
      <View style={styles.copy}>
        <Text style={styles.kicker}>当前课程</Text>
        <Text style={styles.title}>{lesson.title}</Text>
        <Text style={styles.subtitle}>{lesson.subtitle}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>{lesson.newItems} 个新内容</Text>
          <Text style={styles.meta}>{lesson.questionCount} 道练习</Text>
          <Text style={styles.meta}>{lesson.xp} XP</Text>
        </View>
      </View>
      <View style={styles.glyphBox}>
        <VerticalMongolianText text={lesson.glyph} size={54} color={colors.blue} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 174,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.lg,
    backgroundColor: colors.panel,
    ...shadow
  },
  copy: {
    flex: 1,
    justifyContent: "center"
  },
  kicker: {
    marginBottom: spacing.xs,
    color: colors.blue,
    fontSize: 12,
    fontWeight: "900"
  },
  title: {
    color: colors.ink,
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 29
  },
  subtitle: {
    marginTop: spacing.xs,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginTop: spacing.md
  },
  meta: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    overflow: "hidden",
    borderRadius: radii.pill,
    backgroundColor: "#E9F6FF",
    color: colors.blueDark,
    fontSize: 11,
    fontWeight: "800"
  },
  glyphBox: {
    width: 86,
    minHeight: 128,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#C8D7E5",
    borderRadius: radii.lg,
    backgroundColor: "#F8FBFE"
  }
});
