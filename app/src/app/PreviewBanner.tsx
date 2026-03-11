'use client'

type Props = {
  isDraft: boolean
}

export default function PreviewBanner({ isDraft }: Props) {
  // Just derive visibility from the prop – no local state.
  if (!isDraft) return null

  const exitPreview = () => {
    // Hard redirect to server route that disables draft mode.
    window.location.href = '/api/exit-preview'
  }

  // console.log('PreviewBanner rendered with isDraft:', isDraft)

  return (
    <div className="fixed top-0 right-0 left-0 z-9999 bg-yellow-400/70 px-4 py-2 text-sm text-black">
      Preview mode active.{' '}
      <button
        type="button"
        onClick={exitPreview}
        className="ml-1 cursor-pointer underline hover:no-underline"
      >
        Exit preview
      </button>
    </div>
  )
}
