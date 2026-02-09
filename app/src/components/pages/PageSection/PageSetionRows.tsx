import Image from 'next/image'
import { FeaturedImage, TextImageAltSection } from '@/lib/graphql/types'
import { cx, buttonClassName } from '@/lib/ui'
import { PageSectionCollapsibleList } from './PageSectionCollapsibleList'

export function DesktopMainRow(props: {
  imageSide: 'left' | 'right'
  themeClass: string
  bgImageObjectAlignment: string
  textImageAltImageDesktop?: FeaturedImage
  textImageAltSubheading?: string
  textImageAltHeading?: string
  textImageAltBody?: string
  textImageAltButtonLabel?: string
  textImageAltButtonUrl?: string
  hasCollapsible?: boolean
  isOpen?: boolean
  buttonId?: string
  onToggle?: () => void
}) {
  const {
    imageSide,
    themeClass,
    bgImageObjectAlignment,
    textImageAltImageDesktop,
    textImageAltSubheading,
    textImageAltHeading,
    textImageAltBody,
    textImageAltButtonLabel,
    textImageAltButtonUrl,
    hasCollapsible,
    isOpen,
    buttonId,
    onToggle,
  } = props

  return (
    <div
      className={cx(
        'grid gap-20 md:grid-cols-2 md:items-stretch',
        imageSide === 'left' ? '' : 'md:[&>div:first-child]:order-2',
      )}
    >
      {/* Image column */}
      <div className="flex justify-center">
        {textImageAltImageDesktop?.node?.mediaItemUrl && (
          <div className="relative h-[360px] w-full max-w-xl lg:h-[560px] xl:h-[640px]">
            <Image
              src={textImageAltImageDesktop.node.mediaItemUrl}
              alt={textImageAltImageDesktop.node.altText || ''}
              fill
              className={cx('w-full object-contain', bgImageObjectAlignment)}
            />
          </div>
        )}
      </div>

      {/* Content column – entire block (including toggle) is centered */}
      <div className={cx('flex', themeClass)}>
        <div className="flex flex-1 items-center">
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

            {/* Toggle is part of the centered content block */}
            {hasCollapsible && buttonId && onToggle && (
              <div className="pt-2">
                <button
                  id={buttonId}
                  type="button"
                  className="text-sm font-medium text-[var(--color-theme)] uppercase underline underline-offset-4"
                  aria-expanded={!!isOpen}
                  aria-controls={`${buttonId.replace(/toggle$/, '')}panel`}
                  onClick={onToggle}
                >
                  {isOpen ? 'Read less' : 'Read more'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function DesktopCollapsibleRow(props: {
  imageSide: 'left' | 'right'
  themeClass: string
  isOpen: boolean
  panelId: string
  labelledById: string
  items?: TextImageAltSection['textImageAltCollapsibleItems']
}) {
  const { imageSide, themeClass, isOpen, panelId, labelledById, items } = props

  if (!isOpen || !items?.length) return null

  return (
    <div
      className={cx(
        '-mt-25 grid gap-20 pb-8 md:grid-cols-2 xl:-mt-40',
        imageSide === 'left' ? '' : 'md:[&>div:first-child]:order-2',
      )}
    >
      {/* Empty spacer under image column */}
      <div />

      {/* Panel under content column */}
      <div className={cx('space-y-4', themeClass)}>
        <PageSectionCollapsibleList items={items} panelId={panelId} labelledById={labelledById} />
      </div>
    </div>
  )
}
