import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.ACTUAL_SERVER_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
