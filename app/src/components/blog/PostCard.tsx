import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/lib/graphql/types'
import { themeClassFromCategory } from '@/lib/theme'
import { AsyncImage } from '../AsyncImage'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const hasImage = post.featuredImage?.node?.mediaItemUrl
  const imageUrl = post.featuredImage?.node?.mediaItemUrl || ''
  const imageAlt = post.featuredImage?.node?.altText || ''

  return (
    <article className="post-card flex h-full flex-col">
      <Link href={post.uri} className="bg-dark-2 relative block aspect-square overflow-hidden">
        {hasImage ? (
          <AsyncImage
            src={imageUrl}
            alt={imageAlt}
            fill
            quality={75}
            className="object-cover object-center transition-transform duration-300 hover:scale-105 hover:opacity-50"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="bg-gray-alt absolute inset-0 flex items-center justify-center">
            <span className="text-gray-1 text-lg font-medium">{post.title}</span>
          </div>
        )}
      </Link>

      {/* Text Section - Gray background, 36px padding */}
      <div className="bg-gray-alt flex flex-1 flex-col gap-4 p-9">
        {/* Categories Row - Color-coded links */}
        {post.categories.nodes.length > 0 && (
          <div className="flex flex-wrap gap-1 text-sm">
            {post.categories.nodes.map((category, index) => {
              const themeClass = themeClassFromCategory(category.slug)
              const isLast = index === post.categories.nodes.length - 1

              return (
                <span key={category.id} className={themeClass}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="font-medium tracking-wide text-[var(--color-theme)] uppercase hover:underline"
                  >
                    {category.name}
                  </Link>
                  {!isLast && <span className="text-gray-1 ml-1">|</span>}
                </span>
              )
            })}
          </div>
        )}

        {/* Title Row - Linked heading */}
        <h3 className="m-0 text-[28px] leading-tight">
          <Link
            href={post.uri}
            className="text-gray-1 no-underline transition-colors hover:text-[var(--color-theme)]"
          >
            {post.title}
          </Link>
        </h3>
        {/*optional post date for pagination testing */}
        {/* <div className="text-dark-4 py-2 text-xs">{post.date}</div> */}
      </div>
    </article>
  )
}
