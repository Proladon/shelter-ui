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

### 6. Dot Notation (Mandatory)

Always use **dot notation** (`.`) for nested tokens — **never hyphen notation** (`-`):

```
✅ text-text.base         → var(--sh-text-base)
✅ border-border.base     → var(--sh-border-base)
✅ bg-bg.primary          → var(--sh-bg-primary)
✅ bg-primary.fade        → var(--sh-primary-fade)
✅ ring-primary.fade      → var(--sh-primary-fade)

❌ text-text-base
❌ bg-bg-primary
❌ border-border-base
```

### 7. Semantic Color Tokens

All color decisions must map to the canonical semantic tokens:

| Token              | CSS Variable          | Purpose                                                                    |
| ------------------ | --------------------- | -------------------------------------------------------------------------- |
| **primary**        | `--sh-primary`        | Brand color, focus states, interactive highlight text, selected indicators |
| **bg.primary**     | `--sh-bg-primary`     | Component main background (inputs, dropdowns, dialogs)                     |
| **bg.secondary**   | `--sh-bg-secondary`   | Secondary background (disabled state, table headers)                       |
| **text.base**      | `--sh-text-base`      | **All general text** (labels, options, content)                            |
| **text.primary**   | `--sh-text-primary`   | **Low-emphasis text** (placeholder, default icon color)                    |
| **border.base**    | `--sh-border-base`    | All default borders (inputs, menus, dividers)                              |
| **border.primary** | `--sh-border-primary` | Emphasized borders (e.g. NumberInput hover)                                |
| **status.info**    | `--sh-status-info`    | Info status                                                                |
| **status.danger**  | `--sh-status-danger`  | Error / danger status                                                      |
| **status.warning** | `--sh-status-warning` | Warning status                                                             |
| **status.success** | `--sh-status-success` | Success status                                                             |

#### ⚠️ primary Use Cases

> **Common patterns — follow strictly.**

| Scenario                           | Use            | Notes                                    |
| ---------------------------------- | -------------- | ---------------------------------------- |
| Focus ring / border                | `primary`      | Input border color when focused          |
| Checkbox / Radio selected          | `primary`      | Indicator background / border            |
| Switch on state                    | `primary`      | Track color when on                      |
| Option hover / selected **bg**     | `primary-fade` | Dropdown, menu item highlight background |
| Option hover / selected **text**   | `primary`      | Text on top of `primary-fade` background |
| Button fill background             | `primary-fade` | Fill button background                   |
| Button fill text                   | `primary`      | Fill button text                         |
| Progress bar / Slider active track | `primary`      | Completed/active portion                 |
| Tag / Chip background              | `{type}-fade`  | Based on component type                  |
| Tag / Chip text                    | `{type}`       | Matching full-color text                 |

**Mnemonic:**

- `primary` = focus border, selected marker, progress indicator, text **inside** highlighted container
- `primary-fade` = highlighted container **background**

#### Text Color Roles

| Role                    | UnoCSS class        | When to use                                                                  |
| ----------------------- | ------------------- | ---------------------------------------------------------------------------- |
| General text            | `text-text.base`    | Options, labels, content, table cells                                        |
| Low-emphasis text       | `text-text.primary` | Placeholder, secondary description, default icon                             |
| Highlighted text        | `text-primary`      | hover / selected state text                                                  |
| Interacti / Interactive | `text-primary`      | Clickable links, selected indicator, check mark, hover / selected state text |

**Forbidden text classes:**

- ❌ `text-gray-500`, `text-gray-700`, `text-stone-*` (Tailwind defaults)
- ❌ `text-[#6b7280]` (hardcoded hex)
- ❌ `text-white` (breaks theme switching — use `text-text.base`)
- ❌ `text-mauve11` (third-party palette names)

#### Background Roles

| Role                  | UnoCSS class            | When to use                          |
| --------------------- | ----------------------- | ------------------------------------ |
| Component background  | `bg-bg.primary`         | Inputs, dropdowns, dialogs           |
| Page/area background  | `bg-bg.secondary`       | Secondary areas, disabled element bg |
| Interactive highlight | `bg-primary.fade`       | hover / selected options             |
| Status fill           | `bg-status.{type}.fade` | Notifications, Tags, Badges          |

