'use client'

import { useId, useState } from 'react'
import { RawHtml } from '@/components/RawHtml'
import type { TextImageAltCollapsible } from '@/lib/graphql/types'

interface CollapsibleListProps {
  items?: TextImageAltCollapsible[]
}

export function PageSectionCollapsibleList({ items }: CollapsibleListProps) {
  if (!items || items.length === 0) return null

  const baseId = useId()

  return (
    <>
      {items.map((item, index) => (
        <CollapsibleItem
          key={`${baseId}-${index}`}
          id={`${baseId}-${index}`}
          title={item.textImageAltCollapsibleTitle}
          content={item.textImageAltCollapsibleContent}
        />
      ))}
    </>
  )
}

interface CollapsibleItemProps {
  id: string
  title?: string
  content?: string
}

function CollapsibleItem({ id, title, content }: CollapsibleItemProps) {
  const [isOpen, setIsOpen] = useState(false)
  if (!title && !content) return null

  return (
    <div>
      <button
        type="button"
        className="cursor-pointer text-(--color-theme) uppercase transition-colors hover:text-(--color-theme)/80 hover:underline"
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? 'Read Less' : 'Read More'}
      </button>

      <div id={id} hidden={!isOpen} className="mt-4">
        {content && (
          <div className="prose max-w-none text-sm md:text-base">
            {title && <span>{title}</span>}
            <RawHtml html={content} />
          </div>
        )}
      </div>
    </div>
  )
}
