# Calendar 日曆

用於顯示日曆並讓使用者選擇日期的組件，支援單選、多選及多月視圖，基於 `@internationalized/date` 提供完整的國際化支援。

## 基本用法

### 基本日期選擇

<Demo>
  <BasicCalendar />
  <template #code>

```vue
<template>
  <div>
    <SHCalendar v-model="selected" />
    <p>選中的日期: {{ selected?.toString() ?? '無' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHCalendar } from '@proladon/shelter-ui'

const selected = ref(null)
</script>
```

  </template>
</Demo>

### 多選日期

<Demo>
  <MultipleCalendar />
  <template #code>

```vue
<template>
  <div>
    <SHCalendar v-model="selected" multiple />
    <p>
      選中的日期:
      {{
        selected?.length ? selected.map((d) => d.toString()).join(', ') : '無'
      }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHCalendar } from '@proladon/shelter-ui'

const selected = ref([])
</script>
```

  </template>
</Demo>

### 禁用與唯讀狀態

<Demo>
  <DisabledCalendar />
  <template #code>

```vue
<template>
  <div style="display: flex; gap: 24px; flex-wrap: wrap;">
    <div>
      <p>Disabled</p>
      <SHCalendar disabled />
    </div>
    <div>
      <p>Readonly</p>
      <SHCalendar readonly />
    </div>
  </div>
</template>

<script setup>
import { SHCalendar } from '@proladon/shelter-ui'
</script>
```

  </template>
</Demo>

### 雙月視圖

<Demo>
  <TwoMonthsCalendar />
  <template #code>

```vue
<template>
  <SHCalendar :number-of-months="2" paged-navigation />
</template>

<script setup>
import { SHCalendar } from '@proladon/shelter-ui'
</script>
```

  </template>
</Demo>

## API

### 類型定義

```typescript
import type { DateValue } from '@internationalized/date'

type CalendarWeekdayFormat = 'narrow' | 'short' | 'long'
```

### Props

| 屬性名                          | 類型                               | 預設值    | 說明                                             |
| ------------------------------- | ---------------------------------- | --------- | ------------------------------------------------ |
| `modelValue`                    | `DateValue \| DateValue[] \| null` | -         | 受控選中值，可使用 `v-model` 綁定                |
| `multiple`                      | `boolean`                          | `false`   | 是否允許多選日期                                 |
| `disabled`                      | `boolean`                          | `false`   | 是否禁用日曆                                     |
| `readonly`                      | `boolean`                          | `false`   | 是否唯讀                                         |
| `locale`                        | `string`                           | -         | 語系設定，例如 `'en-US'`、`'zh-TW'`              |
| `minValue`                      | `DateValue`                        | -         | 最小可選日期                                     |
| `maxValue`                      | `DateValue`                        | -         | 最大可選日期                                     |
| `isDateDisabled`                | `(date: DateValue) => boolean`     | -         | 自訂日期禁用判斷函式                             |
| `isDateUnavailable`             | `(date: DateValue) => boolean`     | -         | 自訂日期不可用判斷函式                           |
| `placeholder`                   | `DateValue`                        | -         | 受控佔位日期，決定未選擇時顯示的月份             |
| `defaultPlaceholder`            | `DateValue`                        | -         | 非受控佔位日期（初始月份）                       |
| `defaultValue`                  | `DateValue`                        | -         | 非受控初始選中值                                 |
| `weekStartsOn`                  | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`  | -         | 一週起始日（0 = 週日）                           |
| `weekdayFormat`                 | `'narrow' \| 'short' \| 'long'`    | `'short'` | 星期欄標題格式                                   |
| `fixedWeeks`                    | `boolean`                          | `false`   | 是否固定顯示 6 週                                |
| `numberOfMonths`                | `number`                           | `1`       | 同時顯示的月份數量                               |
| `pagedNavigation`               | `boolean`                          | `false`   | Prev/Next 按鈕是否一次翻頁 `numberOfMonths` 個月 |
| `preventDeselect`               | `boolean`                          | `false`   | 是否禁止取消選中（須先選其他日期才能取消）       |
| `disableDaysOutsideCurrentView` | `boolean`                          | `false`   | 是否禁用當前視圖範圍之外的日期                   |
| `calendarLabel`                 | `string`                           | -         | 無障礙 aria-label 標籤文字                       |
| `initialFocus`                  | `boolean`                          | `false`   | 掛載時是否自動聚焦到選中日期 / 今天 / 第一天     |

### Events

| 事件名               | 說明               | 參數                                             |
| -------------------- | ------------------ | ------------------------------------------------ |
| `update:modelValue`  | 選中值改變時觸發   | `(value: DateValue \| DateValue[] \| undefined)` |
| `update:placeholder` | 佔位日期改變時觸發 | `(value: DateValue)`                             |

<script setup>
import BasicCalendar from '@/components/Calendar/demos/Basic.vue'
import MultipleCalendar from '@/components/Calendar/demos/Multiple.vue'
import DisabledCalendar from '@/components/Calendar/demos/Disabled.vue'
import TwoMonthsCalendar from '@/components/Calendar/demos/TwoMonths.vue'
</script>
