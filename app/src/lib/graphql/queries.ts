/**
 * src/lib/graphql/queries.ts
 * Minimal queries for footer testing only
 */

export const QUERY_POSTS_BY_CATEGORY = `
  query GetPostsByCategory($slug: String!, $first: Int = 10, $after: String) {
    posts(first: $first, after: $after, where: { categoryName: $slug }) {
      nodes {
        databaseId
        id
        uri
        slug
        title
        content
        excerpt
        date
        featuredImage {
          node {
            altText
            mediaItemUrl
            mediaDetails {
              width
              height
            }
          }
        }
        categories(first: 5) {
          nodes {
            id
            databaseId
            name
            slug
          }
        }
        blogPost {
          introText
          expandedContent
          contentAssociatedImage {
            node {
              altText
              mediaItemUrl
              mediaDetails {
                width
                height
              }
            }
          }
          amazonBookUrl
          learnMoreUrl
          videoPopupButton
          imagePhotoCredit
          imagePhotoCreditLink {
            url
            title
            target
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

export const QUERY_ALL_CATEGORIES = `
  query GetAllCategories($first: Int = 100) {
    categories(first: $first) {
      nodes {
        id
        databaseId
        name
        slug
        description
      }
    }
  }
`

export const QUERY_PAGE_BY_URI = `
  query GetPageByUri($id: ID!) {
    page(id: $id, idType: URI) {
    databaseId
    id
    uri
    slug
    title
    excerpt
    pageHero {
      heroHeading
      heroBody
      heroNewsletterHeading
      heroNewsletterSubheading
      heroShowNewsletterForm
      heroSubheading
      heroThemeColor
      heroType
      heroVideoUrl
      heroBgImage {
        node {
          altText
          mediaItemUrl
          mediaDetails {
            width
            height
          }
        }
      }
    }
  }
}`

export const QUERY_POST_BY_SLUG = `
  query GetPostBySlug($id: ID!) {
    post(id: $id, idType: SLUG) {
      databaseId
      id
      uri
      slug
      title
      content
      excerpt
      date
      featuredImage {
        node {
          altText
          mediaItemUrl
          mediaDetails {
            width
            height
          }
        }
      }
      categories(first: 5) {
        nodes {
          id
          databaseId
          name
          slug
        }
      }
      blogPost {
        introText
        expandedContent
        contentAssociatedImage {
          node {
            altText
            mediaItemUrl
            mediaDetails {
              width
              height
            }
          }
        }
        amazonBookUrl
        learnMoreUrl
        videoPopupButton
        imagePhotoCredit
        imagePhotoCreditLink {
          url
          title
          target
        }
      }
    }
  }
`

export const QUERY_ALL_POST_SLUGS = `
  query GetAllPostSlugs($first: Int = 100, $after: String) {
    posts(first: $first, after: $after) {
      nodes {
        slug
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`

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

export const QUERY_FOOTER_SETTINGS = `
  query GetFooterSettings {
    footer {
      footerSettings {
        footerIconLinks {
          iconKind
          label
          link {
            url
            title
            target
          }
          iconImage {
            node {
              altText
              mediaItemUrl
              mediaDetails {
                height
                width
              }
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
