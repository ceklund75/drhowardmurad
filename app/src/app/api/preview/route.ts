import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const preview = searchParams.get('preview')
  const slug = searchParams.get('slug') || '/'
  const previewId = searchParams.get('previewId')
  const previewType = searchParams.get('previewType')

  console.log('[API/preview] params:', { preview, slug, previewId, previewType })

  if (preview !== 'true' || !previewId || !previewType) {
    console.log('[API/preview] Unauthorized')
    return new Response('Unauthorized', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  console.log('[API/preview] draftMode enabled')

  // IMPORTANT: Build a proper path, not a full URL, for redirect()
  // Next.js redirect() accepts a relative path just fine.
  const path = slug.startsWith('/') ? slug : `/${slug}`

  // Optionally keep previewId/previewType in the URL if your page uses them
  const query = new URLSearchParams({
    previewId,
    previewType,
  }).toString()

  const redirectTo = query ? `${path}?${query}` : path

  console.log('[API/preview] redirecting to:', redirectTo)

  redirect(redirectTo)
}
