'use client'

import { useId, useState } from 'react'
import { RawHtml } from '@/components/RawHtml'

interface ExpandedContentProps {
  html?: string | null
}

export function ExpandedContent({ html }: ExpandedContentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const regionId = useId()

  if (!html) return null

  return (
    <section className="mb-6">
      <button
        type="button"
        className="cursor-pointer text-(--color-theme) uppercase transition-colors hover:text-(--color-theme)/80 hover:underline"
        aria-expanded={isOpen}
        aria-controls={regionId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? 'Read Less' : 'Read More'}
      </button>

      <div className={`collapsible-grid ${isOpen ? 'is-open' : ''}`}>
        <div id={regionId} className="min-h-0">
          <div className="prose prose-lg mt-4 max-w-none">
            <RawHtml html={html} />
          </div>
        </div>
      </div>
    </section>
  )
}
