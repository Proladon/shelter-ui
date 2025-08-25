---
title: Checkbox 複選框
---

## Description

Checkbox 組件用於選擇多個選項或切換單一選項的狀態，支援 checked、unchecked 和 indeterminate 三種狀態。

## 基本用法

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <div class="demo">
    <h3>Basic Checkbox</h3>
    <div class="demo__content">
      <SHCheckbox v-model="checked" />
      <p>Value: {{ checked }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCheckbox from '../index.vue'

const checked = ref<boolean>(false)
</script>
```

</template>

</Demo>

## 帶標籤

<Demo>
  <WithLabelDemo />

<template #code>

```vue
<template>
  <div class="demo">
    <h3>Checkbox with Label</h3>
    <div class="demo__content">
      <SHCheckbox v-model="checked1" label="接受條款和條件" />
      <SHCheckbox v-model="checked2" label="訂閱電子報" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCheckbox from '../index.vue'

const checked1 = ref<boolean>(false)
const checked2 = ref<boolean>(true)
</script>
```

</template>

</Demo>

## 禁用狀態

<Demo>
  <DisabledDemo />

<template #code>

```vue
<template>
  <h3>Disabled Checkbox</h3>
  <div class="demo__content">
    <SHCheckbox v-model="checked1" label="禁用未選中" disabled />
    <SHCheckbox v-model="checked2" label="禁用已選中" disabled />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCheckbox from '../index.vue'

const checked1 = ref<boolean>(false)
const checked2 = ref<boolean>(true)
</script>
```

</template>

</Demo>

## 不確定狀態

<Demo>
  <IndeterminateDemo />

<template #code>

```vue
<template>
  <div class="demo">
    <h3>Indeterminate Checkbox</h3>
    <div class="demo__content">
      <SHCheckbox v-model="parentChecked" label="全選" />

      <div class="ml-6 mt-2 space-y-2">
        <SHCheckbox
          :model-value="children.includes('option1')"
          @update:model-value="(value) => updateChild('option1', value)"
          label="選項 1"
        />
        <SHCheckbox
          :model-value="children.includes('option2')"
          @update:model-value="(value) => updateChild('option2', value)"
          label="選項 2"
        />
        <SHCheckbox
          :model-value="children.includes('option3')"
          @update:model-value="(value) => updateChild('option3', value)"
          label="選項 3"
        />
      </div>

      <p class="mt-4">
        Parent: {{ parentChecked }}<br />
        Children: {{ children }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SHCheckbox from '../index.vue'

const children = ref<string[]>([])

const parentChecked = computed({
  get() {
    if (children.value.length === 0) {
      return false
    } else if (children.value.length === 3) {
      return true
    } else {
      return 'indeterminate'
    }
  },
  set(value) {
    if (value === true) {
      children.value = ['option1', 'option2', 'option3']
    } else {
      children.value = []
    }
  },
})

const updateChild = (
  option: string,
  checked: boolean | 'indeterminate' | null,
) => {
  const currentChildren = [...children.value]
  const index = currentChildren.indexOf(option)

  if (checked && index === -1) {
    currentChildren.push(option)
  } else if (!checked && index !== -1) {
    currentChildren.splice(index, 1)
  }

  children.value = currentChildren
}
</script>
```

</template>
</Demo>

## 群組用法

<Demo>
  <CheckboxGroupDemo />

<template #code>

```vue
<template>
  <div class="demo">
    <h3>Checkbox Group</h3>
    <div class="demo__content">
      <SHCheckboxGroup
        v-model="selected1"
        label="選擇您的興趣"
        :options="interests"
        orientation="vertical"
      />
      <p class="mt-4">Selected: {{ selected1 }}</p>
    </div>

    <div class="demo__content">
      <SHCheckboxGroup
        v-model="selected2"
        label="選擇顏色（水平）"
        :options="colors"
        orientation="horizontal"
      />
      <p class="mt-4">Selected: {{ selected2 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCheckboxGroup from '../CheckboxGroup.vue'

const selected1 = ref<string[]>(['programming'])
const selected2 = ref<string[]>([])

const interests = [
  { label: '程式設計', value: 'programming' },
  { label: '設計', value: 'design' },
  { label: '音樂', value: 'music' },
  { label: '運動', value: 'sports' },
]

const colors = ['紅色', '藍色', '綠色', '黃色']
</script>
```

</template>
  
</Demo>

## API

### Checkbox 屬性

| 屬性名        | 說明               | 類型                                 | 默認值  |
| ------------- | ------------------ | ------------------------------------ | ------- |
| modelValue    | 當前選中狀態       | `boolean \| 'indeterminate' \| null` | -       |
| value         | 複選框的值         | `any`                                | -       |
| name          | 表單名稱           | `string`                             | -       |
| disabled      | 是否禁用           | `boolean`                            | `false` |
| required      | 是否必填           | `boolean`                            | `false` |
| inputId       | input 元素的 ID    | `string`                             | -       |
| inputClass    | input 元素的 class | `string`                             | -       |
| inputStyle    | input 元素的樣式   | `StyleValue`                         | -       |
| binary        | 是否為二進位模式   | `boolean`                            | `false` |
| indeterminate | 是否為不確定狀態   | `boolean`                            | `false` |
| label         | 標籤文字           | `string`                             | -       |

### CheckboxGroup 屬性

| 屬性名         | 說明                 | 類型                           | 默認值       |
| -------------- | -------------------- | ------------------------------ | ------------ |
| modelValue     | 當前選中的值陣列     | `any[]`                        | `[]`         |
| options        | 選項陣列             | `(CheckboxOption \| string)[]` | `[]`         |
| optionLabel    | 選項標籤的屬性名     | `string`                       | `'label'`    |
| optionValue    | 選項值的屬性名       | `string`                       | `'value'`    |
| optionDisabled | 選項禁用狀態的屬性名 | `string`                       | `'disabled'` |
| disabled       | 是否禁用整個群組     | `boolean`                      | `false`      |
| name           | 表單名稱             | `string`                       | -            |
| orientation    | 佈局方向             | `'horizontal' \| 'vertical'`   | `'vertical'` |
| label          | 群組標籤             | `string`                       | -            |

### 事件 Events

| 事件名            | 說明         | 回調參數                                              |
| ----------------- | ------------ | ----------------------------------------------------- |
| update:modelValue | 更新模型值   | `(value: boolean \| 'indeterminate' \| null) => void` |
| change            | 值變更事件   | `(event: Event) => void`                              |
| focus             | 獲得焦點事件 | `(event: FocusEvent) => void`                         |
| blur              | 失去焦點事件 | `(event: FocusEvent) => void`                         |

### 插槽 Slots

| 插槽名  | 說明     |
| ------- | -------- |
| default | 預設插槽 |
| icon    | 圖示插槽 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Checkbox/demos/Basic.vue'
import WithLabelDemo from '@/components/Checkbox/demos/WithLabel.vue'
import DisabledDemo from '@/components/Checkbox/demos/Disabled.vue'
import IndeterminateDemo from '@/components/Checkbox/demos/Indeterminate.vue'
import CheckboxGroupDemo from '@/components/Checkbox/demos/CheckboxGroup.vue'
</script>
