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

## Color System Rules (UnoCSS)

All new components must use only the allowed UnoCSS theme colors listed in:

`references/unocss-theme-colors.md`

Use color tokens by context:

- In class attributes, use Uno utility tokens, for example: `class="bg-bg.primary"`.
- In `<style>` blocks, use `@apply`, for example:

  ```css
  .some-class {
    @apply bg-bg.primary border-border.primary;
  }
  ```

- In inline style or script logic, use CSS variables directly (for example `var(--sh-primary)`) instead of hard-coded colors.

Do not introduce hard-coded hex/rgb/hsl colors for component UI styles.

## Suggested `index.ts` Pattern

```ts
import ComponentName from './index.vue'

export * from './types'
export { ComponentName }
export default ComponentName
```

## Completion Checklist

- Folder created at `src/components/<ComponentName>`
- `demos/` exists
- `index.vue`, `index.ts`, `types.ts` created
- Optional child component files added only if needed
- Exports wired from `index.ts`
