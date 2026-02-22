import './globals.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { BackToTopButton } from '@/components/ui/BackToTopButton'
import { NavigationHandler } from '@/components/NavigationHandler'
import { Suspense } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
        <Header />
        <main className="flex-1">{children}</main>
        <BackToTopButton />
        <Footer />
      </body>
    </html>
  )
}
