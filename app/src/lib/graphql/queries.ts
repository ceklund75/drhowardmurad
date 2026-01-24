import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query GetPosts($first: Int = 3) {
    posts(first: $first) {
      nodes {
        id
        title
        slug
        blogPost {
          __typename
          introText
        }
      }
    }
  }
`

export const GET_POST_BY_SLUG = gql`
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      databaseId
      uri
      title
      excerpt
      blogPost {
        __typename
        videoPopupButton
        learnMoreUrl
        introText
        imagePhotoCreditLink {
          target
          title
          url
        }
        imagePhotoCredit
        expandedContent
        contentAssociatedImage {
          node {
            altText
            mediaDetails {
              width
              height
            }
            mediaItemUrl
          }
        }
        amazonBookUrl
      }
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
    }
  }
`

export const GET_PRIMARY_MENU = gql`
  query PrimaryMenu($location: MenuLocationEnum!) {
    menuItems(where: { location: $location }) {
      nodes {
        id
        parentId
        label
        url
        path
      }
    }
  }
`
