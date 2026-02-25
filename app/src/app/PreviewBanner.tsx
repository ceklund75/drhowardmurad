// app/PreviewBanner.tsx
import { draftMode } from 'next/headers'
import Link from 'next/link'

export default async function PreviewBanner() {
  const { isEnabled } = await draftMode()

  if (!isEnabled) return null

  return (
    <div className="bg-yellow-500 px-4 py-2 text-sm text-black">
      Preview mode active.{' '}
      <Link href="/api/exit-preview" className="underline">
        Exit preview
      </Link>
    </div>
  )
}
