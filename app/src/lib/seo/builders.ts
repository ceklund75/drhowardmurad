// lib/seo/builders.ts
import type { Metadata } from 'next'
import type { TsfSeo } from '@/lib/graphql/types'
import { wpgraphql } from '@/lib/graphql/server'
import {
  QUERY_PAGE_SEO_BY_URI,
  QUERY_POST_SEO_BY_SLUG,
  QUERY_CATEGORY_BASICS,
} from '@/lib/graphql/queries'
import { metadataFromSeoEntity } from './tsf'
import type { ResolvedBySlug } from '../graphql/resolveBySlug'

type SeoBuilderOptions = {
  preview?: boolean
}

export async function buildRootResolverMetadata(
  slug: string,
  options: SeoBuilderOptions = {},
): Promise<Metadata> {
  const { preview = false } = options
  const pageResult = await wpgraphql<{
    page: { title: string | null; tsfSeo: TsfSeo | null } | null
  }>({
    query: QUERY_PAGE_SEO_BY_URI,
    variables: { id: `/${slug}` },
    revalidate: 86400,
    preview,
  })

  if (pageResult.page) return metadataFromSeoEntity(pageResult.page)

  const postResult = await wpgraphql<{
    post: { title: string | null; excerpt: string | null; tsfSeo: TsfSeo | null } | null
  }>({
    query: QUERY_POST_SEO_BY_SLUG,
    variables: { id: slug },
    revalidate: 86400,
  })
  if (postResult.post) return metadataFromSeoEntity(postResult.post)

  return { title: 'Page not found' }
}

export async function buildRootResolverMetadataFromResolved(
  slug: string,
  resolved: ResolvedBySlug,
  options: SeoBuilderOptions = {},
): Promise<Metadata> {
  const { preview = false } = options

  if (resolved.kind === 'page') {
    const pageResult = await wpgraphql<{
      page: { title: string | null; tsfSeo: TsfSeo | null } | null
    }>({
      query: QUERY_PAGE_SEO_BY_URI,
      variables: { id: slug }, //`/${slug}`
      revalidate: 86400,
      preview,
    })

    if (pageResult.page) return metadataFromSeoEntity(pageResult.page)
  }

  if (resolved.kind === 'post') {
    const postResult = await wpgraphql<{
      post: { title: string | null; excerpt: string | null; tsfSeo: TsfSeo | null } | null
    }>({
      query: QUERY_POST_SEO_BY_SLUG,
      variables: { id: slug },
      revalidate: 86400,
      preview,
    })

    if (postResult.post) return metadataFromSeoEntity(postResult.post)
  }

  // If nothing resolved, keep current fallback
  return { title: 'Page not found' }
}

export async function buildBlogIndexMetadata(
  page: number,
  options: SeoBuilderOptions = {},
): Promise<Metadata> {
  const { preview = false } = options
  const result = await wpgraphql<{ page: { title: string | null; tsfSeo: TsfSeo | null } | null }>({
    query: QUERY_PAGE_SEO_BY_URI,
    variables: { id: '/blog' },
    revalidate: 86400,
    preview,
  })
  return metadataFromSeoEntity(result.page)
}

export async function buildHomeMetadata(options: SeoBuilderOptions = {}): Promise<Metadata> {
  const { preview = false } = options
  const result = await wpgraphql<{ page: { title: string | null; tsfSeo: TsfSeo | null } | null }>({
    query: QUERY_PAGE_SEO_BY_URI,
    variables: { id: '/' },
    revalidate: 86400,
    preview,
  })
  return metadataFromSeoEntity(result.page)
}

export async function buildCategoryMetadata(
  slug: string,
  options: SeoBuilderOptions = {},
): Promise<Metadata> {
  const { preview = false } = options
  const result = await wpgraphql<{
    category: { name: string | null; description: string | null } | null
  }>({
    query: QUERY_CATEGORY_BASICS,
    variables: { slug },
    revalidate: 86400,
    preview,
  })

  const category = result.category
  if (!category) {
    return { title: 'Category not found' }
  }

  const title = category.name ?? 'Category'
  const description = category.description ?? `Articles in the ${title} category.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
      card: 'summary',
    },
  }
}
