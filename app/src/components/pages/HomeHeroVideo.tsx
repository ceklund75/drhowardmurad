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
    <section className="relative min-h-[360px] overflow-hidden md:min-h-[520px] lg:min-h-[640px] xl:min-h-[800px]">
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

      {/* Light overlay */}
      <div className="absolute inset-0 hidden bg-white/10 md:block" />

      {/* Foreground layout – no h-full dependency on parents */}
      <div className="relative z-10 hidden min-h-[360px] md:flex md:min-h-[520px] lg:min-h-[640px] xl:min-h-[800px]">
        <div className="mx-auto flex w-full max-w-7xl px-6">
          {/* Left: text */}
          <div className="flex w-7/12 items-center">
            <div className="space-y-3">
              {heroSubheading && (
                <h4 className="fade-in fade-600 text-[clamp(1.125rem,1.4vw+0.8rem,2.75rem)] leading-none text-[var(--color-medium-purple)] delay-600">
                  {heroSubheading}
                </h4>
              )}
              {heroHeading && (
                <h1 className="fade-in fade-1200 text-[clamp(2.25rem,4vw+1rem,5.5rem)] leading-none text-balance text-[var(--color-blue-heading)] delay-1200">
                  {heroHeading}
                </h1>
              )}
            </div>
          </div>

          {/* Right: doctor image */}
          <div className="flex w-5/12 items-end justify-end">
            {heroRightImage?.node?.mediaItemUrl && (
              <div className="translate-x-2 md:translate-x-6 lg:translate-x-10">
                <div className="fade-in fade-600 relative h-[360px] w-[266px] md:h-[480px] md:w-[355px] lg:h-[640px] lg:w-[472px] xl:h-[775px] xl:w-[577px]">
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
        {heroRightImage?.node?.mediaItemUrl && (
          <div className="relative w-full max-w-md">
            <Image
              src={heroRightImage.node.mediaItemUrl}
              alt={heroRightImage.node.altText || ''}
              width={635}
              height={853}
              className="h-auto w-full object-contain"
            />
          </div>
        )}

        {heroSubheading && (
          <h4 className="text-center text-[30px] leading-snug text-[var(--color-medium-purple)]">
            {heroSubheading}
          </h4>
        )}

        {heroHeading && (
          <h1 className="text-center text-[44px] leading-tight text-balance text-[var(--color-blue-heading)]">
            {heroHeading}
          </h1>
        )}
      </div>
    </section>
  )
}
