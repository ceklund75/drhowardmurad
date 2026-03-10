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

  const normalizedSlug = rawSlug === '/' ? '' : rawSlug.replace(/^\//, '')
  const basePath = normalizedSlug ? `/${normalizedSlug}` : '/'

  const search = new URLSearchParams()
  if (id) search.set('previewId', id)
  if (type) search.set('previewType', type)

  const target = search.toString() ? `${basePath}?${search.toString()}` : basePath

  // Make sure we actually redirect
  redirect(target)
}
