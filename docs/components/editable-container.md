---
title: EditableContainer 可編輯容器
---

# EditableContainer 可編輯容器

EditableContainer 組件可以讓任何內容加上一個外框與編輯按鈕，代表該區塊是可被編輯的。

## 基本用法

最簡單的用法，提供一個可編輯的容器。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <SHEditableContainer>
    <template #default="{ editing, loading }">
      <div v-if="!editing">
        <p>這是一個可編輯容器的示例內容（檢視模式）</p>
        <p>點擊右上角的編輯按鈕可進入編輯模式</p>
      </div>
      <div v-else>
        <p>這是一個編輯中的內容（編輯模式）</p>
        <p v-if="loading">正在保存變更…</p>
      </div>
    </template>
  </SHEditableContainer>

  <SHEditableContainer :editable="false">
    <div>
      <p>這是一個不可編輯容器的示例內容</p>
      <p>此區域的編輯按鈕呈現禁用狀態</p>
    </div>
  </SHEditableContainer>
</template>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名   | 說明                           | 類型                  | 默認值 |
| -------- | ------------------------------ | --------------------- | ------ |
| editable | 是否可編輯                     | `boolean`             | `true` |
| updateFn | 切換到檢視模式時執行的更新函數 | `() => Promise<void>` | `-`    |

### 事件

| 事件名 | 說明                                                     | 回調參數 |
| ------ | -------------------------------------------------------- | -------- |
| edit   | 點擊編輯按鈕時觸發（切換到編輯模式）                     | `-`      |
| done   | 在編輯完成且 `updateFn` 執行完畢後觸發（切換回檢視模式） | `-`      |

### 插槽

| 插槽名  | 說明                                                                                               |
| ------- | -------------------------------------------------------------------------------------------------- |
| default | 區域內容；具名 slot props：`{ editing, loading }`，分別表示是否處於編輯模式與是否在執行 `updateFn` |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/EditableContainer/demos/BasicDemo.vue'
</script>
