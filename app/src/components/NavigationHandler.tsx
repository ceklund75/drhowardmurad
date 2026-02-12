'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function NavigationHandler() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if there's a hash (anchor link)
    const hash = window.location.hash

    if (hash) {
      // Scroll to anchor
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      // Scroll to top for regular navigation
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, searchParams])

  return null
}
