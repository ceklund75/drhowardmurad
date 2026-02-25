import { Page, PageHeroACF } from '@/lib/graphql/types'
import { HomeHeroVideo } from './HomeHeroVideo'
import PageHero from './PageHero'
import { PageSectionTextImage } from './PageSection/PageSectionTextImage'
//import { PageSectionTextImageFixed } from './PageSectionTextImageFixed'
import { PageNewsletterCta } from './PageNewsletterCta'
import { buildPageJsonLd } from '@/lib/seo/jsonLd'

interface PageRendererProps {
  page: Page
}

function resolveHeroType(hero: PageHeroACF | undefined): 'home' | 'contentbox' | undefined {
  const raw = hero?.heroType
  if (!raw) return undefined
  if (Array.isArray(raw)) return raw[0] as 'home' | 'contentbox'
  return raw
}

export function PageRenderer({ page }: PageRendererProps) {
  const { pageHero, pageTextImageAlt, pageNewsletterCta } = page
  const heroType = resolveHeroType(pageHero)
  const altSections = pageTextImageAlt?.pageSectionsTextImageAlt ?? []

  const jsonLd = buildPageJsonLd(page)

  return (
    <main className="bg-gray-alt">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {heroType === 'home' && pageHero && <HomeHeroVideo hero={pageHero} />}
      {heroType === 'contentbox' && pageHero && (
        <PageHero hero={pageHero} title={page.title} hideForm={true} />
      )}
      {altSections.map((section, index) => (
        <PageSectionTextImage key={index} section={section} index={index} />
      ))}

      {/* {fixedSections.map((section, index) => (
        <PageSectionTextImageFixed key={index} section={section} />
      ))} */}

      {pageNewsletterCta && <PageNewsletterCta cta={pageNewsletterCta} />}
    </main>
  )
}
