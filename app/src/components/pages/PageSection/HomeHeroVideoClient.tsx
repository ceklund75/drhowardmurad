'use client'

import { useEffect, useState } from 'react'

export function HomeHeroVideoClient({ src, poster }: { src: string; poster?: string }) {
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setCanPlay(true), 1500)
    return () => window.clearTimeout(id)
  }, [])

  if (!canPlay) return null

  return (
    <video
      poster={poster}
      className="fade-in fade-1200 absolute inset-0 hidden h-full w-full object-cover md:block"
      src={src}
      autoPlay
      muted
      loop={false}
      playsInline
    />
  )
}
