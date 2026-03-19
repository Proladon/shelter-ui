---
name: component-creator
description: Create new UI components under src/components with the required shelter-ui folder structure, scaffold files, and consistent defaults.
---

# Component Creator

Use this skill when creating a new component for this repository.

## Goal

Create each new component under:

`src/components/<ComponentName>`

## Required Structure

A component folder must include:

- `demos/` folder: demo components for the new component
- `index.ts`
- `index.vue`: the main component implementation
- `types.ts`: all component-related types
- `{child-component}.vue` (only if needed)

Expected tree:

```text
src/components/<ComponentName>/
  demos/
  index.ts
  index.vue
  types.ts
  <ChildComponent>.vue  # optional
```

## Authoring Rules

1. Keep naming consistent with existing components in `src/components`.
2. Put all exported types in `types.ts`.
3. `index.ts` should export the component and related types.
4. Add child component files only when the component design actually needs composition.
5. Keep demos isolated inside `demos/`.

## Design System Rules (MANDATORY)

> **These rules are non-negotiable. Every new component MUST follow them.**

### 1. No Hardcoded Values

**NEVER** introduce hardcoded `hex`, `rgb`, `hsl` color values, or arbitrary pixel values (e.g. `h-[36px]`, `w-[15px]`) in component styles or templates.

- **Colors**: Use only the allowed UnoCSS theme color tokens listed in `references/unocss-theme-colors.md`.
- **Sizes/Spacing**: Use design token CSS variables from `src/style.css`:
  - Component heights: `var(--sh-component-size-sm)`, `var(--sh-component-size-md)`, `var(--sh-component-size-lg)`, etc.
  - Spacing: `var(--sh-spacing-xs)`, `var(--sh-spacing-sm)`, `var(--sh-spacing-md)`, `var(--sh-spacing-lg)`, `var(--sh-spacing-xl)`, `var(--sh-spacing-2xl)`.
  - Border radius: `var(--sh-radius-sm)`, `var(--sh-radius-md)`, `var(--sh-radius-lg)`, `var(--sh-radius-xl)`, `var(--sh-radius-full)`.
  - Font sizes: `var(--sh-font-size-xs)`, `var(--sh-font-size-sm)`, `var(--sh-font-size-md)`, `var(--sh-font-size-lg)`, `var(--sh-font-size-xl)`, `var(--sh-font-size-2xl)`.

### 2. Color Usage by Context

| Context                   | How to use                                                    |
| ------------------------- | ------------------------------------------------------------- |
| Template `class`          | UnoCSS utility tokens: `class="bg-bg.primary text-text.base"` |
| `<style>` blocks          | `@apply` only: `.cls { @apply bg-bg.primary; }`               |
| `<script>` / inline style | CSS variables: `var(--sh-primary)`                            |

### 3. Use UnoCSS Shortcuts for Component Variants

When a component needs **type variants** (e.g. primary, success, danger) or **style variants** (e.g. ghost, outline, dashed), use the pre-defined UnoCSS shortcuts from `uno.config.ts` instead of manually writing variant CSS.

Available shortcut patterns:

| Shortcut             | Description                               |
| -------------------- | ----------------------------------------- |
| `sh-fill-{type}`     | Default filled style (colored bg + text)  |
| `sh-ghost-{type}`    | Transparent bg, colored text, bg on hover |
| `sh-text-{type}`     | Text-only style, no bg or border          |
| `sh-outline-{type}`  | Transparent bg, solid colored border      |
| `sh-dashed-{type}`   | Transparent bg, dashed colored border     |
| `sh-bordered-{type}` | Filled bg + colored border                |

Where `{type}` is one of: `default`, `primary`, `success`, `warning`, `danger`, `info`.

> **IMPORTANT**: These shortcuts use `bg-[var(--sh-*)]` arbitrary CSS variable syntax internally — NOT dot-notation color references like `bg-status.danger`. **Never** use `bg-status.danger.fade` or `text-status.danger` inside shortcuts or `:class` bindings for dynamic hover/variant states — these will NOT resolve. Use `var(--sh-*)` inside `[]` brackets for any manual color logic.

For sizes, use:

| Shortcut     | Description                               |
| ------------ | ----------------------------------------- |
| `sh-size-sm` | Small component size (uses design tokens) |
| `sh-size-md` | Medium / default component size           |
| `sh-size-lg` | Large component size                      |

Common utility shortcuts:

| Shortcut         | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `sh-interactive` | Standard transition + cursor for interactive elements |
| `sh-disabled`    | Disabled state (opacity + cursor)                     |

**Example**: A button component should compose its `:class` like this:

```vue
<button
  :class="[
    'sh-interactive rounded-[var(--sh-radius-md)] border',
    `sh-fill-${type}`,
    `sh-size-${size}`,
    { 'sh-disabled': disabled },
  ]"
>
  <slot />
</button>
```

### 4. No SCSS — Use Plain CSS + @apply

- **NEVER** use `<style lang="scss">`. Always use `<style scoped>` (plain CSS / PostCSS).
- **NEVER** use SCSS features: `@mixin`, `@include`, `$variables`, `#{interpolation}`, nesting with `&`.
- If you need conditional styles, use Vue's `:class` bindings in the template, not SCSS loops.
- Minimal `<style scoped>` blocks are acceptable for layout or structural CSS that cannot be expressed as utility classes, but keep them as short as possible and use `@apply` with UnoCSS tokens inside.

### 5. TypeScript Strictness

- **NEVER** use `any` in `types.ts` or component scripts.
- Import shared types from `@/core/theme-utils` when working with theme/token data.
- All props must have explicit TypeScript interfaces in `types.ts`.

## Suggested `index.ts` Pattern

```ts
import ComponentName from './index.vue'

export * from './types'
export { ComponentName }
export default ComponentName
```

## Completion Checklist

- [ ] Folder created at `src/components/<ComponentName>`
- [ ] `demos/` exists
- [ ] `index.vue`, `index.ts`, `types.ts` created
- [ ] Optional child component files added only if needed
- [ ] Exports wired from `index.ts`
- [ ] **No hardcoded colors** — only UnoCSS tokens or CSS variables
- [ ] **No hardcoded pixel sizes** — only design token CSS variables
- [ ] **No `<style lang="scss">`** — plain CSS + @apply only
- [ ] **No `any` types** — strict TypeScript throughout
- [ ] **Variants use `sh-*` shortcuts** from uno.config.ts, not manual CSS
- [ ] **Sizes use `sh-size-*` shortcuts** or `var(--sh-component-size-*)` tokens
