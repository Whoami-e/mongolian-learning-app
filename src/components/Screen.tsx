import { PropsWithChildren } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, ViewStyle } from "react-native";

import { colors, spacing } from "@/src/styles/theme";

type ScreenProps = PropsWithChildren<{
  scroll?: boolean;
  contentStyle?: ViewStyle;
}>;

// 页面容器统一处理安全区、背景色和滚动行为。
export function Screen({ children, scroll = true, contentStyle }: ScreenProps) {
  if (!scroll) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.staticFrame}>{children}</View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.scroller}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={[styles.content, contentStyle]}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.background
  },
  scroller: {
    width: "100%"
  },
  scrollContent: {
    alignItems: "center"
  },
  staticFrame: {
    flex: 1,
    width: "100%",
    maxWidth: 430
  },
  content: {
    width: "100%",
    maxWidth: 430,
    padding: spacing.md,
    paddingBottom: spacing.xxl
  }
});
