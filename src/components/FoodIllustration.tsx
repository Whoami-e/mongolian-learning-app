import { StyleSheet, Text, View } from "react-native";

import { colors, radii } from "@/src/styles/theme";

type FoodIllustrationProps = {
  kind: "water" | "bread" | "tea" | "coffee";
};

// 图片题里的图案先用原创轻量插画表达，后续可以替换为正式美术资源。
export function FoodIllustration({ kind }: FoodIllustrationProps) {
  if (kind === "water") {
    return (
      <View style={styles.waterBottle}>
        <View style={styles.bottleCap} />
        <View style={styles.bottleNeck} />
        <View style={styles.waterLabel} />
      </View>
    );
  }

  if (kind === "bread") {
    return (
      <View style={styles.breadBack}>
        <View style={styles.breadFront}>
          <View style={styles.breadDotSmall} />
          <View style={styles.breadDotLarge} />
        </View>
      </View>
    );
  }

  if (kind === "coffee") {
    return (
      <View style={styles.coffeePot}>
        <View style={styles.coffeeLid} />
        <View style={styles.coffeeHandle} />
        <View style={styles.coffeeFill} />
      </View>
    );
  }

  return (
    <View style={styles.teaSet}>
      <View style={styles.teaCup}>
        <Text style={styles.teaTag}>▢</Text>
      </View>
      <View style={styles.teaHandle} />
      <View style={styles.teaPlate} />
    </View>
  );
}

const styles = StyleSheet.create({
  waterBottle: {
    width: 72,
    height: 124,
    alignItems: "center",
    borderRadius: 22,
    backgroundColor: "#8AEAFF",
    borderWidth: 7,
    borderColor: "#C9FAFF"
  },
  bottleCap: {
    position: "absolute",
    top: -23,
    width: 35,
    height: 22,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    backgroundColor: "#168BD3"
  },
  bottleNeck: {
    position: "absolute",
    top: 8,
    width: 36,
    height: 13,
    borderRadius: 8,
    backgroundColor: "#FFFFFF"
  },
  waterLabel: {
    position: "absolute",
    top: 38,
    width: 60,
    height: 42,
    borderRadius: 8,
    backgroundColor: "#29C5EF"
  },
  breadBack: {
    width: 112,
    height: 86,
    borderRadius: 24,
    backgroundColor: "#D57900"
  },
  breadFront: {
    position: "absolute",
    right: 4,
    top: 7,
    width: 86,
    height: 75,
    borderWidth: 5,
    borderColor: "#E28A12",
    borderRadius: 18,
    backgroundColor: "#FFC777"
  },
  breadDotSmall: {
    position: "absolute",
    right: 23,
    top: 32,
    width: 13,
    height: 13,
    borderRadius: 10,
    backgroundColor: "#ECAA59"
  },
  breadDotLarge: {
    position: "absolute",
    right: 8,
    top: 23,
    width: 18,
    height: 18,
    borderRadius: 12,
    backgroundColor: "#ECAA59"
  },
  teaSet: {
    width: 136,
    height: 90,
    alignItems: "center",
    justifyContent: "center"
  },
  teaCup: {
    width: 86,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 9,
    borderTopColor: colors.yellow,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    backgroundColor: "#D8EEF1"
  },
  teaTag: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900"
  },
  teaHandle: {
    position: "absolute",
    right: 13,
    top: 24,
    width: 31,
    height: 37,
    borderWidth: 7,
    borderLeftWidth: 0,
    borderColor: colors.yellow,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20
  },
  teaPlate: {
    position: "absolute",
    bottom: 7,
    width: 125,
    height: 10,
    borderRadius: 6,
    backgroundColor: colors.yellow
  },
  coffeePot: {
    width: 124,
    height: 82,
    overflow: "hidden",
    borderRadius: 34,
    backgroundColor: "#B7F3FF"
  },
  coffeeLid: {
    position: "absolute",
    left: 23,
    top: -2,
    width: 92,
    height: 29,
    borderRadius: 8,
    backgroundColor: "#363636"
  },
  coffeeHandle: {
    position: "absolute",
    right: -4,
    top: 10,
    width: 40,
    height: 58,
    borderRightWidth: 12,
    borderTopWidth: 12,
    borderColor: "#363636",
    borderTopRightRadius: radii.md,
    transform: [{ rotate: "-18deg" }]
  },
  coffeeFill: {
    position: "absolute",
    left: 18,
    right: 18,
    bottom: 8,
    height: 42,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    backgroundColor: "#764100"
  }
});
