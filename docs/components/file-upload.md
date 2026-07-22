---
title: FileUpload 文件上傳
---

# FileUpload 文件上傳

文件上傳組件，支援點擊選取與拖拽上傳，提供文件列表展示、尺寸限制、數量限制與預覽功能。

## 基本用法

點擊或拖拽文件到上傳區域，可選取多個文件並以列表展示。

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <div class="flex flex-col gap-4">
    <SHUploadZone v-model:value="files" multiple @change="onChange" />
    <pre class="text-text.primary text-xs">{{ summary }}</pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const files = ref([])

const onChange = (list) => {
  console.log('files changed', list)
}

const summary = computed(() =>
  files.value
    .map((f) => `${f.name} (${(f.size / 1024).toFixed(1)} KB) — ${f.status}`)
    .join('\n'),
)
</script>
```

</template>
</Demo>

## 尺寸

上傳區域提供三種尺寸：`small`、`medium`（預設）、`large`。

<Demo>
  <SizeDemo />

<template #code>

```vue
<template>
  <div class="flex flex-col gap-6">
    <div>
      <p class="text-text.primary text-sm mb-2">Small</p>
      <SHUploadZone v-model:value="filesS" size="small" />
    </div>
    <div>
      <p class="text-text.primary text-sm mb-2">Medium (預設)</p>
      <SHUploadZone v-model:value="filesM" size="medium" />
    </div>
    <div>
      <p class="text-text.primary text-sm mb-2">Large</p>
      <SHUploadZone v-model:value="filesL" size="large" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const filesS = ref([])
const filesM = ref([])
const filesL = ref([])
</script>
```

</template>
</Demo>

## 類型與大小限制

透過 `accept`、`max-size`、`max-count` 限制可接受的文件類型、單個文件大小與最大文件數量。

<Demo>
  <RestrictionsDemo />

<template #code>

```vue
<template>
  <div class="flex flex-col gap-4">
    <p class="text-text.primary text-sm">
      Only images, max 1 MB each, up to 3 files.
    </p>
    <SHUploadZone
      v-model:value="files"
      accept="image/*"
      multiple
      :max-count="3"
      :max-size="1 * 1024 * 1024"
      @exceed-size="onExceedSize"
      @exceed-count="onExceedCount"
    >
      <template #tip>
        <span>Supported: PNG, JPG, GIF · Max 1 MB · Up to 3 files</span>
      </template>
    </SHUploadZone>

    <p v-if="warning" class="text-status.danger text-xs">{{ warning }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])
const warning = ref('')

const onExceedSize = (file) => {
  warning.value = `"${file.name}" exceeds the 1 MB limit.`
  setTimeout(() => (warning.value = ''), 4000)
}

const onExceedCount = (excess) => {
  warning.value = `${excess.length} file(s) were dropped because the 3-file limit was reached.`
  setTimeout(() => (warning.value = ''), 4000)
}
</script>
```

</template>
</Demo>

## 禁用

禁用狀態下，點擊與拖拽均不可用。

<Demo>
  <DisabledDemo />

<template #code>

```vue
<template>
  <SHUploadZone v-model:value="files" disabled />
</template>

<script setup>
import { ref } from 'vue'

const files = ref([])
</script>
```

</template>
</Demo>

## API

### 屬性

| 屬性名       | 說明                                                       | 類型                   | 默認值  |
| ------------ | ---------------------------------------------------------- | ---------------------- | ------- |
| `value`      | 文件列表（v-model）                                        | `FileUploadFile[]`     | `[]`    |
| `accept`     | 可接受的文件類型，同 `<input accept>`，如 `"image/*,.pdf"` | `string`               | —       |
| `multiple`   | 是否允許多選                                               | `boolean`              | `false` |
| `disabled`   | 是否禁用                                                   | `boolean`              | `false` |
| `maxCount`   | 最大文件數（`multiple` 為 `true` 時有效，`0` 表示無限制）  | `number`               | `0`     |
| `maxSize`    | 單個文件最大位元組數（`0` 表示無限制）                     | `number`               | `0`     |
| `size`       | 上傳區域尺寸                                               | `'small' \| 'medium' \| 'large'` | `'medium'` |

### 事件

| 事件名              | 說明                          | 回調參數                            |
| ------------------- | ----------------------------- | ----------------------------------- |
| `update:value`      | 文件列表更新                  | `(files: FileUploadFile[]) => void` |
| `change`            | 文件選取後（驗證完成後）觸發  | `(files: FileUploadFile[]) => void` |
| `exceed-size`       | 單個文件超過 `maxSize` 時觸發 | `(file: File) => void`              |
| `exceed-count`      | 超過 `maxCount` 的文件觸發    | `(files: File[]) => void`           |
| `remove`            | 移除文件時觸發                | `(file: FileUploadFile) => void`    |

### 插槽

| 插槽名    | 說明                   |
| --------- | ---------------------- |
| `trigger` | 自定義上傳區域內容     |
| `tip`     | 文件列表下方的提示文字 |

### FileUploadFile

| 屬性         | 說明                                 | 類型                                            |
| ------------ | ------------------------------------ | ----------------------------------------------- |
| `id`         | 內部唯一識別碼                       | `string`                                        |
| `raw`        | 原始 `File` 物件                     | `File`                                          |
| `name`       | 文件名稱                             | `string`                                        |
| `size`       | 文件大小（位元組）                   | `number`                                        |
| `type`       | MIME 類型                            | `string`                                        |
| `status`     | 上傳狀態                             | `'idle' \| 'uploading' \| 'success' \| 'error'` |
| `progress`   | 上傳進度 0–100                       | `number`                                        |
| `error`      | 錯誤訊息（`status` 為 `'error'` 時） | `string \| undefined`                           |
| `previewUrl` | 圖片預覽 URL                         | `string \| undefined`                           |

### 方法

透過 `ref` 取得組件實例後可呼叫：

| 方法               | 說明                     |
| ------------------ | ------------------------ |
| `openFilePicker()` | 程式化打開文件選取對話框 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/UploadZone/demos/BasicDemo.vue'
import SizeDemo from '@/components/UploadZone/demos/SizeDemo.vue'
import RestrictionsDemo from '@/components/UploadZone/demos/RestrictionsDemo.vue'
import DisabledDemo from '@/components/UploadZone/demos/DisabledDemo.vue'
</script>
