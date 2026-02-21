import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { wpgraphql, wpgraphqlBatch } from '@/lib/graphql/server'
import {
  QUERY_POSTS_BY_CATEGORY,
  QUERY_ALL_CATEGORIES,
  QUERY_PAGE_BY_URI,
} from '@/lib/graphql/queries'
import {
  GetPostsByCategoryResponse,
  GetAllCategorySlugsResponse,
  GetAllCategoriesResponse,
  GetPageByUriResponse,
} from '@/lib/graphql/types'
import { themeClassFromCategory } from '@/lib/theme'
import BlogGrid from '@/components/blog/BlogGrid'
import BlogHero from '@/components/blog/BlogHero'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  const [postsData, categoriesData, blogPageData] = await Promise.all([
    wpgraphql<GetPostsByCategoryResponse>({
      query: QUERY_POSTS_BY_CATEGORY,
      variables: { slug, first: 50, after: null },
      revalidate: 3600,
    }),
    wpgraphql<GetAllCategorySlugsResponse>({
      query: QUERY_ALL_CATEGORIES,
      variables: { first: 100 },
      revalidate: 3600,
    }),
    wpgraphql<GetPageByUriResponse>({
      query: QUERY_PAGE_BY_URI,
      variables: { id: '/blog' },
      revalidate: 3600,
    }),
  ])

  const posts = postsData.posts.nodes
  if (!posts.length) {
    notFound()
  }

  const allCategories = categoriesData.categories.nodes
  const blogPage = blogPageData.page

  return (
    <>
      {blogPage?.pageHero && <BlogHero hero={blogPage.pageHero} hideForm={true} />}
      {/* Breadcrumb Bar with ALL categories */}
      <div className="bg-gray-alt lg:bg-light-1 w-full pt-3.75 lg:pt-0">
        <div className="bg-light-1 mx-auto max-w-300 px-4 py-6">
          <nav
            aria-label="Categories"
            className="flex flex-wrap items-center justify-center gap-3 text-sm"
          >
            <Link href="/blog" className="text-gray-1 hover:text-pink uppercase transition-colors">
              All
            </Link>

            <span className="text-gray-400">/</span>

            <ul className="flex flex-wrap items-center justify-center gap-3">
              {allCategories.map((cat, index) => {
                const themeClass = themeClassFromCategory(cat.slug)
                const isActive = cat.slug === slug

                return (
                  <React.Fragment key={cat.id}>
                    {index > 0 && <span className="text-gray-400">/</span>}
                    <li>
                      <span className={themeClass}>
                        <Link
                          href={`/category/${cat.slug}`}
                          className={[
                            'uppercase transition-colors',
                            isActive
                              ? 'font-semibold text-[var(--color-theme)]'
                              : 'text-[var(--color-theme)]/80 hover:text-[var(--color-theme)]',
                          ].join(' ')}
                        >
                          {cat.name}
                        </Link>
                      </span>
                    </li>
                  </React.Fragment>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>

      {/* Grid */}
      <section className="bg-gray-alt mx-auto p-4 lg:bg-white">
        <BlogGrid posts={posts} />
      </section>
    </>
  )
}

export const dynamicParams = true // allow any future categories to still work

export async function generateStaticParams() {
  try {
    const response: GetAllCategoriesResponse = await wpgraphqlBatch<GetAllCategoriesResponse>({
      query: QUERY_ALL_CATEGORIES,
      variables: { first: 100 },
    })

    return response.categories.nodes.filter((c) => c.slug).map((c) => ({ slug: c.slug }))
  } catch (error) {
    console.error('[generateStaticParams/category] Failed:', error)
    return []
  }
}
