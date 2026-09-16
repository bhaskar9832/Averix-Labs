import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
// When deploying to GitHub Pages, we want static export
const isExport = process.env.BUILD_TARGET === 'export';

let nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // We only need unoptimized images if doing static export
    unoptimized: isExport ? true : false,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  compress: true,
  experimental: {},
};

if (isExport) {
  nextConfig.output = "export";
  nextConfig.basePath = "/Averix-Labs";
  nextConfig.assetPrefix = "/Averix-Labs/";
}

export default nextConfig;
