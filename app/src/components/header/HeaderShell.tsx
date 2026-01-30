'use client'

import { useState, useEffect, useRef } from 'react'
import { cx } from '@/lib/ui'

export function HeaderShell({
  children,
  className,
  shrinkAt = 10,
}: {
  children: React.ReactNode
  className?: string
  shrinkAt?: number
}) {
  const [shrunk, setShrunk] = useState(false)
  const shrunkRef = useRef(shrunk)

  // Keep ref in sync with state
  useEffect(() => {
    shrunkRef.current = shrunk
  }, [shrunk])

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY

      // Use ref to access current state without adding to dependencies
      if (shrunkRef.current) {
        // When shrunk, require scrolling BELOW threshold to expand
        if (scrollY < shrinkAt - 5) {
          setShrunk(false)
        }
      } else {
        // When expanded, require scrolling ABOVE threshold to shrink
        if (scrollY > shrinkAt + 5) {
          setShrunk(true)
        }
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [shrinkAt]) // Only shrinkAt in dependencies

  return (
    <header
      className={cx(
        'from-gradient-purple to-gradient-pink group sticky top-0 z-50 bg-linear-to-r',
        className,
      )}
      data-shrunk={shrunk ? 'true' : 'false'}
    >
      {children}
    </header>
  )
}
