import type { Post, Page } from '@/lib/graphql/types'

export function buildPostJsonLd(post: Post) {
  const primaryCategory = post.categories?.nodes?.[0]

  // You can tweak this to your exact content model
  const description = post.blogPost?.introText || post.excerpt || undefined

  const imageUrl = post.featuredImage?.node?.mediaItemUrl || undefined

  const url = `https://drhowardmurad.com${post.uri ?? ''}`

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    datePublished: post.date,
    dateModified: post.modified ?? post.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    author: {
      '@type': 'Person',
      name: 'Dr. Howard Murad',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Dr. Howard Murad',
      logo: {
        '@type': 'ImageObject',
        url: 'https://drhowardmurad.com/path-to-logo.png', // update to real logo URL
      },
    },
    image: imageUrl ? [imageUrl] : undefined,
    articleSection: primaryCategory?.name,
  }
}

export function buildPageJsonLd(page: Page) {
  const url = `https://drhowardmurad.com${page.uri ?? ''}`

  const heroSubtitle = page.pageHero?.heroSubheading || page.pageHero?.heroBody || undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: heroSubtitle,
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

export function buildHomeJsonLd() {
  const siteUrl = 'https://drhowardmurad.com'

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dr. Howard Murad',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Dr. Howard Murad',
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/path-to-logo.png`, // update
    },
    sameAs: [
      'https://www.instagram.com/…',
      'https://www.facebook.com/…',
      // add real profiles
    ],
  }

  return [webSite, organization]
}
