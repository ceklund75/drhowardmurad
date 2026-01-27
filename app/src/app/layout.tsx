import './globals.css'

import './globals.css'
import { Header } from '@/components/header/Header'
import { Footer } from '@/components/footer/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
