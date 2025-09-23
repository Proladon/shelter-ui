# TimePicker 時間選擇器

讓使用者選擇時間的輸入組件，支援 12/24 小時制和時區轉換。

## 基本用法

### 基本時間選擇

<Demo>
  <BasicTimePicker />
  <template #code>

```vue
<template>
  <div>
    <SHTimePicker v-model="selectedTime" placeholder="選擇時間" />
    <p>選中的時間: {{ selectedTime || '無' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHTimePicker } from '@proladon/shelter-ui'

const selectedTime = ref()
</script>
```

  </template>
</Demo>

### 時間範圍選擇

<Demo>
  <RangeTimePicker />
  <template #code>

```vue
<template>
  <div>
    <SHTimePicker
      v-model="timeRange"
      :range="true"
      placeholder="選擇時間範圍"
    />
    <p>
      選中的範圍:
      {{
        timeRange?.start && timeRange?.end
          ? `${timeRange.start} ~ ${timeRange.end}`
          : '無'
      }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHTimePicker } from '@proladon/shelter-ui'

const timeRange = ref()
</script>
```

  </template>
</Demo>

### 12 小時制

<Demo>
  <TwelveHourTimePicker />
  <template #code>

```vue
<template>
  <div>
    <SHTimePicker
      v-model="selectedTime"
      :use12-hour="true"
      placeholder="選擇時間（12小時制）"
    />
    <p>選中的時間: {{ selectedTime || '無' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHTimePicker } from '@proladon/shelter-ui'

const selectedTime = ref()
</script>
```

  </template>
</Demo>

### 不顯示秒數

<Demo>
  <NoSecondsTimePicker />
  <template #code>

```vue
<template>
  <div>
    <SHTimePicker
      v-model="selectedTime"
      :show-seconds="false"
      placeholder="選擇時間（不含秒）"
    />
    <p>選中的時間: {{ selectedTime || '無' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHTimePicker } from '@proladon/shelter-ui'

const selectedTime = ref()
</script>
```

  </template>
</Demo>

### 時區支援

<Demo>
  <TimezoneTimePicker />
  <template #code>

```vue
<template>
  <div>
    <SHTimePicker
      v-model="selectedTime"
      :show-timezone="true"
      timezone="Asia/Taipei"
      placeholder="選擇時間（台北時區）"
    />
    <p>選中的時間: {{ selectedTime || '無' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHTimePicker } from '@proladon/shelter-ui'

const selectedTime = ref()
</script>
```

  </template>
</Demo>

### 自訂步進值

<Demo>
  <StepTimePicker />
  <template #code>

```vue
<template>
  <div>
    <SHTimePicker
      v-model="selectedTime"
      :minute-step="15"
      :second-step="30"
      placeholder="分鐘步進15，秒數步進30"
    />
    <p>選中的時間: {{ selectedTime || '無' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHTimePicker } from '@proladon/shelter-ui'

const selectedTime = ref()
</script>
```

  </template>
</Demo>

### 禁用與唯讀狀態

<Demo>
  <DisabledTimePicker />
  <template #code>

```vue
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <SHTimePicker
        v-model="disabledTime"
        :disabled="true"
        placeholder="禁用的時間選擇器"
      />
    </div>
    <div>
      <SHTimePicker
        v-model="readonlyTime"
        :readonly="true"
        placeholder="唯讀的時間選擇器"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHTimePicker } from '@proladon/shelter-ui'

const disabledTime = ref('14:30:00')
const readonlyTime = ref('09:15:30')
</script>
```

  </template>
</Demo>

## API

### 類型定義

```typescript
interface TimeRange {
  start?: string // 開始時間，格式為 HH:mm:ss
  end?: string // 結束時間，格式為 HH:mm:ss
}
```

### Props

| 屬性名         | 類型                             | 預設值          | 說明               |
| -------------- | -------------------------------- | --------------- | ------------------ |
| `modelValue`   | `string \| TimeRange \| null`    | `null`          | 選中的時間值       |
| `range`        | `boolean`                        | `false`         | 是否為範圍選擇模式 |
| `placeholder`  | `string`                         | `'請選擇時間'`  | 佔位符文字         |
| `disabled`     | `boolean`                        | `false`         | 是否禁用           |
| `readonly`     | `boolean`                        | `false`         | 是否唯讀           |
| `clearable`    | `boolean`                        | `true`          | 是否可清除         |
| `use12Hour`    | `boolean`                        | `false`         | 是否使用 12 小時制 |
| `showSeconds`  | `boolean`                        | `true`          | 是否顯示秒         |
| `hourStep`     | `number`                         | `1`             | 小時步長           |
| `minuteStep`   | `number`                         | `1`             | 分鐘步長           |
| `secondStep`   | `number`                         | `1`             | 秒步長             |
| `timezone`     | `string`                         | `'Asia/Taipei'` | 時區               |
| `showTimezone` | `boolean`                        | `false`         | 是否顯示時區資訊   |
| `size`         | `'small' \| 'medium' \| 'large'` | `'medium'`      | 尺寸               |

### Events

| 事件名              | 說明           | 參數                                   |
| ------------------- | -------------- | -------------------------------------- |
| `update:modelValue` | 值改變時觸發   | `(value: string \| TimeRange \| null)` |
| `change`            | 值改變時觸發   | `(value: string \| TimeRange \| null)` |
| `focus`             | 獲得焦點時觸發 | `(event: FocusEvent)`                  |
| `blur`              | 失去焦點時觸發 | `(event: FocusEvent)`                  |
| `clear`             | 清除值時觸發   | `()`                                   |

### Slots

| 插槽名   | 說明     | 參數 |
| -------- | -------- | ---- |
| `prefix` | 前綴內容 | -    |
| `suffix` | 後綴內容 | -    |

<script setup>
import BasicTimePicker from '@/components/TimePicker/demos/Basic.vue'
import RangeTimePicker from '@/components/TimePicker/demos/Range.vue'
import TwelveHourTimePicker from '@/components/TimePicker/demos/TwelveHour.vue'
import NoSecondsTimePicker from '@/components/TimePicker/demos/NoSeconds.vue'
import TimezoneTimePicker from '@/components/TimePicker/demos/Timezone.vue'
import StepTimePicker from '@/components/TimePicker/demos/Step.vue'
import DisabledTimePicker from '@/components/TimePicker/demos/Disabled.vue'
</script>
