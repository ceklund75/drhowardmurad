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
import { buildRootResolverMetadataFromResolved } from '@/lib/seo/builders'
import logger from '@/lib/logger'
import { resolveBySlug } from '@/lib/graphql/resolveBySlug'
import type { ResolvedBySlug as ResolvedContent } from '@/lib/graphql/resolveBySlug'

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
  const { slug } = await params
  const sp = await searchParams

  if (sp.previewId && sp.previewType) {
    return { title: 'Preview | Dr. Howard Murad' }
  }

  try {
    const resolved = await resolveBySlug(slug, { preview: false })
    return buildRootResolverMetadataFromResolved(slug, resolved, { preview: false })
  } catch (error) {
    logger.error({ error }, 'generateMetadata failed')
    return {
      title: 'Dr. Howard Murad',
      description: 'Father of Modern Wellness',
    }
  }
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
    logger.info(`[generateStaticParams] Complete: Pre-built ${allSlugs.length} page+post routes`)

    return allSlugs.map((slug) => ({ slug }))
  } catch (error) {
    logger.error({ error }, '[generateStaticParams] Failed to fetch slugs:')
    return []
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
    // PRIORITY 1: Direct HWP searchParams (bypasses middleware)
    const directPreview = await resolvePreviewContent({ previewId, previewType })
    if (directPreview) return renderResolved(directPreview)
  }

  // PRIORITY 2: If draft not enabled, just serve published content
  if (!draft.isEnabled) {
    const resolved = await resolvePublishedContent(slug, { preview: false })
    return renderResolved(resolved)
  }

  // PRIORITY 3: Headers-based preview via middleware
  const { previewId: headerPreviewId, previewType: headerPreviewType } = await getPreviewParams()

  if (headerPreviewId && headerPreviewType) {
    const headerPreview = await resolvePreviewContent({
      previewId: headerPreviewId,
      previewType: headerPreviewType,
    })
    if (headerPreview) return renderResolved(headerPreview)
  }

  // PRIORITY 4: Draft mode enabled but no specific preview entity → preview of published
  const resolved = await resolvePublishedContent(slug, { preview: true })
  return renderResolved(resolved)
}

async function resolvePublishedContent(
  slug: string,
  options: { preview: boolean },
): Promise<ResolvedContent> {
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
    const pageData = await wpgraphql<GetPageByUriResponse>({
      query: QUERY_PAGE_BY_URI,
      variables: { id: `/${slug}` },
      revalidate: revalidateOption,
      preview,
    })

    if (pageData.page) {
      return { kind: 'page', page: pageData.page }
    }
  } catch (error) {
    logger.error({ slug, error }, 'Page WPGraphQL fetch failed.')
  }

  // Then Post
  try {
    const postData = await wpgraphql<GetPostBySlugResponse>({
      query: QUERY_POST_BY_SLUG,
      variables: { id: slug },
      revalidate: revalidateOption,
      preview,
    })

    if (postData.post) {
      return { kind: 'post', post: postData.post }
    }
  } catch (error) {
    logger.error({ slug, error }, 'Post WPGraphQL fetch failed.')
  }

  return { kind: 'none' }
}

async function resolvePreviewContent(args: {
  previewId: string
  previewType: string
}): Promise<ResolvedContent | null> {
  const { previewId, previewType } = args
  const id = Number(previewId)

  if (previewType === 'page') {
    try {
      const data = await wpgraphql<GetPageByIdPreviewResponse>({
        query: QUERY_PAGE_PREVIEW_BY_ID,
        variables: { id, idType: 'DATABASE_ID', asPreview: true },
        preview: true,
        revalidate: false,
      })
      if (data?.page) return { kind: 'page', page: data.page }
    } catch (error) {
      logger.error({ previewId, error }, 'GetPageByIdPreviewResponse WPGraphQL fetch failed.')
    }
  }

  if (previewType === 'post') {
    try {
      const data = await wpgraphql<GetPostByIdPreviewResponse>({
        query: QUERY_POST_PREVIEW_BY_ID,
        variables: { id, idType: 'DATABASE_ID', asPreview: true },
        preview: true,
        revalidate: false,
      })
      if (data?.post) return { kind: 'post', post: data.post }
    } catch (error) {
      logger.error({ previewId, error }, 'GetPostByIdPreviewResponse WPGraphQL fetch failed.')
    }
  }

  return null
}

function renderResolved(resolved: ResolvedContent) {
  switch (resolved.kind) {
    case 'page':
      return <PageRenderer page={resolved.page} />
    case 'post':
      return <PostRenderer post={resolved.post} />
    case 'none':
    default:
      return notFound()
  }
}
