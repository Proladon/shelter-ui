---
name: component-scaffold
description: Full component scaffold workflow — creates both the component source files under src/components and its documentation page under docs/components in one pass. Use this whenever creating a brand-new shelter-ui component.
metadata:
  pipeline: pipline
---

# Component Scaffold

Use this skill when creating a **brand-new** component for this repository. It combines component source creation (component-creator) and documentation authoring (component-doc) into a single sequential workflow.

---

## Phase 1 — Scaffold Component Source

### Goal

Create the component folder and all required files under:

```
src/components/<ComponentName>/
  demos/
  index.ts
  index.vue
  types.ts
  <ChildComponent>.vue   # optional
```

### Authoring Rules

1. Keep naming consistent with existing components in `src/components`.
2. Put all exported types in `types.ts`.
3. `index.ts` must export the component and its related types.
4. Add child component files _only_ when composition is genuinely required.
5. Keep demo files isolated inside `demos/`.

### Design System Rules (MANDATORY)

> These rules are non-negotiable. Every new component MUST follow them.

#### No Hardcoded Values

- **Colors**: Use only the UnoCSS theme color tokens listed in `references/unocss-theme-colors.md`.
- **Sizes / Spacing / Radius / Font sizes**: Use design token CSS variables from `src/style.css`:
  - Heights: `var(--sh-component-size-sm/md/lg)`
  - Spacing: `var(--sh-spacing-xs/sm/md/lg/xl/2xl)`
  - Radius: `var(--sh-radius-sm/md/lg/xl/full)`
  - Font sizes: `var(--sh-font-size-xs/sm/md/lg/xl/2xl)`

#### Color Usage by Context

| Context                   | How to use                                                    |
| ------------------------- | ------------------------------------------------------------- |
| Template `class`          | UnoCSS utility tokens: `class="bg-bg.primary text-text.base"` |
| `<style>` blocks          | `@apply` only: `.cls { @apply bg-bg.primary; }`               |
| `<script>` / inline style | CSS variables: `var(--sh-primary)`                            |

#### UnoCSS Shortcuts for Variants

**Style shortcuts** (`{type}` = `default`, `primary`, `success`, `warning`, `danger`, `info`):

| Shortcut             | Description                               |
| -------------------- | ----------------------------------------- |
| `sh-fill-{type}`     | Filled style (colored bg + text)          |
| `sh-ghost-{type}`    | Transparent bg, colored text, bg on hover |
| `sh-text-{type}`     | Text-only, no bg or border                |
| `sh-outline-{type}`  | Transparent bg, solid colored border      |
| `sh-dashed-{type}`   | Transparent bg, dashed colored border     |
| `sh-bordered-{type}` | Filled bg + colored border                |

**Size shortcuts**:

| Shortcut     | Description      |
| ------------ | ---------------- |
| `sh-size-sm` | Small component  |
| `sh-size-md` | Medium / default |
| `sh-size-lg` | Large component  |

**Common utilities**:

| Shortcut         | Description                           |
| ---------------- | ------------------------------------- |
| `sh-interactive` | Transition + cursor for interactivity |
| `sh-disabled`    | Disabled state (opacity + cursor)     |

> **IMPORTANT**: Shortcuts use `bg-[var(--sh-*)]` internally. Never use dot-notation like `bg-status.danger` inside shortcuts or `:class` bindings — use `var(--sh-*)` in `[]` brackets for manual color logic.

#### No SCSS

- Always use `<style scoped>` (plain CSS / PostCSS).
- Never use `<style lang="scss">`, `@mixin`, `@include`, `$variables`, or SCSS nesting.
- Use Vue `:class` bindings for conditional styles.

#### TypeScript Strictness

- Never use `any` in `types.ts` or component scripts.
- All props must have explicit TypeScript interfaces in `types.ts`.
- Import shared types from `@/core/theme-utils` when working with theme/token data.

#### Dot Notation (Mandatory)

Always use **dot notation** for nested tokens — never hyphen notation:

