import type { NextRequest } from 'next/server'
import { revalidatePath } from 'next/cache'

const WORDPRESS_REVALIDATE_SECRET = process.env.WORDPRESS_REVALIDATE_SECRET

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const secret = searchParams.get('secret')
  const path = searchParams.get('path')

  if (!secret || secret !== WORDPRESS_REVALIDATE_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  if (!path || !path.startsWith('/')) {
    return new Response('Missing or invalid path', { status: 400 })
  }

  try {
    revalidatePath(path) // App Router ISR invalidation
    return new Response(`Revalidated: ${path}`, { status: 200 })
  } catch (err) {
    console.error('[revalidate] Error revalidating', path, err)
    return new Response('Error revalidating', { status: 500 })
  }
}
