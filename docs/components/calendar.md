# Calendar 日曆

一個功能豐富的日曆組件，基於 Radix Vue Calendar 構建，支持日期選擇、多選、禁用日期等功能。

## 基本用法

```vue
<template>
  <Calendar v-model="selectedDate" />
</template>

<script setup>
import { ref } from 'vue'
import { Calendar } from '@proladon/shelter-ui'

const selectedDate = ref()
</script>
```

## 多選模式

啟用 `multiple` 屬性來支援多個日期選擇。

```vue
<template>
  <Calendar v-model="selectedDates" multiple />
</template>

<script setup>
import { ref } from 'vue'
import { Calendar } from '@proladon/shelter-ui'

const selectedDates = ref([])
</script>
```

## 禁用日期

可以通過 `isDateDisabled` 和 `isDateUnavailable` 屬性來禁用特定日期。

```vue
<template>
  <Calendar
    v-model="selectedDate"
    :is-date-disabled="isWeekend"
    :is-date-unavailable="isFutureWeek"
  />
</template>

<script setup>
import { ref } from 'vue'
import { today, getLocalTimeZone } from '@internationalized/date'
import { Calendar } from '@proladon/shelter-ui'

const selectedDate = ref()

// 禁用週末
const isWeekend = (date) => {
  return date.getDayOfWeek() === 6 || date.getDayOfWeek() === 0
}

// 禁用下週
const isFutureWeek = (date) => {
  const currentDate = today(getLocalTimeZone())
  const nextWeek = currentDate.add({ days: 7 })
  return date.compare(currentDate) > 0 && date.compare(nextWeek) <= 0
}
</script>
```

## 多月份顯示

使用 `numberOfMonths` 屬性來顯示多個月份。

```vue
<template>
  <Calendar v-model="selectedDate" :number-of-months="2" />
</template>

<script setup>
import { ref } from 'vue'
import { Calendar } from '@proladon/shelter-ui'

const selectedDate = ref()
</script>
```

## API

### Props

| 屬性               | 類型                              | 默認值      | 說明                             |
| ------------------ | --------------------------------- | ----------- | -------------------------------- |
| modelValue         | `any`                             | `undefined` | 綁定的值，單一日期或多個日期數組 |
| defaultPlaceholder | `any`                             | `undefined` | 預設佔位符日期                   |
| defaultValue       | `any`                             | `undefined` | 預設值                           |
| dir                | `'ltr' \| 'rtl'`                  | `undefined` | 閱讀方向                         |
| disabled           | `boolean`                         | `false`     | 是否禁用日曆                     |
| fixedWeeks         | `boolean`                         | `true`      | 是否固定顯示 6 週                |
| initialFocus       | `boolean`                         | `false`     | 是否在掛載時自動聚焦             |
| isDateDisabled     | `(date: any) => boolean`          | `undefined` | 判斷日期是否禁用的函數           |
| isDateUnavailable  | `(date: any) => boolean`          | `undefined` | 判斷日期是否不可用的函數         |
| locale             | `string`                          | `'zh-TW'`   | 語言環境                         |
| maxValue           | `any`                             | `undefined` | 最大可選日期                     |
| minValue           | `any`                             | `undefined` | 最小可選日期                     |
| multiple           | `boolean`                         | `false`     | 是否支援多選                     |
| numberOfMonths     | `number`                          | `1`         | 顯示的月份數量                   |
| pagedNavigation    | `boolean`                         | `false`     | 是否按頁導航                     |
| preventDeselect    | `boolean`                         | `false`     | 是否阻止取消選擇                 |
| readonly           | `boolean`                         | `false`     | 是否為只讀模式                   |
| weekdayFormat      | `'narrow' \| 'short' \| 'long'`   | `'narrow'`  | 星期幾格式                       |
| weekStartsOn       | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6` | `0`         | 每週開始日                       |
| calendarLabel      | `string`                          | `undefined` | 日曆標籤，用於無障礙訪問         |

### Events

| 事件名             | 參數                    | 說明               |
| ------------------ | ----------------------- | ------------------ |
| update:modelValue  | `(value?: any) => void` | 當模型值變化時觸發 |
| update:placeholder | `(value: any) => void`  | 當佔位符變化時觸發 |

### Methods

| 方法名 | 參數         | 說明     |
| ------ | ------------ | -------- |
| focus  | `() => void` | 聚焦日曆 |

## 主題定制

Calendar 組件支持 CSS 變量定制：

```css
.sh-calendar {
  --sh-calendar-border-radius: 8px;
  --sh-calendar-bg: #ffffff;
  --sh-calendar-border: #e5e7eb;
  --sh-calendar-text: #374151;
  --sh-calendar-text-muted: #9ca3af;
  --sh-calendar-selected-bg: #3b82f6;
  --sh-calendar-selected-text: #ffffff;
  --sh-calendar-hover-bg: #f3f4f6;
  --sh-calendar-today-bg: #dbeafe;
  --sh-calendar-today-text: #1d4ed8;
  --sh-calendar-disabled-text: #d1d5db;
  --sh-calendar-nav-hover-bg: #f9fafb;
}
```

## 注意事項

1. 此組件依賴於 `@internationalized/date` 包來處理日期操作
2. 組件已內建響應式設計，在小屏幕上會自動調整佈局
3. 支持鍵盤導航和無障礙訪問
4. 組件默認使用繁體中文 (`zh-TW`) 作為語言環境
