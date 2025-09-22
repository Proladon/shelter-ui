## Goal

建立一個新的組件，名為 `Slider`

## What

An input where the user selects a value from within a given range.

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://reka-ui.com/docs/components/slider
  why: 參考 reka-ui 的 slider 組件實作
```

### Component Anatomy

```
<script setup>
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
</script>

<template>
  <SliderRoot>
    <SliderTrack>
      <SliderRange />
    </SliderTrack>
    <SliderThumb />
  </SliderRoot>
</template>
```

### Example Usage

```
<script setup lang="ts">
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'reka-ui'
import { ref } from 'vue'

const sliderValue = ref([50])
</script>

<template>
  <SliderRoot
    v-model="sliderValue"
    class="relative flex items-center select-none touch-none w-[200px] h-5"
    :max="100"
    :step="1"
  >
    <SliderTrack class="bg-stone-500/30 relative grow rounded-full h-2">
      <SliderRange class="absolute bg-grass8 rounded-full h-full" />
    </SliderTrack>
    <SliderThumb
      class="block w-6 h-6 bg-white rounded-full hover:bg-stone-50 shadow-sm focus:outline-none focus:shadow-[0_0_0_2px] focus:shadow-grass9"
      aria-label="Volume"
    />
  </SliderRoot>
</template>
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Slider 組件相關檔案
CREATE: src/components/Slider/
    - CREATE: src/components/Slider/demos/
    - CREATE: src/components/Slider/index.vue
    - CREATE: src/components/Slider/types.ts

- Task2: 建立 Slider 組件相關 demo
UPDATE: src/components/Slider/demos/

- Task3:
IMPLEMENT: Prps/UpdateComponentDocs.md

- Task4:
IMPLEMENT: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax
- class names should be starting with `sh`, e.g. `sh-slider`, `sh-slider-track`, etc.

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
