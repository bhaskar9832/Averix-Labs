import type { NextConfig } from "next";

const isPagesExport = process.env.BUILD_TARGET === "export";

const nextConfig: NextConfig = {
  ...(isPagesExport ? { output: "export", trailingSlash: true } : {}),
  reactStrictMode: true,
  images: {
    // We only need unoptimized images if doing static export
    unoptimized: isPagesExport,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  compress: true,
  experimental: {},
};

export default nextConfig;
