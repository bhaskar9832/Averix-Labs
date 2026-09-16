import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  compress: true,
  experimental: {},
  // GitHub Pages usually deploys to /repository-name/ unless you use a custom domain.
  basePath: isProd ? "/Averix-Labs" : "",
  assetPrefix: isProd ? "/Averix-Labs/" : "",
};

export default nextConfig;
