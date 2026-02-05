'use client'

interface NewsletterInlineFormProps {
  buttonLabel?: string
}

export function NewsletterInlineForm({ buttonLabel = 'Sign Up' }: NewsletterInlineFormProps) {
  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        className="w-full border border-[var(--color-medium-purple)] px-3 py-2 text-sm"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border border-[var(--color-medium-purple)] px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="border border-[var(--color-medium-purple)] px-5 py-2 text-sm font-semibold whitespace-nowrap text-[var(--color-medium-purple)] transition hover:bg-[var(--color-medium-purple)] hover:text-white"
      >
        {buttonLabel}
      </button>
    </form>
  )
}
