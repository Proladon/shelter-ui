import type { DesignTokens, ColorTokens } from './theme-utils'
import {
  flattenTokens,
  deriveColorVariants,
  buildUnoColorMap,
  generateCssVarBlock,
} from './theme-utils'
import defaultTokens from '../themes/default'

// ── Re-export theme utilities & types ───────────────────────────────
export {
  flattenTokens,
  deriveColorVariants,
  buildUnoColorMap,
  generateCssVarBlock,
}
export type {
  DesignTokens,
  ColorTokens,
  SpacingTokens,
  RadiusTokens,
  TypographyTokens,
  SizeTokens,
  TokenGroup,
  TokenValue,
} from './theme-utils'

// ── Build-time UnoCSS helpers ───────────────────────────────────────

/** Generate the UnoCSS `theme.colors` map from color tokens. */
export const generateUnoThemeColors = (colorTokens?: ColorTokens) => {
  const colors = colorTokens ?? defaultTokens.colors
  const flat = flattenTokens(colors)
  const withVariants = deriveColorVariants(flat)
  return buildUnoColorMap(withVariants, 'sh')
}

/** Generate all non-color token maps for UnoCSS theme extension. */
export const generateUnoThemeTokens = (tokens?: DesignTokens) => {
  const t = tokens ?? defaultTokens
  return {
    spacing: prefixKeys(t.spacing, 'sh'),
    borderRadius: prefixKeys(t.radius, 'sh'),
    fontSize: prefixKeys(t.fontSize, 'sh'),
    // Custom component sizes exposed as --sh-component-size-*
    componentSize: prefixKeys(t.componentSize, 'sh'),
  }
}

/** Generate the static baseline CSS variable block (for SSR / style.css). */
export const generateBaselineCss = (tokens?: DesignTokens): string => {
  const t = tokens ?? defaultTokens
  const colorVars = deriveColorVariants(flattenTokens(t.colors))
  const spacingVars = flattenTokens(t.spacing)
  const radiusVars = flattenTokens(t.radius)
  const fontSizeVars = flattenTokens(t.fontSize)
  const sizeVars = flattenTokens(t.componentSize)

  const all: Record<string, string> = {}

  // Colors → --sh-{key}
  for (const [k, v] of Object.entries(colorVars)) all[k] = v
  // Spacing → --sh-spacing-{key}
  for (const [k, v] of Object.entries(spacingVars)) all[`spacing-${k}`] = v
  // Radius → --sh-radius-{key}
  for (const [k, v] of Object.entries(radiusVars)) all[`radius-${k}`] = v
  // FontSize → --sh-font-size-{key}
  for (const [k, v] of Object.entries(fontSizeVars)) all[`font-size-${k}`] = v
  // Component Size → --sh-component-size-{key}
  for (const [k, v] of Object.entries(sizeVars)) all[`component-size-${k}`] = v

  return generateCssVarBlock(all, 'sh')
}

// ── Internal Helpers ────────────────────────────────────────────────

function prefixKeys(
  obj: Record<string, string>,
  prefix: string,
): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [k, v] of Object.entries(obj)) {
    result[`${prefix}-${k}`] = v
  }
  return result
}
