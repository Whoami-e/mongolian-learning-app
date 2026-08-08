import { PropsWithChildren } from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

import { colors, radii, spacing } from "@/src/styles/theme";

type PrimaryButtonProps = PropsWithChildren<{
  onPress?: () => void;
  variant?: "blue" | "green" | "ghost" | "red";
  style?: ViewStyle;
}>;

// 按钮保留原型里的厚底阴影，点击反馈用轻微下压表达。
export function PrimaryButton({
  children,
  onPress,
  variant = "blue",
  style
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && styles.pressed,
        style
      ]}
    >
      <Text style={[styles.text, variant === "ghost" && styles.ghostText]}>
        {children}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 50,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md
  },
  blue: {
    backgroundColor: colors.blue,
    borderBottomWidth: 5,
    borderBottomColor: colors.blueDark
  },
  green: {
    backgroundColor: colors.green,
    borderBottomWidth: 5,
    borderBottomColor: colors.greenDark
  },
  ghost: {
    backgroundColor: colors.panel,
    borderWidth: 1,
    borderColor: colors.line,
    borderBottomWidth: 5,
    borderBottomColor: "#D4E0EB"
  },
  red: {
    backgroundColor: colors.red,
    borderBottomWidth: 5,
    borderBottomColor: colors.redDark
  },
  pressed: {
    transform: [{ translateY: 2 }],
    borderBottomWidth: 3
  },
  text: {
    color: colors.panel,
    fontSize: 15,
    fontWeight: "900"
  },
  ghostText: {
    color: colors.blue
  }
});
