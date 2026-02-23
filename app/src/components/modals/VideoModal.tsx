'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'

export interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
}

export default function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  // Close on Escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Extract YouTube video ID and create embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    // Match various YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^#&?]+)/,
      /youtube\.com\/shorts\/([^#&?]+)/,
    ]

    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?autoplay=1`
      }
    }

    // If already an embed URL or unknown format, return as-is
    return url
  }

  // Extract Vimeo video ID
  const getVimeoEmbedUrl = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/)
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}?autoplay=1`
    }
    return url
  }

  // Determine embed URL based on video platform
  let embedUrl = videoUrl
  if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
    embedUrl = getYouTubeEmbedUrl(videoUrl)
  } else if (videoUrl.includes('vimeo.com')) {
    embedUrl = getVimeoEmbedUrl(videoUrl)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div className="relative w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 text-white transition-colors hover:text-gray-300"
          aria-label="Close video"
        >
          <X size={32} strokeWidth={2} />
        </button>

        {/* Video container */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-2xl">
          <iframe
            src={embedUrl}
            title="Video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  )
}
