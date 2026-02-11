import Image from 'next/image'
import { cx, resolveObjectPosition, resolveObjectFit, type HeightConfig } from '@/lib/ui'
import { FeaturedImage } from '@/lib/graphql/types'

export function ExtendedImageAnchor({
  layoutType,
  image,
  heightConfig,
  objectPosition,
  objectFit,
}: {
  layoutType: 'extendedleft' | 'extendedright' | 'backgroundonly'
  image: FeaturedImage
  heightConfig: HeightConfig['extendedImage']
  objectPosition?: string | string[]
  objectFit?: string | string[]
}) {
  const imgW = image?.node?.mediaDetails?.width || 800
  const imgH = image?.node?.mediaDetails?.height || 600

  if (!image?.node?.mediaItemUrl) return null

  const positionValue = resolveObjectPosition(objectPosition)
  const fitValue = resolveObjectFit(objectFit)

  const normalizedPosition = Array.isArray(objectPosition) ? objectPosition[0] : objectPosition
  const getJustify = () => {
    // If objectPosition includes 'left', justify to start
    if (normalizedPosition?.includes('left')) return 'justify-start'
    // If objectPosition includes 'right', justify to end
    if (normalizedPosition?.includes('right')) return 'justify-end'
    // If objectPosition is 'center' or 'top' or 'bottom', center the image
    if (
      normalizedPosition === 'center' ||
      normalizedPosition === 'top' ||
      normalizedPosition === 'bottom'
    ) {
      return 'justify-center'
    }
    // Default: respect layoutType
    return layoutType === 'extendedleft' ? 'justify-start' : 'justify-end'
  }

  return (
    <div
      className={cx(
        'pointer-events-none absolute top-0 z-0 flex',
        // Width constraint on parent
        'w-full lg:w-[50vw]',
        // Position based on layout type
        layoutType === 'extendedleft' && 'left-0',
        layoutType === 'extendedright' && 'right-0',
        // Justify based on objectPosition or default to layoutType
        getJustify(),
      )}
    >
      <Image
        src={image.node.mediaItemUrl}
        alt={image.node.altText || ''}
        width={imgW}
        height={imgH}
        className={cx(
          // Base and small screens
          'w-auto max-w-[500px] min-w-[300px]',
          // Large screens - can grow within 50vw parent
          'lg:max-w-full lg:min-w-[380px]',
          // XL screens
          'xl:max-w-full xl:min-w-[480px]',
          // 2XL screens
          '2xl:max-w-full 2xl:min-w-[580px]',
          // Heights from config
          heightConfig.base,
          heightConfig.lg,
          heightConfig.xl,
          heightConfig['2xl'],
        )}
        style={{
          objectFit: fitValue,
          objectPosition: positionValue,
        }}
        priority
      />
    </div>
  )
}
