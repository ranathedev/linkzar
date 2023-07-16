/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  env: {
    MONGO_KEY: process.env.MONGO_KEY,
  },
  reactStrictMode: true,
  images: { unoptimized: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};
