// 主题色来自游戏化 HTML 原型，避免实现时重新发明视觉体系。
export const colors = {
  background: "#FFFFFF",
  backgroundSoft: "#F7F7F7",
  panel: "#FFFFFF",
  ink: "#3C3C3C",
  muted: "#9B9B9B",
  blue: "#1CB0F6",
  blueDark: "#0A8DCC",
  yellow: "#FFC800",
  green: "#58CC02",
  greenDark: "#45A500",
  red: "#FF4B4B",
  redDark: "#D83A3A",
  purple: "#CE82FF",
  line: "#E5E5E5",
  locked: "#D9D9D9",
  energy: "#FF70C8",
  orange: "#FF9600",
  successSoft: "#D7FFB8",
  selectedSoft: "#DDF4FF"
} as const;

// 固定间距刻度，保证手机端界面不会因为不同页面手写数值而漂移。
export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 36
} as const;

// 卡片圆角控制在原型的圆润游戏化范围内。
export const radii = {
  sm: 10,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 999
} as const;

// React Native 不支持 CSS box-shadow，这里用平台通用的阴影参数复用。
export const shadow = {
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.12,
  shadowRadius: 4,
  elevation: 3
} as const;

// 字体先使用系统字体；蒙古文字体后续需要替换为有授权的内嵌字体。
export const fonts = {
  ui: "System",
  mongolianFallback: "System"
} as const;
