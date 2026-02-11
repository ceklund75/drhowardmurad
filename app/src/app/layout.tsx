import './globals.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'
import { BackToTopButton } from '@/components/ui/BackToTopButton'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="top" className="flex-1">
          {children}
        </main>
        <BackToTopButton />
        <Footer />
      </body>
    </html>
  )
}
