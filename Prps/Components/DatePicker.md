## Goal

建立一個新的組件，名為 `DatePicker`

## What

A date picker component that allows users to select a single date or a date range from a calendar interface.

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://reka-ui.com/docs/components/date-picker
  why: 參考 reka-ui 的 date-picker 組件實作
- url: https://reka-ui.com/docs/components/popover
  why: DatePicker 通常需要搭配 popover 來顯示日曆
- url: https://reka-ui.com/docs/components/calendar
  why: DatePicker 的核心功能依賴於 calendar 組件
```

### Component Anatomy

```
<script setup>
import {
  DatePickerAnchor,
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerFieldInput,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
} from 'reka-ui'
</script>

<template>
  <DatePickerRoot>
    <DatePickerField>
      <DatePickerInput />
      <DatePickerTrigger />
    </DatePickerField>
    <DatePickerAnchor />
    <DatePickerContent>
      <DatePickerArrow />
      <DatePickerCalendar>
        <DatePickerHeader>
          <DatePickerPrev />
          <DatePickerHeading />
          <DatePickerNext />
        </DatePickerHeader>
        <DatePickerGrid>
          <DatePickerGridHead>
            <DatePickerGridRow>
              <DatePickerHeadCell />
            </DatePickerGridRow>
          </DatePickerGridHead>
          <DatePickerGridBody>
            <DatePickerGridRow>
              <DatePickerCell>
                <DatePickerCellTrigger />
              </DatePickerCell>
            </DatePickerGridRow>
          </DatePickerGridBody>
        </DatePickerGrid>
      </DatePickerCalendar>
    </DatePickerContent>
  </DatePickerRoot>
</template>
```

### Example Usage

```
<script setup lang="ts">
import {
  DatePickerAnchor,
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerInput,
  DatePickerRoot,
  DatePickerTrigger,
} from 'reka-ui'
import { CalendarIcon } from '@tabler/icons-vue'
import { ref } from 'vue'

const dateValue = ref()
const rangeValue = ref({ start: undefined, end: undefined })
</script>

<template>
  <!-- 單一日期選擇 -->
  <DatePickerRoot
    v-model="dateValue"
    class="relative"
  >
    <DatePickerField class="flex items-center border rounded-md px-3 py-2">
      <DatePickerInput
        class="flex-1 outline-none"
        placeholder="選擇日期"
      />
      <DatePickerTrigger class="ml-2">
        <CalendarIcon class="h-4 w-4" />
      </DatePickerTrigger>
    </DatePickerField>
    <DatePickerAnchor />
    <DatePickerContent class="bg-white border rounded-lg shadow-lg p-4">
      <DatePickerArrow class="fill-white" />
      <DatePickerCalendar class="space-y-4">
        <!-- Calendar content -->
      </DatePickerCalendar>
    </DatePickerContent>
  </DatePickerRoot>

  <!-- 日期範圍選擇 -->
  <DatePickerRoot
    v-model="rangeValue"
    :range="true"
    class="relative"
  >
    <DatePickerField class="flex items-center border rounded-md px-3 py-2">
      <DatePickerInput
        class="flex-1 outline-none"
        placeholder="選擇日期範圍"
      />
      <DatePickerTrigger class="ml-2">
        <CalendarIcon class="h-4 w-4" />
      </DatePickerTrigger>
    </DatePickerField>
    <DatePickerAnchor />
    <DatePickerContent class="bg-white border rounded-lg shadow-lg p-4">
      <DatePickerArrow class="fill-white" />
      <DatePickerCalendar class="space-y-4">
        <!-- Calendar content -->
      </DatePickerCalendar>
    </DatePickerContent>
  </DatePickerRoot>
</template>
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 DatePicker 組件相關檔案
CREATE: src/components/DatePicker/
    - CREATE: src/components/DatePicker/demos/
    - CREATE: src/components/DatePicker/index.vue
    - CREATE: src/components/DatePicker/types.ts

- Task2: 建立 DatePicker 組件相關 demo
UPDATE: src/components/DatePicker/demos/

- Task3:
IMPLEMENT: Prps/UpdateComponentDocs.md

- Task4:
IMPLEMENT: Prps/ExportComponent.md
```

### Component Props

- `range?: boolean` - 是否啟用日期範圍選擇模式，預設為 false
- `placeholder?: string` - 輸入框佔位符文字
- `disabled?: boolean` - 是否禁用組件
- `readonly?: boolean` - 是否為只讀模式
- `format?: string` - 日期顯示格式，預設為 'YYYY-MM-DD'
- `minDate?: Date` - 最小可選日期
- `maxDate?: Date` - 最大可選日期
- `disabledDates?: Date[]` - 禁用的特定日期
- `timezone?: string` - 時區設定，預設為系統時區，例如 'Asia/Taipei', 'UTC', 'America/New_York'
- `showTimezone?: boolean` - 是否顯示時區資訊，預設為 false
- `timezoneOffset?: number` - 時區偏移量（分鐘），用於手動設定時區偏移
- `utcMode?: boolean` - 是否使用 UTC 模式，預設為 false

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax
- class names should be starting with `sh`, e.g. `sh-date-picker`, `sh-date-picker-input`, etc.

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'

- 支援單一日期選擇和日期範圍選擇兩種模式

- 提供良好的鍵盤導航支援

- 正確處理時區轉換，確保日期在不同時區下的正確顯示和儲存

- 提供時區感知的日期比較和驗證功能

- 支援國際化的日期格式和時區顯示
