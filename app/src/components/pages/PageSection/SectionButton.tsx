'use client'

import Link from 'next/link'
import { useState } from 'react'
import { TextImageAltButton } from '@/lib/graphql/types'
import { buttonClassName, normalizeAcfSelect } from '@/lib/ui'

//import { VideoModal } from '@/components/modals/VideoModal'
import dynamic from 'next/dynamic'
import type { VideoModalProps } from '@/components/modals/VideoModal'

// load only on the client, and only when this component is rendered
const VideoModal = dynamic<VideoModalProps>(() => import('@/components/modals/VideoModal'), {
  ssr: false,
})

interface SectionButtonProps {
  button: TextImageAltButton
  className?: string
}

export function SectionButton({ button, className }: SectionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!button?.buttonLabel) return null

  const { buttonLabel, buttonLink, buttonModal } = button
  const buttonType = normalizeAcfSelect(button.buttonType)

  // Link button (internal or external)
  if (buttonType === 'link' && buttonLink) {
    const linkType = normalizeAcfSelect(buttonLink.linkType)
    const isInternal = linkType === 'internal'
    const internalLnkNode = isInternal ? buttonLink.internalLink?.nodes?.[0] : null

    // Internal link - get first node from connection
    if (isInternal && internalLnkNode) {
      if (internalLnkNode.__typename === 'MediaItem') {
        return (
          <Link
            href={internalLnkNode.mediaItemUrl}
            className={className || buttonClassName('button-theme')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {buttonLabel}
          </Link>
        )
      }

      if (
        (internalLnkNode.__typename === 'Page' || internalLnkNode.__typename === 'Post') &&
        internalLnkNode.uri
      ) {
        return (
          <Link href={internalLnkNode.uri} className={className || buttonClassName('button-theme')}>
            {buttonLabel}
          </Link>
        )
      }
    }

    // External link
    if (!isInternal && buttonLink.externalUrl) {
      const target = normalizeAcfSelect(buttonLink.externalTarget) || '_self'

      return (
        <a
          href={buttonLink.externalUrl}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className={className || buttonClassName('button-theme')}
        >
          {buttonLabel}
        </a>
      )
    }

    // Missing link configuration
    if (isInternal && !buttonLink.internalLink?.nodes?.[0]) {
      console.warn(`Button "${buttonLabel}" is set to internal but has no page selected`)
      return null
    }
  }

  // Modal button
  if (buttonType === 'modal' && buttonModal) {
    const modalType = normalizeAcfSelect(buttonModal.modalType)

    return (
      <>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className={className || buttonClassName('button-theme')}
        >
          {buttonLabel}
        </button>

        {modalType === 'video' && buttonModal.modalContent && (
          <VideoModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            videoUrl={buttonModal.modalContent}
          />
        )}
      </>
    )
  }

  return null
}
