import { notFound } from 'next/navigation'
import { draftMode, headers } from 'next/headers'
import { wpgraphql, wpgraphqlBatch } from '@/lib/graphql/server'
import {
  QUERY_PAGE_BY_URI,
  QUERY_POST_BY_SLUG,
  QUERY_ALL_POST_SLUGS,
  QUERY_ALL_PAGE_SLUGS,
  QUERY_PAGE_PREVIEW_BY_ID,
  QUERY_POST_PREVIEW_BY_ID,
} from '@/lib/graphql/queries'
import {
  GetPageByUriResponse,
  GetPostBySlugResponse,
  GetAllPostSlugsResponse,
  GetAllPageSlugsResponse,
} from '@/lib/graphql/types'

import { PostRenderer } from '@/components/blog/PostRenderer'
import { PageRenderer } from '@/components/pages/PageRenderer'

import type { Metadata } from 'next'
import { buildRootResolverMetadata } from '@/lib/seo/builders'

type SlugParams = {
  params: Promise<{ slug: string }>
}

type GetPageByIdPreviewResponse = {
  page: GetPageByUriResponse['page'] // same Page shape
}

type GetPostByIdPreviewResponse = {
  post: GetPostBySlugResponse['post'] // same Post shape
}

interface RootResolverPageProps {
  params: Promise<{ slug: string }>
}

async function getPreviewParams() {
  const hdrs = await headers()
  const url = hdrs.get('x-next-url') // or use a custom header via middleware
  if (!url) return { previewId: null, previewType: null }

  const u = new URL(url, 'http://localhost') // base doesn't matter
  return {
    previewId: u.searchParams.get('previewId'),
    previewType: u.searchParams.get('previewType'), // 'post' or 'page'
  }
}

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params
  // Always treat as published for SEO – no draftMode, no headers.
  return buildRootResolverMetadata(slug, { preview: false })
}

export default async function RootResolverPage({ params }: RootResolverPageProps) {
  const { slug } = await params
  const { isEnabled } = await draftMode()

  if (!isEnabled) {
    return resolvePublishedPageOrPost(slug, { preview: false })
  }

  const { previewId, previewType } = await getPreviewParams()

  if (previewId && previewType === 'page') {
    const data = await wpgraphql<GetPageByIdPreviewResponse>({
      query: QUERY_PAGE_PREVIEW_BY_ID,
      variables: { id: Number(previewId), idType: 'DATABASE_ID', asPreview: true },
      preview: true,
      revalidate: false,
    })
    if (data?.page) return <PageRenderer page={data.page} />
  }

  if (previewId && previewType === 'post') {
    const data = await wpgraphql<GetPostByIdPreviewResponse>({
      query: QUERY_POST_PREVIEW_BY_ID,
      variables: { id: Number(previewId), idType: 'DATABASE_ID', asPreview: true },
      preview: true,
      revalidate: false,
    })
    if (data?.post) return <PostRenderer post={data.post} />
  }

  return resolvePublishedPageOrPost(slug, { preview: true })
}

async function resolvePublishedPageOrPost(slug: string, options: { preview: boolean }) {
  const { preview } = options

  const staticPageSlugs = new Set([
    'innovator-pioneer',
    'holistic-wellness',
    'dr-murads-life-story',
    'books',
    'publications',
  ])
  const revalidateOption = staticPageSlugs.has(slug) ? false : 86400

  // Try Page first
  try {
    const data = await wpgraphql<GetPageByUriResponse>({
      query: QUERY_PAGE_BY_URI,
      variables: { id: `/${slug}` },
      revalidate: revalidateOption,
      preview,
    })
    if (data.page) {
      return <PageRenderer page={data.page} />
    }
  } catch (err) {
    console.log('[RootResolver] Page query failed:', err instanceof Error ? err.message : err)
  }

  // Try Post second
  try {
    const data = await wpgraphql<GetPostBySlugResponse>({
      query: QUERY_POST_BY_SLUG,
      variables: { id: slug },
      revalidate: revalidateOption,
      preview,
    })
    if (data.post) {
      return <PostRenderer post={data.post} />
    }
  } catch (err) {
    console.log('[RootResolver] Post query failed:', err instanceof Error ? err.message : err)
  }

  notFound()
}

export async function generateStaticParams() {
  try {
    const allSlugs: string[] = []

    // Pages
    {
      let hasMorePages = true
      let after: string | null = null

      while (hasMorePages) {
        const response: GetAllPageSlugsResponse = await wpgraphqlBatch<GetAllPageSlugsResponse>({
          query: QUERY_ALL_PAGE_SLUGS,
          variables: { first: 100, after },
        })

        response.pages.nodes.forEach((node: { slug: string | null }) => {
          if (!node.slug) return
          allSlugs.push(node.slug)
        })

        hasMorePages = response.pages.pageInfo.hasNextPage
        after = response.pages.pageInfo.endCursor
      }
    }

    // Posts
    {
      let hasMore = true
      let after: string | null = null

      while (hasMore) {
        const response: GetAllPostSlugsResponse = await wpgraphqlBatch<GetAllPostSlugsResponse>({
          query: QUERY_ALL_POST_SLUGS,
          variables: { first: 100, after },
        })

        response.posts.nodes.forEach((node: { slug: string | null }) => {
          if (!node.slug) return
          allSlugs.push(node.slug)
        })

        hasMore = response.posts.pageInfo.hasNextPage
        after = response.posts.pageInfo.endCursor
      }
    }

    console.log(`[generateStaticParams] Complete: Pre-built ${allSlugs.length} page+post routes`)

    return allSlugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error('[generateStaticParams] Failed to fetch slugs:', error)
    return []
  }
}
