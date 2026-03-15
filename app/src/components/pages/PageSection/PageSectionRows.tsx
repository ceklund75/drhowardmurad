import Image from 'next/image'
import { FeaturedImage, TextImageAltSection, TextImageAltButton } from '@/lib/graphql/types'
import {
  cx,
  buttonClassName,
  type HeightConfig,
  resolveObjectFit,
  resolveObjectPosition,
} from '@/lib/ui'
import { PageSectionCollapsibleList } from './PageSectionCollapsibleList'
import { SectionButton } from './SectionButton'
import { AsyncImage } from '@/components/AsyncImage'

export function DesktopMainRow(props: {
  imageSide: 'left' | 'right'
  themeClass: string
  bgImageObjectAlignment: string
  textImageAltImageDesktop?: FeaturedImage
  textImageAltSubheading?: string
  textImageAltHeading?: string
  textImageAltBody?: string
  textImageAltButton?: TextImageAltButton
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
    textImageAltButton,
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
            <AsyncImage
              src={textImageAltImageDesktop.node.mediaItemUrl}
              alt={textImageAltImageDesktop.node.altText || ''}
              fill
              className={cx('w-full object-contain')}
              style={{
                objectFit: fitValue,
                objectPosition: positionValue,
              }}
              quality={75}
              sizes="(max-width: 640px) 100vw, 600px"
            />
          </div>
        )}
      </div>

      {/* Content column */}
      <div
        className={cx(
          'relative flex flex-col justify-center py-[15%]',
          imageSide === 'right' ? 'pr-6' : 'pl-6',
          heightConfig.contentHeight.lg,
          heightConfig.contentHeight.xl,
          themeClass,
        )}
      >
        <div className="space-y-4">
          {textImageAltSubheading && (
            <p className="h4 tracking-wide text-(--color-theme) italic">{textImageAltSubheading}</p>
          )}

          {textImageAltHeading && (
            <h3 className="mb-4 text-3xl font-light text-balance text-(--color-theme) md:text-[34px]">
              {textImageAltHeading}
            </h3>
          )}

          {textImageAltBody && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: textImageAltBody }}
            />
          )}

          {textImageAltButton && textImageAltButton?.buttonLabel && (
            <div className="section-button mt-6">
              <SectionButton
                button={textImageAltButton}
                className={buttonClassName('button-theme')}
              />
            </div>
          )}

          {hasCollapsible && buttonId && onToggle && (
            <div className="pt-2">
              <button
                id={buttonId}
                ref={toggleRef}
                type="button"
                className={cx(
                  'cursor-pointer text-sm font-medium text-(--color-theme) uppercase underline underline-offset-4',
                )}
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

  if (!items?.length) return null

  return (
    <div className={`collapsible-grid ${isOpen ? 'is-open' : ''}`}>
      <div className="min-h-0">
        <div
          className={cx(
            'grid gap-14 lg:mt-8',
            'lg:grid-cols-2',
            imageSide === 'right' ? 'lg:[&>div:first-child]:order-2' : '',
          )}
        >
          {/* spacer under image column */}
          <div className="hidden lg:block" />

          <div
            id={panelId}
            aria-labelledby={labelledById}
            className={cx('space-y-3', themeClass, imageSide === 'right' ? 'pr-6' : 'pl-6')}
          >
            <PageSectionCollapsibleList
              items={items}
              panelId={panelId}
              labelledById={labelledById}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
