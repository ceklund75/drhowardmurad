export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export const buttonClassName = (className?: string) =>
  cx(
    'inline-flex items-center justify-center',
    'h-[40px] px-6 py-[15px]',
    'md:h-[50px] md:px-8 md:py-[18px]',
    'border',
    'text-[16px] font-medium uppercase tracking-normal',
    'leading-[0.75]',
    'mt-[1px] mb-[1px]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:pointer-events-none',
    className,
  )

export function normalizeClasses(cssClasses?: string | string[]): string {
  if (!cssClasses) return ''
  if (Array.isArray(cssClasses)) return cssClasses.join(' ')
  return cssClasses.replace(/,/g, ' ').trim()
}

const THEME_COLOR_KEYS = new Set([
  'blue-heading',
  'pink',
  'medium-purple',
  'green',
  'cyan',
  'cerulean',
  'orange',
  'intl-orange',
  'malachite',
  'sunglow',
  'gold',
  'dark-cyan',
  'maroon',
])

export function cssClassesToMenuColorVar(
  cssClasses?: string | string[] | null,
): string | undefined {
  const normalized = normalizeClasses(cssClasses ?? undefined)
  if (!normalized) return undefined

  const tokens = normalized.split(/\s+/).filter(Boolean)

  // Look at ALL text-* tokens, not just the first one
  const key = tokens
    .filter((t) => t.startsWith('text-'))
    .map((t) => t.slice('text-'.length))
    .find((k) => THEME_COLOR_KEYS.has(k))

  if (!key) return undefined
  return `var(--color-${key})`
}

export function normalizeAlignment(
  raw?: string[] | 'left' | 'right',
): 'left' | 'right' | undefined {
  if (!raw) return undefined
  if (Array.isArray(raw)) return raw[0] as 'left' | 'right'
  return raw
}

export function normalizeLayoutType(
  raw?: string[] | 'backgroundonly' | 'extendedleft' | 'extendedright',
): 'backgroundonly' | 'extendedleft' | 'extendedright' | undefined {
  if (!raw) return undefined
  if (Array.isArray(raw)) return raw[0] as 'backgroundonly' | 'extendedleft' | 'extendedright'
  return raw
}

export function resolveStringFromArray(raw?: string[] | string): string | undefined {
  if (!raw) return undefined
  return Array.isArray(raw) ? raw[0] : raw
}
