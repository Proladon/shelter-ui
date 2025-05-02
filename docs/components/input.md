---
title: Input 輸入框
---

# Input 輸入框

Input 輸入框組件用於接收用戶的文本輸入，支持多種功能如清除按鈕、前綴後綴插槽等。

## 基本使用

最基本的文本輸入框用法。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <s-input v-model="inputValue" placeholder="Please input..." />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
```

  </template>
</Demo>

## 可清除內容

設置 `clearable` 屬性後，當輸入框內容不為空時，鼠標懸浮會顯示清除按鈕。

<Demo>
  <ClearableDemo />
  
  <template #code>

```vue
<template>
  <s-input
    v-model="inputValue"
    placeholder="Hover to see clear button"
    clearable
  />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('This text can be cleared')
</script>
```

  </template>
</Demo>

## 禁用狀態

設置 `disabled` 屬性可以禁用輸入框。

<Demo>
  <DisabledDemo />
  
  <template #code>

```vue
<template>
  <s-input v-model="inputValue" placeholder="Disabled input" disabled />
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('This input is disabled')
</script>
```

  </template>
</Demo>

## 前綴與後綴插槽

通過 `prefix` 和 `suffix` 插槽可以在輸入框內添加圖標或其它內容。

<Demo>
  <SlotsDemo />
  
  <template #code>

```vue
<template>
  <div>
    <h4>Prefix Slot</h4>
    <s-input v-model="userInput" placeholder="Enter username">
      <template #prefix>
        <svg class="icon"><!-- User icon SVG --></svg>
      </template>
    </s-input>

    <h4>Suffix Slot</h4>
    <s-input
      v-model="passwordInput"
      placeholder="Enter password"
      type="password"
    >
      <template #suffix>
        <svg class="icon"><!-- Lock icon SVG --></svg>
      </template>
    </s-input>

    <h4>Both Slots</h4>
    <s-input v-model="searchInput" placeholder="Search..." clearable>
      <template #prefix>
        <svg class="icon"><!-- Search icon SVG --></svg>
      </template>
      <template #suffix>
        <span class="search-hint">Press Enter</span>
      </template>
    </s-input>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userInput = ref('')
const passwordInput = ref('')
const searchInput = ref('')
</script>

<style scoped>
.icon {
  color: #999;
}

.search-hint {
  font-size: 12px;
  color: #999;
}
</style>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名        | 說明                 | 類型               | 默認值   |
| ------------- | -------------------- | ------------------ | -------- |
| modelValue    | 綁定值               | `string \| number` | `''`     |
| disabled      | 是否禁用             | `boolean`          | `false`  |
| clearable     | 是否顯示清空按鈕     | `boolean`          | `false`  |
| placeholder   | 輸入框佔位文本       | `string`           | `''`     |
| type          | 輸入框類型           | `string`           | `'text'` |
| readonly      | 是否只讀             | `boolean`          | `false`  |
| autocomplete  | 自動完成屬性         | `string`           | `'off'`  |
| maxlength     | 最大輸入長度         | `number`           | —        |
| showWordLimit | 是否顯示輸入字數統計 | `boolean`          | `false`  |

### 事件

| 事件名            | 說明                             | 回調參數            |
| ----------------- | -------------------------------- | ------------------- |
| update:modelValue | 當輸入值改變時觸發               | `value: string`     |
| input             | 當輸入值改變時觸發               | `value: string`     |
| change            | 當輸入值改變時觸發（失去焦點時） | `value: string`     |
| focus             | 當輸入框獲得焦點時觸發           | `event: FocusEvent` |
| blur              | 當輸入框失去焦點時觸發           | `event: FocusEvent` |
| clear             | 當點擊清空按鈕時觸發             | —                   |

### 插槽

| 插槽名 | 說明           |
| ------ | -------------- |
| prefix | 輸入框前綴內容 |
| suffix | 輸入框後綴內容 |

### 方法

| 方法名 | 說明               | 參數 |
| ------ | ------------------ | ---- |
| focus  | 使輸入框獲得焦點   | —    |
| blur   | 使輸入框失去焦點   | —    |
| select | 選中輸入框中的文本 | —    |

<script setup>
import { SConfigProvider } from '@/index'
import BasicDemo from '@/components/Input/demos/BasicDemo.vue'
import ClearableDemo from '@/components/Input/demos/ClearableDemo.vue'
import DisabledDemo from '@/components/Input/demos/DisabledDemo.vue'
import SlotsDemo from '@/components/Input/demos/SlotsDemo.vue'
</script>
