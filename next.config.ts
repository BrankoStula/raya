// next.config.ts
import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // explicit root — stray lockfiles elsewhere on disk otherwise make Turbopack
  // mis-infer the workspace and fail the build
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    qualities: [50, 75, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1pjqs5r0ua4f1.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
