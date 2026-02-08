import Image from 'next/image'
import { cx } from '@/lib/ui'
import { FeaturedImage } from '@/lib/graphql/types'

export function ExtendedImageAnchor({
  layoutType,
  image,
}: {
  layoutType: 'extendedleft' | 'extendedright' | 'backgroundonly'
  image: FeaturedImage
}) {
  const imgW = image?.node?.mediaDetails?.width || 800
  const imgH = image?.node?.mediaDetails?.height || 600

  // backgroundonly should not render here; guard earlier
  if (!image?.node?.mediaItemUrl) return null

  return (
    <div
      className={cx(
        'pointer-events-none absolute top-0 z-0 flex',
        layoutType === 'extendedleft' ? 'left-0 justify-start' : 'right-0 justify-end',
      )}
    >
      <Image
        src={image.node.mediaItemUrl}
        alt={image.node.altText || ''}
        width={imgW}
        height={imgH}
        className="h-auto max-h-[800px] min-h-[480px] w-auto object-cover lg:min-h-[580px] xl:min-h-[648px]"
      />
    </div>
  )
}
