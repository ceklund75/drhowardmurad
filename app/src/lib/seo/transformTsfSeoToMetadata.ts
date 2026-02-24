// lib/seo.ts
import { Metadata } from 'next'
import { TsfSeo } from '@/lib/graphql/types'

export function transformTsfSeoToMetadata(
  tsfSeo: TsfSeo | null | undefined,
  fallbackTitle?: string,
  fallbackDescription?: string,
): Metadata {
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
  if (tsfSeo.canonicalUrl) {
    metadata.alternates = {
      canonical: tsfSeo.canonicalUrl,
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
