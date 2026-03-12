import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_PAGE_PREVIEW_BY_ID } from '@/lib/graphql/queries'
import type { GetPageByUriResponse } from '@/lib/graphql/types'
import { PageRenderer } from '@/components/pages/PageRenderer'

interface PreviewPageProps {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params
  const { isEnabled } = await draftMode()

  if (!isEnabled) {
    return notFound()
  }

  // If you prefer, create a QUERY_PAGE_PREVIEW_BY_SLUG; here we assume IDType: SLUG
  const data = await wpgraphql<GetPageByUriResponse>({
    query: QUERY_PAGE_PREVIEW_BY_ID,
    variables: { id: slug, idType: 'URI', asPreview: true },
    preview: true,
    revalidate: false,
  })

  const page = data?.page
  if (!page) {
    return notFound()
  }

  return <PageRenderer page={page} />
}
