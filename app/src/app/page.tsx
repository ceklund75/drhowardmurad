import { draftMode } from 'next/headers'
import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_PAGE_BY_URI } from '@/lib/graphql/queries'
import { GetPageByUriResponse } from '@/lib/graphql/types'
import { PageRenderer } from '@/components/pages/PageRenderer'
import type { Metadata } from 'next'
import { buildHomeMetadata } from '@/lib/seo/builders'
import { buildHomeJsonLd } from '@/lib/seo/jsonLd'

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled } = await draftMode()
  return buildHomeMetadata({ preview: isEnabled })
}
export const revalidate = 86400

export default async function HomePage() {
  const { isEnabled } = await draftMode()
  const data = await wpgraphql<GetPageByUriResponse>({
    query: QUERY_PAGE_BY_URI,
    variables: { id: '/' },
    revalidate,
    preview: isEnabled,
  })

  const page = data.page
  if (!page) {
    // Optional: fall back or notFound()
    return null
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
      {page && <PageRenderer page={page} />}
    </>
  )
}
