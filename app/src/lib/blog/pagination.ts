import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_BLOG_INDEX } from '@/lib/graphql/queries'
import { GetBlogIndexResponse } from '@/lib/graphql/types'

export const PAGE_SIZE = 12

type PageCursor = {
  page: number
  after: string | null
}

let blogPageCursors: PageCursor[] | null = null
let building = false

async function buildBlogPageCursors(): Promise<PageCursor[]> {
  if (blogPageCursors && blogPageCursors.length > 0) {
    return blogPageCursors
  }

  if (building) {
    while (building) {
      await new Promise((r) => setTimeout(r, 10))
    }
    return blogPageCursors || []
  }

  building = true

  try {
    const cursors: PageCursor[] = []
    let after: string | null = null
    let page = 1

    while (true) {
      // 1) Explicit type annotation on data
      const data: GetBlogIndexResponse = await wpgraphql<GetBlogIndexResponse>({
        query: QUERY_BLOG_INDEX,
        variables: { first: PAGE_SIZE, after },
        revalidate: false,
      })

      // 2) Destructure after typing data
      const posts = data.posts

      if (!posts.nodes.length) break

      cursors.push({ page, after })

      if (!posts.pageInfo.hasNextPage || !posts.pageInfo.endCursor) {
        break
      }

      after = posts.pageInfo.endCursor
      page += 1
    }

    blogPageCursors = cursors
    return cursors
  } finally {
    building = false
  }
}

export async function fetchBlogPage(page: number) {
  const cursors = await buildBlogPageCursors()

  const entry = cursors.find((c) => c.page === page)
  if (!entry) {
    // page out of range
    return null
  }

  const data = await wpgraphql<GetBlogIndexResponse>({
    query: QUERY_BLOG_INDEX,
    variables: {
      first: PAGE_SIZE,
      after: entry.after,
    },
    revalidate: 3600,
  })

  return data
}

export async function getTotalBlogPages(): Promise<number> {
  const cursors = await buildBlogPageCursors()
  return cursors.length
}
