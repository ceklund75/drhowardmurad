import Link from 'next/link'

export default async function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center justify-center px-4 py-12">
      <h1 className="text-blue-heading text-9xl">404</h1>
      <h2 className="text-blue-heading text-3xl">Oops! Something went wrong…</h2>
      <p className="mt-4 text-gray-600">
        The page you’re looking for doesn’t exist or may have moved. Please continue to our{' '}
        <Link href="/">home page</Link>.
      </p>
    </div>
  )
}
