export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const buttonClassName = (className?: string) =>
  cx(
    'inline-flex items-center justify-center',
    'h-12.5 px-8 py-4.5',
    'border border-theme bg-theme text-theme-contrast',
    'text-button font-medium uppercase tracking-wide',
    'hover:bg-transparent hover:text-theme',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    className,
  )
