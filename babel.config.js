// 这个配置让 Expo Router 可以正确接管页面入口。
module.exports = function babelConfig(api) {
  // 缓存配置，避免每次启动开发服务都重新解析 Babel。
  api.cache(true);

  return {
    presets: ["babel-preset-expo"]
  };
};
