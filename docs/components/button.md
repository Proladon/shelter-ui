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
    <SHButton>Default</SHButton>
    <SHButton type="primary">Primary</SHButton>
    <SHButton type="success">Success</SHButton>
    <SHButton type="warning">Warning</SHButton>
    <SHButton type="danger">Danger</SHButton>
    <SHButton type="info">Info</SHButton>
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
    <SHButton dashed>Dashed</SHButton>
    <SHButton type="warning" outline>Outline</SHButton>
    <SHButton type="primary" borderd>Borderd</SHButton>
    <SHButton type="primary" plain>Plain</SHButton>
    <SHButton type="danger" ghost>Ghost</SHButton>
    <SHButton type="success" text>Text</SHButton>
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
      <SHButton text>Default</SHButton>
      <SHButton type="primary" text>Primary</SHButton>
      <SHButton type="success" text>Success</SHButton>
      <SHButton type="warning" text>Warning</SHButton>
      <SHButton type="danger" text>Danger</SHButton>
      <SHButton type="info" text>Info</SHButton>
    </div>

    <h4>Ghost 幽靈按鈕</h4>
    <div class="flex gap-2 mb-2">
      <SHButton ghost>Default</SHButton>
      <SHButton type="primary" ghost>Primary</SHButton>
      <SHButton type="success" ghost>Success</SHButton>
      <SHButton type="warning" ghost>Warning</SHButton>
      <SHButton type="danger" ghost>Danger</SHButton>
      <SHButton type="info" ghost>Info</SHButton>
    </div>

    <h4>Dashed 虛線按鈕</h4>
    <div class="flex gap-2 mb-2">
      <SHButton dashed>Default</SHButton>
      <SHButton type="primary" dashed>Primary</SHButton>
      <SHButton type="success" dashed>Success</SHButton>
      <SHButton type="warning" dashed>Warning</SHButton>
      <SHButton type="danger" dashed>Danger</SHButton>
      <SHButton type="info" dashed>Info</SHButton>
    </div>

    <h4>Outline 描邊按鈕</h4>
    <div class="flex gap-2 mb-2">
      <SHButton outline>Default</SHButton>
      <SHButton type="primary" outline>Primary</SHButton>
      <SHButton type="success" outline>Success</SHButton>
      <SHButton type="warning" outline>Warning</SHButton>
      <SHButton type="danger" outline>Danger</SHButton>
      <SHButton type="info" outline>Info</SHButton>
    </div>

    <h4>Borderd 帶邊框按鈕</h4>
    <div class="flex gap-2 mb-2">
      <SHButton borderd>Default</SHButton>
      <SHButton type="primary" borderd>Primary</SHButton>
      <SHButton type="success" borderd>Success</SHButton>
      <SHButton type="warning" borderd>Warning</SHButton>
      <SHButton type="danger" borderd>Danger</SHButton>
      <SHButton type="info" borderd>Info</SHButton>
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
    <SHButton size="small">小按鈕</SHButton>
    <SHButton>默認按鈕</SHButton>
    <SHButton size="large">大按鈕</SHButton>
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
    <SHButton disabled>禁用按鈕</SHButton>
    <SHButton type="primary" disabled>禁用主要按鈕</SHButton>
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
    <SHButton type="primary" :loading="true">加載中</SHButton>
    <SHButton type="success" :loading="loading">{{
      loading ? '加載中...' : '點擊加載'
    }}</SHButton>
    <SHButton
      plain
      :type="loading ? 'warning' : 'info'"
      @click="toggleLoading"
      >{{ loading ? '停止加載' : '開始加載' }}</SHButton
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
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Button/demos/BasicDemo.vue'
import TypeDemo from '@/components/Button/demos/TypeDemo.vue'
import DisabledDemo from '@/components/Button/demos/DisabledDemo.vue'
import LoadingDemo from '@/components/Button/demos/LoadingDemo.vue'
import SizeDemo from '@/components/Button/demos/SizeDemo.vue'
import StyleDemo from '@/components/Button/demos/StyleDemo.vue'
</script>
