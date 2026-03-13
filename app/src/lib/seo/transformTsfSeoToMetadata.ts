// lib/seo.ts
import { Metadata } from 'next'
import { TsfSeo } from '@/lib/graphql/types'

type CanonicalOptions = {
  uri?: string | null
  slug?: string | null
}

export function transformTsfSeoToMetadata(
  tsfSeo: TsfSeo | null | undefined,
  fallbackTitle?: string,
  fallbackDescription?: string,
  options: CanonicalOptions = {},
): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://drhowardmurad.com'
  const path = tsfSeo?.canonicalUrl
    ? undefined
    : (options?.slug || options?.uri || '').replace(/^\/?/, '/')
  const canonical = tsfSeo?.canonicalUrl || `${siteUrl}${path || ''}`
  if (!tsfSeo) {
    return {
      title: fallbackTitle,
      description: fallbackDescription,
    }
  }

  const metadata: Metadata = {
    title: tsfSeo.title || fallbackTitle,
    description: tsfSeo.description || fallbackDescription,
  }

  // Canonical URL
  if (canonical) {
    metadata.alternates = {
      canonical,
    }
  }

  // Robots directives
  if (tsfSeo.noindex || tsfSeo.nofollow || tsfSeo.noarchive) {
    metadata.robots = {
      index: !tsfSeo.noindex,
      follow: !tsfSeo.nofollow,
      noarchive: tsfSeo.noarchive || undefined,
    }
  }

  // Open Graph
  if (tsfSeo.openGraphTitle || tsfSeo.openGraphDescription || tsfSeo.socialImageUrl) {
    metadata.openGraph = {
      title: tsfSeo.openGraphTitle || tsfSeo.title || fallbackTitle,
      description: tsfSeo.openGraphDescription || tsfSeo.description || fallbackDescription,
      images: tsfSeo.socialImageUrl ? [tsfSeo.socialImageUrl] : undefined,
      url: canonical,
    }
  }

  // Twitter Card
  if (tsfSeo.twitterTitle || tsfSeo.twitterDescription || tsfSeo.socialImageUrl) {
    metadata.twitter = {
      card:
        (tsfSeo.twitterCardType as 'summary' | 'summary_large_image' | 'app' | 'player') ||
        'summary_large_image',
      title: tsfSeo.twitterTitle || tsfSeo.title || fallbackTitle,
      description: tsfSeo.twitterDescription || tsfSeo.description || fallbackDescription,
      images: tsfSeo.socialImageUrl ? [tsfSeo.socialImageUrl] : undefined,
    }
  }

  return metadata
}
