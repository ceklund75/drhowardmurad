'use client'

export default function ClientExitButton() {
  const exitPreview = () => {
    // Kill draft cookie
    document.cookie = '__prerender_bypass=; Path=/; Max-Age=0; SameSite=Lax'
    // Hard refresh to force server re-render
    window.location.href = '/'
  }

  return (
    <button onClick={exitPreview} className="ml-1 cursor-pointer underline hover:no-underline">
      Exit →
    </button>
  )
}
