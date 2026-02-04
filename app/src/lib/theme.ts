export const THEME_CLASS_BY_ACF_VALUE = {
  pink: 'theme-pink',
  blue: 'theme-blue',
  purple: 'theme-purple',
  orange: 'theme-intl-orange',
  green: 'theme-green',
  cyan: 'theme-cyan',
  cerulean: 'theme-cerulean',
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
  color?: 'blue' | 'pink' | 'purple' | 'orange' | 'green' | 'cyan' | 'cerulean',
): string {
  if (!color) return ''
  return `theme-${color}`
}
