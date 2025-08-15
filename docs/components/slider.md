# Slider 滑桿

讓使用者在給定範圍內選擇數值的輸入組件。

## 基本用法

## 基本滑桿

<Demo>
  <BasicSlider />
  <template #code>

```vue
<template>
  <div>
    <SHSlider v-model="value" :min="0" :max="100" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHSlider } from '@proladon/shelter-ui'

const value = ref([50])
</script>
```

  </template>
</Demo>

## 範圍滑桿

<Demo>
  <RangeSlider />
  <template #code>

```vue
<template>
  <div>
    <SHSlider v-model="range" :min="0" :max="100" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHSlider } from '@proladon/shelter-ui'

const range = ref([25, 75])
</script>
```

  </template>
</Demo>

## 不同尺寸

<Demo>
  <SizeSlider />
  <template #code>

```vue
<template>
  <div>
    <SHSlider v-model="v" size="small" />
    <SHSlider v-model="v" size="default" />
    <SHSlider v-model="v" size="large" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHSlider } from '@proladon/shelter-ui'

const v = ref([60])
</script>
```

  </template>
</Demo>

## 不同顏色

<Demo>
  <ColorSlider />
  <template #code>

```vue
<template>
  <div>
    <SHSlider v-model="c" color="primary" />
    <SHSlider v-model="c" color="secondary" />
    <SHSlider v-model="c" color="success" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHSlider } from '@proladon/shelter-ui'

const c = ref([70])
</script>
```

  </template>
</Demo>

## 帶提示框

<Demo>
  <TooltipSlider />
  <template #code>

```vue
<template>
  <div>
    <SHSlider
      v-model="t"
      :show-tooltip="true"
      :format-tooltip="(v) => `${v}%`"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHSlider } from '@proladon/shelter-ui'

const t = ref([40])
</script>
```

  </template>
</Demo>

## 垂直滑桿

<Demo>
  <VerticalSlider />
  <template #code>

```vue
<template>
  <div style="height:200px">
    <SHSlider v-model="v" orientation="vertical" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHSlider } from '@proladon/shelter-ui'

const v = ref([80])
</script>
```

  </template>
</Demo>

## 帶標記

<Demo>
  <MarksSlider />
  <template #code>

```vue
<template>
  <div>
    <SHSlider v-model="m" :show-marks="true" :marks="marks" :step="25" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHSlider } from '@proladon/shelter-ui'

const m = ref([50])
const marks = { 0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%' }
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名        | 說明             | 類型                                                                       | 默認值         |
| ------------- | ---------------- | -------------------------------------------------------------------------- | -------------- |
| modelValue    | 當前滑桿值       | `number[]`                                                                 | -              |
| min           | 最小值           | `number`                                                                   | `0`            |
| max           | 最大值           | `number`                                                                   | `100`          |
| step          | 步進間隔         | `number`                                                                   | `1`            |
| size          | 滑桿尺寸         | `'small' \| 'default' \| 'large'`                                          | `'default'`    |
| color         | 滑桿顏色         | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'`    |
| orientation   | 滑桿方向         | `'horizontal' \| 'vertical'`                                               | `'horizontal'` |
| disabled      | 是否禁用         | `boolean`                                                                  | `false`        |
| showTooltip   | 是否顯示提示框   | `boolean`                                                                  | `false`        |
| formatTooltip | 自定義提示框格式 | `(value: number) => string`                                                | -              |
| showMarks     | 是否顯示標記     | `boolean`                                                                  | `false`        |
| marks         | 標記配置         | `Record<number, string>`                                                   | -              |

### 事件 Events

| 事件名            | 說明             | 回調參數            |
| ----------------- | ---------------- | ------------------- |
| update:modelValue | 滑桿值變化時觸發 | `(value: number[])` |
| valueCommit       | 滑桿值確定時觸發 | `(value: number[])` |

### 插槽 Slots

| 插槽名  | 說明             | 參數                               |
| ------- | ---------------- | ---------------------------------- |
| default | 自定義內容       | -                                  |
| tooltip | 自定義提示框內容 | `{ value: number, index: number }` |
| mark    | 自定義標記內容   | `{ value: number, label: string }` |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicSlider from '@/components/Slider/demos/BasicSlider.vue'
import RangeSlider from '@/components/Slider/demos/RangeSlider.vue'
import SizeSlider from '@/components/Slider/demos/SizeSlider.vue'
import ColorSlider from '@/components/Slider/demos/ColorSlider.vue'
import TooltipSlider from '@/components/Slider/demos/TooltipSlider.vue'
import VerticalSlider from '@/components/Slider/demos/VerticalSlider.vue'
import MarksSlider from '@/components/Slider/demos/MarksSlider.vue'
</script>
