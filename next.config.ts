import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // output: 'export', // Disabled for Vercel deployment
  basePath: '',
  assetPrefix: '',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "rokiroy.in" }],
        destination: "https://www.rokiroy.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
