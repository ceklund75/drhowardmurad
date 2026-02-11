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
  'darkpurple',
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

export interface HeightConfig {
  extendedImage: {
    base: string
    lg: string
    xl: string
    '2xl': string
  }
  mainRow: {
    minHeight: {
      lg: string
      xl: string
    }
    contentHeight: {
      lg: string
      xl: string
    }
    imageHeight: {
      base: string
      lg: string
      xl: string
    }
  }
}

export function resolveHeightConfig(preset?: string | string[]): HeightConfig {
  const normalized = Array.isArray(preset) ? preset[0] : preset

  const configs: Record<string, HeightConfig> = {
    compact: {
      extendedImage: {
        base: 'h-[340px]',
        lg: 'lg:h-[420px]',
        xl: 'xl:h-[480px]',
        '2xl': '2xl:h-[600px]',
      },
      mainRow: {
        minHeight: {
          lg: 'lg:min-h-[480px]',
          xl: 'xl:min-h-[560px]',
        },
        contentHeight: {
          lg: 'lg:h-[480px]',
          xl: 'xl:h-[560px]',
        },
        imageHeight: {
          base: 'h-[300px]',
          lg: 'lg:min-h-[480px]',
          xl: 'xl:min-h-[560px]',
        },
      },
    },
    tall: {
      extendedImage: {
        base: 'h-[500px]',
        lg: 'lg:h-[640px]',
        xl: 'xl:h-[720px]',
        '2xl': '2xl:h-[900px]',
      },
      mainRow: {
        minHeight: {
          lg: 'lg:min-h-[720px]',
          xl: 'xl:min-h-[800px]',
        },
        contentHeight: {
          lg: 'lg:h-[720px]',
          xl: 'xl:h-[800px]',
        },
        imageHeight: {
          base: 'h-[420px]',
          lg: 'lg:min-h-[720px]',
          xl: 'xl:min-h-[800px]',
        },
      },
    },
    'extra-tall': {
      extendedImage: {
        base: 'h-[600px]',
        lg: 'lg:h-[800px]',
        xl: 'xl:h-[900px]',
        '2xl': '2xl:h-[1100px]',
      },
      mainRow: {
        minHeight: {
          lg: 'lg:min-h-[900px]',
          xl: 'xl:min-h-[1000px]',
        },
        contentHeight: {
          lg: 'lg:h-[900px]',
          xl: 'xl:h-[1000px]',
        },
        imageHeight: {
          base: 'h-[480px]',
          lg: 'lg:min-h-[900px]',
          xl: 'xl:min-h-[1000px]',
        },
      },
    },
    default: {
      extendedImage: {
        base: 'h-[420px]',
        lg: 'lg:h-[530px]',
        xl: 'xl:h-[600px]',
        '2xl': '2xl:h-[775px]',
      },
      mainRow: {
        minHeight: {
          lg: 'lg:min-h-[580px]',
          xl: 'xl:min-h-[680px]',
        },
        contentHeight: {
          lg: 'lg:min-h-[580px]',
          xl: 'xl:min-h-[680px]',
        },
        imageHeight: {
          base: 'h-[360px]',
          lg: 'lg:min-h-[580px]',
          xl: 'xl:min-h-[680px]',
        },
      },
    },
  }

  return configs[normalized || 'default'] || configs.default
}

export function resolveObjectPosition(position?: string | string[]): string {
  const normalized = Array.isArray(position) ? position[0] : position

  const positions: Record<string, string> = {
    top: 'center top',
    bottom: 'center bottom',
    left: 'left center',
    right: 'right center',
    'top-left': 'left top',
    'top-right': 'right top',
    'bottom-left': 'left bottom',
    'bottom-right': 'right bottom',
    center: 'center center',
  }

  return positions[normalized || 'center'] || 'center center'
}

export function resolveObjectFit(fit?: string | string[]): 'cover' | 'contain' {
  const normalized = Array.isArray(fit) ? fit[0] : fit
  return normalized === 'contain' ? 'contain' : 'cover'
}

export function resolveStringFromArray(raw?: string[] | string): string | undefined {
  if (!raw) return undefined
  return Array.isArray(raw) ? raw[0] : raw
}
