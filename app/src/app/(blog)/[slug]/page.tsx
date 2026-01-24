import { apolloClient } from "@/lib/graphql/client";
import { GET_POST_BY_SLUG } from "@/lib/graphql/queries";
import { GetPostBySlugResponse } from "@/lib/graphql/types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const result = await apolloClient.query<GetPostBySlugResponse>({
    query: GET_POST_BY_SLUG,
    variables: { slug },
  });

  const data = result.data;
  const post = data?.post;

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <p>We couldn&apos;t find a post for slug: {slug}</p>
      </main>
    );
  }

  const acf = post.blogPost;
  const contentAssociatedImage = acf?.contentAssociatedImage?.node;

  return (
    <main className="max-w-3xl mx-auto p-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
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
        <section className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="italic">{acf.introText}</p>
        </section>
      )}

      {acf?.expandedContent && (
        <section className="prose max-w-none">
          <div
            dangerouslySetInnerHTML={{ __html: acf.expandedContent }}
          />
        </section>
      )}

      {acf?.amazonBookUrl && (
        <section>
          <a
            href={acf.amazonBookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700"
          >
            View on Amazon
          </a>
        </section>
      )}

      {acf?.learnMoreUrl && (
        <section>
          <a
            href={acf.learnMoreUrl}
            className="text-blue-600 hover:underline"
          >
            Learn more →
          </a>
        </section>
      )}

      {acf?.videoPopupButton && (
        <section>
          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
            {acf.videoPopupButton}
          </button>
        </section>
      )}

      {acf?.imagePhotoCredit && (
        <footer className="border-t pt-4 mt-8 text-sm text-gray-600">
          Photo credit:{" "}
          {acf.imagePhotoCreditLink?.url ? (
            <a
              href={acf.imagePhotoCreditLink.url}
              target={acf.imagePhotoCreditLink.target || "_self"}
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
  );
}
