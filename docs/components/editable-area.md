---
title: EditableArea 可編輯區域
---

# EditableArea 可編輯區域

EditableArea 組件可以讓任何內容加上一個外框與編輯按鈕，代表該區塊是可被編輯的。

## 基本用法

最簡單的用法，提供一個可編輯的區域。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <s-editable-area>
    <div>
      <p>這是一個可編輯區域的示例內容</p>
      <p>點擊右上角的編輯按鈕可觸發編輯事件</p>
    </div>
  </s-editable-area>

  <s-editable-area :editable="false">
    <div>
      <p>這是一個不可編輯區域的示例內容</p>
      <p>此區域的編輯按鈕呈現禁用狀態</p>
    </div>
  </s-editable-area>
</template>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名   | 說明       | 類型      | 默認值 |
| -------- | ---------- | --------- | ------ |
| editable | 是否可編輯 | `boolean` | `true` |

### 事件

| 事件名 | 說明               | 回調參數 |
| ------ | ------------------ | -------- |
| edit   | 點擊編輯按鈕時觸發 | `-`      |

### 插槽

| 插槽名  | 說明     |
| ------- | -------- |
| default | 區域內容 |

<script setup>
import { SConfigProvider } from '@/index'
import BasicDemo from '@/components/EditableArea/demos/BasicDemo.vue'
</script>
