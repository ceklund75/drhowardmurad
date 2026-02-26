import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_BLOG_INDEX } from '@/lib/graphql/queries'
import { GetBlogIndexResponse } from '@/lib/graphql/types'

export const PAGE_SIZE = 12

type PageCursor = {
  page: number
  after: string | null
}

type PaginationOptions = {
  preview?: boolean
}

let blogPageCursors: PageCursor[] | null = null
let building = false

async function buildBlogPageCursors(preview: boolean = false): Promise<PageCursor[]> {
  // In preview mode, always build fresh cursors without using the shared cache
  if (preview) {
    return buildBlogPageCursorsOnce(true)
  }

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
    const cursors = await buildBlogPageCursorsOnce(false)
    blogPageCursors = cursors
    return cursors
  } finally {
    building = false
  }
}

async function buildBlogPageCursorsOnce(preview: boolean): Promise<PageCursor[]> {
  const cursors: PageCursor[] = []
  let after: string | null = null
  let page = 1

  while (true) {
    const data: GetBlogIndexResponse = await wpgraphql<GetBlogIndexResponse>({
      query: QUERY_BLOG_INDEX,
      variables: { first: PAGE_SIZE, after },
      revalidate: false, // no ISR for cursor-building
      preview,
    })

    const posts = data.posts

    if (!posts.nodes.length) break

    cursors.push({ page, after })

    if (!posts.pageInfo.hasNextPage || !posts.pageInfo.endCursor) {
      break
    }

    after = posts.pageInfo.endCursor
    page += 1
  }

  return cursors
}

export async function fetchBlogPage(page: number, options: PaginationOptions = {}) {
  const { preview = false } = options

  const cursors = await buildBlogPageCursors(preview)

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
    revalidate: preview ? false : 86400,
    preview,
  })

  return data
}

export async function getTotalBlogPages(options: PaginationOptions = {}): Promise<number> {
  const { preview = false } = options

  const cursors = await buildBlogPageCursors(preview)
  return cursors.length
}
