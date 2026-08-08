import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import { PrimaryButton } from "@/src/components/PrimaryButton";
import { VerticalMongolianText } from "@/src/components/VerticalMongolianText";
import { colors, radii, spacing } from "@/src/styles/theme";

export default function AppStartScreen() {
  const { height } = useWindowDimensions();
  const isCompact = height < 760;

  const enterLearning = () => {
    router.replace("/learn");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.frame, isCompact && styles.frameCompact]}>
        <View style={styles.topRow}>
          <View style={styles.badge}>
            <Ionicons name="book" size={18} color={colors.blue} />
            <Text style={styles.badgeText}>传统蒙古文入门</Text>
          </View>
          <View style={styles.stamp}>
            <Text style={styles.stampText}>MVP</Text>
          </View>
        </View>

        <View style={styles.hero}>
          <View style={styles.titleBlock}>
            <Text style={styles.appName}>草原字母岛</Text>
            <Text style={styles.subtitle}>每天一小节，认识传统蒙古文</Text>
          </View>

          <View style={styles.glyphStage}>
            <View style={styles.paperLine} />
            <View style={[styles.paperLine, styles.paperLineRight]} />
            <VerticalMongolianText
              text="ᠮᠤᠩᠭᠤᠯ "
              size={isCompact ? 78 : 70}
              color={colors.ink}
              style={styles.glyphText}
            />
            <View style={styles.glyphDotBlue} />
            <View style={styles.glyphDotYellow} />
            <View style={styles.glyphDotGreen} />
          </View>
        </View>

        <View style={styles.featureRow}>
          <View style={styles.featureItem}>
            <Ionicons name="volume-high" size={20} color={colors.orange} />
            <Text style={styles.featureText}>听音识字</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="albums" size={20} color={colors.green} />
            <Text style={styles.featureText}>竖排练习</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="flash" size={20} color={colors.energy} />
            <Text style={styles.featureText}>短课闯关</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <PrimaryButton variant="blue" onPress={enterLearning} style={styles.primaryAction}>
            开始学习
          </PrimaryButton>
          <PrimaryButton variant="ghost" onPress={enterLearning} style={styles.secondaryAction}>
            已有进度，继续
          </PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F7FCFF"
  },
  frame: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl
  },
  frameCompact: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg
  },
  topRow: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  badge: {
    minHeight: 36,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: "#CFEFFF",
    backgroundColor: colors.panel
  },
  badgeText: {
    color: colors.blueDark,
    fontSize: 13,
    fontWeight: "900"
  },
  stamp: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.pill,
    borderWidth: 2,
    borderColor: colors.red,
    transform: [{ rotate: "-8deg" }]
  },
  stampText: {
    color: colors.red,
    fontSize: 11,
    fontWeight: "900"
  },
  hero: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.xl
  },
  titleBlock: {
    alignItems: "center"
  },
  appName: {
    color: colors.ink,
    fontSize: 34,
    fontWeight: "900",
    letterSpacing: 0,
    textAlign: "center"
  },
  subtitle: {
    marginTop: spacing.sm,
    color: "#637381",
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "800",
    textAlign: "center"
  },
  glyphStage: {
    minHeight: 286,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: "#E8E1CF",
    borderBottomWidth: 6,
    borderBottomColor: "#E3D3AF",
    backgroundColor: "#FFF9EC"
  },
  paperLine: {
    position: "absolute",
    top: 24,
    bottom: 24,
    left: "35%",
    width: 1,
    backgroundColor: "#E7D8B6"
  },
  paperLineRight: {
    left: "65%"
  },
  glyphText: {
    zIndex: 2
  },
  glyphDotBlue: {
    position: "absolute",
    top: 42,
    right: 58,
    width: 18,
    height: 18,
    borderRadius: radii.pill,
    backgroundColor: colors.blue
  },
  glyphDotYellow: {
    position: "absolute",
    bottom: 52,
    left: 46,
    width: 28,
    height: 28,
    borderRadius: radii.pill,
    backgroundColor: colors.yellow
  },
  glyphDotGreen: {
    position: "absolute",
    right: 38,
    bottom: 74,
    width: 22,
    height: 22,
    borderRadius: radii.pill,
    backgroundColor: colors.green
  },
  featureRow: {
    minHeight: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.xs,
    marginBottom: spacing.lg
  },
  featureItem: {
    flex: 1,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
    borderRadius: radii.md,
    backgroundColor: colors.panel
  },
  featureText: {
    color: colors.ink,
    fontSize: 12,
    fontWeight: "900"
  },
  actions: {
    gap: spacing.sm
  },
  primaryAction: {
    minHeight: 58
  },
  secondaryAction: {
    minHeight: 52
  }
});
