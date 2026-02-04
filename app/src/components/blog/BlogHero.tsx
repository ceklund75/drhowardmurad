import Image from 'next/image'
import { PageHeroACF } from '@/lib/graphql/types'
import { themeClassFromAcf } from '@/lib/theme'
import { RawHtml } from '../RawHtml'

interface BlogHeroProps {
  hero: PageHeroACF
  title?: string
  hideForm?: boolean
}

export default function BlogHero({ hero, title, hideForm = false }: BlogHeroProps) {
  const themeClass = themeClassFromAcf(hero.heroThemeColor)
  const hasDesktopBg = hero.heroBgImage?.node?.mediaItemUrl
  const hasMobileBg = hero.heroMobileBgImage?.node?.mediaItemUrl
  const desktopBg = hero.heroBgImage?.node?.mediaItemUrl || ''
  const mobileBg = hero.heroMobileBgImage?.node?.mediaItemUrl || ''

  return (
    <section className="relative overflow-hidden">
      {hasDesktopBg && (
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image
            src={desktopBg}
            alt=""
            fill
            className="object-cover object-[center_top]"
            priority
            quality={90}
          />
        </div>
      )}

      {/* Desktop */}
      <div
        className={`relative z-10 hidden min-h-145 items-center justify-center px-4 py-12 lg:flex lg:py-16 ${themeClass}`}
      >
        <div className="mx-auto max-w-[60%] min-w-75 bg-[var(--color-theme)]/80 p-2">
          <div className="border border-white p-13 text-center">
            {hero.heroHeading && (
              <h1 className="mb-6 text-2xl leading-relaxed font-normal text-white italic lg:text-3xl lg:text-4xl">
                "{hero.heroHeading}"
              </h1>
            )}

            {/* Body Text - Centered paragraphs */}
            {hero.heroBody && (
              <div className="mb-6 text-lg leading-relaxed text-white">
                <RawHtml html={hero.heroBody} />
              </div>
            )}

            {/* Newsletter Section - Placeholder for future form */}
            {hero.heroShowNewsletterForm && !hideForm && (
              <div className="mt-8">
                {hero.heroNewsletterHeading && (
                  <p className="mb-4 text-base text-white lg:text-lg">
                    {hero.heroNewsletterHeading}
                  </p>
                )}

                {hero.heroNewsletterSubheading && (
                  <p className="mb-6 text-sm text-white/90 italic lg:text-base">
                    {hero.heroNewsletterSubheading}
                  </p>
                )}

                {/* Placeholder button - inline form will be added when building newsletter modal */}
                <div className="flex flex-col items-center justify-center gap-3 lg:flex-row">
                  <button
                    className="bg-white px-8 py-3 text-sm font-semibold text-[var(--color-theme)] uppercase transition-colors hover:bg-white/90"
                    aria-label="Subscribe to newsletter"
                    type="button"
                  >
                    Sign-Up
                  </button>
                  <span className="text-xs text-white/70 lg:text-sm">
                    (Form will be inline: First Name | Email | Submit)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="relative z-10 m-3.75 lg:hidden">
        <div className="bg-white p-3.75">
          <h1 className="h3 text-pink mt-2">{title}</h1>
          {/* Image */}
          {hasMobileBg || hasDesktopBg ? (
            <div className="relative mt-2 aspect-1000/500 w-full">
              <Image
                src={
                  hasMobileBg
                    ? hero.heroMobileBgImage!.node!.mediaItemUrl
                    : hero.heroBgImage!.node!.mediaItemUrl
                }
                alt=""
                fill
                className="object-cover object-center"
                priority
                quality={90}
              />
            </div>
          ) : null}
          <div className={`pt-4 ${themeClass}`}>
            <div className="bg-[var(--color-theme)]/80 p-2">
              <div className="border border-white p-4 text-center">
                {hero.heroHeading && (
                  <h2 className="h3 mb-4 text-white italic">"{hero.heroHeading}"</h2>
                )}

                {hero.heroBody && (
                  <div
                    className="mb-4 leading-relaxed text-white"
                    dangerouslySetInnerHTML={{ __html: hero.heroBody }}
                  />
                )}

                {hero.heroShowNewsletterForm && (
                  <div className="mt-4">
                    {hero.heroNewsletterHeading && (
                      <p className="mb-2 text-white">{hero.heroNewsletterHeading}</p>
                    )}
                    {hero.heroNewsletterSubheading && (
                      <p className="mb-4 text-white/90 italic">{hero.heroNewsletterSubheading}</p>
                    )}
                    <button
                      className="w-full bg-white px-6 py-2 text-xs font-semibold text-[var(--color-theme)] uppercase transition-colors hover:bg-white/90"
                      type="button"
                      aria-label="Subscribe to newsletter"
                    >
                      Sign-Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
