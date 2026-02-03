import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_BLOG_INDEX } from '@/lib/graphql/queries'
import { GetBlogIndexResponse } from '@/lib/graphql/types'
import { notFound } from 'next/navigation'

import BlogGrid from '@/components/blog/BlogGrid'
import BlogHero from '@/components/blog/BlogHero'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  console.log('[BlogPage] Fetching blog index data...')

  const data = await wpgraphql<GetBlogIndexResponse>({
    query: QUERY_BLOG_INDEX,
    variables: { first: 12 },
    // revalidate: 3600, // optional override if you want
  })

  if (!data?.page) {
    console.log('[BlogPage] Blog page not found in WordPress')
    notFound()
  }

  console.log('[BlogPage] Loaded', data.posts.nodes.length, 'posts')

  return (
    <div className="bg-gray-alt lg:bg-white">
      {/* Hero Section */}
      {data.page.pageHero && <BlogHero hero={data.page.pageHero} title={data.page.title} />}

      {/* Blog Grid */}
      <section className="mx-auto px-4 pb-4 lg:pt-4">
        <BlogGrid posts={data.posts.nodes} />
      </section>
    </div>
  )
}
