/**
 * Complete TypeScript types for all WordPress content + ACF field groups
 * Matches: Posts, Pages, Categories, Footer, Menu
 */

// ============= Image Types =============

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

// ============= Post Types =============

export interface PhotoCreditLink {
  url?: string
  title?: string
  target?: string
}

export interface BlogPostACF {
  __typename?: string
  introText?: string
  expandedContent?: string
  contentAssociatedImage?: FeaturedImage
  amazonBookUrl?: string
  learnMoreUrl?: string
  videoPopupButton?: string
  imagePhotoCredit?: string
  imagePhotoCreditLink?: PhotoCreditLink
}

export interface Category {
  id: string
  databaseId: number
  name: string
  slug: string
  description?: string
}

export interface Post {
  databaseId: number
  id: string
  uri: string
  slug: string
  title: string
  content?: string
  excerpt?: string
  date: string
  modified: string
  featuredImage?: FeaturedImage
  categories: {
    nodes: Category[]
  }
  blogPost: BlogPostACF
}

export interface GetPostBySlugResponse {
  post: Post | null
}

export interface GetPostsResponse {
  posts: {
    nodes: Post[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export interface GetAllPostSlugsResponse {
  posts: {
    nodes: Array<{ slug: string }>
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export interface PreviewLookupPost {
  databaseId: number
  uri: string | null
  status: string
}

export interface GetPreviewLookupResponse {
  post: PreviewLookupPost | null
}

// ============= Page + ACF Types =============

/**
 * Page Hero section
 * Supports two modes:
 * - "home": Video background with hero overlay (subheading, heading, video, fallback, mobile, right image)
 * - "contentbox": Static background with centered content box (bg image, heading, body, theme color)
 */
export interface PageHeroACF {
  heroType?: string[] | 'home' | 'contentbox'
  heroSubheading?: string // home only
  heroHeading?: string
  heroVideoUrl?: string // home only
  heroFallbackImage?: FeaturedImage // home only
  heroMobileImage?: FeaturedImage // home only
  heroRightImage?: FeaturedImage // home only
  heroBgImage?: FeaturedImage // contentbox only
  heroMobileBgImage?: FeaturedImage // contentbox only
  heroBody?: string // contentbox only
  heroThemeColor?: 'blue' | 'pink' | 'purple' | 'orange' | 'green' | 'cyan' | 'cerulean'
  heroShowNewsletterForm?: boolean
  heroNewsletterHeading?: string
  heroNewsletterSubheading?: string
}

export interface PageTextImageAltWrapper {
  pageSectionsTextImageAlt?: TextImageAltSection[]
}

export interface PageTextImageFixedWrapper {
  pageSectionsTextImageFixed?: TextImageFixedSection[]
}

/**
 * Text + Image section (fixed layout: image always left, content always right)
 * Used for: Books, Publications, etc.
 */
export interface TextImageFixedSection {
  sectionBgColor?: string[] | string // Tailwind class: white, gray-50, blue-50, etc.
  textImageFixedLayoutType?: 'backgroundonly' | 'foreground'
  sectionBgImage?: FeaturedImage
  sectionBgHasOverlay?: boolean
  textImageFixedImageDesktop?: FeaturedImage
  textImageFixedImageMobile?: FeaturedImage
  textImageFixedHideImageMobile?: boolean
  textImageFixedSubheading?: string
  textImageFixedHeading?: string
  textImageFixedBody?: string
  textImageFixedButtonLabel?: string
  textImageFixedButtonUrl?: string
  textImageFixedThemeColor?: 'blue' | 'pink' | 'purple' | 'orange' | 'green' | 'cyan' | 'cerulean'
}

/**
 * Text + Image section (alternating layout: flexible positioning)
 * Used for: Home, Innovator, Holistic Wellness, Life Story
 * Supports: Background-only, Extended Left, Extended Right layouts
 * Optional: Collapsible items below content
 */

export interface TextImageAltCollapsible {
  textImageAltCollapsibleTitle?: string
  textImageAltCollapsibleContent?: string
}

export interface InternalLinkConnection {
  __typename: 'AcfContentNodeConnection' // The connection wrapper
  nodes: InternalLinkNode[] // The actual nodes
}

export type InternalLinkNode =
  | { __typename: 'Page'; id: string; uri: string }
  | { __typename: 'Post'; id: string; uri: string }
  | { __typename: 'MediaItem'; id: string; mediaItemUrl: string }

export interface InternalLinkConnection {
  nodes: InternalLinkNode[] // Array of nodes
}

export interface TextImageAltButtonLink {
  linkType?: string | string[]
  internalLink?: InternalLinkConnection | null
  externalUrl?: string | null
  externalTarget?: string | string[]
}

export interface TextImageAltButtonModal {
  modalType?: string | string[] | null
  modalContent?: string | null
}

export interface TextImageAltButton {
  buttonLabel?: string
  buttonType?: string | string[]
  buttonLink?: TextImageAltButtonLink | null
  buttonModal?: TextImageAltButtonModal | null
}

export interface TextImageAltSection {
  sectionAnchorId?: string | null
  sectionBgColor?: string[] | string // Tailwind class: white, gray-50, blue-50, etc.
  textImageAltLayoutType?: 'backgroundonly' | 'extendedleft' | 'extendedright'
  sectionBgImage?: FeaturedImage
  sectionBgHasOverlay?: boolean
  textImageAltExtendedImage?: FeaturedImage
  textImageAltContentAlignment?: string[] | 'left' | 'right'
  textImageAltAutoAlternate?: boolean
  textImageAltImageDesktop?: FeaturedImage
  textImageAltImageHeightPreset?: string | string[]
  textImageAltImageObjectPosition?: string | string[]
  textImageAltImageObjectFit?: string | string[]
  textImageAltImageMobile?: FeaturedImage
  textImageAltHideImageMobile?: boolean
  textImageAltSubheading?: string
  textImageAltHeading?: string
  textImageAltBody?: string
  textImageAltCollapsibleItems?: TextImageAltCollapsible[]
  textImageAltButtonLabel?: string
  textImageAltButtonUrl?: string
  textImageAltButton?: TextImageAltButton
  textImageAltThemeColor?: 'blue' | 'pink' | 'purple' | 'orange' | 'green' | 'cyan' | 'cerulean'
}

/**
 * Newsletter CTA section
 * Email signup form with customizable copy and button label
 */
export interface PageNewsletterCtaACF {
  newsletterBgColor?: string
  newsletterHeading?: string
  newsletterSubheading?: string
  newsletterButtonLabel?: string
}

/**
 * Complete Page ACF structure
 * Combines all reusable page components
 */
export interface PageACF {
  pageHero?: PageHeroACF
  pageTextImageFixed?: TextImageFixedSection[]
  pageTextImageAlt?: TextImageAltSection[]
  pageNewsletterCta?: PageNewsletterCtaACF
}

export type AcfSelectValue = string | string[] | null | undefined

export interface GetAllPageSlugsResponse {
  pages: {
    nodes: { slug: string | null }[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

/**
 * Page node from WordPress
 */
export interface Page {
  databaseId: number
  id: string
  uri: string
  slug: string
  title: string
  content: string
  excerpt?: string
  featuredImage?: FeaturedImage

  pageHero?: PageHeroACF
  pageTextImageFixed?: PageTextImageFixedWrapper
  pageTextImageAlt?: PageTextImageAltWrapper
  pageNewsletterCta?: PageNewsletterCtaACF
}

export interface GetPageByUriResponse {
  page: Page | null
}

export interface GetPageBySlugResponse {
  page: Page | null
}

/**
 * Blog index page response (combines /blog Page + posts list)
 */
export interface GetBlogIndexResponse {
  page: Page | null
  posts: {
    nodes: Post[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

// ============= Category Types =============

export interface GetAllCategorySlugsResponse {
  categories: {
    nodes: Array<{
      id: string
      databaseId: number
      name: string
      slug: string
      description?: string
    }>
  }
}

export interface GetPostsByCategoryResponse {
  posts: {
    nodes: Post[]
    pageInfo: {
      hasNextPage: boolean
      endCursor: string | null
    }
  }
}

export interface GetAllCategoriesResponse {
  categories: {
    nodes: Category[]
  }
}

// ============= Footer Types =============

export interface FooterIconLink {
  iconKind?: 'twitter' | 'murad' | 'app'
  label: string
  link: {
    url: string
    title?: string
    target?: string
  }
  iconImage?: FeaturedImage
}

export interface FooterSettings {
  footerIconLinks: FooterIconLink[]
  footerQuote: string
  footerQuoteAttribution: string
  footerRow3Html: string
  footerRow4Html: string
  footerDisclaimerHtml: string
}

export interface GetFooterResponse {
  footer: {
    footerSettings: FooterSettings
  }
}

// ============= Menu Types =============

export interface MenuItemNode {
  id: string
  parentId?: string | null
  label: string
  url: string
  path?: string | null
  cssClasses?: string | null
}

export interface MenuQuery {
  menuItems: {
    nodes: MenuItemNode[]
  }
}

export interface NavItem {
  id: string
  label: string
  href: string
  cssClasses?: string
  children: NavItem[]
}

export interface TsfSeo {
  canonicalUrl?: string | null
  description?: string | null
  noarchive?: boolean | null
  nofollow?: boolean | null
  noindex?: boolean | null
  openGraphDescription?: string | null
  openGraphTitle?: string | null
  redirectUrl?: string | null
  socialImageId?: string | null
  socialImageUrl?: string | null
  title?: string | null
  twitterCardType?: string | null
  twitterDescription?: string | null
  twitterTitle?: string | null
}
