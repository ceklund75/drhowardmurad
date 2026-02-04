import { notFound } from 'next/navigation'
import { fetchBlogPage, getTotalBlogPages } from '@/lib/blog/pagination'
import BlogHero from '@/components/blog/BlogHero'
import BlogGrid from '@/components/blog/BlogGrid'

export default async function BlogPage() {
  const pageNumber = 1

  const [data, totalPages] = await Promise.all([fetchBlogPage(pageNumber), getTotalBlogPages()])

  if (!data || !data.page) {
    notFound()
  }

  const { posts } = data

  return (
    <>
      {data.page.pageHero && (
        <BlogHero hero={data.page.pageHero} title={data.page.title} hideForm={false} />
      )}

      <section className="mx-auto p-4">
        <BlogGrid posts={posts.nodes} />

        {/* Pagination controls */}
        <div className="mt-12 flex justify-center gap-4">
          {/* No previous for page 1 */}
          {pageNumber < totalPages && (
            <a
              href="/blog/page/2"
              className="inline-flex items-center border border-[var(--color-gray-1)] px-4 py-2 text-sm font-semibold tracking-wide text-[var(--color-gray-1)] uppercase transition-colors hover:bg-[var(--color-gray-1)] hover:text-white"
            >
              Next Page
            </a>
          )}
        </div>
      </section>
    </>
  )
}