```
✅ text-text.base     ✅ bg-bg.primary     ✅ border-border.base
❌ text-text-base     ❌ bg-bg-primary     ❌ border-border-base
```

#### Semantic Color Tokens

| Token                                | CSS Variable          | Purpose                                             |
| ------------------------------------ | --------------------- | --------------------------------------------------- |
| `primary`                            | `--sh-primary`        | Focus states, selected indicators, interactive text |
| `primary-fade`                       | `--sh-primary-fade`   | Hover / selected backgrounds                        |
| `bg.primary`                         | `--sh-bg-primary`     | Component main background                           |
| `bg.secondary`                       | `--sh-bg-secondary`   | Disabled state, table headers                       |
| `text.base`                          | `--sh-text-base`      | All general text                                    |
| `text.primary`                       | `--sh-text-primary`   | Low-emphasis text (placeholders, icons)             |
| `border.base`                        | `--sh-border-base`    | Default borders                                     |
| `border.primary`                     | `--sh-border-primary` | Emphasized borders                                  |
| `status.info/danger/warning/success` | —                     | Status colors                                       |

**Forbidden text classes**: `text-gray-*`, `text-stone-*`, `text-[#hex]`, `text-white`, `text-mauve11`.

---

## Phase 2 — Create Demo Files

For each usage scenario that will appear in the documentation, create a corresponding Vue file inside `src/components/<ComponentName>/demos/`:

- **`BasicDemo.vue`** — minimal working example of the core API.
- **Additional demos** — one file per distinct feature / variant (e.g. `SizeDemo.vue`, `DisabledDemo.vue`, `TypeDemo.vue`).

Demo files must:

- Be self-contained (import the component they showcase).
- Use the design system tokens (same rules as Phase 1).
- Not import unrelated utilities or cause side-effects.

---

## Phase 3 — Create Component Documentation

### Goal

Create a documentation page at:

```
docs/components/<component-name>.md
```

And register it in the VitePress sidebar:

```
docs/.vitepress/config.ts
```

### Authoring Rules

1. Use `references/component-doc-template.md` as the default template (located in the `component-doc` skill folder).
2. Use existing docs in `docs/components/` as style and structure reference (e.g. `button.md`).
3. Filename must be **kebab-case** and match the route path.
4. Required document structure:
   - Frontmatter `title`
   - H1 title + 1–2 sentence intro
   - One `<Demo>` section per demo file created in Phase 2
   - API section (Props / Events / Slots)
   - `<script setup>` block importing all demo components
5. Demo component imports use project alias:
   ```ts
   import BasicDemo from '@/components/<ComponentName>/demos/BasicDemo.vue'
   ```
6. Keep wording style consistent with existing docs (Traditional Chinese section labels: 基本用法, API, 屬性, 事件, 插槽).

### VitePress Routing Rules

1. Open `docs/.vitepress/config.ts`.
2. In `themeConfig.sidebar['/components/']`, add the new link to the correct group.
3. Route must match the markdown filename without `.md`.
4. Text format: `<ComponentName> <中文名稱>`.

```ts
{ text: 'BorderContainer 邊框容器', link: '/components/border-container' }
```

---

## Execution Order

Run the phases **sequentially** — do not start Phase 3 until Phase 1 and Phase 2 are complete:

```
Phase 1 → Phase 2 → Phase 3
```

This ensures demo files exist before the doc page references them.

---

## Completion Checklist

- [ ] `src/components/<ComponentName>/` folder created
- [ ] `index.ts`, `index.vue`, `types.ts` created
- [ ] `demos/` folder created with at least one demo file
- [ ] No hardcoded colors, pixels, or arbitrary values
- [ ] No SCSS, no `any` types
- [ ] `docs/components/<component-name>.md` created from template
- [ ] All demo sections have matching `<Demo>` blocks in the doc
- [ ] `<script setup>` imports all demo components correctly
- [ ] `docs/.vitepress/config.ts` sidebar entry added
- [ ] Route and filename are consistent (kebab-case)
