export const THEME_CLASS_BY_ACF_VALUE = {
  pink: 'theme-pink',
  blue: 'theme-blue',
  purple: 'theme-purple',
  orange: 'theme-intl-orange',
  green: 'theme-green',
  cyan: 'theme-cyan',
  darkcyan: 'theme-dark-cyan',
  cerulean: 'theme-cerulean',
  darkpurple: 'theme-dark-purple',
} as const

export type ThemeAcfValue = keyof typeof THEME_CLASS_BY_ACF_VALUE

export function themeClassFromAcf(value?: string | null): string {
  if (!value) return THEME_CLASS_BY_ACF_VALUE.pink
  return THEME_CLASS_BY_ACF_VALUE[value as ThemeAcfValue] ?? THEME_CLASS_BY_ACF_VALUE.pink
}

const CATEGORY_THEME_MAP: Record<string, string> = {
  'health-happiness': 'theme-purple',
  skincare: 'theme-blue',
  'cultural-stress': 'theme-cyan',
  podcasts: 'theme-intl-orange',
}

export function themeClassFromCategory(categorySlug?: string): string {
  if (!categorySlug) return THEME_CLASS_BY_ACF_VALUE.pink // default fallback
  return CATEGORY_THEME_MAP[categorySlug] || THEME_CLASS_BY_ACF_VALUE.pink
}

export function themeClassFromPageColor(
  color?: 'blue' | 'pink' | 'purple' | 'orange' | 'green' | 'cyan' | 'cerulean' | 'darkpurple',
): string {
  if (!color) return ''
  return `theme-${color}`
}

export function tintBgClassFromValue(raw?: string[] | string): string {
  const value = Array.isArray(raw) ? raw[0] : raw
  switch (value) {
    case 'white':
      return 'bg-white'
    case 'gray-alt':
      return 'bg-gray-alt'
    case 'color-light-1':
      return 'bg-light-1'
    case 'light-blue':
      return 'bg-tint-light-blue'
    case 'pale-yellow':
      return 'bg-tint-pale-yellow'
    case 'pale-orange':
      return 'bg-tint-pale-orange'
    case 'paler-orange':
      return 'bg-tint-paler-orange'
    case 'pale-yellow-2':
      return 'bg-tint-pale-yellow-2'
    case 'light-pink':
      return 'bg-tint-light-pink'
    default:
      return ''
  }
}

export function bgImageObjectClass(imageSide?: 'left' | 'right'): string {
  if (!imageSide) return 'object-center'
  return `object-${imageSide}`
}
