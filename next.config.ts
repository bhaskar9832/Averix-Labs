import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  compress: true,
  experimental: {},
  // Optional: If you are not using a custom domain and your GitHub repo is named "Averix-Labs",
  // you might need to uncomment the following line to make assets load correctly on GitHub Pages:
  // basePath: "/Averix-Labs",
};

export default nextConfig;
