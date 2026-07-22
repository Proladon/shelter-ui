import type { DesignTokens, ColorTokens } from './theme-utils'
import {
  flattenTokens,
  deriveColorVariants,
  buildUnoColorMap,
  generateCssVarBlock,
} from './theme-utils'
import defaultTokens, { lightColors } from '../themes/default'

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
    zIndex: prefixKeys(t.zIndex, 'sh'),
    boxShadow: prefixKeys(t.shadow, 'sh'),
    transitionDuration: prefixKeys(t.duration, 'sh'),
    transitionTimingFunction: prefixKeys(t.easing, 'sh'),
  }
}

// ── Shared enter/exit keyframes ──────────────────────────────────────
// Single source for the slide+fade / fade animations previously duplicated
// across Popover, Tooltip, ContextMenu and Dialog. Shipped via baseline.css
// (not UnoCSS preflights — those don't reliably surface in the lib build)
// so components can reference them by plain `animation-name`.
const sharedKeyframesCss = `
@keyframes sh-slide-up-fade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes sh-slide-right-fade {
  from { opacity: 0; transform: translateX(-4px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes sh-slide-down-fade {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes sh-slide-left-fade {
  from { opacity: 0; transform: translateX(4px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes sh-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes sh-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
`.trim()

/**
 * Generate the static baseline CSS variable block (for SSR / style.css).
 *
 * Colors are theme-dependent (D8): the dark palette (`tokens.colors`) is the
 * default, applied to `:root` and `[data-theme="dark"]`; `lightPalette` is
 * applied under `[data-theme="light"]`, overriding just the color variables.
 * Every other token category (spacing/radius/z-index/motion/etc.) is theme-
 * independent and only emitted once, unconditionally on `:root`.
 */
export const generateBaselineCss = (
  tokens?: DesignTokens,
  lightPalette?: ColorTokens,
): string => {
  const t = tokens ?? defaultTokens
  const light = lightPalette ?? lightColors

  const darkColorVars = deriveColorVariants(flattenTokens(t.colors))
  const lightColorVars = deriveColorVariants(flattenTokens(light))

  const spacingVars = flattenTokens(t.spacing)
  const radiusVars = flattenTokens(t.radius)
  const fontSizeVars = flattenTokens(t.fontSize)
  const sizeVars = flattenTokens(t.componentSize)
  const zIndexVars = flattenTokens(t.zIndex)
  const shadowVars = flattenTokens(t.shadow)
  const durationVars = flattenTokens(t.duration)
  const easingVars = flattenTokens(t.easing)

  const nonColor: Record<string, string> = {}
  // Spacing → --sh-spacing-{key}
  for (const [k, v] of Object.entries(spacingVars)) nonColor[`spacing-${k}`] = v
  // Radius → --sh-radius-{key}
  for (const [k, v] of Object.entries(radiusVars)) nonColor[`radius-${k}`] = v
  // FontSize → --sh-font-size-{key}
  for (const [k, v] of Object.entries(fontSizeVars))
    nonColor[`font-size-${k}`] = v
  // Component Size → --sh-component-size-{key}
  for (const [k, v] of Object.entries(sizeVars))
    nonColor[`component-size-${k}`] = v
  // Z-Index → --sh-z-{key}
  for (const [k, v] of Object.entries(zIndexVars)) nonColor[`z-${k}`] = v
  // Shadow → --sh-shadow-{key}
  for (const [k, v] of Object.entries(shadowVars)) nonColor[`shadow-${k}`] = v
  // Motion duration → --sh-duration-{key}
  for (const [k, v] of Object.entries(durationVars))
    nonColor[`duration-${k}`] = v
  // Motion easing → --sh-ease-{key} (note: CSS var segment is "ease", not "easing")
  for (const [k, v] of Object.entries(easingVars)) nonColor[`ease-${k}`] = v
  // Focus ring → --sh-focus-ring (single value, not a scale)
  nonColor['focus-ring'] = t.focusRing

  const nonColorBlock = generateCssVarBlock(nonColor, 'sh')
  const darkBlock = generateCssVarBlock(
    darkColorVars,
    'sh',
    ":root, [data-theme='dark']",
  )
  const lightBlock = generateCssVarBlock(
    lightColorVars,
    'sh',
    "[data-theme='light']",
  )

  return `${nonColorBlock}\n\n${darkBlock}\n\n${lightBlock}\n\n${sharedKeyframesCss}`
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
