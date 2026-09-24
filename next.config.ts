import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["@prisma/client"],
  reactStrictMode: false,
};

export default nextConfig;
