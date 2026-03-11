'use server'
import { wpgraphql } from '@/lib/graphql/server'
import { QUERY_FOOTER_SETTINGS } from '@/lib/graphql/queries'
import { FooterClient } from './FooterClient'
import type { GetFooterResponse } from '@/lib/graphql/types'
import logger from '@/lib/logger'

export async function Footer() {
  let footerSettings: GetFooterResponse['footer']['footerSettings'] | null = null

  try {
    const data = await wpgraphql<GetFooterResponse>({
      query: QUERY_FOOTER_SETTINGS,
    })
    footerSettings = data?.footer?.footerSettings
  } catch (error) {
    logger.error({ slug: '/', error }, 'Footer WPGraphQL fetch failed.')
  }

  if (!footerSettings) {
    return (
      <footer className="from-gradient-purple to-gradient-pink bg-linear-to-b">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center text-white">
          <p>&copy; {new Date().getFullYear()} Dr. Howard Murad</p>
        </div>
      </footer>
    )
  }

  return <FooterClient footerSettings={footerSettings} />
}