**Forbidden background classes:**

- ❌ `bg-white`, `bg-gray-50`
- ❌ Hardcoded `rgba(0,0,0,0.4)` — use `bg-bg.primary/40` or define a new token
- ❌ Hyphen notation: `bg-bg-primary`

#### Border Roles

| State         | Class                      | Notes                          |
| ------------- | -------------------------- | ------------------------------ |
| Default       | `border-border.base`       | All inputs, menus, cards       |
| Focus         | `border-primary`           | When element is focused        |
| Open/Expanded | `ring-2 ring-primary.fade` | Select, DatePicker, TimePicker |
| Error         | `border-status.danger`     | Form validation failure        |

**Forbidden border classes:**

- ❌ `border-gray-300`, `border-stone-700` (Tailwind defaults)
- ❌ `border-[#e5e7eb]` (hardcoded hex)
- ❌ Hyphen notation: `border-border-base`

### 8. Component State Patterns

#### Form Inputs (Input, Select, Textarea, NumberInput, DatePicker, TimePicker)

| State       | Border                 | Background        | Text                            |
| ----------- | ---------------------- | ----------------- | ------------------------------- |
| Default     | `border-border.base`   | `bg-bg.primary`   | `text-text.base`                |
| Hover       | `border-border.base`   | `bg-bg.primary`   | `text-text.base`                |
| Focus       | `border-primary`       | `bg-bg.primary`   | `text-text.base`                |
| Disabled    | `border-border.base`   | `bg-bg.secondary` | `text-text.base` + `opacity-60` |
| Error       | `border-status.danger` | `bg-bg.primary`   | `text-text.base`                |
| Placeholder | —                      | —                 | `text-text.primary`             |

Standard PostCSS pattern:

```postcss
/* Default */
@apply border border-solid border-border.base rounded-md;

/* Focus */
&:focus,
&--focused {
  @apply border-primary outline-none;
}

/* Expandable (Select, DatePicker, TimePicker) */
&--open {
  @apply border-primary ring-2 ring-primary.fade;
}

/* Error */
&--error {
  @apply border-status.danger;
}
```

#### Dropdown Options (Select option, ContextMenu item, DatePicker cell)

| State               | Background        | Text                            |
| ------------------- | ----------------- | ------------------------------- |
| Default             | `transparent`     | `text-text.base`                |
| Hover / Highlighted | `bg-primary.fade` | `text-primary`                  |
| Selected / Checked  | `bg-primary.fade` | `text-primary`                  |
| Disabled            | `transparent`     | `text-text.base` + `opacity-50` |

#### Floating Panels (Popover, Select dropdown, ContextMenu, DatePicker panel, Tooltip)

```postcss
@apply bg-bg.primary border border-solid border-border.base rounded-md shadow-lg;
```

Ensure `z-[30]` or higher for z-index.

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
- [ ] **Dot notation used** — `.` not `-` for nested tokens (`bg-bg.primary`, not `bg-bg-primary`)
- [ ] **Text colors correct** — `text-text.base` (general), `text-text.primary` (placeholder/low-emphasis), `text-primary` (highlighted)
- [ ] **No forbidden text classes** — no `text-gray-*`, `text-white`, hardcoded hex
- [ ] **Borders correct** — `border-border.base` default, `border-primary` focus, `border-status.danger` error
- [ ] **No forbidden border classes** — no `border-gray-*`, hardcoded hex
- [ ] **Backgrounds correct** — `bg-bg.primary` (component), `bg-bg.secondary` (disabled), `bg-primary.fade` (highlighted option)
- [ ] **No forbidden bg classes** — no `bg-white`, `bg-gray-*`, hardcoded rgba
- [ ] **Highlighted options** use `bg-primary.fade text-primary`
- [ ] **Floating panels** have `border border-solid border-border.base shadow-lg`
- [ ] **Disabled state** uses `sh-disabled` or `opacity-60 cursor-not-allowed`
- [ ] **Transitions** use `sh-interactive` or `transition-all duration-300 ease-in-out`
