import color from 'color'

// ── Recursive Token Type ────────────────────────────────────────────
export type TokenValue = string
export type TokenGroup = { [key: string]: TokenValue | TokenGroup }

// ── Color Theme Types ───────────────────────────────────────────────
export interface ColorTokens {
  primary: string
  secondary: string
  bg: {
    primary: string
    secondary: string
  }
  text: {
    base: string
    primary: string
  }
  border: {
    base: string
    primary: string
  }
  status: {
    info: string
    danger: string
    warning: string
    success: string
  }
}

// ── Design Token Types ──────────────────────────────────────────────
export interface SpacingTokens {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface RadiusTokens {
  none: string
  sm: string
  md: string
  lg: string
  xl: string
  full: string
}

export interface TypographyTokens {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface SizeTokens {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

export interface DesignTokens {
  colors: ColorTokens
  spacing: SpacingTokens
  radius: RadiusTokens
  fontSize: TypographyTokens
  componentSize: SizeTokens
}

// ── Shared Flatten Logic ────────────────────────────────────────────
/** Flatten a nested token object into flat key-value pairs.
 *  e.g. { bg: { primary: '#fff' } } → { 'bg-primary': '#fff' }
 */
export function flattenTokens(
  tokens: TokenGroup | Record<string, string>,
  prefix = '',
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const key of Object.keys(tokens)) {
    const value = tokens[key]
    const flatKey = prefix ? `${prefix}-${key}` : key

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenTokens(value as TokenGroup, flatKey))
    } else if (typeof value === 'string') {
      result[flatKey] = value
    }
  }

  return result
}

// ── Unified Color Derivation ────────────────────────────────────────
/** Generate darken / lighten / fade variants for each flat color entry.
 *  IMPORTANT: this function is THE SINGLE SOURCE OF TRUTH for color math.
 *  Both UnoCSS (build-time) and ConfigProvider (runtime) must use this.
 */
export function deriveColorVariants(
  flatColors: Record<string, string>,
): Record<string, string> {
  const derived: Record<string, string> = {}

  for (const [key, value] of Object.entries(flatColors)) {
    derived[key] = value
    derived[`${key}-darken`] = color(value).darken(0.3).hex()
    derived[`${key}-lighten`] = color(value).lighten(0.3).hex()
    derived[`${key}-fade`] = color(value).fade(0.7).hexa()
  }

  return derived
}

// ── UnoCSS Color Config Builder ─────────────────────────────────────
/** Convert flat CSS-var–based colors into the shape UnoCSS theme.colors expects.
 *  e.g. 'bg-primary' → { 'bg.primary': 'var(--sh-bg-primary)' }
 */
export function buildUnoColorMap(
  flatColors: Record<string, string>,
  cssVarPrefix = 'sh',
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const key of Object.keys(flatColors)) {
    const unoKey = key.replace(/-/g, '.')
    const varName = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    result[unoKey] =
      `var(--${cssVarPrefix ? `${cssVarPrefix}-` : ''}${varName})`
  }

  return result
}

// ── CSS Variable Stylesheet Generator ───────────────────────────────
/** Generate a CSS string of `:root { --sh-*: value; }` declarations.
 *  Used for static baseline stylesheet (SSR-safe).
 */
export function generateCssVarBlock(
  flatTokens: Record<string, string>,
  prefix = 'sh',
): string {
  const lines = Object.entries(flatTokens)
    .map(([key, value]) => `  --${prefix}-${key}: ${value};`)
    .join('\n')
  return `:root {\n${lines}\n}`
}
