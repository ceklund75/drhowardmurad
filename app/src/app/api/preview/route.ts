import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

const PREVIEW_SECRET = process.env.WP_PREVIEW_SECRET

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const secret = searchParams.get('secret')
  const rawSlug = searchParams.get('slug') // "/about" or "about"

  if (!secret || !PREVIEW_SECRET || secret !== PREVIEW_SECRET) {
    return new Response('Invalid preview secret', { status: 401 })
  }

  if (!rawSlug) {
    return new Response('Missing slug', { status: 400 })
  }

  const draft = await draftMode()
  draft.enable()

  const slug = rawSlug.startsWith('/') ? rawSlug : `/${rawSlug}`

  redirect(slug)
}
