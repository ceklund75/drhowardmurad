import { PageNewsletterCtaACF } from '@/lib/graphql/types'
import { NewsletterInlineForm } from '../forms/NewsletterInlineForm'

interface PageNewsletterCtaProps {
  cta: PageNewsletterCtaACF
}

export function PageNewsletterCta({ cta }: PageNewsletterCtaProps) {
  const { newsletterBgColor, newsletterHeading, newsletterSubheading, newsletterButtonLabel } = cta

  return (
    <section className={newsletterBgColor ?? 'bg-gray-100'}>
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="rounded bg-white p-6 shadow-sm">
          <div className="space-y-4 border border-[var(--color-medium-purple)] p-6 text-center">
            {newsletterHeading && (
              <h2 className="text-2xl font-semibold text-[var(--color-medium-purple)]">
                {newsletterHeading}
              </h2>
            )}
            {newsletterSubheading && (
              <p className="text-sm text-[var(--color-medium-purple)]">{newsletterSubheading}</p>
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
