'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { HeaderShell } from './HeaderShell'
import { MobileMenu } from '@/components/header/MobileMenu'
import { ChevronDown } from 'lucide-react'

export type NavItem = {
  cssClasses?: string | string[] | null
  id: string
  href: string
  label: string
  children: NavItem[]
}

export function HeaderClient({ items }: { items: NavItem[] }) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const panelId = 'mobile-menu-panel'

  useEffect(() => {
    if (!mobileMenuOpen) return

    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileMenuOpen])

  return (
    <HeaderShell>
      <div className="mx-auto max-w-300 px-6">
        <div
          className={[
            'flex items-center justify-between',
            'h-22.5 transition-[height] duration-200 md:h-25.5',
            'md:group-data-[shrunk=true]:h-16',
          ].join(' ')}
        >
          <Link
            href="/"
            aria-label="Dr. Howard Murad"
            className="relative block h-18 w-68.5 shrink-0 transition-[height] duration-200 md:h-20 md:group-data-[shrunk=true]:h-16"
          >
            <Image
              src="/images/dhm-logo-signature.svg"
              alt="Dr. Howard Murad"
              fill={true}
              onClick={() => setMobileMenuOpen(false)}
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="nav-menu flex items-center gap-6">
              {items.map((item) => {
                const normalizedPathname = pathname.endsWith('/') ? pathname : pathname + '/'
                const normalizedHref = item.href.endsWith('/') ? item.href : item.href + '/'
                const isActive = normalizedPathname === normalizedHref
                return (
                  <li key={item.id} className="menu-item relative">
                    <Link
                      href={item.href}
                      className={`menu-item text-menu flex items-center gap-2 font-medium tracking-wide uppercase transition-colors ${
                        isActive ? 'text-gold' : 'hover:text-gold text-white'
                      }`}
                    >
                      {item.label}
                      {item.children.length > 0 && (
                        <ChevronDown size={16} className="chevron-down transition-transform" />
                      )}
                    </Link>

                    {item.children.length > 0 && (
                      <div className="bg-medium-purple menu-item-dropdown absolute top-full left-0 mt-2 min-w-55 shadow-md">
                        <ul className="py-2">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.href}
                                className="text-body hover:text-gold block px-4 py-2 text-white uppercase transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Mobile toggle */}
          <div className="mobile-menu flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="relative inline-flex h-6 w-6 items-center justify-center text-white"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls={panelId}
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <span className="relative flex h-5 w-5 flex-col items-center justify-center">
                {/* Top bar */}
                <span
                  className={[
                    'absolute h-0.5 w-5 bg-current transition-all duration-300',
                    mobileMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5',
                  ].join(' ')}
                />
                {/* Middle bar - flattens to line */}
                <span
                  className={[
                    'absolute h-0.5 w-5 bg-current transition-all duration-300',
                    mobileMenuOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100',
                  ].join(' ')}
                />
                {/* Bottom bar */}
                <span
                  className={[
                    'absolute h-0.5 w-5 bg-current transition-all duration-300',
                    mobileMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5',
                  ].join(' ')}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={[
          'lg:hidden',
          'fixed right-0 left-0 z-40',
          'top-[102px]', // Use exact pixel value or var
          'overflow-hidden',
          'transition-all duration-300 ease-in-out',
          mobileMenuOpen ? 'h-[calc(100vh-102px)]' : 'h-0', // Animate height instead of transform
        ].join(' ')}
      >
        {/* Background overlay */}
        <div onClick={() => setMobileMenuOpen(false)} className="bg-gray-alt absolute inset-0" />

        {/* Menu content - slides down with parent */}
        <div className="relative z-10 h-full overflow-y-auto py-9">
          <MobileMenu
            items={items}
            onNavigate={() => setMobileMenuOpen(false)}
            isOpen={mobileMenuOpen}
          />
        </div>
      </div>
    </HeaderShell>
  )
}
