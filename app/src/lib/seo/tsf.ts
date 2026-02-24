import { Metadata } from 'next'
import type { TsfSeo } from '../graphql/types'
import { transformTsfSeoToMetadata } from './transformTsfSeoToMetadata'

type SeoEntity = {
  tsfSeo?: TsfSeo | null
  title?: string | null
  excerpt?: string | null
}

export function metadataFromSeoEntity(entity: SeoEntity | null | undefined): Metadata {
  if (!entity) return { title: 'Page not found' }

  return transformTsfSeoToMetadata(
    entity.tsfSeo ?? null,
    entity.title ?? undefined,
    entity.excerpt ?? undefined,
  )
}
