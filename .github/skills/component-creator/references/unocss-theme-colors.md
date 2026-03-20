# UnoCSS Theme Tokens

This file defines ALL allowed design tokens for new components in this repository.
**Do not use hardcoded values. Always reference tokens.**

## Color Tokens (UnoCSS utility classes)

These map to CSS variables and can be used in class attributes like `class="bg-bg.primary"`:

```ts
{
  // Base colors
  primary: 'var(--sh-primary)',
  'bg.primary': 'var(--sh-bg-primary)',
  'bg.secondary': 'var(--sh-bg-secondary)',
  'text.base': 'var(--sh-text-base)',
  'text.primary': 'var(--sh-text-primary)',
  'border.base': 'var(--sh-border-base)',
  'border.primary': 'var(--sh-border-primary)',
  'status.info': 'var(--sh-status-info)',
  'status.danger': 'var(--sh-status-danger)',
  'status.warning': 'var(--sh-status-warning)',
  'status.success': 'var(--sh-status-success)',

  // Each base color also has .darken, .lighten, .fade variants:
  // e.g. 'primary.darken', 'primary.lighten', 'primary.fade'
  //      'bg.primary.darken', 'status.danger.fade', etc.
}
```

## Spacing Tokens (CSS Variables)

Use in styles or as UnoCSS arbitrary values:

| Token | CSS Variable            | Default |
| ----- | ----------------------- | ------- |
| xs    | `var(--sh-spacing-xs)`  | 4px     |
| sm    | `var(--sh-spacing-sm)`  | 8px     |
| md    | `var(--sh-spacing-md)`  | 12px    |
| lg    | `var(--sh-spacing-lg)`  | 16px    |
| xl    | `var(--sh-spacing-xl)`  | 24px    |
| 2xl   | `var(--sh-spacing-2xl)` | 32px    |

## Border Radius Tokens (CSS Variables)

| Token | CSS Variable            | Default |
| ----- | ----------------------- | ------- |
| none  | `var(--sh-radius-none)` | 0px     |
| sm    | `var(--sh-radius-sm)`   | 4px     |
| md    | `var(--sh-radius-md)`   | 6px     |
| lg    | `var(--sh-radius-lg)`   | 8px     |
| xl    | `var(--sh-radius-xl)`   | 12px    |
| full  | `var(--sh-radius-full)` | 9999px  |

## Font Size Tokens (CSS Variables)

| Token | CSS Variable              | Default |
| ----- | ------------------------- | ------- |
| xs    | `var(--sh-font-size-xs)`  | 12px    |
| sm    | `var(--sh-font-size-sm)`  | 14px    |
| md    | `var(--sh-font-size-md)`  | 16px    |
| lg    | `var(--sh-font-size-lg)`  | 18px    |
| xl    | `var(--sh-font-size-xl)`  | 20px    |
| 2xl   | `var(--sh-font-size-2xl)` | 24px    |

## Component Size Tokens (CSS Variables)

For component height (buttons, inputs, selects, etc.):

| Token | CSS Variable                  | Default |
| ----- | ----------------------------- | ------- |
| xs    | `var(--sh-component-size-xs)` | 24px    |
| sm    | `var(--sh-component-size-sm)` | 30px    |
| md    | `var(--sh-component-size-md)` | 36px    |
| lg    | `var(--sh-component-size-lg)` | 42px    |
| xl    | `var(--sh-component-size-xl)` | 48px    |

## UnoCSS Variant Shortcuts

Use these in `:class` bindings for component type/style variants.

### Fill Variants: `sh-fill-{type}`

Default look — colored bg + matching text.

### Ghost Variants: `sh-ghost-{type}`

Transparent bg, colored text, bg appears on hover.

### Text Variants: `sh-text-{type}`

No bg or border, just colored text.

### Outline Variants: `sh-outline-{type}`

Transparent bg, solid colored border.

### Dashed Variants: `sh-dashed-{type}`

Same as outline but with dashed border.

### Bordered Variants: `sh-bordered-{type}`

Filled bg with colored border.

**`{type}`** is one of: `default`, `primary`, `success`, `warning`, `danger`, `info`.

### Size Shortcuts

| Shortcut     | Description                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| `sh-size-sm` | Small: uses `--sh-component-size-sm`, `--sh-font-size-sm`, `--sh-spacing-sm` |
| `sh-size-md` | Medium (default): uses md tokens                                             |
| `sh-size-lg` | Large: uses lg tokens                                                        |

### Utility Shortcuts

| Shortcut         | Description                                |
| ---------------- | ------------------------------------------ |
| `sh-interactive` | Standard hover transition + pointer cursor |
| `sh-disabled`    | Disabled opacity + not-allowed cursor      |

## Usage Rules

- In class attributes, use Uno utility tokens: `class="bg-bg.primary"`.
- In `<style>` blocks, use `@apply`: `.cls { @apply bg-bg.primary; }`
- In script/inline style, use CSS variables: `var(--sh-primary)`.
- **NEVER** use hardcoded `hex/rgb/hsl` colors.
- **NEVER** use arbitrary pixel values like `h-[36px]`. Use token variables instead.
