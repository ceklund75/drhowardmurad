import Image from 'next/image'
import Link from 'next/link'
import { ActionButtons } from './ActionButtons'
import { RawHtml } from '@/components/RawHtml'
import { themeClassFromCategory } from '@/lib/theme'
import type { Post, PageNewsletterCtaACF } from '@/lib/graphql/types'
import { ExpandedContent } from '../ExpandedContent'
import { ShareThisPost } from './ShareThisPost'
import { PageNewsletterCta } from '../pages/PageNewsletterCta'
import { buildPostJsonLd } from '@/lib/seo/jsonLd'
import { AsyncImage } from '../AsyncImage'

interface PostRendererProps {
  post: Post
}

export function PostRenderer({ post }: PostRendererProps) {
  const { title, date, categories, blogPost } = post

  // Get the first category for breadcrumb
  const primaryCategory = categories?.nodes?.[0]
  const themeClass = themeClassFromCategory(primaryCategory?.slug)
  const newsletterCta: PageNewsletterCtaACF = {
    newsletterBgColor: 'bg-gray-alt',
    newsletterHeading: 'Modern Wellness Digest',
    newsletterSubheading:
      'Sign-up to receive periodic updates and wellness insights from Dr. Murad himself.',
    newsletterButtonLabel: 'SIGN-UP',
  }

  const jsonLd = buildPostJsonLd(post)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className={themeClass}>
        {/* Breadcrumb Bar */}
        <div className="bg-light-1 w-full">
          <div className="mx-auto max-w-300 px-4 py-6">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-2 text-sm lg:justify-start"
            >
              <Link
                href="/blog"
                className="hover:text-pink text-gray-1 uppercase transition-colors"
              >
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
          <div className="mobile-card bg-white lg:hidden">
            {/* Mobile: Image First */}
            {blogPost?.contentAssociatedImage?.node && (
              <div className="mb-6">
                <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                  <Image
                    src={blogPost.contentAssociatedImage.node.mediaItemUrl}
                    alt={blogPost.contentAssociatedImage.node.altText || ''}
                    width={blogPost.contentAssociatedImage.node.mediaDetails?.width || 800}
                    height={blogPost.contentAssociatedImage.node.mediaDetails?.height || 1200}
                    preload
                    quality={75}
                    className="h-auto w-full"
                    // Tell Next.js this image is only ever shown on screens smaller than 1024px.
                    // After that, cap it so it doesn't generate w=1920 files.
                    sizes="(max-width: 640px) 384px, (max-width: 1024px) 50vw, 640px"
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
              <h1 className="tracking-snug mb-4 text-3xl text-balance text-[var(--color-theme)]">
                {title}
              </h1>

              {blogPost?.introText && (
                <div className="prose prose-lg mb-6 max-w-none">
                  <RawHtml html={blogPost.introText} />
                </div>
              )}
              <ExpandedContent html={blogPost?.expandedContent} />
              <ActionButtons
                amazonUrl={blogPost.amazonBookUrl}
                learnMoreUrl={blogPost.learnMoreUrl}
                videoContent={blogPost.videoContent}
              />
              <ShareThisPost post={post} />
            </article>
          </div>

          {/* Desktop Two-Column Layout (>= lg:1024px) */}
          <div className="hidden w-full gap-12 lg:flex">
            {/* Left Column - 50% width minus half gap */}
            <div className="flex w-[calc(50%-12px)] justify-end py-6 lg:mx-4 xl:mx-0">
              <article
                className="w-full max-w-xl"
                style={{ marginLeft: 'calc((100vw - 1200px) / 2)' }}
              >
                <h1 className="mb-6 text-[var(--color-theme)]">{title}</h1>

                {blogPost?.introText && (
                  <div className="prose prose-lg mb-6 max-w-none">
                    <RawHtml html={blogPost.introText} />
                  </div>
                )}

                <ExpandedContent html={blogPost?.expandedContent} />
                <ActionButtons
                  amazonUrl={blogPost.amazonBookUrl}
                  learnMoreUrl={blogPost.learnMoreUrl}
                  videoContent={blogPost.videoContent}
                />
                <ShareThisPost post={post} />
              </article>
            </div>

            {/* Right Column - 50% width minus half gap */}
            <div className="w-[calc(50%-12px)]">
              {blogPost?.contentAssociatedImage?.node && (
                <div className="flex flex-col items-end">
                  <div className="relative w-[85%]" style={{ aspectRatio: 'auto' }}>
                    <AsyncImage
                      src={blogPost.contentAssociatedImage.node.mediaItemUrl}
                      alt={blogPost.contentAssociatedImage.node.altText || ''}
                      width={blogPost.contentAssociatedImage.node.mediaDetails?.width || 800}
                      height={blogPost.contentAssociatedImage.node.mediaDetails?.height || 1200}
                      quality={75}
                      className="h-auto w-full"
                      sizes="(min-width: 1024px) 33vw, 400px"
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
        <div className="bg-gray-alt pt-3.75 lg:pt-0">
          <PageNewsletterCta cta={newsletterCta} />
        </div>
      </div>
    </>
  )
}
