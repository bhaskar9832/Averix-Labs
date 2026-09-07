import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Optimize images — AVIF/WebP for better performance
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  compress: true,

  // Turbopack: set root so it can find package-lock.json
  // (needed because workspace folder name has spaces)
  experimental: {},
};

export default nextConfig;
