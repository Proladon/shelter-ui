## Goal

建立一個新的組件，名為 `TimePicker`

## What

A time picker component that allows users to select a specific time or a time range with hours, minutes, and optional seconds.

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://reka-ui.com/docs/components/popover
  why: TimePicker 通常需要搭配 popover 來顯示時間選擇界面
- url: https://reka-ui.com/docs/components/select
  why: 時間選擇器可能使用 select 組件來選擇時、分、秒
- url: https://reka-ui.com/docs/components/number-field
  why: 可能使用數字輸入欄位來直接輸入時間數值
```

### Component Anatomy

```
<script setup>
import {
  TimePickerAnchor,
  TimePickerArrow,
  TimePickerContent,
  TimePickerField,
  TimePickerInput,
  TimePickerRoot,
  TimePickerTrigger,
  TimePickerHourSelect,
  TimePickerMinuteSelect,
  TimePickerSecondSelect,
  TimePickerAmPmSelect,
} from 'reka-ui'
</script>

<template>
  <TimePickerRoot>
    <TimePickerField>
      <TimePickerInput />
      <TimePickerTrigger />
    </TimePickerField>
    <TimePickerAnchor />
    <TimePickerContent>
      <TimePickerArrow />
      <div class="time-selector">
        <TimePickerHourSelect />
        <TimePickerMinuteSelect />
        <TimePickerSecondSelect />
        <TimePickerAmPmSelect />
      </div>
    </TimePickerContent>
  </TimePickerRoot>
</template>
```

### Example Usage

```
<script setup lang="ts">
import {
  TimePickerAnchor,
  TimePickerArrow,
  TimePickerContent,
  TimePickerField,
  TimePickerInput,
  TimePickerRoot,
  TimePickerTrigger,
} from 'reka-ui'
import { ClockIcon } from '@tabler/icons-vue'
import { ref } from 'vue'

const timeValue = ref()
const timeRangeValue = ref({ start: undefined, end: undefined })
</script>

<template>
  <!-- 單一時間選擇 -->
  <TimePickerRoot
    v-model="timeValue"
    class="relative"
  >
    <TimePickerField class="flex items-center border rounded-md px-3 py-2">
      <TimePickerInput
        class="flex-1 outline-none"
        placeholder="選擇時間"
      />
      <TimePickerTrigger class="ml-2">
        <ClockIcon class="h-4 w-4" />
      </TimePickerTrigger>
    </TimePickerField>
    <TimePickerAnchor />
    <TimePickerContent class="bg-white border rounded-lg shadow-lg p-4">
      <TimePickerArrow class="fill-white" />
      <div class="flex items-center space-x-2">
        <!-- Hour selector -->
        <div class="flex flex-col items-center">
          <span class="text-sm text-gray-500 mb-1">時</span>
          <select class="border rounded px-2 py-1">
            <option v-for="hour in 24" :key="hour" :value="hour-1">
              {{ String(hour-1).padStart(2, '0') }}
            </option>
          </select>
        </div>
        <span class="text-lg">:</span>
        <!-- Minute selector -->
        <div class="flex flex-col items-center">
          <span class="text-sm text-gray-500 mb-1">分</span>
          <select class="border rounded px-2 py-1">
            <option v-for="minute in 60" :key="minute" :value="minute-1">
              {{ String(minute-1).padStart(2, '0') }}
            </option>
          </select>
        </div>
        <span class="text-lg">:</span>
        <!-- Second selector -->
        <div class="flex flex-col items-center">
          <span class="text-sm text-gray-500 mb-1">秒</span>
          <select class="border rounded px-2 py-1">
            <option v-for="second in 60" :key="second" :value="second-1">
              {{ String(second-1).padStart(2, '0') }}
            </option>
          </select>
        </div>
      </div>
    </TimePickerContent>
  </TimePickerRoot>

  <!-- 時間範圍選擇 -->
  <TimePickerRoot
    v-model="timeRangeValue"
    :range="true"
    class="relative"
  >
    <TimePickerField class="flex items-center border rounded-md px-3 py-2">
      <TimePickerInput
        class="flex-1 outline-none"
        placeholder="選擇時間範圍"
      />
      <TimePickerTrigger class="ml-2">
        <ClockIcon class="h-4 w-4" />
      </TimePickerTrigger>
    </TimePickerField>
    <TimePickerAnchor />
    <TimePickerContent class="bg-white border rounded-lg shadow-lg p-4">
      <TimePickerArrow class="fill-white" />
      <div class="space-y-4">
        <!-- Start time -->
        <div>
          <h4 class="text-sm font-medium mb-2">開始時間</h4>
          <!-- Time selectors -->
        </div>
        <!-- End time -->
        <div>
          <h4 class="text-sm font-medium mb-2">結束時間</h4>
          <!-- Time selectors -->
        </div>
      </div>
    </TimePickerContent>
  </TimePickerRoot>
</template>
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 TimePicker 組件相關檔案
CREATE: src/components/TimePicker/
    - CREATE: src/components/TimePicker/demos/
    - CREATE: src/components/TimePicker/index.vue
    - CREATE: src/components/TimePicker/types.ts

- Task2: 建立 TimePicker 組件相關 demo
UPDATE: src/components/TimePicker/demos/

- Task3:
IMPLEMENT: Prps/UpdateComponentDocs.md

- Task4:
IMPLEMENT: Prps/ExportComponent.md
```

### Component Props

- `range?: boolean` - 是否啟用時間範圍選擇模式，預設為 false
- `placeholder?: string` - 輸入框佔位符文字
- `disabled?: boolean` - 是否禁用組件
- `readonly?: boolean` - 是否為只讀模式
- `format?: string` - 時間顯示格式，預設為 'HH:mm:ss'
- `showSeconds?: boolean` - 是否顯示秒數選擇，預設為 true
- `use12Hour?: boolean` - 是否使用 12 小時制，預設為 false
- `minuteStep?: number` - 分鐘步進值，預設為 1
- `secondStep?: number` - 秒數步進值，預設為 1
- `minTime?: string` - 最小可選時間
- `maxTime?: string` - 最大可選時間
- `disabledTimes?: string[]` - 禁用的特定時間
- `timezone?: string` - 時區設定，預設為系統時區，例如 'Asia/Taipei', 'UTC', 'America/New_York'
- `showTimezone?: boolean` - 是否顯示時區資訊，預設為 false
- `timezoneOffset?: number` - 時區偏移量（分鐘），用於手動設定時區偏移
- `utcMode?: boolean` - 是否使用 UTC 模式，預設為 false
- `autoTimezoneDetection?: boolean` - 是否自動偵測用戶時區，預設為 true

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax
- class names should be starting with `sh`, e.g. `sh-time-picker`, `sh-time-picker-input`, etc.

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'

- 支援單一時間選擇和時間範圍選擇兩種模式

- 支援 12/24 小時制切換

- 提供時、分、秒的獨立選擇器

- 支援鍵盤輸入和滾輪選擇

- 正確處理時區轉換，確保時間在不同時區下的正確顯示和儲存

- 提供時區感知的時間比較和驗證功能

- 支援夏令時間的自動調整

- 當時區變更時自動更新時間顯示
