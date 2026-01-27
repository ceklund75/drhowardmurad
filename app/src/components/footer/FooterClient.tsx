'use client'

import { RawHtml } from '@/components/RawHtml'
import type { FooterSettings } from '@/lib/graphql/types'
import { Icon } from '@/components/Icon'

interface FooterClientProps {
  footerSettings: FooterSettings
}
export function FooterClient({ footerSettings }: FooterClientProps) {
  return (
    <footer className="from-gradient-purple to-gradient-pink bg-linear-to-b">
      <div className="mx-auto max-w-6xl px-4 py-20">
        {/* Row 1: Icon Links (3-column with justify-between) */}
        <div className="mb-12 flex items-center justify-between">
          {footerSettings.footerIconLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.link.url}
              title={link.link.title}
              target={link.link.target || '_self'}
              rel={link.link.target ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center justify-center gap-2 transition hover:opacity-80"
            >
              <Icon
                kind={link.iconKind}
                image={link.iconImage?.node}
                size={54}
                className="text-gold"
              />{' '}
              <span className="text-gold text-sm font-medium uppercase">{link.label}</span>
            </a>
          ))}
        </div>

        {/* Row 2: Quote + Attribution */}
        {footerSettings.footerQuote && (
          <div className="mb-12 text-center">
            <h2 className="text-h2 mb-2 text-white italic">{footerSettings.footerQuote}</h2>
            {footerSettings.footerQuoteAttribution && (
              <h5 className="text-h5 text-white uppercase">
                {footerSettings.footerQuoteAttribution}
              </h5>
            )}
          </div>
        )}

        {/* Row 3: WYSIWYG HTML */}
        {footerSettings.footerRow3Html && (
          <div className="mb-8 text-center text-white">
            <RawHtml html={footerSettings.footerRow3Html} />
          </div>
        )}

        {/* Row 4: WYSIWYG HTML */}
        {footerSettings.footerRow4Html && (
          <div className="mb-8 text-center text-white">
            <RawHtml html={footerSettings.footerRow4Html} />
          </div>
        )}

        {/* Row 5: Disclaimer */}
        {footerSettings.footerDisclaimerHtml && (
          <div className="border-t pt-4 text-left text-xs text-white">
            <RawHtml html={footerSettings.footerDisclaimerHtml} />
          </div>
        )}
      </div>
    </footer>
  )
}
