import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_POST_PREVIEW_BY_ID } from '@/lib/graphql/queries'
import type { GetPostBySlugResponse } from '@/lib/graphql/types'
import { PostRenderer } from '@/components/blog/PostRenderer'

interface PreviewPostPageProps {
  params: Promise<{ id: string }>
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function PreviewPostByIdPage({ params }: PreviewPostPageProps) {
  const { id } = await params
  const { isEnabled } = await draftMode()
  if (!isEnabled) return notFound()

  // If you prefer, you can use a QUERY_POST_PREVIEW_BY_SLUG instead
  const data = await wpgraphql<GetPostBySlugResponse>({
    query: QUERY_POST_PREVIEW_BY_ID,
    variables: { id: Number(id), idType: 'DATABASE_ID', asPreview: true },
    preview: true,
    revalidate: false,
  })

  if (!data?.post) {
    return notFound()
  }

  return <PostRenderer post={data.post} />
}
