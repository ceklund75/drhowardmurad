import Image from 'next/image'
import Link from 'next/link'
import { RawHtml } from '@/components/RawHtml'
import type { Post } from '@/lib/graphql/types'

interface PostRendererProps {
  post: Post
}

export function PostRenderer({ post }: PostRendererProps) {
  const { title, date, categories, blogPost } = post

  // Get the first category for breadcrumb
  const primaryCategory = categories?.nodes?.[0]

  return (
    <>
      {/* Breadcrumb Bar */}
      <div className="bg-light-1 w-full">
        <div className="mx-auto max-w-300 px-4 py-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
            <Link
              href="/blog"
              className="hover:text-pink text-gray-600 uppercase transition-colors"
            >
              All
            </Link>
            {primaryCategory && (
              <>
                <span className="text-gray-400">/</span>
                <Link
                  href={`/category/${primaryCategory.slug}`}
                  className="text-gray-1 hover:text-pink uppercase transition-colors"
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
        <div className="mx-[15px] my-[15px] rounded-none bg-white p-[15px] shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] lg:hidden">
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
            <h1 className="mb-4 text-3xl font-bold text-gray-900">{title}</h1>

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
        <div className="hidden w-full gap-6 lg:flex">
          {/* Left Column - 50% width minus half gap */}
          <div className="flex w-[calc(50%-12px)] justify-end">
            <article
              className="w-full max-w-xl"
              style={{ marginLeft: 'calc((100vw - 1200px) / 2)' }}
            >
              <h1 className="mb-6 text-4xl font-bold text-gray-900">{title}</h1>

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
              <div className="flex justify-end">
                <div className="relative w-[85%]" style={{ aspectRatio: 'auto' }}>
                  <Image
                    src={blogPost.contentAssociatedImage.node.mediaItemUrl}
                    alt={blogPost.contentAssociatedImage.node.altText || ''}
                    width={blogPost.contentAssociatedImage.node.mediaDetails?.width || 800}
                    height={blogPost.contentAssociatedImage.node.mediaDetails?.height || 1200}
                    className="h-auto w-full"
                  />
                </div>
                {blogPost.imagePhotoCredit && (
                  <p className="mt-2 text-right text-xs text-gray-600">
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
          </div>
        </div>
      </div>
    </>
  )
}
