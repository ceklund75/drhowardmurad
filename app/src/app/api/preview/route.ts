import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

const PREVIEW_SECRET = process.env.WP_PREVIEW_SECRET

export async function GET(request: NextRequest) {
  const url = new URL(request.url)

  const secret = url.searchParams.get('secret')
  const rawSlug = url.searchParams.get('slug')
  const id = url.searchParams.get('id')
  const type = url.searchParams.get('type')

  if (!secret || !PREVIEW_SECRET || secret !== PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 401 })
  }

  if (!rawSlug) {
    return new Response('Missing slug', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  const slug = rawSlug.startsWith('/') ? rawSlug : `/${rawSlug}`
  const target = new URL(slug, url.origin)
  if (id) target.searchParams.set('previewId', id)
  if (type) target.searchParams.set('previewType', type)

  redirect(slug)
}
