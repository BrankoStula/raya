// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
