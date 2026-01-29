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
      <div className="mx-auto max-w-6xl px-4 pt-30">
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
              {link.iconKind && (
                <Icon
                  kind={link.iconKind}
                  image={link.iconImage?.node}
                  size={54}
                  className="text-gold"
                />
              )}{' '}
              <span className="text-gold text-sm font-medium uppercase">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto max-w-3xl px-4 pb-30">
        {/* Row 2: Quote + Attribution */}
        {footerSettings.footerQuote && (
          <div className="mb-12 text-center">
            <h2 className="text-h2 mb-2 text-white italic">{footerSettings.footerQuote}</h2>
            {footerSettings.footerQuoteAttribution && (
              <h6 className="text-h6 text-white uppercase">
                {footerSettings.footerQuoteAttribution}
              </h6>
            )}
          </div>
        )}

        {/* Row 3: WYSIWYG HTML */}
        {footerSettings.footerRow3Html && (
          <div className="mb-8 text-center text-white uppercase [&_a]:text-white [&_a]:hover:opacity-80 [&_p]:text-[13px] [&_p]:text-white">
            <RawHtml html={footerSettings.footerRow3Html} />
          </div>
        )}

        {/* Row 4: WYSIWYG HTML */}
        {footerSettings.footerRow4Html && (
          <div className="mb-8 text-center text-white uppercase [&_a]:text-white [&_a]:hover:opacity-80 [&_p]:text-[13px] [&_p]:text-white">
            <RawHtml html={footerSettings.footerRow4Html} />
          </div>
        )}

        {/* Row 5: Disclaimer (now textarea, plain text) */}
        {footerSettings.footerDisclaimerHtml && (
          <div className="pt-4 text-left text-[13px] text-white uppercase">
            {footerSettings.footerDisclaimerHtml}
          </div>
        )}
      </div>
    </footer>
  )
}
