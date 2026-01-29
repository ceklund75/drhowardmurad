/**
 * src/lib/graphql/server.ts
 * Server-side GraphQL client using Next.js fetch() with ISR support
 * Replaces Apollo for server-side data fetching
 */

export type RevalidateOption = number | false // false = indefinite cache

interface FetchGraphQLOptions {
  query: string
  variables?: Record<string, unknown>
  revalidate?: RevalidateOption // seconds, or false for indefinite
}

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL

if (!WORDPRESS_URL) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not set')
}

const ENDPOINT = `${WORDPRESS_URL}/graphql`

/**
 * Fetch data from WordPress GraphQL endpoint with ISR support.
 *
 * @param query - GraphQL query string (can include fragments)
 * @param variables - Query variables object
 * @param revalidate - ISR revalidation time in seconds, or false for indefinite cache
 * @returns Parsed response.data
 *
 * @example
 * const data = await wpgraphql<GetPostBySlugResponse>({
 *   query: QUERY_POST_BY_SLUG,
 *   variables: { slug: 'my-post' },
 *   revalidate: 86400, // 24h
 * });
 */
export async function wpgraphql<T>({
  query,
  variables,
  revalidate = 3600, // Default 1h
}: FetchGraphQLOptions): Promise<T> {
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      // Next.js fetch options: https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
      next: { revalidate }, // ISR revalidation time
    })

    if (!res.ok) {
      throw new Error(`[wpgraphql] Request failed: ${res.status} ${res.statusText}`)
    }

    const json = await res.json()

    if (json.errors?.length) {
      console.error('[wpgraphql] GraphQL errors:', json.errors)
      throw new Error(json.errors[0]?.message || 'GraphQL request failed')
    }

    return json.data as T
  } catch (error) {
    console.error('[wpgraphql] Error:', error)
    throw error
  }
}

/**
 * Batch fetch helper for static param generation.
 * Same as wpgraphql but with revalidate = false (no caching for static build).
 */
export async function wpgraphqlBatch<T>(options: FetchGraphQLOptions): Promise<T> {
  return wpgraphql<T>({ ...options, revalidate: false })
}
