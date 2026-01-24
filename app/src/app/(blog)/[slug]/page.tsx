import { apolloClient } from '@/lib/graphql/client'
import { GET_POST_BY_SLUG } from '@/lib/graphql/queries'
import { GetPostBySlugResponse } from '@/lib/graphql/types'

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params

  const result = await apolloClient.query<GetPostBySlugResponse>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  })

  const data = result.data
  const post = data?.post

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl p-8">
        <h1 className="mb-4 text-2xl font-bold">Post not found</h1>
        <p>We couldn&apos;t find a post for slug: {slug}</p>
      </main>
    )
  }

  const acf = post.blogPost
  const contentAssociatedImage = acf?.contentAssociatedImage?.node

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-8">
      <header>
        <h1 className="mb-2 text-3xl font-bold">{post.title}</h1>
        {post.excerpt && (
          <div
            className="prose prose-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
        )}
      </header>

      {contentAssociatedImage && (
        <figure>
          <img
            src={contentAssociatedImage.mediaItemUrl}
            alt={contentAssociatedImage.altText || post.title}
            className="w-full rounded-lg"
          />
        </figure>
      )}

      {acf?.introText && (
        <section className="rounded border-l-4 border-blue-500 bg-blue-50 p-4">
          <p className="italic">{acf.introText}</p>
        </section>
      )}

      {acf?.expandedContent && (
        <section className="prose max-w-none">
          <div dangerouslySetInnerHTML={{ __html: acf.expandedContent }} />
        </section>
      )}

      {acf?.amazonBookUrl && (
        <section>
          <a
            href={acf.amazonBookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-amber-600 px-6 py-2 text-white hover:bg-amber-700"
          >
            View on Amazon
          </a>
        </section>
      )}

      {acf?.learnMoreUrl && (
        <section>
          <a href={acf.learnMoreUrl} className="text-blue-600 hover:underline">
            Learn more →
          </a>
        </section>
      )}

      {acf?.videoPopupButton && (
        <section>
          <button className="rounded bg-red-600 px-6 py-2 text-white hover:bg-red-700">
            {acf.videoPopupButton}
          </button>
        </section>
      )}

      {acf?.imagePhotoCredit && (
        <footer className="mt-8 border-t pt-4 text-sm text-gray-600">
          Photo credit:{' '}
          {acf.imagePhotoCreditLink?.url ? (
            <a
              href={acf.imagePhotoCreditLink.url}
              target={acf.imagePhotoCreditLink.target || '_self'}
              className="text-blue-600 hover:underline"
            >
              {acf.imagePhotoCredit}
            </a>
          ) : (
            acf.imagePhotoCredit
          )}
        </footer>
      )}
    </main>
  )
}
