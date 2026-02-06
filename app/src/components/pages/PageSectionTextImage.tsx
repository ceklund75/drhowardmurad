// components/pages/PageSectionTextImage.tsx
import Image from 'next/image'
import { TextImageAltSection } from '@/lib/graphql/types'
import { tintBgClassFromValue, themeClassFromAcf, bgImageObjectClass } from '@/lib/theme'
import { buttonClassName, cx, normalizeAlignment, resolveStringFromArray } from '@/lib/ui'
import { PageSectionCollapsibleList } from './PageSectionCollapsibleList'

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
  // Background wrapper
  return (
    <section className="page-section">
      {/* DESKTOP */}
      <div className={cx('relative hidden overflow-hidden lg:block', bgColorClass)}>
        {layoutType === 'backgroundonly' && sectionBgImage?.node?.mediaItemUrl && (
          <Image
            src={sectionBgImage.node.mediaItemUrl}
            alt={sectionBgImage.node.altText || ''}
            fill
            className={`object-cover ${bgImageObjectAlignment}`}
          />
        )}

        {layoutType !== 'backgroundonly' && textImageAltExtendedImage?.node?.mediaItemUrl && (
          <div
            className={cx(
              'pointer-events-none absolute top-0 z-0 flex',
              layoutType === 'extendedleft' ? 'left-0 justify-start' : 'right-0 justify-end',
            )}
          >
            <div className="min-h-120 min-w-120 xl:min-h-162 xl:min-w-162">
              <Image
                src={textImageAltExtendedImage.node.mediaItemUrl}
                alt={textImageAltExtendedImage.node.altText || ''}
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}

        {sectionBgHasOverlay && <div className="absolute inset-0 bg-black/30" aria-hidden="true" />}

        <div className="relative mx-auto flex py-[2%] lg:min-h-120 lg:max-w-240 xl:min-h-155 xl:max-w-300">
          <div className="flex w-full flex-col">
            {/* Row 1: image + main content */}
            <div
              className={cx(
                'grid gap-14 md:grid-cols-2 md:items-center',
                imageSide === 'left' ? '' : 'md:[&>div:first-child]:order-2',
              )}
            >
              {/* Image column */}
              <div className="flex justify-center">
                <div className="relative h-[360px] w-full max-w-xl lg:h-[440px] xl:h-[560px]">
                  {textImageAltImageDesktop?.node?.mediaItemUrl && (
                    <Image
                      src={textImageAltImageDesktop.node.mediaItemUrl}
                      alt={textImageAltImageDesktop.node.altText || ''}
                      fill
                      className={cx('w-full object-contain', bgImageObjectAlignment)}
                    />
                  )}
                </div>
              </div>

              {/* Content column (no collapsible here) */}
              <div className={cx('flex items-center', themeClass)}>
                <div className="w-full space-y-4 py-12">
                  {textImageAltSubheading && (
                    <p className="h4 tracking-wide text-[var(--color-theme)] italic">
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
                </div>
              </div>
            </div>

            {/* Row 2: aligned “Read more” + collapsible under content column */}
            {textImageAltCollapsibleItems?.length ? (
              <div
                className={cx(
                  'grid gap-14 md:grid-cols-2',
                  imageSide === 'left' ? '' : 'md:[&>div:first-child]:order-2',
                )}
              >
                {/* Empty spacer under image column */}
                <div />

                {/* Column under content: read more + collapsible */}
                <div className={cx('-mt-20 space-y-4 xl:-mt-36', themeClass)}>
                  <PageSectionCollapsibleList items={textImageAltCollapsibleItems} />
                </div>
              </div>
            ) : null}
          </div>
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
