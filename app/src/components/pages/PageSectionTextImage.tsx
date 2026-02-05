// components/pages/PageSectionTextImage.tsx
import clsx from 'clsx'
import { TextImageAltSection } from '@/lib/graphql/types'
import { themeClassFromPageColor } from '@/lib/theme'
import Image from 'next/image'
import { buttonClassName } from '@/lib/ui'

interface PageSectionTextImageProps {
  section: TextImageAltSection
  index: number
}

function resolveBgColor(raw?: string[] | string): string | undefined {
  if (!raw) return undefined
  return Array.isArray(raw) ? raw[0] : raw
}

export function PageSectionTextImage({ section, index }: PageSectionTextImageProps) {
  const {
    sectionBgColor,
    sectionBgImage,
    sectionBgHasOverlay,
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
  const bgColorClass = resolveBgColor(section.sectionBgColor)
  const themeClass = themeClassFromPageColor(section.textImageAltThemeColor)

  if (index === 0) {
    console.log('HOME ALT SECTION 0:', {
      layoutType: section.textImageAltLayoutType,
      align: section.textImageAltContentAlignment,
      autoAlt: section.textImageAltAutoAlternate,
    })
  }

  // Background wrapper
  return (
    <section className="page-section">
      {/* DESKTOP */}
      <div className={clsx('relative hidden lg:block', bgColorClass)}>
        {sectionBgImage?.node?.mediaItemUrl && (
          <Image
            src={sectionBgImage.node.mediaItemUrl}
            alt={sectionBgImage.node.altText || ''}
            fill
            className="object-cover"
          />
        )}

        {sectionBgHasOverlay && <div className="absolute inset-0 bg-black/30" aria-hidden="true" />}

        <div className="relative mx-auto max-w-300 px-4 py-16 md:py-36">
          <div
            className={`flex flex-col gap-14 md:grid md:grid-cols-2 md:items-center ${
              imageSide === 'left' ? '' : 'md:[&>div:first-child]:order-2'
            }`}
          >
            {/* Image column */}
            <div className="flex justify-center">
              {textImageAltImageDesktop?.node?.mediaItemUrl && (
                <div className="relative h-64 w-full max-w-md">
                  <Image
                    src={textImageAltImageDesktop.node.mediaItemUrl}
                    alt={textImageAltImageDesktop.node.altText || ''}
                    fill
                    className="object-cover object-bottom"
                  />
                </div>
              )}
            </div>

            {/* Content column */}
            <div className={themeClass}>
              {textImageAltSubheading && (
                <p className="mb-2 text-sm tracking-wide text-[var(--color-theme)] uppercase">
                  {textImageAltSubheading}
                </p>
              )}
              {textImageAltHeading && (
                <h3 className="mb-4 text-3xl font-light text-balance text-[var(--color-theme)] md:text-[34px]">
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
                  {/* You can re-use your existing collapsible component or build a simple one */}
                  {/* For now, you can leave this unimplemented or as a basic list */}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className={clsx('mobile-card relative lg:hidden', bgColorClass)}>
        {textImageAltImageMobile?.node?.mediaItemUrl && (
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
            <p className="mb-1 text-sm tracking-wide text-[var(--color-theme)] uppercase">
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
              {/* You can re-use your existing collapsible component or build a simple one */}
              {/* For now, you can leave this unimplemented or as a basic list */}
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

function normalizeAlignment(raw?: string[] | 'left' | 'right'): 'left' | 'right' | undefined {
  if (!raw) return undefined
  if (Array.isArray(raw)) return raw[0] as 'left' | 'right'
  return raw
}
