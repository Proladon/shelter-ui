---
title: ChatInput 對話輸入框
---

# ChatInput 對話輸入框

ChatInput 是專為對話場景設計的輸入框組件，底部左側提供檔案上傳與圖片上傳按鈕，右側為送出按鈕，並支援頂部附加插槽。

## 基本用法

按 Enter 或點擊右下角送出按鈕即可送出訊息；左下角提供上傳檔案與上傳圖片的圖示按鈕。

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <SHChatInput
    v-model:value="message"
    placeholder="輸入訊息…"
    @submit="handleSubmit"
    @file-select="handleFile"
    @image-select="handleImage"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHChatInput } from 'shelter-ui'

const message = ref('')

function handleSubmit(value: string) {
  console.log('送出：', value)
  message.value = ''
}

function handleFile(files: FileList) {
  console.log('選擇檔案：', files)
}

function handleImage(files: FileList) {
  console.log('選擇圖片：', files)
}
</script>
```

  </template>
</Demo>

## 頂部附加插槽

透過 `#block-start` 插槽在輸入框上方插入內容，例如上下文 Chip。

<Demo>
  <ContextSlotDemo />

<template #code>

```vue
<template>
  <SHChatInput
    v-model:value="message"
    placeholder="詢問 AI 任何問題…"
    :submit-loading="loading"
    @submit="handleSubmit"
  >
    <template #block-start>
      <button class="context-chip" type="button">
        <IconAt :size="13" />
        <span>新增上下文</span>
      </button>
    </template>
  </SHChatInput>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconAt } from '@tabler/icons-vue'
import { SHChatInput } from 'shelter-ui'

const message = ref('')
const loading = ref(false)

function handleSubmit(value: string) {
  loading.value = true
  message.value = ''
  setTimeout(() => {
    loading.value = false
  }, 1500)
}
</script>
```

  </template>
</Demo>

## 禁用狀態

設定 `disabled` 後所有交互元素均被禁用。

<Demo>
  <DisabledDemo />

<template #code>

```vue
<template>
  <SHChatInput v-model:value="message" placeholder="已停用輸入…" disabled />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHChatInput } from 'shelter-ui'

const message = ref('')
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性              | 類型      | 預設值        | 說明                              |
| ----------------- | --------- | ------------- | --------------------------------- |
| `value`           | `string`  | `''`          | 輸入框的值（`v-model:value`）     |
| `placeholder`     | `string`  | `'輸入訊息…'` | 占位符文字                        |
| `rows`            | `number`  | `3`           | 顯示行數                          |
| `disabled`        | `boolean` | `false`       | 是否禁用                          |
| `maxlength`       | `number`  | —             | 最大字元長度                      |
| `showWordLimit`   | `boolean` | `false`       | 是否顯示字元計數                  |
| `submitLoading`   | `boolean` | `false`       | 送出按鈕載入狀態                  |
| `fileAccept`      | `string`  | —             | 傳遞給檔案 input 的 `accept` 屬性 |
| `imageAccept`     | `string`  | `'image/*'`   | 傳遞給圖片 input 的 `accept` 屬性 |
| `hideFileUpload`  | `boolean` | `false`       | 是否隱藏檔案上傳按鈕              |
| `hideImageUpload` | `boolean` | `false`       | 是否隱藏圖片上傳按鈕              |

### 事件

| 事件名              | 參數                     | 說明                              |
| ------------------- | ------------------------ | --------------------------------- |
| `update:value`      | `(value: string)`        | 內容更新時觸發                    |
| `submit`            | `(value: string)`        | 送出訊息時觸發（按 Enter 或點擊） |
| `fileSelect`        | `(files: FileList)`      | 選擇檔案後觸發                    |
| `imageSelect`       | `(files: FileList)`      | 選擇圖片後觸發                    |
| `pressEnter`        | `(event: KeyboardEvent)` | 按下 Enter 時觸發                 |

### 插槽

| 插槽名        | 說明                                       |
| ------------- | ------------------------------------------ |
| `block-start` | 輸入框頂部附加內容（如上下文 Chip）        |
| `toolbar`     | 底部工具列中間區域（在上傳按鈕與送出之間） |

<script setup>
import BasicDemo from '@/components/ChatInput/demos/BasicDemo.vue'
import ContextSlotDemo from '@/components/ChatInput/demos/ContextSlotDemo.vue'
import DisabledDemo from '@/components/ChatInput/demos/DisabledDemo.vue'
</script>
