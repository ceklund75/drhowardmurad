'use client'

import { useId, useState } from 'react'
import { RawHtml } from '@/components/RawHtml'

interface ExpandedContentProps {
  html?: string | null
}

export function ExpandedContent({ html }: ExpandedContentProps) {
  if (!html) return null

  const [isOpen, setIsOpen] = useState(false)
  const regionId = useId()

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

      <div id={regionId} hidden={!isOpen} className="mt-4">
        <div className="prose prose-lg max-w-none">
          <RawHtml html={html} />
        </div>
      </div>
    </section>
  )
}
