---
title: Popover 彈出框
---

# Popover 彈出框

Popover 彈出框是一個可以懸浮在頁面上的輕量級對話框，通常用於顯示附加信息或操作。

## 基本用法

最簡單的用法，點擊觸發器顯示彈出框。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <SHPopover>
    <template #trigger>
      <SHButton>點擊顯示彈出框</SHButton>
    </template>
    <div :style="{ display: 'flex', flexDirection: 'column', gap: 10 }">
      <p class="text-lg font-medium">彈出框內容</p>
      <p>這是一個基本的彈出框示例</p>
    </div>
  </SHPopover>
</template>
```

  </template>
</Demo>

## 不同方位

Popover 支持四個不同的彈出方位：上、右、下、左。

<Demo>
  <PlacementDemo />
  
  <template #code>

```vue
<template>
  <div class="flex flex-wrap gap-4">
    <SHPopover side="top">
      <template #trigger>
        <SHButton>上方</SHButton>
      </template>
      <div class="py-2">彈出框顯示在上方</div>
    </SHPopover>

    <SHPopover side="right">
      <template #trigger>
        <SHButton>右方</SHButton>
      </template>
      <div class="py-2">彈出框顯示在右方</div>
    </SHPopover>

    <SHPopover side="bottom">
      <template #trigger>
        <SHButton>下方</SHButton>
      </template>
      <div class="py-2">彈出框顯示在下方</div>
    </SHPopover>

    <SHPopover side="left">
      <template #trigger>
        <SHButton>左方</SHButton>
      </template>
      <div class="py-2">彈出框顯示在左方</div>
    </SHPopover>
  </div>
</template>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名      | 說明                     | 類型                                     | 默認值      |
| ----------- | ------------------------ | ---------------------------------------- | ----------- |
| open        | 控制彈出框是否打開       | `boolean`                                | `undefined` |
| defaultOpen | 彈出框默認是否打開       | `boolean`                                | `undefined` |
| modal       | 是否為模態彈出框         | `boolean`                                | `false`     |
| side        | 彈出框相對於觸發器的方位 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'bottom'`  |
| sideOffset  | 彈出框與觸發器之間的距離 | `number`                                 | `5`         |
| align       | 彈出框與觸發器的對齊方式 | `'start' \| 'center' \| 'end'`           | `'center'`  |
| alignOffset | 彈出框對齊偏移量         | `number`                                 | `0`         |
| disabled    | 是否禁用彈出框           | `boolean`                                | `false`     |

### 事件

| 事件名      | 說明                         | 回調參數                   |
| ----------- | ---------------------------- | -------------------------- |
| update:open | 當彈出框的打開狀態變化時觸發 | `(value: boolean) => void` |
| openChange  | 當彈出框的打開狀態變化時觸發 | `(value: boolean) => void` |

### 插槽

| 插槽名  | 說明               |
| ------- | ------------------ |
| trigger | 觸發彈出框的元素   |
| default | 彈出框的內容       |
| close   | 關閉按鈕，可自定義 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Popover/demos/BasicDemo.vue'
import PlacementDemo from '@/components/Popover/demos/PlacementDemo.vue'
</script>
