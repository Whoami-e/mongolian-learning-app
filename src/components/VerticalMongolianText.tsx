import { Platform, Text, TextStyle } from "react-native";

import { fonts } from "@/src/styles/theme";

type VerticalMongolianTextProps = {
  text: string;
  size?: number;
  color?: string;
  style?: TextStyle;
};

type WebVerticalTextStyle = TextStyle & {
  direction?: "ltr" | "rtl";
  textOrientation?: "mixed" | "sideways" | "upright";
  whiteSpace?: "normal" | "nowrap" | "pre" | "pre-wrap";
  writingMode?: "horizontal-tb" | "vertical-lr" | "vertical-rl";
};

// Web 端使用真正的 CSS 竖排，让蒙古文按从上到下、列从左到右显示。
// 原生端暂时用换行兜底；正式移动端还需要接入授权蒙古文字体后再做真机验证。
export function VerticalMongolianText({
  text,
  size = 48,
  color,
  style
}: VerticalMongolianTextProps) {
  const isWeb = Platform.OS === "web";
  const content = isWeb ? text : Array.from(text).join("\n");
  const webVerticalStyle: WebVerticalTextStyle | undefined = isWeb
    ? {
        direction: "ltr",
        textOrientation: "sideways",
        whiteSpace: "nowrap",
        writingMode: "vertical-lr"
      }
    : undefined;

  return (
    <Text
      style={[
        {
          color,
          fontFamily: fonts.mongolianFallback,
          fontSize: size,
          fontWeight: "800",
          lineHeight: size * 1.02,
          textAlign: "center"
        },
        webVerticalStyle,
        style
      ]}
    >
      {content}
    </Text>
  );
}
