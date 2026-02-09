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
  panelId?: string
  onToggle?: () => void
  toggleRef?: React.RefObject<HTMLButtonElement | null>
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
    panelId,
    onToggle,
    toggleRef,
  } = props

  return (
    <div
      className={cx(
        'grid gap-14',
        'lg:grid-cols-2 lg:items-center', // Two columns + vertical centering
        'lg:min-h-[600px] xl:min-h-[680px]', // Min heights matching image heights
        imageSide === 'left' ? '' : 'lg:[&>div:first-child]:order-2',
      )}
    >
      {/* Image column */}
      <div className="flex justify-center">
        {textImageAltImageDesktop?.node?.mediaItemUrl && (
          <div className="relative h-[360px] w-full max-w-xl lg:min-h-[600px] xl:min-h-[680px]">
            <Image
              src={textImageAltImageDesktop.node.mediaItemUrl}
              alt={textImageAltImageDesktop.node.altText || ''}
              fill
              className={cx('w-full object-contain', bgImageObjectAlignment)}
            />
          </div>
        )}
      </div>

      {/* Content column */}
      <div
        className={cx(
          'flex flex-col justify-center', // Centers content vertically
          'lg:h-[600px] xl:h-[680px]', // Fixed height matching image
          themeClass,
        )}
      >
        <div className="space-y-4 py-12">
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

          {hasCollapsible && buttonId && onToggle && (
            <div className="pt-2">
              <button
                id={buttonId}
                ref={toggleRef}
                type="button"
                className="cursor-pointer text-sm font-medium text-[var(--color-theme)] uppercase underline underline-offset-4"
                aria-expanded={!!isOpen}
                aria-controls={panelId}
                onClick={onToggle}
              >
                {isOpen ? 'Read less' : 'Read more'}
              </button>
            </div>
          )}
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
        'grid gap-14 lg:mt-8',
        'lg:grid-cols-2',
        imageSide === 'left' ? '' : 'lg:[&>div:first-child]:order-2',
      )}
    >
      <div className="hidden lg:block" /> {/* spacer under image column */}
      <div className={cx('space-y-3', themeClass)}>
        <PageSectionCollapsibleList items={items} panelId={panelId} labelledById={labelledById} />
      </div>
    </div>
  )
}
