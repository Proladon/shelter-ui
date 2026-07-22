import type { Preset } from 'unocss'
import { generateUnoThemeColors, generateUnoThemeTokens } from './core'

// ── CSS Variable Key Mapping ────────────────────────────────────────
const cssVarMap: Record<string, string> = {
  default: 'text-primary',
  primary: 'primary',
  success: 'status-success',
  warning: 'status-warning',
  danger: 'status-danger',
  info: 'status-info',
}

// ── Safelist ────────────────────────────────────────────────────────
const variantPrefixes = [
  'sh-fill',
  'sh-ghost',
  'sh-text',
  'sh-outline',
  'sh-dashed',
  'sh-bordered',
]
const typeKeys = Object.keys(cssVarMap)
const radiusKeys = ['none', 'sm', 'md', 'lg', 'xl', 'full']
const safelist = [
  ...variantPrefixes.flatMap((p) => typeKeys.map((t) => `${p}-${t}`)),
  'sh-size-sm',
  'sh-size-md',
  'sh-size-lg',
  'sh-interactive',
  'sh-disabled',
  ...radiusKeys.map((r) => `sh-rounded-${r}`),
]

// ── Shared enter/exit keyframes ──────────────────────────────────────
// Single source for the slide+fade / fade animations previously duplicated
// across Popover, Tooltip, ContextMenu and Dialog. Consumed via plain
// `animation-name` (not Uno's `animate-*` utility) — each component still
// controls its own duration/easing (via --sh-duration-*/--sh-ease-* tokens)
// and which data-state/data-side triggers which animation-name.
// Also duplicated into core/index.ts's generateBaselineCss(): this preflight
// covers consumers who use only this preset (no compiled dist/index.css),
// while generateBaselineCss covers the compiled-CSS path — that one is the
// one actually verified to reach dist/index.css in this repo's own build.
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
`

// ── Preset ──────────────────────────────────────────────────────────
export function presetShelterUI(): Preset {
  const colors = generateUnoThemeColors()
  const tokens = generateUnoThemeTokens()

  return {
    name: 'shelter-ui',
    safelist,
    preflights: [{ getCSS: () => sharedKeyframesCss }],
    shortcuts: [
      // ── Dynamic Variant Shortcuts ──────────────────────────────
      [
        /^sh-(fill|ghost|text|outline|dashed|bordered)-(.*)$/,
        (match) => {
          const [, variant, type] = match
          const v = cssVarMap[type]
          if (!v) return ''

          switch (variant) {
            case 'fill':
              return `bg-[var(--sh-${v}-fade)] text-[var(--sh-${v})] border-transparent`
            case 'ghost':
              return `bg-transparent text-[var(--sh-${v})] border-transparent hover:bg-[var(--sh-${v}-fade)] active:brightness-80`
            case 'text':
              return `bg-transparent text-[var(--sh-${v})] border-transparent hover:text-[var(--sh-${v}-lighten)]`
            case 'outline':
              return `bg-transparent text-[var(--sh-${v})] border-[color:var(--sh-${v})] border-solid hover:bg-[var(--sh-${v}-fade)]`
            case 'dashed':
              return `bg-transparent text-[var(--sh-${v})] border-[color:var(--sh-${v})] border-dashed hover:bg-[var(--sh-${v}-fade)]`
            case 'bordered':
              return `bg-[var(--sh-${v}-fade)] text-[var(--sh-${v})] border-[color:var(--sh-${v})] border-solid`
            default:
              return ''
          }
        },
      ],

      // ── Dynamic Size Shortcuts ────────────────────────────────
      [
        /^sh-size-(sm|md|lg)$/,
        ([, size]) =>
          `h-[var(--sh-component-size-${size})] text-[length:var(--sh-font-size-${size})] px-[var(--sh-spacing-${size})]`,
      ],

      // ── Dynamic Radius Shortcuts ──────────────────────────────
      [
        /^sh-rounded-(none|sm|md|lg|xl|full)$/,
        ([, r]) => `rounded-[length:var(--sh-radius-${r})]`,
      ],

      // ── Common component base styles ──────────────────────────
      {
        'sh-interactive':
          'cursor-pointer transition-all duration-300 ease-in-out hover:brightness-90 active:brightness-80',
        'sh-disabled': 'opacity-60 cursor-not-allowed',
      },
    ],
    theme: {
      colors: { ...colors },
      borderRadius: tokens.borderRadius,
      spacing: tokens.spacing,
      fontSize: tokens.fontSize,
      zIndex: tokens.zIndex,
      boxShadow: tokens.boxShadow,
      transitionDuration: tokens.transitionDuration,
      transitionTimingFunction: tokens.transitionTimingFunction,
    },
  }
}
