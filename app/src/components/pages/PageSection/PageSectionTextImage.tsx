'use client'
import { useId, useState, useEffect, useRef } from 'react'
import Image from 'next/image'

import { TextImageAltSection } from '@/lib/graphql/types'
import { tintBgClassFromValue, themeClassFromAcf, bgImageObjectClass } from '@/lib/theme'
import {
  buttonClassName,
  cx,
  normalizeAlignment,
  resolveHeightConfig,
  resolveStringFromArray,
} from '@/lib/ui'
import { PageSectionCollapsibleList } from './PageSectionCollapsibleList'
import { ExtendedImageAnchor } from './ExtendedImageAnchor'
import { DesktopMainRow, DesktopCollapsibleRow } from './PageSetionRows'
import { SectionButton } from './SectionButton'

interface PageSectionTextImageProps {
  section: TextImageAltSection
  index: number
}

export function PageSectionTextImage({ section, index }: PageSectionTextImageProps) {
  const {
    sectionBgColor,
    sectionBgImage,
    sectionBgHasOverlay,
    textImageAltExtendedImage,
    textImageAltImageDesktop,
    textImageAltImageMobile,
    textImageAltHideImageMobile,
    textImageAltSubheading,
    textImageAltHeading,
    textImageAltBody,
    textImageAltButton,
    textImageAltCollapsibleItems,
    textImageAltThemeColor,
    textImageAltImageHeightPreset,
    textImageAltImageObjectPosition,
    textImageAltImageObjectFit,
  } = section

  const imageSide = resolveImagePosition(section, index)
  const bgColorClass = tintBgClassFromValue(sectionBgColor)
  const themeClass = themeClassFromAcf(textImageAltThemeColor)
  const bgImageObjectAlignment = bgImageObjectClass(imageSide)
  const layoutType = resolveLayoutType(section)

  // NEW: Resolve height configuration
  const heightConfig = resolveHeightConfig(textImageAltImageHeightPreset)

  const [isOpen, setIsOpen] = useState(false)
  const baseId = useId()
  const buttonId = `${baseId}-toggle`
  const panelId = `${baseId}-panel`
  const hasCollapsible = !!textImageAltCollapsibleItems?.length
  const [isMounted, setIsMounted] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const collapsibleDesktopRef = useRef<HTMLDivElement>(null)

  // Calculate spacing only after mount to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted || !toggleRef.current || !collapsibleDesktopRef.current) return
    if (window.innerWidth < 1024) return

    const toggleRect = toggleRef.current.getBoundingClientRect()
    const collapsibleRect = collapsibleDesktopRef.current.getBoundingClientRect()

    // Calculate how much to pull up the collapsible to be near toggle
    const desiredSpacing = 16 // 32px below toggle button
    const currentGap = collapsibleRect.top - toggleRect.bottom
    const adjustment = currentGap - desiredSpacing

    if (adjustment > 0) {
      collapsibleDesktopRef.current.style.transform = `translateY(-${adjustment}px)`
    }
  }, [isMounted])

  // Background wrapper
  return (
    <>
      <section
        className={cx('relative hidden overflow-hidden lg:block', bgColorClass)}
        id={section.sectionAnchorId || undefined}
      >
        <div className="relative hidden lg:block">
          {/* Background image*/}
          {layoutType === 'backgroundonly' && sectionBgImage?.node?.mediaItemUrl && (
            <Image
              src={sectionBgImage.node.mediaItemUrl}
              alt={sectionBgImage.node.altText || ''}
              fill
              className={cx('object-cover', bgImageObjectAlignment)}
            />
          )}

          {/* Extended image*/}
          {layoutType !== 'backgroundonly' && textImageAltExtendedImage?.node?.mediaItemUrl && (
            <ExtendedImageAnchor
              layoutType={layoutType}
              image={textImageAltExtendedImage}
              heightConfig={heightConfig.extendedImage}
              objectPosition={textImageAltImageObjectPosition}
              objectFit={textImageAltImageObjectFit}
            />
          )}

          {sectionBgHasOverlay && <div className="absolute inset-0 bg-white/50" />}

          <div className="relative mx-auto lg:max-w-240 xl:max-w-300">
            {/* Main row */}
            <DesktopMainRow
              imageSide={imageSide}
              themeClass={themeClass}
              bgImageObjectAlignment={bgImageObjectAlignment}
              textImageAltImageDesktop={textImageAltImageDesktop}
              textImageAltSubheading={textImageAltSubheading}
              textImageAltHeading={textImageAltHeading}
              textImageAltBody={textImageAltBody}
              textImageAltButton={textImageAltButton}
              hasCollapsible={hasCollapsible}
              isOpen={isOpen}
              buttonId={buttonId}
              panelId={panelId}
              onToggle={() => setIsOpen((prev) => !prev)}
              toggleRef={toggleRef}
              heightConfig={heightConfig.mainRow}
              objectPosition={textImageAltImageObjectPosition}
              objectFit={textImageAltImageObjectFit}
            />

            {/* Collapsible row*/}
            {hasCollapsible && (
              <div ref={collapsibleDesktopRef} className={!isOpen ? 'hidden lg:block' : ''}>
                <DesktopCollapsibleRow
                  imageSide={imageSide}
                  themeClass={themeClass}
                  isOpen={isOpen}
                  panelId={panelId}
                  labelledById={buttonId}
                  items={textImageAltCollapsibleItems}
                />
              </div>
            )}
          </div>
        </div>
      </section>
      <section
        className={cx('mobile-card overflow-hiddenlg:hidden relative', bgColorClass)}
        id={section.sectionAnchorId || undefined}
      >
        {/* MOBILE */}
        <div className={cx('relatives space-y-6')}>
          {textImageAltImageMobile?.node?.mediaItemUrl && !textImageAltHideImageMobile && (
            <div className="relative w-full">
              <Image
                src={textImageAltImageMobile.node.mediaItemUrl}
                alt={textImageAltImageMobile.node.altText || ''}
                width={textImageAltImageMobile.node.mediaDetails?.width || 800}
                height={textImageAltImageMobile.node.mediaDetails?.height || 600}
                className="h-auto w-full"
                sizes="100vw"
              />
            </div>
          )}

          <div className={themeClass}>
            {textImageAltSubheading && (
              <p className="h4 mb-3 tracking-wide text-[var(--color-theme)] italic">
                {textImageAltSubheading}
              </p>
            )}

            {textImageAltHeading && (
              <h3 className="mb-4 font-light text-balance text-[var(--color-theme)]">
                {textImageAltHeading}
              </h3>
            )}

            {textImageAltBody && (
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: textImageAltBody }}
              />
            )}

            {hasCollapsible && textImageAltCollapsibleItems?.length && (
              <div className="mt-4">
                <button
                  id={`${buttonId}-mobile`}
                  type="button"
                  className="cursor-pointer text-sm font-medium text-[var(--color-theme)] uppercase underline underline-offset-4"
                  aria-expanded={!!isOpen}
                  aria-controls={`${panelId}-mobile`}
                  onClick={() => setIsOpen((prev) => !prev)}
                >
                  {isOpen ? 'Read less' : 'Read more'}
                </button>

                {isOpen && (
                  <div className="mt-4 space-y-4">
                    <PageSectionCollapsibleList
                      items={textImageAltCollapsibleItems}
                      panelId={`${panelId}-mobile`}
                      labelledById={`${buttonId}-mobile`}
                    />
                  </div>
                )}
              </div>
            )}

            {textImageAltButton && (
              <div className="mt-6 mb-1.5">
                <SectionButton
                  button={textImageAltButton}
                  className={buttonClassName('button-theme')}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function resolveImagePosition(section: TextImageAltSection, index: number): 'left' | 'right' {
  const alignment = normalizeAlignment(section.textImageAltContentAlignment)

  // alignment is content alignment, NOT image alignment
  if (alignment === 'left') {
    return 'right' // content left → image right
  }

  if (alignment === 'right') {
    return 'left' // content right → image left
  }

  if (section.textImageAltAutoAlternate) {
    // for Home: first section content right, image left
    return index % 2 === 0 ? 'left' : 'right'
  }

  // default: content left, image right
  return 'right'
}

function resolveLayoutType(
  section: TextImageAltSection,
): 'backgroundonly' | 'extendedleft' | 'extendedright' {
  const layoutType = resolveStringFromArray(section.textImageAltLayoutType)

  if (layoutType === 'backgroundonly') {
    return 'backgroundonly'
  }

  if (layoutType === 'extendedleft') {
    return 'extendedleft'
  }

  if (layoutType === 'extendedright') {
    return 'extendedright'
  }

  return 'backgroundonly'
}
