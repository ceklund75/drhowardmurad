'use client'

import { useState } from 'react'
import { cx } from '@/lib/ui'

interface NewsletterInlineFormProps {
  buttonLabel?: string
  variant?: 'default' | 'contentbox'
}

export function NewsletterInlineForm({
  buttonLabel = 'Sign Up',
  variant = 'default',
}: NewsletterInlineFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const isDefault = variant === 'default'

  const inputClass = isDefault
    ? 'border-medium-purple text-medium-purple placeholder:text-medium-purple/90'
    : 'border-white bg-white text-[var(--color-theme)] placeholder:text-[var(--color-theme)]/90'

  const inputButton = isDefault
    ? 'border-medium-purple text-medium-purple hover:bg-medium-purple border hover:text-white'
    : 'border-white text-[var(--color-theme)] bg-white hover:bg-transparent hover:text-white'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setError(null)

    const form = e.currentTarget
    const formData = new FormData(form)
    const firstName = (formData.get('firstName') || '').toString().trim()
    const email = (formData.get('email') || '').toString().trim()

    if (!firstName) {
      setError('First name is required.')
      setStatus('error')
      return
    }

    if (!email) {
      setError('Email is required.')
      setStatus('error')
      return
    }

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      if (data.alreadySubscribed) {
        setStatus('already')
      } else {
        setStatus('success')
      }

      form.reset()
    } catch (err) {
      console.error(err)
      setError('Unexpected error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <form className="flex flex-col gap-3 sm:flex-row sm:items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First name"
        required
        className={cx('w-full border px-3 py-2 text-sm', inputClass)}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        className={cx('w-full border px-3 py-2 text-sm', inputClass)}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={cx(
          'cursor-pointer border px-5 py-2 text-sm font-semibold whitespace-nowrap transition lg:w-[80%]',
          inputButton,
        )}
      >
        {status === 'loading' ? 'Submitting…' : buttonLabel}
      </button>

      {status === 'success' && (
        <p className="text-xs text-green-700">You’re on the list. Thank you!</p>
      )}

      {status === 'already' && (
        <p className="text-xs text-green-700">You’re already subscribed with this email.</p>
      )}

      {status === 'error' && error && <p className="text-xs text-red-700">{error}</p>}
    </form>
  )
}
