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
import logger from '@/lib/logger'

type GetPageByIdPreviewResponse = {
  page: GetPageByUriResponse['page'] // same Page shape
}

type GetPostByIdPreviewResponse = {
  post: GetPostBySlugResponse['post'] // same Post shape
}

interface RootResolverPageProps {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    preview?: string
    previewId?: string
    previewType?: string
  }>
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

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}): Promise<Metadata> {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  // Check for preview params BEFORE calling buildRootResolverMetadata
  if (resolvedSearchParams.previewId && resolvedSearchParams.previewType) {
    return {
      title: 'Preview | Dr. Howard Murad',
    }
  }
  try {
    return buildRootResolverMetadata(resolvedParams.slug, { preview: false })
  } catch (error) {
    logger.error({ error }, 'generateMetadata failed')
    return {
      title: 'Dr. Howard Murad',
      description: 'Father of Modern Wellness',
    }
  }
}

export default async function RootResolverPage({ params, searchParams }: RootResolverPageProps) {
  const { slug } = await params
  const resolvedSearchParams = await searchParams
  const previewId = resolvedSearchParams.previewId as string | null
  const previewType = resolvedSearchParams.previewType as string | null

  const draft = await draftMode()

  if (previewId && previewType) {
    draft.enable()
  }

  // PRIORITY 1: Direct HWP searchParams (bypasses middleware)
  if (previewId && previewType === 'post') {
    try {
      const data = await wpgraphql<GetPostByIdPreviewResponse>({
        query: QUERY_POST_PREVIEW_BY_ID,
        variables: { id: Number(previewId), idType: 'DATABASE_ID', asPreview: true },
        preview: true,
        revalidate: false,
      })
      if (data?.post) return <PostRenderer post={data.post} />
    } catch (error) {
      logger.error({ slug, error }, 'GetPostByIdPreviewResponseWPGraphQL fetch failed.')
    }
  }

  if (previewId && previewType === 'page') {
    try {
      const data = await wpgraphql<GetPageByIdPreviewResponse>({
        query: QUERY_PAGE_PREVIEW_BY_ID,
        variables: { id: Number(previewId), idType: 'DATABASE_ID', asPreview: true },
        preview: true,
        revalidate: false,
      })
      if (data?.page) return <PageRenderer page={data.page} />
    } catch (error) {
      logger.error({ slug: '/', error }, 'GetPageByIdPreviewResponse WPGraphQL fetch failed.')
    }
  }

  // Your existing middleware logic (PRIORITY 2)
  if (!draft.isEnabled) {
    return resolvePublishedPageOrPost(slug, { preview: false })
  }

  const { previewId: headerPreviewId, previewType: headerPreviewType } = await getPreviewParams()

  if (headerPreviewId && headerPreviewType === 'page') {
    try {
      const data = await wpgraphql<GetPageByIdPreviewResponse>({
        query: QUERY_PAGE_PREVIEW_BY_ID,
        variables: { id: Number(previewId), idType: 'DATABASE_ID', asPreview: true },
        preview: true,
        revalidate: false,
      })
      if (data?.page) return <PageRenderer page={data.page} />
    } catch (error) {
      logger.error({ slug: '/', error }, 'GetPageByIdPreviewResponse WPGraphQL fetch failed.')
    }
  }

  if (headerPreviewId && headerPreviewType === 'post') {
    try {
      const data = await wpgraphql<GetPostByIdPreviewResponse>({
        query: QUERY_POST_PREVIEW_BY_ID,
        variables: { id: Number(previewId), idType: 'DATABASE_ID', asPreview: true },
        preview: true,
        revalidate: false,
      })
      if (data?.post) return <PostRenderer post={data.post} />
    } catch (error) {
      logger.error({ slug: '/', error }, 'GetPostByIdPreviewResponse WPGraphQL fetch failed.')
    }
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
  } catch (error) {
    logger.error({ slug: '/', error }, 'Page WPGraphQL fetch failed.')
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
  } catch (error) {
    logger.error({ slug: '/', error }, 'Post WPGraphQL fetch failed.')
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

    allSlugs.push('preview')
    console.log(`[generateStaticParams] Complete: Pre-built ${allSlugs.length} page+post routes`)

    return allSlugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error('[generateStaticParams] Failed to fetch slugs:', error)
    return []
  }
}
