import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_POSTS_BY_CATEGORY, QUERY_ALL_CATEGORIES } from '@/lib/graphql/queries'
import { GetPostsByCategoryResponse, GetAllCategorySlugsResponse } from '@/lib/graphql/types'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  try {
    const response: GetAllCategorySlugsResponse = await wpgraphql<GetAllCategorySlugsResponse>({
      query: QUERY_ALL_CATEGORIES,
      variables: { first: 100 },
      revalidate: false,
    })

    return response.categories.nodes.map((cat) => ({ slug: cat.slug }))
  } catch (error) {
    console.error('[generateStaticParams] Failed to fetch categories:', error)
    return []
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let posts: any[] = []
  let error: string | null = null

  try {
    const data = await wpgraphql<GetPostsByCategoryResponse>({
      query: QUERY_POSTS_BY_CATEGORY,
      variables: { slug, first: 20 },
      revalidate: 3600,
    })
    posts = data.posts.nodes
  } catch (err) {
    error = err instanceof Error ? err.message : 'Unknown error'
  }

  if (posts.length === 0 && !error) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Category: {slug}</h1>

      {error && (
        <div className="mb-8 rounded border border-red-300 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts in this category</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${post.slug}`}
              className="block rounded border border-gray-200 p-4 hover:bg-gray-50"
            >
              <h2 className="mb-2 font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.slug}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
