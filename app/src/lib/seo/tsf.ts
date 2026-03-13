import { Metadata } from 'next'
import type { TsfSeo } from '../graphql/types'
import { transformTsfSeoToMetadata } from './transformTsfSeoToMetadata'

type SeoEntity = {
  tsfSeo?: TsfSeo | null
  title?: string | null
  excerpt?: string | null
  uri?: string | null
  slug?: string | null
}

export function metadataFromSeoEntity(entity: SeoEntity | null | undefined): Metadata {
  if (!entity) return { title: 'Page not found' }

  return transformTsfSeoToMetadata(
    entity.tsfSeo ?? null,
    entity.title ?? undefined,
    entity.excerpt ?? undefined,
    { uri: entity.uri, slug: entity.slug },
  )
}
