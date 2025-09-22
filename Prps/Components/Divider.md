## Goal

建立一個新的組件，名為 `Divider`

## What

A visual separator that divides content into sections.

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://reka-ui.com/docs/components/separator
  why: 參考 reka-ui 的 separator 組件實作（divider 的別名）
```

### Component Anatomy

```
<script setup>
import { Separator } from 'reka-ui'
</script>

<template>
  <Separator />
</template>
```

### Example Usage

```
<script setup lang="ts">
import { Separator } from 'reka-ui'
</script>

<template>
  <div class="w-full max-w-[300px] mx-auto">
    <div class="space-y-1">
      <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
      <p class="text-sm text-gray-500">
        An open-source UI component library.
      </p>
    </div>
    <Separator class="my-4 bg-gray-200 h-px" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <Separator orientation="vertical" class="bg-gray-200 w-px" />
      <div>Docs</div>
      <Separator orientation="vertical" class="bg-gray-200 w-px" />
      <div>Source</div>
    </div>
  </div>
</template>
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Divider 組件相關檔案
CREATE: src/components/Divider/
    - CREATE: src/components/Divider/demos/
    - CREATE: src/components/Divider/index.vue
    - CREATE: src/components/Divider/types.ts

- Task2: 建立 Divider 組件相關 demo
UPDATE: src/components/Divider/demos/

- Task3:
IMPLEMENT: Prps/UpdateComponentDocs.md

- Task4:
IMPLEMENT: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax
- class names should be starting with `sh`, e.g. `sh-divider`, `sh-divider-horizontal`, etc.

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
