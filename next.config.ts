import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        // pathname: "/your-folder/**",
      },
    ],
  },
};

export default nextConfig;