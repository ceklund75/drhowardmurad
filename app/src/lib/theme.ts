export const THEME_CLASS_BY_ACF_VALUE = {
  pink: "theme-pink",
  blue: "theme-blue",
  purple: "theme-purple",
  orange: "theme-intl-orange",
  green: "theme-green",
  cyan: "theme-cyan",
  cerulean: "theme-cerulean",
} as const;

export type ThemeAcfValue = keyof typeof THEME_CLASS_BY_ACF_VALUE;

export function themeClassFromAcf(value?: string | null): string {
  if (!value) return THEME_CLASS_BY_ACF_VALUE.pink;
  return THEME_CLASS_BY_ACF_VALUE[value as ThemeAcfValue] ?? THEME_CLASS_BY_ACF_VALUE.pink;
}