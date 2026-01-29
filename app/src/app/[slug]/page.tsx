import { wpgraphql, wpgraphqlBatch } from '@/lib/graphql/server'
import { QUERY_PAGE_BY_URI, QUERY_POST_BY_SLUG, QUERY_ALL_POST_SLUGS } from '@/lib/graphql/queries'
import {
  GetPageByUriResponse,
  GetPostBySlugResponse,
  GetAllPostSlugsResponse,
} from '@/lib/graphql/types'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

interface RootResolverPageProps {
  params: Promise<{ slug: string[] }>
}

export default async function RootResolverPage({ params }: RootResolverPageProps) {
  const { slug } = await params

  console.log('[RootResolver] Resolving:', slug)

  //Try to fetch as Page first
  let page: GetPageByUriResponse['page'] | null = null
  let pageError: string | null = null

  try {
    const data = await wpgraphql<GetPageByUriResponse>({
      query: QUERY_PAGE_BY_URI,
      variables: { id: `/${slug}` },
      revalidate: 86400,
    })
    page = data.page
  } catch (err) {
    pageError = err instanceof Error ? err.message : 'Unknown error'
    console.log('[RootResolver] Page query failed:', pageError)
  }

  if (page) {
    //return <PageRenderer page={page} />
    console.log('[RootResolver] Found page:', page.title)
    return (
      <main className="mx-auto max-w-3xl p-8">
        <h1 className="mb-4 text-3xl font-bold">{page.title}</h1>
        <div>{page.excerpt} </div>
      </main>
    )
  }

  // if no Page, try to fetch as Post
  let post: GetPostBySlugResponse['post'] | null = null
  let postError: string | null = null

  try {
    const data = await wpgraphql<GetPostBySlugResponse>({
      query: QUERY_POST_BY_SLUG,
      variables: { id: slug },
      revalidate: 86400,
    })
    post = data.post
  } catch (err) {
    postError = err instanceof Error ? err.message : 'Unknown error'
    console.log('[RootResolver] Post query failed:', postError)
  }

  if (post) {
    // return <PostRenderer post={post} />;
    console.log('[RootResolver] Found post:', post.title)
    return (
      <main className="mx-auto max-w-3xl p-8">
        <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
        <p className="mb-4 text-sm text-gray-600">{post.date}</p>
        {/* Add post content here later */}
      </main>
    )
  }

  // Step 3: Neither found
  notFound()
}

export async function generateStaticParams() {
  try {
    const allSlugs: string[] = []
    let hasMore = true
    let after: string | null = null

    console.log('[generateStaticParams] Starting post slug collection...')

    // Paginate through all posts to gather slugs
    while (hasMore) {
      const response: GetAllPostSlugsResponse = await wpgraphqlBatch<GetAllPostSlugsResponse>({
        query: QUERY_ALL_POST_SLUGS,
        variables: { first: 100, after },
        revalidate: false,
      })

      response.posts.nodes.forEach((node: { slug: string }) => {
        allSlugs.push(node.slug)
      })

      hasMore = response.posts.pageInfo.hasNextPage
      after = response.posts.pageInfo.endCursor

      console.log(`[generateStaticParams] Collected ${allSlugs.length} slugs so far...`)
    }

    console.log(`[generateStaticParams] Complete: Pre-built ${allSlugs.length} post routes`)

    return allSlugs.map((slug) => ({ slug }))
  } catch (error) {
    console.error('[generateStaticParams] Failed to fetch post slugs:', error)
    // On error, return empty array
    // Next.js will fall back to on-demand ISR (slower first request, but still works)
    return []
  }
}
