---
title: Tooltip 工具提示
---

# Tooltip 工具提示

Tooltip 工具提示組件用於在用戶懸停在元素上時顯示提示信息，有助於提供額外的上下文或解釋。

## 基本用法

最基本的工具提示用法。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <s-tooltip>
    <template #trigger>
      <button class="demo-button">懸停在此</button>
    </template>
    這是一個簡單的工具提示
  </s-tooltip>
</template>
```

  </template>
</Demo>

## 不同方位

Tooltip 支持四個不同的彈出方位：上、右、下、左。

<Demo>
  <PlacementDemo />
  
  <template #code>

```vue
<template>
  <div class="tooltip-grid">
    <s-tooltip side="top">
      <template #trigger>
        <button class="demo-button">上方</button>
      </template>
      Tooltip 顯示在上方
    </s-tooltip>

    <s-tooltip side="right">
      <template #trigger>
        <button class="demo-button">右方</button>
      </template>
      Tooltip 顯示在右方
    </s-tooltip>

    <s-tooltip side="bottom">
      <template #trigger>
        <button class="demo-button">下方</button>
      </template>
      Tooltip 顯示在下方
    </s-tooltip>

    <s-tooltip side="left">
      <template #trigger>
        <button class="demo-button">左方</button>
      </template>
      Tooltip 顯示在左方
    </s-tooltip>
  </div>
</template>

<style scoped>
.tooltip-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 300px;
  margin: 0 auto;
}

.demo-button {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: var(--sh-primary);
  color: white;
  cursor: pointer;
  border: none;
  width: 100%;
}
</style>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名        | 說明                       | 類型                                     | 默認值      |
| ------------- | -------------------------- | ---------------------------------------- | ----------- |
| defaultOpen   | 初始渲染時的默認打開狀態   | `boolean`                                | `undefined` |
| open          | 受控打開狀態               | `boolean`                                | `undefined` |
| side          | 相對於觸發器的首選渲染位置 | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'`     |
| sideOffset    | 與觸發器的距離             | `number`                                 | `5`         |
| align         | 相對於觸發器的對齊方式     | `'start' \| 'center' \| 'end'`           | `'center'`  |
| alignOffset   | 從對齊邊緣的偏移量         | `number`                                 | `0`         |
| delayDuration | 顯示工具提示前的延遲時間   | `number`                                 | `300`       |
| disabled      | 是否禁用工具提示           | `boolean`                                | `false`     |
| arrow         | 是否顯示箭頭               | `boolean`                                | `true`      |

### 事件

| 事件名      | 說明               | 回調參數                   |
| ----------- | ------------------ | -------------------------- |
| update:open | 打開狀態變化時觸發 | `(value: boolean) => void` |
| openChange  | 打開狀態變化時觸發 | `(value: boolean) => void` |

### 插槽

| 插槽名  | 說明                 |
| ------- | -------------------- |
| default | 工具提示中顯示的內容 |
| trigger | 觸發工具提示的元素   |

<script setup>
import { SConfigProvider } from '@/index'
import BasicDemo from '@/components/Tooltip/demos/BasicDemo.vue'
import PlacementDemo from '@/components/Tooltip/demos/PlacementDemo.vue'
</script>
