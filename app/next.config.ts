import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  trailingSlash: true,
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [384, 450, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    qualities: [25, 50, 75, 85, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hmurad02.wpengine.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  experimental: {
    cpus: 2, // max concurrent static generation workers because wp engine keeps timing out with more than 2.
  },
  staticPageGenerationTimeout: 180, // increase from default 60s
}

export default nextConfig
