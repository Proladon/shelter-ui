---
title: FlexContainer 彈性容器
---

## Description

FlexContainer 組件可以將包覆的區塊進行彈性布局，讓使用者可以更方便地進行排版。可透過 props 設定子元素的排列方式、對齊方式等屬性，並支援響應式設計。

## 基本用法

<Demo>
  <BasicDemo />
  <template #code>

```vue
<template>
  <FlexContainer align="center" justify="between" :gap="16">
    <div style="background:#eee;padding:8px;">區塊一</div>
    <div style="background:#eee;padding:8px;">區塊二</div>
    <div style="background:#eee;padding:8px;">區塊三</div>
  </FlexContainer>
</template>
```

  </template>
</Demo>

## 垂直排列（col 屬性）

<Demo>
  <ColDemo />
  <template #code>

```vue
<template>
  <FlexContainer align="center" justify="center" :gap="12" col>
    <div style="background:#eee;padding:8px;">垂直一</div>
    <div style="background:#eee;padding:8px;">垂直二</div>
    <div style="background:#eee;padding:8px;">垂直三</div>
  </FlexContainer>
</template>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名稱 | 說明         | 類型                                                    | 默認值 |
| -------- | ------------ | ------------------------------------------------------- | ------ |
| align    | 垂直對齊方式 | 'start'｜'center'｜'end'｜'between'｜'around'｜'evenly' | 無     |
| justify  | 水平排列方式 | 'start'｜'center'｜'end'｜'between'｜'around'｜'evenly' | 無     |
| gap      | 元素間距     | number                                                  | 0      |
| col      | 是否垂直排列 | boolean                                                 | false  |
| wrap     | 是否換行     | boolean                                                 | false  |

### 插槽 Slots

| 插槽名稱 | 說明     |
| -------- | -------- |
| default  | 容器內容 |

<script setup>
import { SConfigProvider } from '@/index'
import BasicDemo from '@/components/FlexContainer/demos/BasicDemo.vue'
import ColDemo from '@/components/FlexContainer/demos/ColDemo.vue'
</script>
