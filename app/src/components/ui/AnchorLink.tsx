'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AnchorLinkProps {
  href: string // Should start with #
  children: React.ReactNode
  className?: string
  offset?: number // Offset in pixels for fixed headers
}

export function AnchorLink({ href, children, className, offset = 0 }: AnchorLinkProps) {
  const pathname = usePathname()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle if it's a hash link on the same page
    if (!href.startsWith('#')) return

    e.preventDefault()
    const targetId = href.slice(1)
    const element = document.getElementById(targetId)

    if (element) {
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })

      // Update URL hash without triggering scroll
      window.history.pushState(null, '', href)
    }
  }

  return (
    <Link href={`${pathname}${href}`} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}
