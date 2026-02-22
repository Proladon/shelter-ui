---
name: component-doc
description: Create or update component documentation pages in docs/components and ensure the component route exists in docs/.vitepress/config.ts.
---

# Component Doc

Use this skill when creating or updating component documentation for this repository.

## Goal

Create or update a component documentation page in:

`docs/components/<component-name>.md`

And ensure the component appears in VitePress sidebar routing config:

`docs/.vitepress/config.ts`

## Required Outputs

- A component doc file in `docs/components/`
- A sidebar route item in `docs/.vitepress/config.ts` under `'/components/'`

## Authoring Rules

1. Use `references/component-doc-template.md` as the default template.
2. Use `docs/components/border-container.md` as the style and structure reference.
3. Keep document filename in kebab-case, matching the route path, for example:
   - file: `docs/components/border-container.md`
   - route: `'/components/border-container'`
4. Keep section structure aligned with existing component docs:
   - Frontmatter title
   - H1 title and brief intro
   - Usage demo sections with `<Demo>` and `#code` blocks
   - API section (Props / Events / Slots)
   - `<script setup>` imports for demo components
5. Demo imports should use project aliases and existing component demo files, for example:
   - `@/components/<ComponentName>/demos/<DemoName>.vue`
6. Keep naming and wording style consistent with existing docs in `docs/components`.
7. If updating an existing doc, preserve existing sections unless change is required.

## VitePress Routing Rules

When adding a new component doc page:

1. Open `docs/.vitepress/config.ts`.
2. In `themeConfig.sidebar['/components/']`, add the component link to the correct group.
3. Route must match the markdown filename (without `.md`).
4. Text should follow existing style: `<ComponentName> <中文名稱>`.

Example:

```ts
{ text: 'BorderContainer 邊框容器', link: '/components/border-container' }
```

## Completion Checklist

- `docs/components/<component-name>.md` created or updated
- content initialized from `references/component-doc-template.md`
- Content structure follows `docs/components/border-container.md`
- `docs/.vitepress/config.ts` includes/updates corresponding component route
- Route and filename are consistent (`kebab-case`)
