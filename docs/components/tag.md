---
title: Tag 標籤
---

# Tag 標籤

Tag 組件用於分類內容，提供簡潔的標籤顯示功能，支援不同的樣式變化和圖示。

## 基本用法

基本標籤用法，可顯示簡單的文字標籤。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <div class="flex gap-2">
    <SHTag value="基本標籤" />
    <SHTag value="預設" />
    <SHTag value="New" />
  </div>
</template>
```

  </template>
</Demo>

## 類型變化

Tag 組件支援多種類型，用於表示不同的狀態和語義。

<Demo>
  <TypeDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <div class="flex gap-2 flex-wrap">
      <SHTag value="Primary" type="primary" />
      <SHTag value="Secondary" type="secondary" />
      <SHTag value="Success" type="success" />
      <SHTag value="Info" type="info" />
      <SHTag value="Warning" type="warning" />
      <SHTag value="Danger" type="danger" />
    </div>

    <div class="flex gap-2 flex-wrap">
      <SHTag value="Primary" type="primary" rounded />
      <SHTag value="Secondary" type="secondary" rounded />
      <SHTag value="Success" type="success" rounded />
      <SHTag value="Info" type="info" rounded />
      <SHTag value="Warning" type="warning" rounded />
      <SHTag value="Danger" type="danger" rounded />
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 帶圖示標籤

Tag 組件支援顯示圖示，可以通過 prop 或插槽的方式添加。

<Demo>
  <IconDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <div class="flex gap-2 flex-wrap">
      <SHTag value="使用者" type="primary" :icon="IconUser" />
      <SHTag value="搜尋" type="secondary" :icon="IconSearch" />
      <SHTag value="成功" type="success" :icon="IconCheck" />
      <SHTag value="資訊" type="info" :icon="IconInfoCircle" />
      <SHTag value="警告" type="warning" :icon="IconAlertTriangle" />
      <SHTag value="危險" type="danger" :icon="IconX" />
    </div>

    <div class="flex gap-2 flex-wrap">
      <SHTag value="自訂圖示" type="primary">
        <template #icon>
          <IconStar class="w-4 h-4" />
        </template>
      </SHTag>

      <SHTag type="success">
        <template #icon>
          <IconHeart class="w-4 h-4" />
        </template>
        <template #default> 喜愛項目 </template>
      </SHTag>
    </div>
  </div>
</template>

<script setup>
import {
  IconUser,
  IconSearch,
  IconCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconX,
  IconStar,
  IconHeart,
} from "@tabler/icons-vue"
</script>
```

  </template>
</Demo>

## 邊框標籤

Tag 組件支援邊框樣式，可以與其他屬性組合使用。

<Demo>
  <BorderedDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <div class="flex gap-2 flex-wrap">
      <SHTag value="Primary" type="primary" bordered />
      <SHTag value="Secondary" type="secondary" bordered />
      <SHTag value="Success" type="success" bordered />
      <SHTag value="Info" type="info" bordered />
      <SHTag value="Warning" type="warning" bordered />
      <SHTag value="Danger" type="danger" bordered />
    </div>

    <div class="flex gap-2 flex-wrap">
      <SHTag value="圓角邊框" type="primary" rounded bordered />
      <SHTag value="帶圖示" type="success" :icon="IconCheck" bordered />
      <SHTag
        value="圓角圖示"
        type="info"
        rounded
        bordered
        :icon="IconInfoCircle"
      />
    </div>
  </div>
</template>

<script setup>
import { IconCheck, IconInfoCircle } from "@tabler/icons-vue"
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名   | 說明         | 類型                                                                       | 默認值      |
| -------- | ------------ | -------------------------------------------------------------------------- | ----------- |
| value    | 標籤文字     | `string`                                                                   | `''`        |
| type     | 標籤類型     | `'primary' \| 'secondary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'primary'` |
| rounded  | 是否圓角     | `boolean`                                                                  | `false`     |
| bordered | 是否顯示邊框 | `boolean`                                                                  | `false`     |
| icon     | 圖示組件     | `Component`                                                                | -           |

### 插槽 Slots

| 插槽名  | 說明     |
| ------- | -------- |
| default | 預設內容 |
| icon    | 自訂圖示 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Tag/demos/Basic.vue'
import TypeDemo from '@/components/Tag/demos/Type.vue'
import IconDemo from '@/components/Tag/demos/Icon.vue'
import BorderedDemo from '@/components/Tag/demos/Bordered.vue'
</script>
