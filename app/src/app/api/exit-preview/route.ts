import { draftMode } from 'next/headers'
import type { NextRequest } from 'next/server'

function getSearchParam(req: NextRequest, key: string): string | null {
  const url = new URL(req.url)
  const value = url.searchParams.get(key)
  return value && value.trim().length > 0 ? value : null
}

export async function GET(req: NextRequest) {
  const draft = await draftMode()
  draft.disable()

  const slug = getSearchParam(req, 'slug') || '/'
  const normalizedSlug = slug.startsWith('/') ? slug : `/${slug}`

  return Response.redirect(new URL(normalizedSlug, req.url), 307)
}
