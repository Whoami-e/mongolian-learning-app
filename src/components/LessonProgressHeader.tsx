import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors, radii, spacing } from "@/src/styles/theme";

type LessonProgressHeaderProps = {
  progress: number;
  energy?: number;
  streak?: number;
  color?: "green" | "orange";
};

// 顶部进度条参考截图：左侧设置、中间长条、右侧粉色能量。
export function LessonProgressHeader({
  progress,
  energy = 25,
  streak,
  color = "green"
}: LessonProgressHeaderProps) {
  const progressColor = color === "orange" ? colors.orange : colors.green;

  return (
    <View style={styles.wrap}>
      <Ionicons name="settings-outline" size={32} color={colors.muted} />
      <View style={styles.trackWrap}>
        {streak ? <Text style={[styles.streak, { color: progressColor }]}>连击 x {streak}</Text> : null}
        <View style={styles.track}>
          <View
            style={[
              styles.fill,
              {
                width: `${Math.min(Math.max(progress, 0), 1) * 100}%`,
                backgroundColor: progressColor
              }
            ]}
          />
        </View>
      </View>
      <View style={styles.energy}>
        <View style={styles.energyIcon}>
          <Ionicons name="flash" size={20} color={colors.panel} />
        </View>
        <Text style={styles.energyText}>{energy}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg
  },
  trackWrap: {
    flex: 1,
    justifyContent: "center"
  },
  streak: {
    marginBottom: spacing.xxs,
    fontSize: 13,
    fontWeight: "900",
    textAlign: "center"
  },
  track: {
    height: 18,
    overflow: "hidden",
    borderRadius: radii.pill,
    backgroundColor: "#DEDEDE"
  },
  fill: {
    height: "100%",
    borderRadius: radii.pill
  },
  energy: {
    minWidth: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  energyIcon: {
    width: 31,
    height: 31,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.energy
  },
  energyText: {
    color: colors.energy,
    fontSize: 19,
    fontWeight: "900"
  }
});
