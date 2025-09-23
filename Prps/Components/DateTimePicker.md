## Goal

建立一個新的組件，名為 `DateTimePicker`

## What

A combined date and time picker component that allows users to select both date and time, or a date-time range, in a single interface.

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://reka-ui.com/docs/components/date-picker
  why: DateTimePicker 整合了 date-picker 的功能
- url: https://reka-ui.com/docs/components/popover
  why: DateTimePicker 需要搭配 popover 來顯示選擇器界面
- url: https://reka-ui.com/docs/components/calendar
  why: 日期選擇部分依賴於 calendar 組件
- url: https://reka-ui.com/docs/components/select
  why: 時間選擇部分可能使用 select 組件
```

### Component Anatomy

```
<script setup>
import {
  DateTimePickerAnchor,
  DateTimePickerArrow,
  DateTimePickerCalendar,
  DateTimePickerCell,
  DateTimePickerCellTrigger,
  DateTimePickerContent,
  DateTimePickerField,
  DateTimePickerInput,
  DateTimePickerRoot,
  DateTimePickerTrigger,
  DateTimePickerTimeSelector,
  DateTimePickerHourSelect,
  DateTimePickerMinuteSelect,
  DateTimePickerSecondSelect,
  DateTimePickerAmPmSelect,
} from 'reka-ui'
</script>

<template>
  <DateTimePickerRoot>
    <DateTimePickerField>
      <DateTimePickerInput />
      <DateTimePickerTrigger />
    </DateTimePickerField>
    <DateTimePickerAnchor />
    <DateTimePickerContent>
      <DateTimePickerArrow />
      <div class="datetime-container">
        <DateTimePickerCalendar>
          <!-- Calendar structure -->
        </DateTimePickerCalendar>
        <DateTimePickerTimeSelector>
          <DateTimePickerHourSelect />
          <DateTimePickerMinuteSelect />
          <DateTimePickerSecondSelect />
          <DateTimePickerAmPmSelect />
        </DateTimePickerTimeSelector>
      </div>
    </DateTimePickerContent>
  </DateTimePickerRoot>
</template>
```

### Example Usage

```
<script setup lang="ts">
import {
  DateTimePickerAnchor,
  DateTimePickerArrow,
  DateTimePickerContent,
  DateTimePickerField,
  DateTimePickerInput,
  DateTimePickerRoot,
  DateTimePickerTrigger,
} from 'reka-ui'
import { CalendarClockIcon } from '@tabler/icons-vue'
import { ref } from 'vue'

const dateTimeValue = ref()
const dateTimeRangeValue = ref({ start: undefined, end: undefined })
</script>

