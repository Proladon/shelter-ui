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
  <SHSwitch v-model:value="checked">啟用</SHSwitch>
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

## 尺寸

透過 `size` 屬性控制開關大小，支援 `small`、`medium`（預設）、`large` 三種尺寸。

<Demo>
  <SizeDemo />
  <template #code>

```vue
<template>
  <SHSwitch v-model:value="checked" size="small" />
  <SHSwitch v-model:value="checked" size="medium" />
  <SHSwitch v-model:value="checked" size="large" />
</template>

<script setup lang="ts">
import Switch from '@/components/Switch'
import { ref } from 'vue'
const checked = ref(false)
</script>
```

  </template>
</Demo>

## 唯讀

透過 `readonly` 屬性可將開關設為唯讀，點擊不會改變狀態，但視覺樣式與可互動的開關相同。

<Demo>
  <ReadonlyDemo />
  <template #code>

```vue
<template>
  <SHSwitch v-model:value="checked" readonly />
</template>

<script setup lang="ts">
import Switch from '@/components/Switch'
import { ref } from 'vue'
const checked = ref(true)
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名   | 說明     | 類型                           | 默認值   |
| -------- | -------- | ------------------------------ | -------- |
| value    | 綁定值   | boolean                        | false    |
| size     | 尺寸     | 'small' \| 'medium' \| 'large' | 'medium' |
| disabled | 是否禁用 | boolean                        | false    |
| readonly | 是否唯讀 | boolean                        | false    |

### 事件

| 事件名       | 說明             | 回調參數   |
| ------------ | ---------------- | ---------- |
| update:value | 綁定值變化時觸發 | boolean    |
| change       | 狀態切換時觸發   | boolean    |
| focus        | 獲得焦點時觸發   | FocusEvent |
| blur         | 失去焦點時觸發   | FocusEvent |

### 插槽

| 插槽名  | 說明               |
| ------- | ------------------ |
| default | 開關旁的文字或內容 |

## 無障礙

- 支援鍵盤 Space/Enter 切換
- ARIA `role="switch"`、`aria-checked`、`aria-disabled` 屬性

<script setup>
import BasicDemo from '@/components/Switch/demos/BasicDemo.vue'
import SizeDemo from '@/components/Switch/demos/SizeDemo.vue'
import ReadonlyDemo from '@/components/Switch/demos/ReadonlyDemo.vue'
</script>
