import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    console.log('config');
    console.log(process.env.ACTUAL_SERVER_API_URL);
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.ACTUAL_SERVER_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
