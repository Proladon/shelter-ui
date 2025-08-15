## Goal

建立一個新的組件，名為 `Progress`

## What

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://reka-ui.com/docs/components/progress
  why: 參考 reka-ui 的 progress 組件實作
```

### Component Anatomy

```
<script setup>
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
</script>

<template>
  <ProgressRoot>
    <ProgressIndicator />
  </ProgressRoot>
</template>
```

### Example Usage

```
<script setup lang="ts">
import { ProgressIndicator, ProgressRoot } from 'reka-ui'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const progressValue = ref(10)
const timer = ref()

onMounted(() => {
  timer.value = setInterval(() => {
    if (progressValue.value === 100) {
      progressValue.value = 10
    }
    else {
      progressValue.value += 30
    }
  }, 2000)
})

onBeforeUnmount(() => {
  clearTimeout(timer.value)
})
</script>

<template>
  <ProgressRoot
    v-model="progressValue"
    class="rounded-full relative h-4 w-[300px] overflow-hidden bg-white dark:bg-stone-950 border border-muted"
  >
    <ProgressIndicator
      class="indicator rounded-full block relative w-full h-full bg-grass9 transition-transform overflow-hidden duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)] after:animate-progress after:content-[''] after:absolute after:inset-0  after:bg-[linear-gradient(-45deg,_rgba(255,255,255,0.2)_25%,_transparent_25%,_transparent_50%,_rgba(255,255,255,0.2)_50%,_rgba(255,255,255,0.2)_75%,_transparent_75%,_transparent)] after:bg-[length:30px_30px]"
      :style="`transform: translateX(-${100 - progressValue}%)`"
    />
  </ProgressRoot>
</template>
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Progress 組件相關檔案
CREATE: src/components/Progress/
    - CREATE: src/components/Progress/demos/
    - CREATE: src/components/Progress/index.vue
    - CREATE: src/components/Progress/types.ts

- Task2: 建立 Progress 組件相關 demo
UPDATE: src/components/Progress/demos/

- Task3:
EXECUTE: Prps/UpdateComponentDocs.md

- Task4:
EXECUTE: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax
- class names should be starting with `sh`, e.g. `sh-progress`, etc.

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
