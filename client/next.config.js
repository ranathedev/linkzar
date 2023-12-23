/** @type {import('next').NextConfig} */
const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  env: {
    MONGO_KEY: process.env.MONGO_KEY,
    EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_ID,
    EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID,
    EMAIL_PUBLIC_KEY: process.env.EMAIL_PUBLIC_KEY,
    APIKEY: process.env.APIKEY,
    AUTHDOMAIN: process.env.AUTHDOMAIN,
    PROJECTID: process.env.PROJECTID,
    STORAGEBUCKET: process.env.STORAGEBUCKET,
    MESSAGINGSENDERID: process.env.MESSAGINGSENDERID,
    APPID: process.env.APPID,
    MEASUREMENTID: process.env.MEASUREMENTID,
    TENANT_ID: process.env.TENANT_ID,
    BUCKET: process.env.BUCKET,
    GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
  },
  reactStrictMode: true,
  images: { unoptimized: true },
  webpack: config => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
}
