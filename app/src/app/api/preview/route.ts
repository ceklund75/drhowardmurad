import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

const PREVIEW_SECRET = process.env.WP_PREVIEW_SECRET

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') // e.g. "/about", "/blog/my-post"

  // 1) Validate secret
  if (!secret || !PREVIEW_SECRET || secret !== PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 401 })
  }

  // 2) Validate slug
  if (!slug) {
    return new Response('Missing slug', { status: 400 })
  }

  // 3) Enable draft mode (sets cookies)
  const draft = await draftMode()
  draft.enable()

  // 4) Redirect to the slug we want to preview
  redirect(slug)
}
