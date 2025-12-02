/** @type {import("next").NextConfig} */
const nextConfig = {
  turbopack: {},

  images: {
    domains: process.env.NEXT_PUBLIC_DOMAIN
      ? [
          process.env.NEXT_PUBLIC_DOMAIN,
          "cdn-bucket.hb.bizmrg.com",
          "old-images.hb.ru-msk.vkcs.cloud",
        ]
      : ["cdn-bucket.hb.bizmrg.com", "old-images.hb.ru-msk.vkcs.cloud"],
  },

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
