import Image from 'next/image'
import { FeaturedImage, TextImageAltSection } from '@/lib/graphql/types'
import {
  cx,
  buttonClassName,
  type HeightConfig,
  resolveObjectFit,
  resolveObjectPosition,
} from '@/lib/ui'
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
  heightConfig: HeightConfig['mainRow']
  objectPosition?: string | string[]
  objectFit?: string | string[]
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
    heightConfig,
    objectPosition,
    objectFit,
  } = props

  const positionValue = resolveObjectPosition(objectPosition)
  const fitValue = resolveObjectFit(objectFit)
  return (
    <div
      className={cx(
        'grid gap-14',
        'lg:grid-cols-2 lg:items-center',
        heightConfig.minHeight.lg,
        heightConfig.minHeight.xl,
        imageSide === 'right' ? 'lg:[&>div:first-child]:order-2' : '',
      )}
    >
      {/* Image column - ALWAYS RENDER THE DIV */}
      <div className="flex justify-center">
        {textImageAltImageDesktop?.node?.mediaItemUrl && (
          <div
            className={cx(
              'relative w-full max-w-xl',
              heightConfig.imageHeight.base,
              heightConfig.imageHeight.lg,
              heightConfig.imageHeight.xl,
            )}
          >
            <Image
              src={textImageAltImageDesktop.node.mediaItemUrl}
              alt={textImageAltImageDesktop.node.altText || ''}
              fill
              className={cx('w-full object-contain')}
              style={{
                objectFit: fitValue,
                objectPosition: positionValue,
              }}
            />
          </div>
        )}
      </div>

      {/* Content column */}
      <div
        className={cx(
          'relative flex flex-col justify-center py-12',
          heightConfig.contentHeight.lg,
          heightConfig.contentHeight.xl,
          themeClass,
        )}
      >
        <div className="space-y-4">
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

// DesktopCollapsibleRow remains unchanged
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
        imageSide === 'right' ? 'lg:[&>div:first-child]:order-2' : '',
      )}
    >
      {/* spacer under image column */}
      <div className="hidden lg:block" />

      <div className={cx('space-y-3', themeClass)}>
        <PageSectionCollapsibleList items={items} panelId={panelId} labelledById={labelledById} />
      </div>
    </div>
  )
}
