/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["bytee.cloud", "localhost:3000"],
    },
  },
};

module.exports = nextConfig;
