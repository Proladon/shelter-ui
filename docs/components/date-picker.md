# DatePicker 日期選擇器

讓使用者選擇日期的輸入組件，支援時區轉換和範圍選擇。

## 基本用法

### 單日期選擇

<Demo>
  <BasicDatePicker />
  <template #code>

```vue
<template>
  <div>
    <SHDatePicker v-model="selectedDate" placeholder="請選擇日期" />
    <p>選擇的日期: {{ selectedDate }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHDatePicker } from '@proladon/shelter-ui'

const selectedDate = ref()
</script>
```

  </template>
</Demo>

### 日期範圍選擇

<Demo>
  <RangeDatePicker />
  <template #code>

```vue
<template>
  <div>
    <SHDatePicker v-model="dateRange" range placeholder="請選擇日期範圍" />
    <p>選擇的範圍: {{ dateRange }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHDatePicker } from '@proladon/shelter-ui'

const dateRange = ref([])
</script>
```

  </template>
</Demo>

### 時區支援

<Demo>
  <TimezoneDatePicker />
  <template #code>

```vue
<template>
  <div>
    <SHDatePicker
      v-model="selectedDate"
      timezone="America/New_York"
      show-timezone
      placeholder="選擇日期（紐約時區）"
    />
    <p>選擇的日期: {{ selectedDate }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHDatePicker } from '@proladon/shelter-ui'

const selectedDate = ref()
</script>
```

  </template>
</Demo>

## API

### Props

| 屬性名         | 類型                             | 預設值          | 說明               |
| -------------- | -------------------------------- | --------------- | ------------------ |
| `modelValue`   | `Date \| Date[] \| null`         | `null`          | 選中的日期值       |
| `range`        | `boolean`                        | `false`         | 是否為範圍選擇模式 |
| `placeholder`  | `string`                         | `'請選擇日期'`  | 佔位符文字         |
| `disabled`     | `boolean`                        | `false`         | 是否禁用           |
| `readonly`     | `boolean`                        | `false`         | 是否唯讀           |
| `clearable`    | `boolean`                        | `true`          | 是否可清除         |
| `format`       | `string`                         | `'YYYY-MM-DD'`  | 顯示格式           |
| `valueFormat`  | `string`                         | `'YYYY-MM-DD'`  | 綁定值格式         |
| `minDate`      | `Date \| string`                 | `undefined`     | 最小可選日期       |
| `maxDate`      | `Date \| string`                 | `undefined`     | 最大可選日期       |
| `timezone`     | `string`                         | `'Asia/Taipei'` | 時區               |
| `showTimezone` | `boolean`                        | `false`         | 是否顯示時區資訊   |
| `size`         | `'small' \| 'medium' \| 'large'` | `'medium'`      | 尺寸               |

### Events

| 事件名              | 說明           | 參數                              |
| ------------------- | -------------- | --------------------------------- |
| `update:modelValue` | 值改變時觸發   | `(value: Date \| Date[] \| null)` |
| `change`            | 值改變時觸發   | `(value: Date \| Date[] \| null)` |
| `focus`             | 獲得焦點時觸發 | `(event: FocusEvent)`             |
| `blur`              | 失去焦點時觸發 | `(event: FocusEvent)`             |
| `clear`             | 清除值時觸發   | `()`                              |

### Slots

| 插槽名   | 說明     | 參數 |
| -------- | -------- | ---- |
| `prefix` | 前綴內容 | -    |
| `suffix` | 後綴內容 | -    |

<script setup>
    import BasicDatePicker from '@/components/DatePicker/demos/Basic.vue'
    import RangeDatePicker from '@/components/DatePicker/demos/RangeDatePicker.vue'
    import TimezoneDatePicker from '@/components/DatePicker/demos/TimezoneDatePicker.vue'
</script>
