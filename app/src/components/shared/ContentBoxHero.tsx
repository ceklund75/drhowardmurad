import Image from 'next/image'
import type { PageHeroACF } from '@/lib/graphql/types'
import { themeClassFromAcf } from '@/lib/theme'
import { RawHtml } from '../RawHtml'
import { NewsletterInlineForm } from '../forms/NewsletterInlineForm'
import { cx } from '@/lib/ui'

interface ContentboxHeroProps {
  hero: PageHeroACF
  title?: string
  hideForm?: boolean
  hideHeroBody?: boolean
}

export function ContentBoxHero({
  hero,
  title,
  hideForm = false,
  hideHeroBody = false,
}: ContentboxHeroProps) {
  const themeClass = themeClassFromAcf(hero.heroThemeColor)
  const desktopBg = hero.heroBgImage?.node?.mediaItemUrl || ''
  const mobileBg = hero.heroMobileBgImage?.node?.mediaItemUrl || ''
  const mobileSrc = mobileBg || desktopBg
  const desktopSrc = desktopBg

  return (
    <section className="bg-gray-alt relative overflow-hidden">
      {desktopSrc && (
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image
            src={desktopSrc}
            alt=""
            fill
            className="object-cover object-[center_top]"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={90}
          />
        </div>
      )}

      {/* Desktop */}
      <div
        className={`relative z-10 hidden min-h-160 items-center justify-center px-4 py-12 lg:flex lg:py-16 ${themeClass}`}
      >
        <div className="mx-auto max-w-[58%] min-w-75 bg-(--color-theme)/80 p-2">
          <div className="border border-white p-13 text-center">
            {hero.heroHeading && (
              <h1 className="mb-1 text-2xl leading-snug font-normal text-balance text-white italic lg:text-[40px]">
                “{hero.heroHeading}”
              </h1>
            )}

            {/* Body Text - Centered paragraphs */}
            {hero.heroBody && !hideHeroBody && (
              <div className="text-lg leading-snug text-balance text-white">
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
                <div className="mt-4">
                  <NewsletterInlineForm buttonLabel={'SIGN-UP'} variant="contentbox" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="relative z-10 mx-3.75 mt-3.75 lg:hidden">
        <div className="bg-white p-3.75">
          <h1 className="h3 text-pink mt-2">{title}</h1>
          {/* Image */}
          {mobileSrc && (
            <div className="relative mt-2 aspect-1000/500 w-full">
              <Image
                src={mobileSrc}
                alt=""
                fill
                className="object-cover object-center"
                priority
                quality={90}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
              />
            </div>
          )}
          <div className={`pt-4 ${themeClass}`}>
            <div className="bg-[var(--color-theme)]/80 p-2">
              <div className="border border-white p-6 text-center">
                {hero.heroHeading && (
                  <h2 className={cx('h4 text-[27px] leading-snug text-balance text-white italic')}>
                    “{hero.heroHeading}”
                  </h2>
                )}

                {hero.heroBody && !hideHeroBody && (
                  <div
                    className="mt-1 leading-snug text-white"
                    dangerouslySetInnerHTML={{ __html: hero.heroBody }}
                  />
                )}

                {hero.heroShowNewsletterForm && !hideForm && (
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
