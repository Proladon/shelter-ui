---
title: Switch 開關
---

# Switch 開關

開關元件允許用戶在開啟/關閉狀態間切換。

## 基本用法

<Demo>
  <BasicDemo />
  <template #code>

```vue
<template>
  <s-switch v-model="checked">啟用</s-switch>
  <span class="ml-4">目前狀態：{{ checked ? '開啟' : '關閉' }}</span>
</template>

<script setup lang="ts">
import Switch from '@/components/Switch'
import { ref } from 'vue'
const checked = ref(false)
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名     | 說明     | 類型    | 默認值 |
| ---------- | -------- | ------- | ------ |
| modelValue | 綁定值   | boolean | false  |
| disabled   | 是否禁用 | boolean | false  |

### 事件

| 事件名            | 說明             | 回調參數 |
| ----------------- | ---------------- | -------- |
| update:modelValue | 綁定值變化時觸發 | boolean  |
| change            | 狀態切換時觸發   | boolean  |

### 插槽

| 插槽名  | 說明               |
| ------- | ------------------ |
| default | 開關旁的文字或內容 |

## 無障礙

- 支援鍵盤 Space/Enter 切換
- ARIA `role="switch"`、`aria-checked`、`aria-disabled` 屬性

<script setup>
import BasicDemo from '@/components/Switch/demos/BasicDemo.vue'
</script>
