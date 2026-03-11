import { draftMode } from 'next/headers'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const draft = await draftMode()
  draft.disable()

  // Always redirect to home (you can change this later)
  return Response.redirect(new URL('/', request.url), 307)
}
