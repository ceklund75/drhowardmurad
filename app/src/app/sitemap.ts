// app/sitemap.ts
import type { MetadataRoute } from 'next'
import { wpgraphqlBatch } from '@/lib/graphql/server'
import { QUERY_ALL_PAGE_SLUGS, QUERY_ALL_POST_SLUGS } from '@/lib/graphql/queries'
import type { GetAllPageSlugsResponse, GetAllPostSlugsResponse } from '@/lib/graphql/types'
import { getTotalBlogPages } from '@/lib/blog/pagination'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://drhowardmurad.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = []

  // 1) Home
  urls.push({
    url: `${SITE_URL}/`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1,
  })

  // 2) Blog index root (page 1)
  urls.push({
    url: `${SITE_URL}/blog/`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  })

  // 3) Blog pagination (page 2+)
  const totalBlogPages = await getTotalBlogPages()
  for (let page = 2; page <= totalBlogPages; page++) {
    urls.push({
      url: `${SITE_URL}/blog/${page}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.6,
    })
  }

  // 4) Collect all page and post slugs
  const allSlugs: string[] = []

  // Pages
  {
    let hasMore = true
    let after: string | null = null

    while (hasMore) {
      const response: GetAllPageSlugsResponse = await wpgraphqlBatch<GetAllPageSlugsResponse>({
        query: QUERY_ALL_PAGE_SLUGS,
        variables: { first: 100, after },
      })

      response.pages.nodes.forEach((node) => {
        if (!node.slug) return
        // If your homepage exists as a page with empty slug, skip it
        if (node.slug === '' || node.slug === '/') return
        allSlugs.push(node.slug)
      })

      hasMore = response.pages.pageInfo.hasNextPage
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

      response.posts.nodes.forEach((node) => {
        if (!node.slug) return
        allSlugs.push(node.slug)
      })

      hasMore = response.posts.pageInfo.hasNextPage
      after = response.posts.pageInfo.endCursor
    }
  }

  // 5) Map slugs to URLs with trailing slash
  for (const slug of allSlugs) {
    // Skip /home/, since / already exists
    if (slug === 'home') continue
    urls.push({
      url: `${SITE_URL}/${slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    })
  }

  return urls
}
