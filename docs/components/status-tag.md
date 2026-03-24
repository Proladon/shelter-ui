---
title: StatusTag 狀態標籤
---

# StatusTag 狀態標籤

StatusTag 是專為狀態表示設計的標籤組件。標籤左側常駐顯示一個顏色圓點以表示狀態語義，在 `loading` 狀態下圓點會被替換為旋轉 spinner。

## 基本用法

圓點顏色由 `type` 決定，標籤固定帶邊框樣式。

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <div class="flex gap-3 flex-wrap items-center">
    <SHStatusTag value="Online" type="success" />
    <SHStatusTag value="Offline" type="danger" />
    <SHStatusTag value="Idle" type="warning" />
    <SHStatusTag value="Unknown" type="info" />
  </div>
</template>
```

  </template>
</Demo>

## 圓點顏色類型

`type` 控制圓點的顏色語義。

<Demo>
  <TypesDemo />

<template #code>

```vue
<template>
  <div class="flex gap-3 flex-wrap items-center">
    <SHStatusTag value="Primary" type="primary" />
    <SHStatusTag value="Success" type="success" />
    <SHStatusTag value="Info" type="info" />
    <SHStatusTag value="Warning" type="warning" />
    <SHStatusTag value="Danger" type="danger" />
  </div>
</template>
```

  </template>
</Demo>

## Loading 狀態

`loading` 為 `true` 時，圓點會替換為旋轉的 spinner，適合表示處理中的狀態。

<Demo>
  <LoadingDemo />

<template #code>

```vue
<template>
  <div class="flex gap-3 flex-wrap items-center">
    <SHStatusTag value="Connecting..." type="primary" loading />
    <SHStatusTag value="Syncing" type="info" loading />
    <SHStatusTag value="Processing" type="warning" loading />
    <SHStatusTag value="Uploading" type="success" loading />
  </div>
</template>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名  | 說明                                        | 類型                                                        | 默認值      |
| ------- | ------------------------------------------- | ----------------------------------------------------------- | ----------- |
| value   | 標籤文字                                    | `string`                                                    | `''`        |
| type    | 圓點顏色語義                                | `'primary' \| 'success' \| 'info' \| 'warning' \| 'danger'` | `'primary'` |
| loading | 顯示旋轉 spinner 取代圓點（表示處理中狀態） | `boolean`                                                   | `false`     |

### 插槽 Slots

| 插槽名  | 說明             |
| ------- | ---------------- |
| default | 標籤文字自訂內容 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/StatusTag/demos/Basic.vue'
import TypesDemo from '@/components/StatusTag/demos/Types.vue'
import LoadingDemo from '@/components/StatusTag/demos/Loading.vue'
</script>
