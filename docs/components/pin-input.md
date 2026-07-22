---
title: PinInput 驗證碼輸入框
---

# PinInput 驗證碼輸入框

PinInput 驗證碼輸入框用於接收固定長度的字符序列，常見於 OTP、PIN 碼驗證等場景，支持遮罩、數字限制、尺寸變體等功能。

## 基本使用

最基本的 6 格驗證碼輸入框用法，輸入完成後觸發 `complete` 事件。

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <div>
    <SHPinInput v-model:value="value" @complete="onComplete" />
    <p>Value: {{ value }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref([])

const onComplete = (val) => {
  console.log('Complete:', val.join(''))
}
</script>
```

  </template>
</Demo>

## 遮罩模式

設置 `mask` 屬性後輸入內容將以密碼形式顯示，適用於 PIN 碼場景。

<Demo>
  <MaskedDemo />

<template #code>

```vue
<template>
  <div class="flex flex-col gap-4">
    <!-- 遮罩模式 -->
    <SHPinInput v-model:value="maskedValue" :mask="true" />

    <!-- 數字類型 -->
    <SHPinInput v-model:value="numericValue" type="number" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const maskedValue = ref([])
const numericValue = ref([])
</script>
```

  </template>
</Demo>

## 尺寸

透過 `size` 屬性控制輸入格大小，支持 `small`、`medium`（預設）、`large` 三種尺寸。

<Demo>
  <SizeDemo />

<template #code>

```vue
<template>
  <div class="flex flex-col gap-4">
    <SHPinInput v-model:value="value" size="small" />
    <SHPinInput v-model:value="value" size="medium" />
    <SHPinInput v-model:value="value" size="large" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value = ref([])
</script>
```

  </template>
</Demo>

## 禁用狀態

設置 `disabled` 屬性可以禁用所有輸入格。

<Demo>
  <DisabledDemo />

<template #code>

```vue
<template>
  <SHPinInput v-model:value="value" disabled />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(['1', '2', '3'])
</script>
```

  </template>
</Demo>

## 唯讀狀態

設置 `readonly` 屬性後，輸入格會顯示既有內容但無法透過輸入、Backspace、Delete 或貼上變更。

<Demo>
  <ReadonlyDemo />

<template #code>

```vue
<template>
  <SHPinInput v-model:value="value" readonly />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(['1', '2', '3'])
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名      | 說明                                     | 類型                   | 默認值   |
| ----------- | ---------------------------------------- | ---------------------- | -------- |
| value       | 綁定值，陣列每個元素對應一個輸入格       | `string[]`             | —        |
| length      | 輸入格數量                               | `number`               | `6`      |
| placeholder | 空格佔位符                               | `string`               | `'○'`    |
| type        | 輸入類型                                 | `'text' \| 'number'`   | `'text'` |
| mask        | 是否遮罩輸入內容（密碼模式）             | `boolean`              | `false`  |
| disabled    | 是否禁用                                 | `boolean`              | `false`  |
| readonly    | 是否唯讀（阻擋輸入、Backspace、Delete、貼上） | `boolean`         | `false`  |
| size        | 尺寸                                     | `'small' \| 'medium' \| 'large'` | `'medium'` |
| otp         | 啟用 OTP 模式（支持瀏覽器/簡訊自動填充） | `boolean`              | `false`  |

### 事件

| 事件名            | 說明                         | 回調參數          |
| ----------------- | ---------------------------- | ----------------- |
| update:value      | 當任意格輸入值改變時觸發     | `value: string[]` |
| change            | 當任意格輸入值改變時觸發     | `value: string[]` |
| complete          | 當所有輸入格均填入內容時觸發 | `value: string[]` |
| focus             | 任一輸入格獲得焦點時觸發     | `e: FocusEvent`   |
| blur              | 任一輸入格失去焦點時觸發     | `e: FocusEvent`   |

<script setup>
import BasicDemo from '@/components/PinInput/demos/BasicDemo.vue'
import MaskedDemo from '@/components/PinInput/demos/MaskedDemo.vue'
import SizeDemo from '@/components/PinInput/demos/SizeDemo.vue'
import DisabledDemo from '@/components/PinInput/demos/DisabledDemo.vue'
import ReadonlyDemo from '@/components/PinInput/demos/ReadonlyDemo.vue'
</script>
