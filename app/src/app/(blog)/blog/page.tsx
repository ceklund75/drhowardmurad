import { apolloClient } from "@/lib/graphql/client";
import { GET_POSTS } from "@/lib/graphql/queries";


export default async function BlogPage() {
  const result = await apolloClient.query({
    query: GET_POSTS,
    variables: { first: 3 },
  });

  const data = result.data as any;
  const posts = data?.posts?.nodes ?? [];

  return (
    <main className="max-w-3xl mx-auto p-8 space-y-4">
      
      <h1 className="text-2xl font-bold">Test posts from WordPress</h1>
      {posts.length === 0 && <p>No posts returned.</p>}
      <ul className="space-y-3">
        {posts.map((post: any) => (
          <li key={post.id} className="border-b pb-3">
            <h2 className="font-semibold">{post.title}</h2>
            {post.blogPost?.introText && (
              <p className="text-gray-700 text-sm mt-1">
                {post.blogPost.introText}
              </p>
            )}
          </li>
        ))}
      </ul>
      
    </main>
  );
}