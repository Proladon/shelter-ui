---
title: Button 按鈕
---

# Button 按鈕

按鈕用於觸發一個操作，如提交表單。

## 基本用法

基本按鈕用法，支持多種類型。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <div class="flex gap-2">
    <s-button>Default</s-button>
    <s-button type="primary">Primary</s-button>
    <s-button type="success">Success</s-button>
    <s-button type="warning">Warning</s-button>
    <s-button type="danger">Danger</s-button>
    <s-button type="info">Info</s-button>
  </div>
</template>
```

  </template>
</Demo>

## 按鈕樣式

Button 組件提供了多種樣式變化，包括文字、幽靈、虛線、描邊和帶邊框按鈕。

<Demo>
  <TypeDemo />
  
  <template #code>

```vue
<template>
  <div class="flex gap-2">
    <s-button dashed>Dashed</s-button>
    <s-button type="warning" outline>Outline</s-button>
    <s-button type="primary" borderd>Borderd</s-button>
    <s-button type="primary" plain>Plain</s-button>
    <s-button type="danger" ghost>Ghost</s-button>
    <s-button type="success" text>Text</s-button>
  </div>
</template>
```

  </template>
</Demo>

<Demo>
  <StyleDemo />
  
  <template #code>

```vue
<template>
  <div>
    <h4>Text 文字按鈕</h4>
    <div class="flex gap-2 mb-2">
      <s-button text>Default</s-button>
      <s-button type="primary" text>Primary</s-button>
      <s-button type="success" text>Success</s-button>
      <s-button type="warning" text>Warning</s-button>
      <s-button type="danger" text>Danger</s-button>
      <s-button type="info" text>Info</s-button>
    </div>

    <h4>Ghost 幽靈按鈕</h4>
    <div class="flex gap-2 mb-2">
      <s-button ghost>Default</s-button>
      <s-button type="primary" ghost>Primary</s-button>
      <s-button type="success" ghost>Success</s-button>
      <s-button type="warning" ghost>Warning</s-button>
      <s-button type="danger" ghost>Danger</s-button>
      <s-button type="info" ghost>Info</s-button>
    </div>

    <h4>Dashed 虛線按鈕</h4>
    <div class="flex gap-2 mb-2">
      <s-button dashed>Default</s-button>
      <s-button type="primary" dashed>Primary</s-button>
      <s-button type="success" dashed>Success</s-button>
      <s-button type="warning" dashed>Warning</s-button>
      <s-button type="danger" dashed>Danger</s-button>
      <s-button type="info" dashed>Info</s-button>
    </div>

    <h4>Outline 描邊按鈕</h4>
    <div class="flex gap-2 mb-2">
      <s-button outline>Default</s-button>
      <s-button type="primary" outline>Primary</s-button>
      <s-button type="success" outline>Success</s-button>
      <s-button type="warning" outline>Warning</s-button>
      <s-button type="danger" outline>Danger</s-button>
      <s-button type="info" outline>Info</s-button>
    </div>

    <h4>Borderd 帶邊框按鈕</h4>
    <div class="flex gap-2 mb-2">
      <s-button borderd>Default</s-button>
      <s-button type="primary" borderd>Primary</s-button>
      <s-button type="success" borderd>Success</s-button>
      <s-button type="warning" borderd>Warning</s-button>
      <s-button type="danger" borderd>Danger</s-button>
      <s-button type="info" borderd>Info</s-button>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 按鈕尺寸

Button 組件提供三種尺寸：小、默認、大。

<Demo>
  <SizeDemo />
  
  <template #code>

```vue
<template>
  <div class="flex items-center gap-2">
    <s-button size="small">小按鈕</s-button>
    <s-button>默認按鈕</s-button>
    <s-button size="large">大按鈕</s-button>
  </div>
</template>
```

  </template>
</Demo>

## 禁用狀態

使用 `disabled` 屬性來禁用按鈕。

<Demo>
  <DisabledDemo />
  
  <template #code>

```vue
<template>
  <div class="flex gap-2">
    <s-button disabled>禁用按鈕</s-button>
    <s-button type="primary" disabled>禁用主要按鈕</s-button>
  </div>
</template>
```

  </template>
</Demo>

## 加載狀態

使用 `loading` 屬性設置按鈕的加載狀態。

<Demo>
  <LoadingDemo />
  
  <template #code>

```vue
<template>
  <div class="flex gap-2">
    <s-button type="primary" :loading="true">加載中</s-button>
    <s-button type="success" :loading="loading">{{
      loading ? '加載中...' : '點擊加載'
    }}</s-button>
    <s-button
      plain
      :type="loading ? 'warning' : 'info'"
      @click="toggleLoading"
      >{{ loading ? '停止加載' : '開始加載' }}</s-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const loading = ref(false)
const toggleLoading = () => {
  loading.value = !loading.value
}
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名   | 說明               | 類型                                                                     | 默認值      |
| -------- | ------------------ | ------------------------------------------------------------------------ | ----------- |
| type     | 按鈕類型           | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| size     | 按鈕尺寸           | `'large' \| 'default' \| 'small'`                                        | `'default'` |
| disabled | 是否禁用           | `boolean`                                                                | `false`     |
| loading  | 是否顯示加載狀態   | `boolean`                                                                | `false`     |
| text     | 是否為文字按鈕     | `boolean`                                                                | `false`     |
| ghost    | 是否為幽靈按鈕     | `boolean`                                                                | `false`     |
| dashed   | 是否為虛線邊框按鈕 | `boolean`                                                                | `false`     |
| outline  | 是否為描邊按鈕     | `boolean`                                                                | `false`     |
| borderd  | 是否為帶邊框按鈕   | `boolean`                                                                | `false`     |

### 事件

| 事件名 | 說明           | 回調參數                      |
| ------ | -------------- | ----------------------------- |
| click  | 點擊按鈕時觸發 | `(event: MouseEvent) => void` |

### 插槽

| 插槽名  | 說明       |
| ------- | ---------- |
| default | 按鈕的內容 |

<script setup>
import { SConfigProvider } from '@/index'
import BasicDemo from '@/components/Button/demos/BasicDemo.vue'
import TypeDemo from '@/components/Button/demos/TypeDemo.vue'
import DisabledDemo from '@/components/Button/demos/DisabledDemo.vue'
import LoadingDemo from '@/components/Button/demos/LoadingDemo.vue'
import SizeDemo from '@/components/Button/demos/SizeDemo.vue'
import StyleDemo from '@/components/Button/demos/StyleDemo.vue'
</script>
