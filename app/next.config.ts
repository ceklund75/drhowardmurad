import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  trailingSlash: true,
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [384, 450, 640, 750, 828, 1080, 1200, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 240, 320, 480, 640, 750, 828, 1080],
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
    cpus: 1, // max concurrent static generation workers because wp engine keeps timing out with more than 1.
  },
  staticPageGenerationTimeout: 300, // increase from default 60s
}

export default withBundleAnalyzer(nextConfig)
