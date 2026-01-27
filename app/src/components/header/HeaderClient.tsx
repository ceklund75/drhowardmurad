'use client'

import { useEffect, useId, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeaderShell } from './HeaderShell'
import { MobileMenu } from '@/components/header/MobileMenu'
import { ChevronDown, Menu, X } from 'lucide-react'

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
  const panelId = useId()

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
            'h-25.5 transition-[height] duration-200',
            'group-data-[shrunk=true]:h-16',
          ].join(' ')}
        >
          <Link href="/" aria-label="Dr. Howard Murad" className="block w-68.5 shrink-0">
            <img
              src="/images/dhm-logo-signature.svg"
              alt="Dr. Howard Murad"
              className="h-21 w-auto transition-[height] duration-200 group-data-[shrunk=true]:h-16"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-6">
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
          <div className="flex items-center gap-4 md:hidden">
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls={panelId}
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="inline-flex items-center justify-center text-white"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
        className={[
          'md:hidden',
          'fixed right-0 left-0 z-40',
          'top-25.5',
          'h-[calc(100vh-102px)]',
          'bg-black/40 backdrop-blur-sm',
          'transition-opacity duration-300 ease-out',
          mobileMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
      />
      <div
        id={panelId}
        aria-hidden={!mobileMenuOpen}
        className={[
          'md:hidden',
          'fixed right-0 left-0 z-50',
          'top-25.5',
          'h-[calc(100vh-102px)]',
          'bg-gray-alt',
          'shadow-[0_-12px_24px_rgba(0,0,0,0.35)]',
          'overflow-auto',
          'py-9',
          'transition-opacity duration-300 ease-out',
          'motion-reduce:transition-none',
          mobileMenuOpen
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-3 opacity-0',
        ].join(' ')}
      >
        <MobileMenu items={items} onNavigate={() => setMobileMenuOpen(false)} />
      </div>
    </HeaderShell>
  )
}
