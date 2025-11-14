/** @type {import("next").NextConfig} */
const nextConfig = {
  turbopack: {},

  webpack(config) {
    // Добавляем SVGR
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
