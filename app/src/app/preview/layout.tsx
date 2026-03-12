import { draftMode } from 'next/headers'
import PreviewBanner from '../PreviewBanner'

export const dynamic = 'force-dynamic'

export default async function PreviewLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <>
      {isEnabled && <PreviewBanner isDraft />}
      {children}
    </>
  )
}
