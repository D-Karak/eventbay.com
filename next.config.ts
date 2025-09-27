import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '*.devtunnels.ms', // Allow all devtunnel subdomains
        // Add your specific devtunnel URL
      ],
    },
  },
};

export default nextConfig;
