# Progress 進度條

顯示任務完成進度的指示器，通常以進度條的形式展示。

## 基本用法

<Demo>
    <BasicProgress />

<template #code>

```vue
<template>
  <SHProgress v-model:value="value" :show-text="true" />
  <button @click="onClick">Increase</button>
</template>

<script setup>
import { ref } from 'vue'
const value = ref(0)
const onClick = () => {
  value.value = Math.min(value + 10, 100)
}
</script>
```

</template>
</Demo>

## 未知狀態

<Demo>
    <UnknownDemo />

<template #code>

```vue
<template>
  <div>
    <SHProgress :value="null" :show-text="true" />
  </div>
</template>
```

</template>

</Demo>

## 尺寸

<Demo>
    <SizesDemo />

<template #code>

```vue
<template>
  <div>
    <SHProgress v-model:value="sizeValue" size="small" />
    <SHProgress v-model:value="sizeValue" size="medium" />
    <SHProgress v-model:value="sizeValue" size="large" />
  </div>
</template>
```

</template>
</Demo>

## 變體

<Demo>
    <VariantsDemo />

<template #code>

```vue
<template>
  <div>
    <SHProgress v-model:value="v" variant="default" />
    <SHProgress v-model:value="v" variant="striped" />
    <SHProgress v-model:value="v" variant="animated" />
  </div>
</template>
```

</template>
</Demo>

## 文字位置

<Demo>
    <TextPositionsDemo />

<template #code>

```vue
<template>
  <div>
    <SHProgress v-model:value="p" text-position="left" />
    <SHProgress v-model:value="p" text-position="bottom" />
    <SHProgress v-model:value="p" text-position="right" />
  </div>
</template>
```

</template>

</Demo>

## 自定義文字格式

<Demo>
    <CustomTextDemo />

<template #code>

```vue
<template>
  <div>
    <SHProgress v-model:value="c" :show-text="true" :format-text="formatter" />
  </div>
</template>
```

</template>

</Demo>

## 顏色

<Demo>
    <ColorsDemo />

<template #code>

```vue
<template>
  <div>
    <SHProgress v-model:value="col" color="#ef4444" />
    <SHProgress v-model:value="col" color="#22c55e" />
    <SHProgress v-model:value="col" color="#8b5cf6" height="15px" />
  </div>
</template>
```

</template>

</Demo>

## API

### 屬性

| 屬性名       | 說明                             | 類型                                             | 默認值      |
| ------------ | -------------------------------- | ------------------------------------------------ | ----------- |
| value        | 當前進度值                       | `number \| null`                                 | `null`      |
| max          | 最大進度值                       | `number`                                         | `100`       |
| size         | 進度條尺寸                       | `'small' \| 'medium' \| 'large'`                 | `'medium'`  |
| variant      | 進度條變體                       | `'default' \| 'striped' \| 'animated'`           | `'default'` |
| showText     | 是否顯示進度文字                 | `boolean`                                        | `false`     |
| formatText   | 自定義進度文字格式               | `(value: number \| null, max: number) => string` | -           |
| color        | 自訂進度條顏色（CSS color 字串） | `string`                                         | -           |
| height       | 自訂進度條高度，覆蓋 size 對應的預設高度 | `string \| number`                        | -           |
| textPosition | 進度文字顯示位置                 | `'left' \| 'bottom' \| 'right'`                  | `'bottom'`  |

### 事件 Events

| 事件名       | 說明             | 回調參數          |
| ------------ | ---------------- | ----------------- |
| update:value | 進度值變化時觸發 | `(value: number)` |

### 插槽 Slots

| 插槽名  | 說明                                   |
| ------- | -------------------------------------- |
| default | 自定義內容（整個組件內的自定義區塊）   |
| text    | 自定義進度文字區塊（替代預設文字顯示） |

#### 插槽用法

下面示例展示如何使用命名插槽 `text` 來自定義顯示的進度文字：

```vue
<template>
  <SHProgress v-model:value="value" :show-text="true">
    <template #text> {{ value }} / {{ max }} </template>
  </SHProgress>
</template>

<script setup>
import { ref } from 'vue'
const value = ref(45)
const max = 100
</script>
```

<script setup>
import { SHConfigProvider } from '@/index'
import BasicProgress from '@/components/Progress/demos/BasicProgress.vue'
import SizesDemo from '@/components/Progress/demos/Sizes.vue'
import VariantsDemo from '@/components/Progress/demos/Variants.vue'
import TextPositionsDemo from '@/components/Progress/demos/TextPositions.vue'
import CustomTextDemo from '@/components/Progress/demos/CustomText.vue'
import ColorsDemo from '@/components/Progress/demos/Colors.vue'
import UnknownDemo from '@/components/Progress/demos/Unknown.vue'
</script>
