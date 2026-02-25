/* eslint-disable jsx-a11y/alt-text */
'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { cx } from '@/lib/ui'

type AsyncImageProps = ImageProps & {
  showSkeleton?: boolean
}

export function AsyncImage({ showSkeleton = true, className, ...props }: AsyncImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      {showSkeleton && !loaded && <div className="absolute inset-0 animate-pulse bg-gray-100" />}

      <Image
        {...props}
        className={cx(
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
        onLoad={(e) => {
          if (e.currentTarget.complete) setLoaded(true)
        }}
      />
    </>
  )
}
