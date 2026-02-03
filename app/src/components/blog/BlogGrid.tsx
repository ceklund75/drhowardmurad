import { Post } from '@/lib/graphql/types'
import PostCard from './PostCard'

interface BlogGridProps {
  posts: Post[]
}

export default function BlogGrid({ posts }: BlogGridProps) {
  if (!posts.length) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-1 text-lg">No posts found.</p>
      </div>
    )
  }

  return (
    <div className="mobile-grid grid grid-cols-1 gap-4.5 p-4 md:grid-cols-2 lg:grid-cols-3 lg:bg-none lg:p-0">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
