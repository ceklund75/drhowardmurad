import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_PAGE_BY_URI } from '@/lib/graphql/queries'
import { GetPageByUriResponse } from '@/lib/graphql/types'
import { PageRenderer } from '@/components/pages/PageRenderer'
import type { Metadata } from 'next'
import { buildHomeMetadata } from '@/lib/seo/builders'
import { buildHomeJsonLd } from '@/lib/seo/jsonLd'
import logger from '@/lib/logger'

export async function generateMetadata(): Promise<Metadata> {
  try {
    return buildHomeMetadata({ preview: false })
  } catch (error) {
    logger.error({ error }, 'generateMetadata failed')
    return {
      title: 'Dr. Howard Murad',
      description: 'Father of Modern Wellness',
    }
  }
}
export const revalidate = 2592000 // 30 days

export default async function HomePage() {
  let safePage = undefined
  try {
    const data = await wpgraphql<GetPageByUriResponse>({
      query: QUERY_PAGE_BY_URI,
      variables: { id: '/' },
      revalidate,
      preview: false,
    })

    const page = data.page
    if (!page) {
      // Optional: fall back or notFound()
      return null
    }
    safePage = page
  } catch (error) {
    logger.error({ slug: '/', error }, 'WPGraphQL fetch failed.')
  }

  const homeJsonLd = buildHomeJsonLd()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(homeJsonLd).replace(/</g, '\\u003c'),
        }}
      />
      {safePage && <PageRenderer page={safePage} />}
    </>
  )
}
