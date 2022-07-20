/** @type {import('next').NextConfig} */
const { i18n } = require("./i18n");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,
};

module.exports = {
  ...nextConfig,
};

const nextTranslate = require("next-translate");

module.exports = nextTranslate({
  reactStrictMode: true,
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
});
