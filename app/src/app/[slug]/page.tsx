import { wpgraphql, wpgraphqlBatch } from '@/lib/graphql/server'
import {
  QUERY_PAGE_BY_URI,
  QUERY_POST_BY_SLUG,
  QUERY_ALL_POST_SLUGS,
  QUERY_ALL_PAGE_SLUGS,
} from '@/lib/graphql/queries'
import {
  GetPageByUriResponse,
  GetPostBySlugResponse,
  GetAllPostSlugsResponse,
  GetAllPageSlugsResponse,
} from '@/lib/graphql/types'
import { notFound } from 'next/navigation'
import { PostRenderer } from '@/components/blog/PostRenderer'
import { PageRenderer } from '@/components/pages/PageRenderer'

interface RootResolverPageProps {
  params: Promise<{ slug: string }>
}

export default async function RootResolverPage({ params }: RootResolverPageProps) {
  const { slug } = await params

  // Try Page first
  let page: GetPageByUriResponse['page'] | null = null

  try {
    const data = await wpgraphql<GetPageByUriResponse>({
      query: QUERY_PAGE_BY_URI,
      variables: { id: `/${slug}` },
      revalidate: 86400,
    })
    page = data.page
  } catch (err) {
    console.log('[RootResolver] Page query failed:', err instanceof Error ? err.message : err)
  }

  if (page) {
    return <PageRenderer page={page} />
  }

  // Try Post second
  let post: GetPostBySlugResponse['post'] | null = null

  try {
    const data = await wpgraphql<GetPostBySlugResponse>({
      query: QUERY_POST_BY_SLUG,
      variables: { id: slug },
      revalidate: 86400,
    })
    post = data.post
  } catch (err) {
    console.log('[RootResolver] Post query failed:', err instanceof Error ? err.message : err)
  }

  if (post) {
    return <PostRenderer post={post} />
  }

  // Neither found
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
