'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mt-4 text-gray-600">An unexpected error occurred. Please try again.</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded bg-black px-4 py-2 text-white"
      >
        Retry
      </button>
    </main>
  )
}
