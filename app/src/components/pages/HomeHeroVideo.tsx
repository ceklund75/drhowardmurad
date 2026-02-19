import { PageHeroACF } from '@/lib/graphql/types'
import Image from 'next/image'

interface HomeHeroVideoProps {
  hero: PageHeroACF
}

export function HomeHeroVideo({ hero }: HomeHeroVideoProps) {
  const {
    heroSubheading,
    heroHeading,
    heroVideoUrl,
    heroFallbackImage,
    heroMobileImage,
    heroRightImage,
  } = hero

  return (
    <section className="relative min-h-90 overflow-hidden md:min-h-[520px] lg:min-h-[640px] xl:min-h-[800px]">
      {/* background video / images with absolute inset-0 */}
      {heroVideoUrl && (
        <video
          className="fade-in fade-1200 absolute inset-0 hidden h-full w-full object-cover md:block"
          src={heroVideoUrl}
          autoPlay
          muted
          loop={false}
          playsInline
        />
      )}
      {!heroVideoUrl && heroFallbackImage?.node?.mediaItemUrl && (
        <Image
          src={heroFallbackImage.node.mediaItemUrl}
          alt={heroFallbackImage.node.altText || ''}
          fill
          className="object-contain"
        />
      )}

      {/* Light overlay */}
      <div className="absolute inset-0 hidden bg-white/10 md:block" />

      {/* Foreground layout – no h-full dependency on parents */}
      <div className="relative z-10 hidden min-h-90 md:flex md:min-h-[520px] lg:min-h-[640px] xl:min-h-[800px]">
        <div className="mx-auto flex w-full max-w-7xl px-6">
          {/* Left: text */}
          <div className="flex w-7/12 items-center">
            <div className="space-y-3">
              {heroSubheading && (
                <h4 className="fade-in fade-600 text-medium-purple text-[clamp(1.125rem,1.4vw+0.8rem,2.75rem)] leading-none delay-600">
                  {heroSubheading}
                </h4>
              )}
              {heroHeading && (
                <h1 className="fade-in fade-1200 text-blue-heading text-[clamp(2.25rem,4vw+1rem,5.5rem)] leading-none text-balance delay-1200">
                  {heroHeading}
                </h1>
              )}
            </div>
          </div>

          {/* Right: doctor image */}
          <div className="flex w-5/12 items-end justify-end">
            {heroRightImage?.node?.mediaItemUrl && (
              <div className="translate-x-2 md:translate-x-6 lg:translate-x-10">
                <div className="fade-in fade-600 relative h-90 w-66.5 md:h-120 md:w-88.75 lg:h-160 lg:w-118 xl:h-193.75 xl:w-144.25">
                  <Image
                    src={heroRightImage.node.mediaItemUrl}
                    alt={heroRightImage.node.altText || ''}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile layout: stacked, centered */}
      <div className="flex w-full flex-col items-center justify-center gap-4 bg-white py-2 md:hidden">
        {heroMobileImage?.node?.mediaItemUrl && (
          <div className="relative w-full max-w-md">
            <Image
              src={heroMobileImage.node.mediaItemUrl}
              alt={heroMobileImage.node.altText || ''}
              width={635}
              height={853}
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        {heroSubheading && (
          <h4 className="text-medium-purple text-center text-[30px] leading-snug">
            {heroSubheading}
          </h4>
        )}

        {heroHeading && (
          <h1 className="text-blue-heading text-center text-[44px] leading-tight text-balance">
            {heroHeading}
          </h1>
        )}
      </div>
    </section>
  )
}
