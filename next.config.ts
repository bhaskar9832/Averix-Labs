import type { NextConfig } from "next";

// When deploying to GitHub Pages, we want static export
const isExport = process.env.BUILD_TARGET === 'export';

const nextConfig: NextConfig = {
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
  // Base path removed for custom domain (averixlabs.in)
  // nextConfig.basePath = "/Averix-Labs";
  // nextConfig.assetPrefix = "/Averix-Labs";
}

export default nextConfig;
