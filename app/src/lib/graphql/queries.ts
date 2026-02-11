/**
 * src/lib/graphql/queries.ts
 * GraphQL queries and fragments for WordPress content
 * Optimized for minimal data transfer
 */

// ============= FRAGMENTS =============

/**
 * Core image fields used across posts, pages, and ACF
 */
export const FRAGMENT_IMAGE_FIELDS = `
  fragment ImageFields on MediaItem {
    altText
    mediaItemUrl
    mediaDetails {
      width
      height
    }
  }
`

/**
 * Category fields for post categorization
 */
export const FRAGMENT_CATEGORY_FIELDS = `
  fragment CategoryFields on Category {
    id
    name
    slug
  }
`

/**
 * Link fields (used in photo credits, CTAs, footer)
 */
export const FRAGMENT_LINK_FIELDS = `
  fragment LinkFields on AcfLink {
    url
    title
    target
  }
`

/**
 * Blog post ACF fields (full detail for single posts ONLY)
 */
export const FRAGMENT_BLOG_POST_ACF = `
  fragment BlogPostACFFields on BlogPost {
    introText
    expandedContent
    contentAssociatedImage {
      node {
        ...ImageFields
      }
    }
    amazonBookUrl
    learnMoreUrl
    videoPopupButton
    imagePhotoCredit
    imagePhotoCreditLink {
      ...LinkFields
    }
  }
`

/**
 * Page Hero ACF fields (used across all pages)
 */
export const FRAGMENT_PAGE_HERO = `
  fragment PageHeroFields on PageHero {
    heroType
    heroHeading
    heroSubheading
    heroBody
    heroNewsletterHeading
    heroNewsletterSubheading
    heroShowNewsletterForm
    heroThemeColor
    heroVideoUrl
    heroFallbackImage {
     node {
        ...ImageFields
      }
    }
    heroBgImage {
      node {
        ...ImageFields
      }
    }
    heroMobileImage {
      node {
        ...ImageFields
      }
    }
    heroRightImage {
      node {
        ...ImageFields
      }
    }
  }
`

/**
 * Pagination info for cursor-based pagination
 */
export const FRAGMENT_PAGE_INFO = `
  fragment PageInfoFields on WPPageInfo {
    hasNextPage
    endCursor
  }
`

/**
 * Minimal post fields for card displays (blog index, category archives)
 * Only includes what's actually displayed on cards
 */
export const FRAGMENT_POST_CARD = `
  fragment PostCardFields on Post {
    id
    uri
    slug
    title
    date
    featuredImage {
      node {
        ...ImageFields
      }
    }
    categories(first: 5) {
      nodes {
        ...CategoryFields
      }
    }
  }
`

/**
 * Full post fields for single post pages
 * Excludes: content (not used), excerpt (not used), databaseId (not needed)
 */
export const FRAGMENT_POST_FULL = `
  fragment PostFullFields on Post {
    id
    uri
    slug
    title
    date
    featuredImage {
      node {
        ...ImageFields
      }
    }
    categories(first: 5) {
      nodes {
        ...CategoryFields
      }
    }
    blogPost {
      ...BlogPostACFFields
    }
  }
`

// ============= QUERIES =============

/**
 * Fetch single post by slug (for single post pages)
 * Used by: PostRenderer component
 */
export const QUERY_POST_BY_SLUG = `
  ${FRAGMENT_IMAGE_FIELDS}
  ${FRAGMENT_CATEGORY_FIELDS}
  ${FRAGMENT_LINK_FIELDS}
  ${FRAGMENT_BLOG_POST_ACF}
  ${FRAGMENT_POST_FULL}
  
  query GetPostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      ...PostFullFields
    }
  }
`

/**
 * Fetch posts filtered by category (for category archive pages)
 * Used by: Category archive page - displays cards, not full posts
 * Optimized: Uses PostCardFields (minimal) instead of full post data
 */
export const QUERY_POSTS_BY_CATEGORY = `
  ${FRAGMENT_IMAGE_FIELDS}
  ${FRAGMENT_CATEGORY_FIELDS}
  ${FRAGMENT_POST_CARD}
  ${FRAGMENT_PAGE_INFO}
  
  query GetPostsByCategory($slug: String!, $first: Int = 50, $after: String) {
    posts(first: $first, after: $after, where: { categoryName: $slug }) {
      nodes {
        ...PostCardFields
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
`

/**
 * Fetch all post slugs (for static generation)
 * Absolute minimum: only slugs needed for route generation
 */
export const QUERY_ALL_POST_SLUGS = `
  ${FRAGMENT_PAGE_INFO}
  
  query GetAllPostSlugs($first: Int = 100, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        slug
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
`

