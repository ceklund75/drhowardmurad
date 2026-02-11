'use client'

import { useState, useEffect } from 'react'
import { AnchorLink } from './AnchorLink'

interface BackToTopButtonProps {
  showAfterScroll?: number // Show button after scrolling X pixels
  className?: string
}

export function BackToTopButton({ showAfterScroll = 300, className }: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > showAfterScroll)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [showAfterScroll])

  if (!isVisible) return null

  return (
    <AnchorLink
      href="#top"
      className={
        className ||
        'bg-back-to-top hover:bg-light-4 fixed right-8 bottom-8 z-50 p-4 text-white shadow-lg transition-opacity'
      }
    >
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
      <span className="sr-only">Back to top</span>
    </AnchorLink>
  )
}
