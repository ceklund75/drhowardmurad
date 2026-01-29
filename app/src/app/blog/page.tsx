import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_ALL_POST_SLUGS } from '@/lib/graphql/queries'
import { GetAllPostSlugsResponse } from '@/lib/graphql/types'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  let posts: GetAllPostSlugsResponse['posts']['nodes'] = []
  let error = null

  try {
    const data = await wpgraphql<GetAllPostSlugsResponse>({
      query: QUERY_ALL_POST_SLUGS,
      variables: { first: 20 },
      revalidate: 3600,
    })
    posts = data.posts.nodes
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error'
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Blog</h1>

      {error && (
        <div className="mb-8 rounded border border-red-300 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="block rounded border border-gray-200 p-4 hover:bg-gray-50"
            >
              <p className="text-gray-600">{post.slug}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
