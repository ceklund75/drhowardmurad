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
        // className="ext-anchor-img h-[420px] w-auto max-w-[700px] min-w-[300px] object-cover lg:max-h-[560px] lg:min-h-[520px] lg:max-w-[700px] lg:min-w-[480px] xl:max-h-[720px] xl:min-h-[640px] xl:max-w-[900px] xl:min-w-[580px]"
        className="ext-anchor-img h-[420px] w-auto max-w-[700px] min-w-[300px] object-cover lg:h-[530px] lg:max-w-[760px] lg:min-w-[480px] xl:h-[600px] xl:max-w-[900px] xl:min-w-[580px] 2xl:h-[775px] 2xl:min-w-[725px]"
      />
    </div>
  )
}
