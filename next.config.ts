import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `https://be-a-prisma-pro-assignment.vercel.app/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
