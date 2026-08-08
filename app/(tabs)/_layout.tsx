import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { colors, radii, spacing } from "@/src/styles/theme";

// 底部五栏对应 MVP 页面：学习、任务、练习、词库、我的。
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "800"
        },
        tabBarStyle: {
          alignSelf: "center",
          width: "100%",
          maxWidth: 430,
          height: 68,
          paddingTop: spacing.xs,
          paddingBottom: spacing.sm,
          borderTopWidth: 1,
          borderTopColor: colors.line,
          backgroundColor: colors.panel,
          borderTopLeftRadius: radii.xl,
          borderTopRightRadius: radii.xl
        }
      }}
    >
      <Tabs.Screen
        name="learn"
        options={{
          title: "学习",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "任务",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flag" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: "练习",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fitness" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="ranking"
        options={{
          title: "词库",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "我的",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          )
        }}
      />
    </Tabs>
  );
}
