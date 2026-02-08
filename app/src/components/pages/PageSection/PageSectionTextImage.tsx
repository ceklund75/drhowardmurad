'use client'
import { useId, useState } from 'react'
import Image from 'next/image'
import { TextImageAltSection } from '@/lib/graphql/types'
import { tintBgClassFromValue, themeClassFromAcf, bgImageObjectClass } from '@/lib/theme'
import { buttonClassName, cx, normalizeAlignment, resolveStringFromArray } from '@/lib/ui'
import { PageSectionCollapsibleList } from './PageSectionCollapsibleList'
import { ExtendedImageAnchor } from './ExtendedImageAnchor'
import { DesktopMainRow, DesktopCollapsibleRow } from './PageSetionRows'

interface PageSectionTextImageProps {
  section: TextImageAltSection
  index: number
}

export function PageSectionTextImage({ section, index }: PageSectionTextImageProps) {
  const {
    sectionBgColor,
    sectionBgImage,
    sectionBgHasOverlay,
    textImageAltLayoutType,
    textImageAltExtendedImage,
    textImageAltImageDesktop,
    textImageAltImageMobile,
    textImageAltHideImageMobile,
    textImageAltSubheading,
    textImageAltHeading,
    textImageAltBody,
    textImageAltButtonLabel,
    textImageAltButtonUrl,
    textImageAltCollapsibleItems,
    textImageAltThemeColor,
  } = section

  const imageSide = resolveImagePosition(section, index)
  const bgColorClass = tintBgClassFromValue(sectionBgColor)
  const themeClass = themeClassFromAcf(textImageAltThemeColor)
  const bgImageObjectAlignment = bgImageObjectClass(imageSide)
  const layoutType = resolveLayoutType(section)

  const imgW = textImageAltExtendedImage?.node?.mediaDetails?.width || 800
  const imgH = textImageAltExtendedImage?.node?.mediaDetails?.height || 600

  const [isOpen, setIsOpen] = useState(false)
  const baseId = useId()
  const buttonId = `${baseId}-toggle`
  const panelId = `${baseId}-panel`

  const hasCollapsible = !!textImageAltCollapsibleItems?.length

  // Background wrapper
  return (
    <section className="page-section">
      {/* DESKTOP */}

      <div className={cx('relative hidden overflow-hidden lg:block', bgColorClass)}>
        {/* Background image */}
        {layoutType === 'backgroundonly' && sectionBgImage?.node?.mediaItemUrl && (
          <Image
            src={sectionBgImage.node.mediaItemUrl}
            alt={sectionBgImage.node.altText || ''}
            fill
            className={cx('object-cover', bgImageObjectAlignment)}
          />
        )}

        {/* Extended image */}
        {layoutType !== 'backgroundonly' && textImageAltExtendedImage?.node?.mediaItemUrl && (
          <ExtendedImageAnchor layoutType={layoutType} image={textImageAltExtendedImage} />
        )}

        {sectionBgHasOverlay && <div className="absolute inset-0 bg-black/30" aria-hidden="true" />}

        <div className="relative mx-auto lg:max-w-240 xl:max-w-300">
          {/* Row 1: centered in a flex frame */}
          <div className="flex items-center py-2 lg:min-h-[560px] xl:min-h-[640px]">
            <div className="w-full">
              <DesktopMainRow
                imageSide={imageSide}
                themeClass={themeClass}
                bgImageObjectAlignment={bgImageObjectAlignment}
                textImageAltImageDesktop={textImageAltImageDesktop}
                textImageAltSubheading={textImageAltSubheading}
                textImageAltHeading={textImageAltHeading}
                textImageAltBody={textImageAltBody}
                textImageAltButtonLabel={textImageAltButtonLabel}
                textImageAltButtonUrl={textImageAltButtonUrl}
                hasCollapsible={hasCollapsible}
                isOpen={isOpen}
                buttonId={buttonId}
                onToggle={() => setIsOpen((prev) => !prev)}
              />
            </div>
          </div>

          {/* Row 2: collapsible below, NOT inside items-center flex */}
          {hasCollapsible && (
            <DesktopCollapsibleRow
              imageSide={imageSide}
              themeClass={themeClass}
              isOpen={isOpen}
              panelId={panelId}
              labelledById={buttonId}
              items={textImageAltCollapsibleItems}
            />
          )}
        </div>
      </div>

      {/* MOBILE */}
      <div className={cx('mobile-card relative lg:hidden', bgColorClass)}>
        {textImageAltImageMobile?.node?.mediaItemUrl && !textImageAltHideImageMobile && (
          <div className="relative block w-full overflow-hidden">
            <Image
              src={textImageAltImageMobile.node.mediaItemUrl}
              alt={textImageAltImageMobile.node.altText || ''}
              width={textImageAltImageMobile.node.mediaDetails?.width || 1200}
              height={textImageAltImageMobile.node.mediaDetails?.height || 800}
              className="h-auto w-full object-cover object-center"
              sizes="100vw"
            />
          </div>
        )}
        <div className={`mt-6 ${themeClass}`}>
          {textImageAltSubheading && (
            <p className="h4 mb-1 tracking-wide text-[var(--color-theme)] italic">
              {textImageAltSubheading}
            </p>
          )}
          {textImageAltHeading && (
            <h3 className="text-[34px] leading-tight font-light text-balance text-[var(--color-theme)]">
              {textImageAltHeading}
            </h3>
          )}
          {textImageAltBody && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: textImageAltBody }}
            />
          )}

          {textImageAltButtonLabel && textImageAltButtonUrl && (
            <div className="mt-6">
              <a href={textImageAltButtonUrl} className={buttonClassName('button-theme')}>
                {textImageAltButtonLabel}
              </a>
            </div>
          )}

          {textImageAltCollapsibleItems?.length ? (
            <div className="mt-6 space-y-4">
              <PageSectionCollapsibleList items={textImageAltCollapsibleItems} />
            </div>
          ) : null}
        </div>
      </div>
    </section>
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
