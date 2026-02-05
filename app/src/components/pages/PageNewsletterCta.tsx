import { PageNewsletterCtaACF } from '@/lib/graphql/types'
import { NewsletterInlineForm } from '../forms/NewsletterInlineForm'

interface PageNewsletterCtaProps {
  cta: PageNewsletterCtaACF
}

export function PageNewsletterCta({ cta }: PageNewsletterCtaProps) {
  const { newsletterBgColor, newsletterHeading, newsletterSubheading, newsletterButtonLabel } = cta

  return (
    <section className={newsletterBgColor ?? 'bg-gray-alt'}>
      <div className="mx-auto max-w-4xl px-6 py-36">
        <div className="bg-white p-2 shadow-sm">
          <div className="space-y-4 border border-[var(--color-medium-purple)]/30 p-12 text-center">
            {newsletterHeading && (
              <h4 className="text-light text-4xl text-[var(--color-medium-purple)]">
                {newsletterHeading}
              </h4>
            )}
            {newsletterSubheading && (
              <p className="text-[var(--color-medium-purple)]">{newsletterSubheading}</p>
            )}

            <div className="mt-4">
              <NewsletterInlineForm buttonLabel={newsletterButtonLabel || 'Sign Up'} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
