// src/lib/graphql/server.ts
import 'server-only'

export type RevalidateOption = number | false

interface FetchGraphQLOptions {
  query: string
  variables?: Record<string, unknown>
  revalidate?: RevalidateOption
  preview?: boolean // caller tells us if draft is enabled
}

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL
const WP_PREVIEW_USER = process.env.WP_PREVIEW_USER
const WP_PREVIEW_APP_PASSWORD = process.env.WP_PREVIEW_APP_PASSWORD

if (!WORDPRESS_URL) {
  throw new Error('NEXT_PUBLIC_WORDPRESS_URL is not set')
}

const ENDPOINT = `${WORDPRESS_URL}/graphql`

function getPreviewAuthHeader(): string {
  if (!WP_PREVIEW_USER || !WP_PREVIEW_APP_PASSWORD) {
    throw new Error('Preview auth env vars are not set')
  }
  const token = Buffer.from(`${WP_PREVIEW_USER}:${WP_PREVIEW_APP_PASSWORD}`).toString('base64')
  return `Basic ${token}`
}

export async function wpgraphql<T>({
  query,
  variables,
  revalidate = 3600,
  preview = false,
}: FetchGraphQLOptions): Promise<T> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    const fetchOptions: RequestInit & {
      next?: { revalidate?: RevalidateOption }
      cache?: RequestCache
    } = {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    }

    if (preview) {
      headers.Authorization = getPreviewAuthHeader()
      fetchOptions.cache = 'no-store'
    } else {
      fetchOptions.next = { revalidate }
    }

    const res = await fetch(ENDPOINT, fetchOptions)

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

export async function wpgraphqlBatch<T>(options: FetchGraphQLOptions): Promise<T> {
  return wpgraphql<T>({ ...options, revalidate: false })
}
