'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { buttonClassName } from '@/lib/ui'

const VideoModal = dynamic(() => import('../modals/VideoModal'), { ssr: false })

export interface PostVideoButtonProps {
  videoUrl: string
  className?: string
}

export default function PostVideoButton({ videoUrl, className }: PostVideoButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className || buttonClassName('button-theme')}
      >
        Watch Video
      </button>
      <VideoModal isOpen={isOpen} onClose={() => setIsOpen(false)} videoUrl={videoUrl} />
    </>
  )
}
