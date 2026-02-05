import { Page, PageHeroACF } from '@/lib/graphql/types'
import { HomeHeroVideo } from './HomeHeroVideo'
//import { PageHeroContentBox } from './PageHeroContentBox'
import { PageSectionTextImage } from './PageSectionTextImage'
//import { PageSectionTextImageFixed } from './PageSectionTextImageFixed'
import { PageNewsletterCta } from './PageNewsletterCta'

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
  const { pageHero, pageTextImageAlt, pageTextImageFixed, pageNewsletterCta } = page

  const heroType = resolveHeroType(pageHero)

  const altSections = pageTextImageAlt?.pageSectionsTextImageAlt ?? []
  const fixedSections = pageTextImageFixed?.pageSectionsTextImageFixed ?? []

  return (
    <main className="bg-gray-alt">
      {heroType === 'home' && pageHero && <HomeHeroVideo hero={pageHero} />}
      {/* {heroType === 'contentbox' && pageHero && <PageHeroContentBox hero={pageHero} />} */}
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