/**
 * Fetch blog index page (hero + post grid)
 * Used by: /blog page
 * Optimized: Minimal post card fields, removed databaseId from page
 */
export const QUERY_BLOG_INDEX = `
  ${FRAGMENT_IMAGE_FIELDS}
  ${FRAGMENT_PAGE_HERO}
  ${FRAGMENT_CATEGORY_FIELDS}
  ${FRAGMENT_POST_CARD}
  ${FRAGMENT_PAGE_INFO}
  
  query GetBlogIndex($first: Int = 12, $after: String) {
    page(id: "blog", idType: URI) {
      id
      uri
      slug
      title
      pageHero {
        ...PageHeroFields
      }
    }
    
    posts(first: $first, after: $after, where: { status: PUBLISH }) {
      nodes {
        ...PostCardFields
      }
      pageInfo {
        ...PageInfoFields
      }
    }
  }
`

/**
 * Fetch page by URI (for static pages)
 */
export const QUERY_PAGE_BY_URI = `
  ${FRAGMENT_IMAGE_FIELDS}
  ${FRAGMENT_PAGE_HERO}
  query GetPageByUri($id: ID!) {
    page(id: $id, idType: URI) {
      id
      uri
      slug
      title

      pageHero {
        ...PageHeroFields
      }

      pageTextImageAlt {
        pageSectionsTextImageAlt {
          sectionAnchorId
          sectionBgColor
          sectionBgHasOverlay
          sectionBgImage {
            node {
              ...ImageFields
            }
          }
          textImageAltAutoAlternate
          textImageAltBody
          textImageAltButtonLabel
          textImageAltButtonUrl
           textImageAltButton {
            buttonLabel
            buttonType
            buttonLink {
              linkType
              internalLink {
                nodes {
                  ... on Page {
                    id
                    uri
                  }
                  ... on Post {
                    id
                    uri
                  }
                }
              }
              externalUrl
              externalTarget
            }
            buttonModal {
              modalType
              modalContent
            }
          }
          textImageAltCollapsibleItems {
            textImageAltCollapsibleContent
            textImageAltCollapsibleTitle
          }
          textImageAltContentAlignment
          textImageAltExtendedImage {
            node {
              ...ImageFields
            }
          }
          textImageAltHeading
          textImageAltHideImageMobile
          textImageAltImageDesktop {
            node {
              ...ImageFields
            }
          }
          textImageAltImageHeightPreset
          textImageAltImageObjectPosition
          textImageAltImageObjectFit
          textImageAltImageMobile {
            node {
              ...ImageFields
            }
          }
          textImageAltThemeColor
          textImageAltSubheading
          textImageAltLayoutType
        }
      }

      pageTextImageFixed {
        pageSectionsTextImageFixed {
          sectionBgColor
          sectionBgHasOverlay
          sectionBgImage {
            node {
              ...ImageFields
            }
          }
          textImageFixedLayoutType
          textImageFixedImageDesktop {
            node {
              ...ImageFields
            }
          }
          textImageFixedImageMobile {
            node {
              ...ImageFields
            }
          }
          textImageFixedHideImageMobile
          textImageFixedSubheading
          textImageFixedHeading
          textImageFixedBody
          textImageFixedButtonLabel
          textImageFixedButtonUrl
          textImageFixedThemeColor
        }
      }

      pageNewsletterCta {
        newsletterBgColor
        newsletterHeading
        newsletterSubheading
        newsletterButtonLabel
      }
    }
  }
`

/**
 * Fetch all categories (for navigation, filtering)
 * Optimized: Removed databaseId from fragment (not needed)
 */
export const QUERY_ALL_CATEGORIES = `
  ${FRAGMENT_CATEGORY_FIELDS}
  
  query GetAllCategories($first: Int = 100) {
    categories(first: $first, where: { hideEmpty: true }) {
      nodes {
        ...CategoryFields
        description
      }
    }
  }
`

/**
 * Fetch primary menu items
 */
export const QUERY_PRIMARY_MENU = `
  query PrimaryMenu($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }, first: 100) {
      nodes {
        id
        parentId
        label
        url
        path
        cssClasses
      }
    }
  }
`

/**
 * Fetch footer settings and content
 */
export const QUERY_FOOTER_SETTINGS = `
  ${FRAGMENT_IMAGE_FIELDS}
  ${FRAGMENT_LINK_FIELDS}
  
  query GetFooterSettings {
    footer {
      footerSettings {
        footerIconLinks {
          iconKind
          label
          link {
            ...LinkFields
          }
          iconImage {
            node {
              ...ImageFields
            }
          }
        }
        footerQuote
        footerQuoteAttribution
        footerRow3Html
        footerRow4Html
        footerDisclaimerHtml
      }
    }
  }
`
