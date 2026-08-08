import { StyleSheet, View } from "react-native";

import { spacing } from "@/src/styles/theme";
import { StatChip } from "@/src/components/StatChip";
import { ProgressSnapshot } from "@/src/lib/progressStore";

type StatusBarRowProps = {
  progress: ProgressSnapshot;
};

// 多个页面共用同一组学习状态，保持游戏化反馈一致。
export function StatusBarRow({ progress }: StatusBarRowProps) {
  return (
    <View style={styles.row}>
      <StatChip label={`${progress.streak}`}>🔥 </StatChip>
      <StatChip label={`${progress.hearts}`}>♥ </StatChip>
      <StatChip label={`${progress.gems}`}>◆ </StatChip>
      <StatChip label={`XP ${progress.xp}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: spacing.xs,
    justifyContent: "space-between"
  }
});
