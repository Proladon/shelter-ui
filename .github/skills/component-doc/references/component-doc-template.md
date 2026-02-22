---
title: <ComponentName> <中文名稱>
---

# <ComponentName> <中文名稱>

<ComponentName> 的簡短說明（1~2 句）。

## 基本用法

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <div>
    <SHComponentName />
  </div>
</template>
```

  </template>
</Demo>

## 進階用法

<Demo>
  <AdvancedDemo />

<template #code>

```vue
<template>
  <div>
    <SHComponentName :prop="value" />
  </div>
</template>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名 | 說明 | 類型 | 默認值 |
| ------ | ---- | ---- | ------ |
| -      | -    | -    | -      |

### 事件

| 事件名 | 說明 | 回調參數 |
| ------ | ---- | -------- |
| -      | -    | -        |

### 插槽

| 插槽名  | 說明     |
| ------- | -------- |
| default | 預設內容 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/<ComponentName>/demos/BasicDemo.vue'
import AdvancedDemo from '@/components/<ComponentName>/demos/AdvancedDemo.vue'
</script>
