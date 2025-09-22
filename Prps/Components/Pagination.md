## Goal

建立一個新的組件，名為 `Pagination`

## What

Displays data in paged format and provides navigation between pages.

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://reka-ui.com/docs/components/pagination
  why: 參考 reka-ui 的 pagination 組件實作
```

### Component Anatomy

```
<script setup>
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot
} from 'reka-ui'
</script>

<template>
  <PaginationRoot>
    <PaginationList v-slot="{ items }">
      <PaginationFirst />
      <PaginationPrev />
      <template v-for="(page, index) in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="index"
        />
        <PaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
        >
          &#8230;
        </PaginationEllipsis>
      </template>
      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </PaginationRoot>
</template>
```

### Example Usage

```
<script setup lang="ts">
import {
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
  PaginationRoot
} from 'reka-ui'
import { ref } from 'vue'

const currentPage = ref(1)
</script>

<template>
  <PaginationRoot
    v-model:page="currentPage"
    :total="100"
    :items-per-page="10"
    :sibling-count="2"
    :show-edges="true"
    class="flex items-center space-x-2"
  >
    <PaginationList v-slot="{ items }" class="flex items-center space-x-1">
      <PaginationFirst class="px-3 py-2 bg-white border rounded hover:bg-gray-50 disabled:opacity-50">
        首頁
      </PaginationFirst>
      <PaginationPrev class="px-3 py-2 bg-white border rounded hover:bg-gray-50 disabled:opacity-50">
        上一頁
      </PaginationPrev>

      <template v-for="(page, index) in items">
        <PaginationListItem
          v-if="page.type === 'page'"
          :key="index"
          :value="page.value"
          class="px-3 py-2 bg-white border rounded hover:bg-gray-50 data-[selected]:bg-blue-500 data-[selected]:text-white"
        >
          {{ page.value }}
        </PaginationListItem>
        <PaginationEllipsis
          v-else
          :key="page.type"
          :index="index"
          class="px-3 py-2"
        >
          &#8230;
        </PaginationEllipsis>
      </template>

      <PaginationNext class="px-3 py-2 bg-white border rounded hover:bg-gray-50 disabled:opacity-50">
        下一頁
      </PaginationNext>
      <PaginationLast class="px-3 py-2 bg-white border rounded hover:bg-gray-50 disabled:opacity-50">
        末頁
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Pagination 組件相關檔案
CREATE: src/components/Pagination/
    - CREATE: src/components/Pagination/demos/
    - CREATE: src/components/Pagination/index.vue
    - CREATE: src/components/Pagination/types.ts

- Task2: 建立 Pagination 組件相關 demo
UPDATE: src/components/Pagination/demos/

- Task3:
IMPLEMENT: Prps/UpdateComponentDocs.md

- Task4:
IMPLEMENT: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax
- class names should be starting with `sh`, e.g. `sh-pagination`, `sh-pagination-item`, etc.

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
