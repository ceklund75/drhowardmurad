import './globals.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { BackToTopButton } from '@/components/ui/BackToTopButton'
import { NavigationHandler } from '@/components/NavigationHandler'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { caslon, barlowSemiCondensed } from './fonts'
import PreviewBanner from './PreviewBanner'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'

export const metadata: Metadata = {
  metadataBase: new URL('https://drhowardmurad.com'),
  title: {
    default: 'Dr. Howard Murad',
    template: '%s | Dr. Howard Murad',
  },
  description: 'Father of Modern Wellness',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  if (isEnabled) {
    noStore()
  }

  //  console.log('LAYOUT draftMode.isEnabled:', isEnabled)

  return (
    <html lang="en" className={`${barlowSemiCondensed.variable} ${caslon.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `history.scrollRestoration = "manual"`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col" id="top">
        <Suspense fallback={null}>
          <NavigationHandler />
        </Suspense>
        <PreviewBanner isDraft={isEnabled} />
        <Header />
        <main className="flex-1">{children}</main>
        <BackToTopButton />
        <Footer />
      </body>
    </html>
  )
}
