---
title: Select 選擇器
---

# Select 選擇器

Select 選擇器組件用於從一組選項中選擇一個或多個值，支持搜索、分組、自定義樣式等功能。

## 基本使用

基本的選擇器使用方法。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <!-- 基本選擇器 -->
    <s-select
      v-model="value1"
      :options="basicOptions"
      placeholder="請選擇一個選項"
      style="width: 200px"
    />

    <!-- 可清空 -->
    <s-select
      v-model="value2"
      :options="basicOptions"
      placeholder="請選擇一個選項"
      clearable
      style="width: 200px"
    />

    <!-- 可搜索 -->
    <s-select
      v-model="value3"
      :options="basicOptions"
      placeholder="輸入關鍵字搜索"
      filterable
      style="width: 200px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const basicOptions = [
  { value: 'option1', label: '選項一' },
  { value: 'option2', label: '選項二' },
  { value: 'option3', label: '選項三' },
  { value: 'option4', label: '選項四' },
]
</script>
```

  </template>
</Demo>

## 多選模式

設置 `multiple` 屬性開啟多選模式，可以選擇多個選項。

<Demo>
  <MultipleDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <!-- 多選模式 -->
    <s-select
      v-model="multipleValue"
      :options="options"
      placeholder="請選擇多個選項"
      multiple
      clearable
      style="width: 300px"
    />

    <!-- 限制選擇數量 -->
    <s-select
      v-model="limitedValue"
      :options="options"
      placeholder="最多選擇3個選項"
      multiple
      :max-selections="3"
      clearable
      style="width: 300px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const multipleValue = ref([])
const limitedValue = ref(['option1'])

const options = [
  { value: 'option1', label: '選項一' },
  { value: 'option2', label: '選項二' },
  { value: 'option3', label: '選項三' },
  { value: 'option4', label: '選項四' },
  { value: 'option5', label: '選項五' },
]
</script>
```

  </template>
</Demo>

## 分組與禁用

支持選項分組和禁用特定選項。

<Demo>
  <GroupedDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <!-- 分組選項 -->
    <s-select
      v-model="groupedValue"
      :options="groupedOptions"
      placeholder="請選擇一個選項"
      clearable
      style="width: 250px"
    />

    <!-- 禁用選項 -->
    <s-select
      v-model="disabledValue"
      :options="disabledOptions"
      placeholder="某些選項被禁用"
      clearable
      style="width: 250px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const groupedValue = ref('')
const disabledValue = ref('')

const groupedOptions = [
  // 前端技術
  { value: 'vue', label: 'Vue.js', group: '前端框架' },
  { value: 'react', label: 'React', group: '前端框架' },
  { value: 'angular', label: 'Angular', group: '前端框架' },

  // 後端技術
  { value: 'nodejs', label: 'Node.js', group: '後端技術' },
  { value: 'python', label: 'Python', group: '後端技術' },
  { value: 'java', label: 'Java', group: '後端技術' },
]

const disabledOptions = [
  { value: 'available1', label: '可用選項 1' },
  { value: 'disabled1', label: '禁用選項 1', disabled: true },
  { value: 'available2', label: '可用選項 2' },
  { value: 'disabled2', label: '禁用選項 2', disabled: true },
]
</script>
```

  </template>
</Demo>

## 高級功能

支持加載狀態、自定義位置、尺寸等高級功能。

<Demo>
  <AdvancedDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <!-- 加載狀態 -->
    <s-select
      v-model="loadingValue"
      :options="[]"
      placeholder="載入中..."
      loading
      style="width: 200px"
    />

    <!-- 空數據狀態 -->
    <s-select
      v-model="emptyValue"
      :options="[]"
      placeholder="無數據"
      no-data-text="沒有可用選項"
      style="width: 200px"
    />

    <!-- 自定義位置 -->
    <s-select
      v-model="topValue"
      :options="options"
      placeholder="向上展開"
      placement="top"
      style="width: 150px"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loadingValue = ref('')
const emptyValue = ref('')
const topValue = ref('')

const options = [
  { value: 'option1', label: '選項一' },
  { value: 'option2', label: '選項二' },
  { value: 'option3', label: '選項三' },
]
</script>
```

  </template>
</Demo>

## API

### Props

| 屬性            | 類型                                               | 默認值         | 說明               |
| --------------- | -------------------------------------------------- | -------------- | ------------------ |
| `modelValue`    | `string \| number \| (string \| number)[]`         | `undefined`    | 綁定值             |
| `options`       | `SelectOption[]`                                   | `[]`           | 選項數據           |
| `disabled`      | `boolean`                                          | `false`        | 是否禁用           |
| `clearable`     | `boolean`                                          | `false`        | 是否可清空         |
| `placeholder`   | `string`                                           | `'請選擇'`     | 佔位符             |
| `readonly`      | `boolean`                                          | `false`        | 是否只讀           |
| `multiple`      | `boolean`                                          | `false`        | 是否多選           |
| `maxSelections` | `number`                                           | `undefined`    | 多選時最大選擇數量 |
| `filterable`    | `boolean`                                          | `false`        | 是否可搜索         |
| `filterMethod`  | `(query: string, option: SelectOption) => boolean` | `undefined`    | 自定義搜索方法     |
| `loading`       | `boolean`                                          | `false`        | 是否加載中         |
| `noDataText`    | `string`                                           | `'暫無數據'`   | 無數據時的文字     |
| `noMatchText`   | `string`                                           | `'無匹配數據'` | 搜索無結果時的文字 |
| `placement`     | `'top' \| 'bottom' \| 'auto'`                      | `'auto'`       | 下拉框位置         |
| `dropdownWidth` | `string \| number`                                 | `undefined`    | 下拉框寬度         |
| `maxHeight`     | `string \| number`                                 | `'200px'`      | 下拉框最大高度     |

### SelectOption

```typescript
interface SelectOption {
  value: string | number
  label: string
  disabled?: boolean
  group?: string
}
```

### Events

| 事件名              | 類型                                                        | 說明                     |
| ------------------- | ----------------------------------------------------------- | ------------------------ |
| `update:modelValue` | `(value: string \| number \| (string \| number)[]) => void` | 值更新時觸發             |
| `change`            | `(value: string \| number \| (string \| number)[]) => void` | 值改變時觸發             |
| `focus`             | `(event: FocusEvent) => void`                               | 獲得焦點時觸發           |
| `blur`              | `(event: FocusEvent) => void`                               | 失去焦點時觸發           |
| `clear`             | `() => void`                                                | 清空時觸發               |
| `visible-change`    | `(visible: boolean) => void`                                | 下拉框顯示/隱藏時觸發    |
| `remove-tag`        | `(value: string \| number) => void`                         | 多選模式下移除標籤時觸發 |

### Slots

| 插槽名   | 說明     |
| -------- | -------- |
| `prefix` | 前綴內容 |
| `suffix` | 後綴內容 |

### Methods

| 方法名           | 類型         | 說明               |
| ---------------- | ------------ | ------------------ |
| `focus`          | `() => void` | 使選擇器獲得焦點   |
| `blur`           | `() => void` | 使選擇器失去焦點   |
| `toggleDropdown` | `() => void` | 切換下拉框顯示狀態 |

<script setup>
import BasicDemo from '@/components/Select/demos/BasicDemo.vue'
import MultipleDemo from '@/components/Select/demos/MultipleDemo.vue'
import GroupedDemo from '@/components/Select/demos/GroupedDemo.vue'
import AdvancedDemo from '@/components/Select/demos/AdvancedDemo.vue'
</script>
