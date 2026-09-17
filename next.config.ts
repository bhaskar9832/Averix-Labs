import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // We only need unoptimized images if doing static export
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  compress: true,
  experimental: {},
};

export default nextConfig;
