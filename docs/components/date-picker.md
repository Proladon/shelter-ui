---
title: DatePicker 日期選擇器
---

# DatePicker 日期選擇器

日期選擇器組件，支援單一日期與日期範圍兩種選擇模式。

## 基本用法

<Demo>

  <BasicDemo />
  <template #code>

```vue
<template>
  <div class="flex flex-col gap-6 p-6">
    <!-- 單一日期 -->
    <SHDatePicker
      :value="singleDate"
      @update:value="
        (v) => {
          singleDate = v as DateValue | undefined
        }
      "
    />

    <!-- 日期範圍 -->
    <SHDatePicker
      :value="rangeDate"
      :range="true"
      @update:value="
        (v) => {
          rangeDate = v as DateRange | undefined
        }
      "
    />

    <!-- 禁用 -->
    <SHDatePicker :value="date" :disabled="true" />

    <!-- 唯讀 -->
    <SHDatePicker :value="date" :readonly="true" />
  </div>
</template>

<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'
import { SHDatePicker } from '@proladon/shelter-ui'
import type { DateValue } from '@internationalized/date'
import type { DateRange } from '@proladon/shelter-ui'

const singleDate = shallowRef<DateValue | undefined>(undefined)
const rangeDate = shallowRef<DateRange | undefined>(undefined)
const date = shallowRef<DateValue>(new CalendarDate(2026, 3, 21))
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名             | 說明                                                                        | 類型                              | 默認值    |
| ------------------ | --------------------------------------------------------------------------- | --------------------------------- | --------- |
| value              | 綁定值，單一模式為 `DateValue`，範圍模式為 `DateRange`，搭配 `v-model:value` 使用 | `DateValue \| DateRange \| null`  | -         |
| range              | 是否啟用日期範圍選擇模式                                                    | `boolean`                         | `false`   |
| placeholder        | 觸發器上顯示的佔位文字                                                      | `string`                          | -         |
| disabled           | 是否禁用                                                                    | `boolean`                         | `false`   |
| readonly           | 是否唯讀                                                                    | `boolean`                         | `false`   |
| locale             | 日期格式化語言環境（例如 `'en-US'`、`'zh-TW'`）                             | `string`                          | -         |
| minValue           | 可選擇的最小日期                                                            | `DateValue`                       | -         |
| maxValue           | 可選擇的最大日期                                                            | `DateValue`                       | -         |
| isDateUnavailable  | 判斷日期是否不可選的函數                                                    | `(date: DateValue) => boolean`    | -         |
| weekStartsOn       | 日曆每週起始日（0 = 星期日）                                                | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0`       |
| weekdayFormat      | 星期欄位標題的格式                                                          | `'narrow' \| 'short' \| 'long'`   | `'short'` |
| fixedWeeks         | 是否固定顯示 6 週                                                           | `boolean`                         | `false`   |
| open               | 彈出層的受控展開狀態                                                        | `boolean`                         | -         |
| defaultPlaceholder | 未選擇日期時用於決定顯示月份的預設佔位 DateValue                            | `DateValue`                       | -         |

### 事件

| 事件名            | 說明                                     | 回調參數                                               |
| ----------------- | ---------------------------------------- | ------------------------------------------------------ |
| update:value      | 選擇日期後觸發                           | `(value: DateValue \| DateRange \| undefined) => void` |
| update:open       | 彈出層展開狀態變更時觸發                 | `(value: boolean) => void`                             |
| change            | 選擇日期後觸發（同 `update:value`）      | `(value: DateValue \| DateRange \| undefined) => void` |
| clear             | 點擊清除按鈕時觸發                       | `() => void`                                           |
| focus             | 輸入框獲得焦點時觸發                     | `(event: FocusEvent) => void`                          |
| blur              | 輸入框失去焦點時觸發                     | `(event: FocusEvent) => void`                          |

### 方法 (Expose)

| 方法名  | 說明               |
| ------- | ------------------ |
| focus() | 使輸入框獲得焦點   |
| blur()  | 使輸入框失去焦點   |
| clear() | 清除已選擇的日期值 |

<script setup>
import BasicDemo from '@/components/DatePicker/demos/BasicDemo.vue'
</script>
