'use client'
import Image from 'next/image'

import { X, Smartphone } from 'lucide-react'

interface IconProps {
  kind: 'twitter' | 'murad' | 'app' | ('twitter' | 'murad' | 'app')[]
  image?: {
    mediaItemUrl?: string
    altText?: string
    mediaDetails?: {
      width?: number
      height?: number
    }
  }
  size?: number
  className?: string
}

const iconMap = {
  twitter: X,
  app: Smartphone,
  murad: null, // Custom image only
}

export function Icon({ kind, image, size = 54, className = '' }: IconProps) {
  const iconKind = Array.isArray(kind) ? kind[0] : kind
  if (image?.mediaItemUrl) {
    const width = image.mediaDetails?.width || size
    const height = image.mediaDetails?.height || size

    return (
      <Image
        src={image.mediaItemUrl}
        alt={image.altText || iconKind}
        width={width}
        height={height}
        style={{ width, height }}
        className={className}
        unoptimized
      />
    )
  }

  const IconComponent = iconMap[iconKind as keyof typeof iconMap]
  if (!IconComponent) return null

  return <IconComponent size={size} className={className} />
}