<template>
  <!-- 單一日期時間選擇 -->
  <DateTimePickerRoot
    v-model="dateTimeValue"
    class="relative"
  >
    <DateTimePickerField class="flex items-center border rounded-md px-3 py-2">
      <DateTimePickerInput
        class="flex-1 outline-none"
        placeholder="選擇日期和時間"
      />
      <DateTimePickerTrigger class="ml-2">
        <CalendarClockIcon class="h-4 w-4" />
      </DateTimePickerTrigger>
    </DateTimePickerField>
    <DateTimePickerAnchor />
    <DateTimePickerContent class="bg-white border rounded-lg shadow-lg p-4">
      <DateTimePickerArrow class="fill-white" />
      <div class="flex space-x-4">
        <!-- Calendar section -->
        <div class="flex-1">
          <h4 class="text-sm font-medium mb-2">選擇日期</h4>
          <!-- Calendar component -->
        </div>
        <!-- Time section -->
        <div class="w-48">
          <h4 class="text-sm font-medium mb-2">選擇時間</h4>
          <div class="flex items-center space-x-2">
            <!-- Time selectors -->
            <div class="flex flex-col items-center">
              <span class="text-xs text-gray-500 mb-1">時</span>
              <select class="border rounded px-2 py-1 text-sm">
                <option v-for="hour in 24" :key="hour" :value="hour-1">
                  {{ String(hour-1).padStart(2, '0') }}
                </option>
              </select>
            </div>
            <span>:</span>
            <div class="flex flex-col items-center">
              <span class="text-xs text-gray-500 mb-1">分</span>
              <select class="border rounded px-2 py-1 text-sm">
                <option v-for="minute in 60" :key="minute" :value="minute-1">
                  {{ String(minute-1).padStart(2, '0') }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </DateTimePickerContent>
  </DateTimePickerRoot>

  <!-- 日期時間範圍選擇 -->
  <DateTimePickerRoot
    v-model="dateTimeRangeValue"
    :range="true"
    class="relative"
  >
    <DateTimePickerField class="flex items-center border rounded-md px-3 py-2">
      <DateTimePickerInput
        class="flex-1 outline-none"
        placeholder="選擇日期時間範圍"
      />
      <DateTimePickerTrigger class="ml-2">
        <CalendarClockIcon class="h-4 w-4" />
      </DateTimePickerTrigger>
    </DateTimePickerField>
    <DateTimePickerAnchor />
    <DateTimePickerContent class="bg-white border rounded-lg shadow-lg p-6">
      <DateTimePickerArrow class="fill-white" />
      <div class="space-y-4">
        <!-- Start DateTime -->
        <div>
          <h4 class="text-sm font-medium mb-3">開始日期時間</h4>
          <div class="flex space-x-4">
            <!-- Calendar for start date -->
            <div class="flex-1">
              <!-- Calendar component -->
            </div>
            <!-- Time for start -->
            <div class="w-40">
              <!-- Time selectors -->
            </div>
          </div>
        </div>
        <div class="border-t pt-4">
          <!-- End DateTime -->
          <h4 class="text-sm font-medium mb-3">結束日期時間</h4>
          <div class="flex space-x-4">
            <!-- Calendar for end date -->
            <div class="flex-1">
              <!-- Calendar component -->
            </div>
            <!-- Time for end -->
            <div class="w-40">
              <!-- Time selectors -->
            </div>
          </div>
        </div>
      </div>
    </DateTimePickerContent>
  </DateTimePickerRoot>
</template>
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 DateTimePicker 組件相關檔案
CREATE: src/components/DateTimePicker/
    - CREATE: src/components/DateTimePicker/demos/
    - CREATE: src/components/DateTimePicker/index.vue
    - CREATE: src/components/DateTimePicker/types.ts

- Task2: 建立 DateTimePicker 組件相關 demo
UPDATE: src/components/DateTimePicker/demos/

- Task3:
IMPLEMENT: Prps/UpdateComponentDocs.md

- Task4:
IMPLEMENT: Prps/ExportComponent.md
```

### Component Props

- `range?: boolean` - 是否啟用日期時間範圍選擇模式，預設為 false
- `placeholder?: string` - 輸入框佔位符文字
- `disabled?: boolean` - 是否禁用組件
- `readonly?: boolean` - 是否為只讀模式
- `format?: string` - 日期時間顯示格式，預設為 'YYYY-MM-DD HH:mm:ss'
- `dateFormat?: string` - 日期部分顯示格式，預設為 'YYYY-MM-DD'
- `timeFormat?: string` - 時間部分顯示格式，預設為 'HH:mm:ss'
- `showSeconds?: boolean` - 是否顯示秒數選擇，預設為 true
- `use12Hour?: boolean` - 是否使用 12 小時制，預設為 false
- `minuteStep?: number` - 分鐘步進值，預設為 1
- `secondStep?: number` - 秒數步進值，預設為 1
- `minDateTime?: Date` - 最小可選日期時間
- `maxDateTime?: Date` - 最大可選日期時間
- `disabledDates?: Date[]` - 禁用的特定日期
- `disabledTimes?: string[]` - 禁用的特定時間
- `showTimeFirst?: boolean` - 是否優先顯示時間選擇器，預設為 false
- `timezone?: string` - 時區設定，預設為系統時區，例如 'Asia/Taipei', 'UTC', 'America/New_York'
- `showTimezone?: boolean` - 是否顯示時區資訊，預設為 false
- `timezoneOffset?: number` - 時區偏移量（分鐘），用於手動設定時區偏移
- `utcMode?: boolean` - 是否使用 UTC 模式，預設為 false
- `autoTimezoneDetection?: boolean` - 是否自動偵測用戶時區，預設為 true
- `timezoneList?: string[]` - 可選擇的時區列表，用於時區選擇器
- `enableTimezoneConversion?: boolean` - 是否啟用時區轉換功能，預設為 true

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax
- class names should be starting with `sh`, e.g. `sh-datetime-picker`, `sh-datetime-picker-input`, etc.

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'

- 支援單一日期時間選擇和日期時間範圍選擇兩種模式

- 整合日期選擇器和時間選擇器的功能

- 提供彈性的日期時間格式化選項

- 支援複雜的日期時間限制規則

- 優化的用戶界面，適合同時選擇日期和時間

- 正確處理跨時區的日期時間轉換和儲存

- 提供時區感知的日期時間比較、驗證和計算功能

- 支援夏令時間的自動調整和處理

- 當時區變更時自動更新整個日期時間顯示

- 支援時區選擇器，讓用戶可以切換不同時區檢視

- 確保在不同時區下日期時間範圍的邏輯正確性
