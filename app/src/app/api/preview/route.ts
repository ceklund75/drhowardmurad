import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'
import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_POST_PREVIEW_BY_ID, QUERY_PAGE_PREVIEW_BY_ID } from '@/lib/graphql/queries'
import { GetPostBySlugResponse, GetPageByUriResponse } from '@/lib/graphql/types'
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const secret = searchParams.get('secret')
  const previewId = searchParams.get('previewId')
  const previewType = searchParams.get('previewType') // 'post' for now

  if (secret !== process.env.WP_PREVIEW_SECRET || !previewId || !previewType) {
    return new Response('Unauthorized', { status: 401 })
  }

  const id = Number(previewId)

  if (previewType === 'post') {
    const data = await wpgraphql<GetPostBySlugResponse>({
      query: QUERY_POST_PREVIEW_BY_ID,
      variables: { id, idType: 'DATABASE_ID', asPreview: true },
      preview: true,
      revalidate: false,
    })

    const post = data?.post
    if (!post) {
      return new Response('Invalid post preview target', { status: 401 })
    }

    const draft = await draftMode()
    draft.enable()

    if (post.slug) {
      redirect(`/preview/post/${post.slug}`)
    } else {
      redirect(`/preview/post/id/${previewId}`)
    }
  }

  if (previewType === 'page') {
    const data = await wpgraphql<GetPageByUriResponse>({
      query: QUERY_PAGE_PREVIEW_BY_ID,
      variables: { id, idType: 'DATABASE_ID', asPreview: true },
      preview: true,
      revalidate: false,
    })

    const page = data?.page
    if (!page?.slug) {
      return new Response('Invalid page preview target', { status: 401 })
    }

    const draft = await draftMode()
    draft.enable()

    redirect(`/preview/page/${page.slug}`)
  }

  return new Response('Unsupported previewType', { status: 400 })
}
