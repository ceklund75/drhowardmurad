'use client'

import { RawHtml } from '@/components/RawHtml'
import type { TextImageAltCollapsible } from '@/lib/graphql/types'

interface CollapsibleListProps {
  items?: TextImageAltCollapsible[]
  panelId?: string
  labelledById?: string
}

export function PageSectionCollapsibleList({ items, panelId, labelledById }: CollapsibleListProps) {
  if (!items || items.length === 0) return null

  return (
    <div id={panelId} aria-labelledby={labelledById} className="space-y-4">
      {items.map((item, index) =>
        item.textImageAltCollapsibleContent ? (
          <RawHtml key={index} html={item.textImageAltCollapsibleContent} />
        ) : null,
      )}
    </div>
  )
}
