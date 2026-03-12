import { notFound } from 'next/navigation'
import { wpgraphqlBatch } from '@/lib/graphql/server'
import { QUERY_ALL_POST_SLUGS, QUERY_ALL_PAGE_SLUGS } from '@/lib/graphql/queries'
import { GetAllPostSlugsResponse, GetAllPageSlugsResponse } from '@/lib/graphql/types'

import { PostRenderer } from '@/components/blog/PostRenderer'
import { PageRenderer } from '@/components/pages/PageRenderer'

import type { Metadata } from 'next'
import { buildRootResolverMetadataFromResolved } from '@/lib/seo/builders'
import logger from '@/lib/logger'
import { resolveBySlug, type ResolvedBySlug } from '@/lib/graphql/resolveBySlug'

// IMPORTANT: no draftMode, no headers, no cookies here

type SlugParams = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: SlugParams): Promise<Metadata> {
  const { slug } = await params

  try {
    const resolved = await resolveBySlug(slug, { preview: false })
    return buildRootResolverMetadataFromResolved(slug, resolved, { preview: false })
  } catch (error) {
    logger.error({ error, slug }, 'generateMetadata failed')
    return {
      title: 'Dr. Howard Murad',
      description: 'Father of Modern Wellness',
    }
  }
}

export const dynamicParams = false // only prebuilt slugs are valid

interface RootResolverPageProps {
  params: Promise<{ slug: string }>
}

export default async function RootResolverPage({ params }: RootResolverPageProps) {
  const { slug } = await params

  // Single canonical resolver, ISR via resolveBySlug
  const resolved = await resolveBySlug(slug, { preview: false })
  return renderResolved(resolved)
}

function renderResolved(resolved: ResolvedBySlug) {
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

    logger.info(`[generateStaticParams] Complete: Pre-built ${allSlugs.length} page+post routes`)

    return allSlugs.map((slug) => ({ slug }))
  } catch (error) {
    logger.error({ error }, '[generateStaticParams] Failed to fetch slugs')
    return []
  }
}
