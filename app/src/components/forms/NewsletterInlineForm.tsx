'use client'
import { cx } from '@/lib/ui'
interface NewsletterInlineFormProps {
  buttonLabel?: string
  variant?: 'default' | 'contentbox'
}

export function NewsletterInlineForm({
  buttonLabel = 'Sign Up',
  variant = 'default',
}: NewsletterInlineFormProps) {
  const isDefault = variant === 'default'

  const inputClass = isDefault
    ? 'border-medium-purple text-medium-purple placeholder:text-medium-purple/90'
    : 'border-white bg-white text-[var(--color-theme)] placeholder:text-[var(--color-theme)]/90'
  const inputButton = isDefault
    ? 'border-medium-purple text-medium-purple hover:bg-medium-purple border hover:text-white'
    : 'border-white text-[var(--color-theme)] bg-white hover:bg-transparent hover:text-white'

  return (
    <form
      className="flex flex-col gap-3 sm:flex-row sm:items-center"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        className={cx('w-full border px-3 py-2 text-sm', inputClass)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className={cx('w-full border px-3 py-2 text-sm', inputClass)}
      />
      <button
        type="submit"
        className={cx(
          'w-[80%] border px-5 py-2 text-sm font-semibold whitespace-nowrap transition',
          inputButton,
        )}
      >
        {buttonLabel}
      </button>
    </form>
  )
}
