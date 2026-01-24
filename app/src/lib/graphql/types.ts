// src/lib/graphql/types.ts

export interface ImageNode {
  altText?: string
  mediaItemUrl: string
  mediaDetails?: {
    width?: number
    height?: number
  }
}

export interface FeaturedImage {
  node?: ImageNode
}

export interface PhotoCreditLink {
  target?: string
  title?: string
  url?: string
}

export interface BlogPostACF {
  __typename?: string
  videoPopupButton?: string
  learnMoreUrl?: string
  introText?: string
  imagePhotoCreditLink?: PhotoCreditLink
  imagePhotoCredit?: string
  expandedContent?: string
  contentAssociatedImage?: {
    node?: ImageNode
  }
  amazonBookUrl?: string
}

export interface Post {
  databaseId: number
  uri: string
  title: string
  excerpt?: string
  blogPost: BlogPostACF
  featuredImage?: FeaturedImage
}

export interface GetPostBySlugResponse {
  post: Post | null
}

export interface GetPostsResponse {
  posts: {
    nodes: Array<{
      id: string
      title: string
      slug: string
      acf?: {
        introText?: string
      }
    }>
  }
}
