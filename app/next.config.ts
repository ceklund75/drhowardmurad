import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  trailingSlash: true,
  images: {
    unoptimized: false,
    formats: ['image/webp'],
    deviceSizes: [384, 450, 640, 750, 828, 1080, 1200, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 240, 320, 480, 640, 750, 828, 1080],
    qualities: [75, 85],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.drhowardmurad.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
  experimental: {
    cpus: 1, // max concurrent static generation workers because wp engine keeps timing out with more than 1.
  },
  staticPageGenerationTimeout: 300, // increase from default 60s
}

export default nextConfig
