'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import type { NavItem } from './HeaderClient'
import { cssClassesToMenuColorVar } from '@/lib/ui'
import { ChevronDown } from 'lucide-react'

export function MobileMenu({
  items,
  onNavigate,
  isOpen,
}: {
  items: NavItem[]
  onNavigate: () => void
  isOpen: boolean
}) {
  const baseId = useId()
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set())

  // Reset expanded menus when mobile menu closes
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen)
  if (prevIsOpen !== isOpen) {
    setPrevIsOpen(isOpen)
    if (!isOpen) {
      setOpenIds(new Set())
    }
  }

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <nav aria-label="Mobile primary">
      <ul className="nav-menu space-y-4 px-8">
        {items.map((item) => {
          const hasChildren = item.children.length > 0
          const expanded = openIds.has(item.id)
          const panelId = `${baseId}-panel-${item.id}`
          const menuColor = cssClassesToMenuColorVar(item.cssClasses)
          return (
            <li
              key={item.id}
              style={
                menuColor
                  ? ({ ['--menu-item-color']: menuColor } as React.CSSProperties)
                  : undefined
              }
            >
              <div className="flex items-center gap-2">
                <Link
                  href={item.href}
                  className="menu-link text-2xl tracking-wide uppercase transition-colors"
                  onClick={(e) => {
                    // Don't close immediately - let Next.js start navigation first
                    setTimeout(() => onNavigate(), 50)
                  }}
                >
                  {item.label}
                </Link>

                {hasChildren && (
                  <button
                    type="button"
                    aria-label={expanded ? 'Collapse submenu' : 'Expand submenu'}
                    aria-expanded={expanded}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    className="menu-toggle shrink-0 rounded px-3 py-1 transition-transform"
                  >
                    <ChevronDown
                      size={20}
                      className={
                        expanded
                          ? 'rotate-180 transition-transform duration-200'
                          : 'transition-transform duration-200'
                      }
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>

              {hasChildren && (
                <div
                  id={panelId}
                  className={[
                    'mt-3 border-l border-white/20',
                    'grid transition-[grid-template-rows] duration-300 ease-out',
                    expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                  ].join(' ')}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-3 py-1">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            className="menu-link block text-2xl font-medium uppercase transition-colors"
                            onClick={(e) => {
                              // Don't close immediately - let Next.js start navigation first
                              setTimeout(() => onNavigate(), 50)
                            }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
