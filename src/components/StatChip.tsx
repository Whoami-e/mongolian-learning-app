import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors, radii, shadow, spacing } from "@/src/styles/theme";

type StatChipProps = PropsWithChildren<{
  label: string;
}>;

// 顶部状态胶囊统一展示连续天数、红心、宝石和 XP。
export function StatChip({ label, children }: StatChipProps) {
  return (
    <View style={styles.chip}>
      <Text style={styles.text}>
        {children}
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 32,
    minWidth: 64,
    paddingHorizontal: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radii.pill,
    backgroundColor: colors.panel,
    ...shadow
  },
  text: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900"
  }
});
