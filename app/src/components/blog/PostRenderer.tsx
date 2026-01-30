import Image from 'next/image'
import Link from 'next/link'
import { RawHtml } from '@/components/RawHtml'
import { themeClassFromCategory } from '@/lib/theme'
import type { Post } from '@/lib/graphql/types'

interface PostRendererProps {
  post: Post
}

export function PostRenderer({ post }: PostRendererProps) {
  const { title, date, categories, blogPost } = post

  // Get the first category for breadcrumb
  const primaryCategory = categories?.nodes?.[0]
  const themeClass = themeClassFromCategory(primaryCategory?.slug)

  return (
    <div className={themeClass}>
      {/* Breadcrumb Bar */}
      <div className="bg-light-1 w-full">
        <div className="mx-auto max-w-300 px-4 py-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <Link href="/blog" className="hover:text-pink text-gray-1 uppercase transition-colors">
              All
            </Link>
            {primaryCategory && (
              <>
                <span className="text-gray-400">/</span>
                <Link
                  href={`/category/${primaryCategory.slug}`}
                  className="hover:text-pink text-(--color-theme) uppercase transition-colors"
                >
                  {primaryCategory.name}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
      {/* Main Content Area - Two Column Layout (Desktop) / Card Layout (Mobile) */}
      <div className="w-full">
        {/* Mobile Card Wrapper (< lg:1024px) */}
        <div className="mobile-card lg:hidden">
          {/* Mobile: Image First */}
          {blogPost?.contentAssociatedImage?.node && (
            <div className="mb-6">
              <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                <Image
                  src={blogPost.contentAssociatedImage.node.mediaItemUrl}
                  alt={blogPost.contentAssociatedImage.node.altText || ''}
                  width={blogPost.contentAssociatedImage.node.mediaDetails?.width || 800}
                  height={blogPost.contentAssociatedImage.node.mediaDetails?.height || 1200}
                  className="h-auto w-full"
                />
              </div>
              {blogPost.imagePhotoCredit && (
                <p className="mt-2 text-center text-xs text-gray-600">
                  Photo credit:{' '}
                  {blogPost.imagePhotoCreditLink?.url ? (
                    <a
                      href={blogPost.imagePhotoCreditLink.url}
                      target={blogPost.imagePhotoCreditLink.target || '_blank'}
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {blogPost.imagePhotoCreditLink.title || blogPost.imagePhotoCredit}
                    </a>
                  ) : (
                    <span>{blogPost.imagePhotoCredit}</span>
                  )}
                </p>
              )}
            </div>
          )}

          {/* Mobile: Content */}
          <article>
            <h1 className="mb-4 text-3xl font-bold text-(--color-theme)">{title}</h1>

            {blogPost?.introText && (
              <div className="prose prose-lg mb-6 max-w-none">
                <RawHtml html={blogPost.introText} />
              </div>
            )}

            {/* Placeholder for action buttons - will build in later step */}
            {/* Placeholder for share links - will build in later step */}
          </article>
        </div>

        {/* Desktop Two-Column Layout (>= lg:1024px) */}
        <div className="hidden w-full gap-12 lg:flex">
          {/* Left Column - 50% width minus half gap */}
          <div className="flex w-[calc(50%-12px)] justify-end py-6">
            <article
              className="w-full max-w-xl"
              style={{ marginLeft: 'calc((100vw - 1200px) / 2)' }}
            >
              <h1 className="mb-6 text-(--color-theme)">{title}</h1>

              {blogPost?.introText && (
                <div className="prose prose-lg mb-6 max-w-none">
                  <RawHtml html={blogPost.introText} />
                </div>
              )}

              {/* Placeholder for expanded content (collapsible) - will build in later step */}
              {/* Placeholder for action buttons - will build in later step */}
              {/* Placeholder for share links - will build in later step */}
            </article>
          </div>

          {/* Right Column - 50% width minus half gap */}
          <div className="w-[calc(50%-12px)]">
            {blogPost?.contentAssociatedImage?.node && (
              <div className="flex flex-col items-end">
                <div className="relative w-[85%]" style={{ aspectRatio: 'auto' }}>
                  <Image
                    loading="eager"
                    src={blogPost.contentAssociatedImage.node.mediaItemUrl}
                    alt={blogPost.contentAssociatedImage.node.altText || ''}
                    width={blogPost.contentAssociatedImage.node.mediaDetails?.width || 800}
                    height={blogPost.contentAssociatedImage.node.mediaDetails?.height || 1200}
                    className="h-auto w-full"
                  />
                </div>
                {blogPost.imagePhotoCredit && (
                  <div className="text-gray-1 mt-2 w-[85%] text-right text-xs">
                    Photo credit:{' '}
                    {blogPost.imagePhotoCreditLink?.url ? (
                      <a
                        href={blogPost.imagePhotoCreditLink.url}
                        target={blogPost.imagePhotoCreditLink.target || '_blank'}
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {blogPost.imagePhotoCreditLink.title || blogPost.imagePhotoCredit}
                      </a>
                    ) : (
                      <span>{blogPost.imagePhotoCredit}</span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
