// app/page.tsx
import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_PAGE_BY_URI } from '@/lib/graphql/queries'
import { GetPageByUriResponse } from '@/lib/graphql/types'
import { PageRenderer } from '@/components/pages/PageRenderer'

export const revalidate = 86400

export default async function HomePage() {
  const data = await wpgraphql<GetPageByUriResponse>({
    query: QUERY_PAGE_BY_URI,
    variables: { id: '/' },
    revalidate,
  })

  const page = data.page
  if (!page) {
    // Optional: fall back or notFound()
    return null
  }

  return <PageRenderer page={page} />
}
