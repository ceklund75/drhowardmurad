import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchBlogPage, getTotalBlogPages } from '@/lib/blog/pagination'
import BlogHero from '@/components/blog/BlogHero'
import BlogGrid from '@/components/blog/BlogGrid'

import type { Metadata } from 'next'
import { buildBlogIndexMetadata } from '@/lib/seo/builders'
import logger from '@/lib/logger'

export async function generateMetadata(): Promise<Metadata> {
  try {
    return buildBlogIndexMetadata(1)
  } catch (error) {
    logger.error({ error }, 'generateMetadata failed')
    return {
      title: 'Dr. Howard Murad',
      description: 'Father of Modern Wellness',
    }
  }
}

export default async function BlogPage() {
  const pageNumber = 1

  const [data, totalPages] = await Promise.all([fetchBlogPage(pageNumber), getTotalBlogPages()])

  if (!data || !data.page) {
    notFound()
  }

  const { posts } = data

  //console.log('data: ', data)

  return (
    <>
      {data.page.pageHero && (
        <BlogHero
          hero={data.page.pageHero}
          title={data.page.title}
          hideForm={false}
          hideHeroBody={false}
        />
      )}

      <section className="bg-gray-alt mx-auto p-4 lg:bg-white">
        <BlogGrid posts={posts.nodes} />

        {/* Pagination controls */}
        <div className="mt-12 flex justify-center gap-4">
          {/* No previous for page 1 */}
          {pageNumber < totalPages && (
            <Link
              href="/blog/page/2"
              className="inline-flex items-center border border-[var(--color-gray-1)] px-4 py-2 text-sm font-semibold tracking-wide text-[var(--color-gray-1)] uppercase transition-colors hover:bg-[var(--color-gray-1)] hover:text-white"
            >
              Next Page
            </Link>
          )}
        </div>
      </section>
    </>
  )
}
