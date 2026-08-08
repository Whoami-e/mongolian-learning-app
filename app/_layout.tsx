import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { colors } from "@/src/styles/theme";

// 根布局只负责全局导航壳，不放具体业务界面。
export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor={colors.background} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      />
    </>
  );
}
