import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  trailingSlash: true,
  images: {
    unoptimized: false,
    qualities: [25, 50, 75, 85, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hmurad02.wpengine.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

export default nextConfig
