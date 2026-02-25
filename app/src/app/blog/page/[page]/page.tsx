import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import { fetchBlogPage, getTotalBlogPages } from '@/lib/blog/pagination'
import BlogGrid from '@/components/blog/BlogGrid'
import BlogHero from '@/components/blog/BlogHero'

import type { Metadata } from 'next'
import { buildBlogIndexMetadata } from '@/lib/seo/builders'

type BlogPageParams = {
  params: Promise<{ page: string }>
}

export async function generateMetadata({ params }: BlogPageParams): Promise<Metadata> {
  const { page } = await params
  const pageNumber = Number(page) || 1
  const { isEnabled } = await draftMode()
  return buildBlogIndexMetadata(pageNumber, { preview: isEnabled })
}

interface BlogPageNumberProps {
  params: Promise<{ page: string }>
}

export default async function BlogPageNumber({ params }: BlogPageNumberProps) {
  const { page } = await params
  const pageNumber = Number(page)

  if (!Number.isFinite(pageNumber) || pageNumber < 1) {
    notFound()
  }

  const { isEnabled } = await draftMode()
  const preview = isEnabled

  const [data, totalPages] = await Promise.all([
    fetchBlogPage(pageNumber, { preview }),
    getTotalBlogPages({ preview }),
  ])

  if (!data || !data.page) {
    notFound()
  }

  const { page: wpPage, posts } = data

  if (!posts.nodes.length) {
    notFound()
  }

  return (
    <>
      {/* Optional: reuse hero or simplified heading */}
      {wpPage.pageHero && <BlogHero hero={wpPage.pageHero} title={wpPage.title} hideForm={true} />}
      <section className="mx-auto p-4">
        <BlogGrid posts={posts.nodes} />

        <div className="mt-12 flex justify-center gap-4">
          {/* Previous */}
          {pageNumber > 1 && (
            <a
              href={pageNumber === 2 ? '/blog' : `/blog/page/${pageNumber - 1}`}
              className="inline-flex items-center border border-[var(--color-gray-1)] px-4 py-2 text-sm font-semibold tracking-wide text-[var(--color-gray-1)] uppercase transition-colors hover:bg-[var(--color-gray-1)] hover:text-white"
            >
              Previous Page
            </a>
          )}

          {/* Next */}
          {pageNumber < totalPages && (
            <a
              href={`/blog/page/${pageNumber + 1}`}
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

export const dynamicParams = true // page 6+ will still work on-demand

export async function generateStaticParams() {
  try {
    const total = await getTotalBlogPages()
    const prebuildLimit = Math.min(total, 5) // only prebuild first 5 pages

    return Array.from({ length: prebuildLimit }, (_, i) => ({
      page: String(i + 1),
    }))
  } catch (error) {
    console.error('[generateStaticParams/blog/page] Failed:', error)
    return [{ page: '1' }] // at minimum, always prebuild page 1
  }
}
