import { cache } from 'react'
import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_PAGE_BY_URI, QUERY_POST_BY_SLUG } from '@/lib/graphql/queries'
import { GetPageByUriResponse, GetPostBySlugResponse } from '@/lib/graphql/types'
import logger from '@/lib/logger'

export type ResolvedBySlug =
  | { kind: 'page'; page: NonNullable<GetPageByUriResponse['page']> }
  | { kind: 'post'; post: NonNullable<GetPostBySlugResponse['post']> }
  | { kind: 'none' }

type Options = {
  preview: boolean
}

export const resolveBySlug = cache(
  async (slug: string, { preview }: Options): Promise<ResolvedBySlug> => {
    const staticPageSlugs = new Set([
      'innovator-pioneer',
      'holistic-wellness',
      'dr-murads-life-story',
      'books',
      'publications',
    ])
    const revalidateOption = staticPageSlugs.has(slug) ? false : 86400

    // Try Page first
    try {
      const pageData = await wpgraphql<GetPageByUriResponse>({
        query: QUERY_PAGE_BY_URI,
        variables: { id: `/${slug}` },
        revalidate: revalidateOption,
        preview,
      })

      if (pageData.page) {
        return { kind: 'page', page: pageData.page }
      }
    } catch (error) {
      logger.error({ slug, error }, 'resolveBySlug: Page WPGraphQL fetch failed.')
    }

    // Then Post
    try {
      const postData = await wpgraphql<GetPostBySlugResponse>({
        query: QUERY_POST_BY_SLUG,
        variables: { id: slug },
        revalidate: revalidateOption,
        preview,
      })

      if (postData.post) {
        return { kind: 'post', post: postData.post }
      }
    } catch (error) {
      logger.error({ slug, error }, 'resolveBySlug: Post WPGraphQL fetch failed.')
    }

    return { kind: 'none' }
  },
)
