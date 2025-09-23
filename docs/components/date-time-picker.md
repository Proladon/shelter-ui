# DateTimePicker 日期時間選擇器

讓使用者同時選擇日期和時間的輸入組件，結合了日期選擇器和時間選擇器的功能。

## 基本用法

### 基本日期時間選擇

<Demo>
  <BasicDateTimePicker />
  <template #code>

```vue
<template>
  <div>
    <SHDateTimePicker v-model="selectedDateTime" placeholder="請選擇日期時間" />
    <p>選擇的日期時間: {{ selectedDateTime }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHDateTimePicker } from '@proladon/shelter-ui'

const selectedDateTime = ref()
</script>
```

  </template>
</Demo>

### 日期時間範圍選擇

<Demo>
  <RangeDateTimePicker />
  <template #code>

```vue
<template>
  <div>
    <SHDateTimePicker
      v-model="dateTimeRange"
      range
      placeholder="請選擇日期時間範圍"
    />
    <p>選擇的範圍: {{ dateTimeRange }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHDateTimePicker } from '@proladon/shelter-ui'

const dateTimeRange = ref([])
</script>
```

  </template>
</Demo>

### 12 小時制與秒數

<Demo>
  <DetailedDateTimePicker />
  <template #code>

```vue
<template>
  <div>
    <SHDateTimePicker
      v-model="selectedDateTime"
      time-format="12"
      :show-second="true"
      placeholder="選擇詳細日期時間"
    />
    <p>選擇的日期時間: {{ selectedDateTime }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHDateTimePicker } from '@proladon/shelter-ui'

const selectedDateTime = ref()
</script>
```

  </template>
</Demo>

### 時區支援

<Demo>
  <TimezoneDateTimePicker />
  <template #code>

```vue
<template>
  <div>
    <SHDateTimePicker
      v-model="selectedDateTime"
      timezone="Asia/Tokyo"
      show-timezone
      placeholder="選擇日期時間（東京時區）"
    />
    <p>選擇的日期時間: {{ selectedDateTime }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHDateTimePicker } from '@proladon/shelter-ui'

const selectedDateTime = ref()
</script>
```

  </template>
</Demo>

## API

### Props

| 屬性名         | 類型                             | 預設值                  | 說明                        |
| -------------- | -------------------------------- | ----------------------- | --------------------------- |
| `modelValue`   | `Date \| Date[] \| null`         | `null`                  | 選中的日期時間值            |
| `range`        | `boolean`                        | `false`                 | 是否為範圍選擇模式          |
| `placeholder`  | `string`                         | `'請選擇日期時間'`      | 佔位符文字                  |
| `disabled`     | `boolean`                        | `false`                 | 是否禁用                    |
| `readonly`     | `boolean`                        | `false`                 | 是否唯讀                    |
| `clearable`    | `boolean`                        | `true`                  | 是否可清除                  |
| `dateFormat`   | `string`                         | `'YYYY-MM-DD'`          | 日期顯示格式                |
| `timeFormat`   | `'12' \| '24'`                   | `'24'`                  | 時間格式（12 或 24 小時制） |
| `showSecond`   | `boolean`                        | `false`                 | 是否顯示秒                  |
| `valueFormat`  | `string`                         | `'YYYY-MM-DD HH:mm:ss'` | 綁定值格式                  |
| `minDate`      | `Date \| string`                 | `undefined`             | 最小可選日期                |
| `maxDate`      | `Date \| string`                 | `undefined`             | 最大可選日期                |
| `hourStep`     | `number`                         | `1`                     | 小時步長                    |
| `minuteStep`   | `number`                         | `1`                     | 分鐘步長                    |
| `secondStep`   | `number`                         | `1`                     | 秒步長                      |
| `timezone`     | `string`                         | `'Asia/Taipei'`         | 時區                        |
| `showTimezone` | `boolean`                        | `false`                 | 是否顯示時區資訊            |
| `size`         | `'small' \| 'medium' \| 'large'` | `'medium'`              | 尺寸                        |

### Events

| 事件名              | 說明           | 參數                              |
| ------------------- | -------------- | --------------------------------- |
| `update:modelValue` | 值改變時觸發   | `(value: Date \| Date[] \| null)` |
| `change`            | 值改變時觸發   | `(value: Date \| Date[] \| null)` |
| `focus`             | 獲得焦點時觸發 | `(event: FocusEvent)`             |
| `blur`              | 失去焦點時觸發 | `(event: FocusEvent)`             |
| `clear`             | 清除值時觸發   | `()`                              |
| `date-change`       | 日期改變時觸發 | `(date: Date \| null)`            |
| `time-change`       | 時間改變時觸發 | `(time: string \| null)`          |

### Slots

| 插槽名   | 說明     | 參數 |
| -------- | -------- | ---- |
| `prefix` | 前綴內容 | -    |
| `suffix` | 後綴內容 | -    |

<script setup>
    import BasicDateTimePicker from '@/components/DateTimePicker/demos/BasicDateTimePicker.vue'
    import RangeDateTimePicker from '@/components/DateTimePicker/demos/RangeDateTimePicker.vue'
    import DetailedDateTimePicker from '@/components/DateTimePicker/demos/DetailedDateTimePicker.vue'
    import TimezoneDateTimePicker from '@/components/DateTimePicker/demos/TimezoneDateTimePicker.vue'
</script>
