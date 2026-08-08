const { getDefaultConfig } = require("expo/metro-config");

// 使用 Expo 默认 Metro 配置，避免手写丢失 Expo Router、静态资源等默认能力。
const config = getDefaultConfig(__dirname);

// 当前机器上的 Watchman 访问项目目录会报 Operation not permitted。
// 这里显式改用 Node 文件扫描器，让 `npm run web` 可以正常启动。
config.resolver.useWatchman = false;

module.exports = config;
