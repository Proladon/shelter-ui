## Goal

建立一個新的組件，名為 `FlexContainer`，並更新組件文檔

## What

FlexContainer 組件可以將包覆的區塊進行彈性布局，讓使用者可以更方便地進行排版。
FlexContainer 可以透過 props 來設定子元素的排列方式、對齊方式等屬性，並支援響應式設計。

## All Needed Context

### Component Code

```
<template>
  <div class="flex-layout" :style="computedStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface FlexContainerProps {
  align?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: number
  col?: boolean
  wrap?: boolean
}

const props = withDefaults(defineProps<FlexContainerProps>(), {
  gap: 0,
  col: false,
})

const alignMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const computedStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.col) {
    style.display = 'flex'
    style.flexDirection = 'column'
  } else {
    style.display = 'flex'
    style.flexDirection = 'row'
  }
  if (props.align) {
    style.alignItems = alignMap[props.align] || 'stretch'
  }
  if (props.justify) {
    style.justifyContent = justifyMap[props.justify] || 'flex-start'
  }
  if (props.gap) {
    style.gap = `${props.gap}px`
  }
  if (props.wrap) {
    style.flexWrap = 'wrap'
  }
  return style
})
</script>

```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 FlexContainer 組件相關檔案
CREATE: src/components/FlexContainer/
    - CREATE: src/components/FlexContainer/demos/
    - CREATE: src/components/FlexContainer/index.vue
    - CREATE: src/components/FlexContainer/types.ts

- Task2: 建立 FlexContainer 組件相關 demo
UPDATE: src/components/FlexContainer/demos/

- Task3:
EXECUTE: Prps/UpdateComponentDocs.md

- Task4:
EXECUTE: Prps/ExportComponent.md
```

## Important

- use Chinese Traditional all the time
