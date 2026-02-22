---
title: NumberInput 數字輸入框
---

# NumberInput 數字輸入框

NumberInput 用於輸入與調整數字值，內建遞增/遞減按鈕，並支持最小值、最大值與步進設定。

## 基本用法

最基本的數字輸入框用法。

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <div class="w-[280px] flex flex-col gap-3">
    <SHNumberInput v-model="value" :min="0" :max="100" :step="1" />
    <p>目前值：{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref(10)
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名        | 說明                     | 類型                              | 默認值      |
| ------------- | ------------------------ | --------------------------------- | ----------- |
| modelValue    | 綁定值                   | `number`                          | —           |
| min           | 允許的最小值             | `number`                          | —           |
| max           | 允許的最大值             | `number`                          | —           |
| step          | 每次遞增/遞減的步長      | `number`                          | `1`         |
| size          | 尺寸                     | `'small' \| 'default' \| 'large'` | `'default'` |
| disabled      | 是否禁用                 | `boolean`                         | `false`     |
| readonly      | 是否只讀                 | `boolean`                         | `false`     |
| invalid       | 是否顯示錯誤狀態         | `boolean`                         | `false`     |
| focusOnChange | 改變值時是否保持焦點     | `boolean`                         | `true`      |
| stepSnapping  | 是否依步進值進行數值吸附 | `boolean`                         | `true`      |

### 事件

| 事件名            | 說明             | 回調參數        |
| ----------------- | ---------------- | --------------- |
| update:modelValue | 當數值改變時觸發 | `value: number` |

### 插槽

| 插槽名    | 說明         |
| --------- | ------------ |
| decrement | 遞減按鈕內容 |
| increment | 遞增按鈕內容 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/NumberInput/demos/Basic.vue'
</script>
