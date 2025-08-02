module.exports = {
  webpack(config, options) {
    config.cache = false; // Webpack 캐시 끄기
    return config;
  },
};
