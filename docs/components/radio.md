---
title: Radio 單選框
---

## Description

Radio 組件用於在一組選項中選擇單一選項，提供清晰的選擇狀態和良好的使用者體驗。

## 基本用法

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <div class="demo">
    <h3>Basic Radio</h3>
    <div class="demo__content">
      <SHRadio v-model:value="selected" native-value="option1" label="選項一" />
      <SHRadio v-model:value="selected" native-value="option2" label="選項二" />
      <SHRadio v-model:value="selected" native-value="option3" label="選項三" />
      <p class="mt-4">選中值: {{ selected }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const selected = ref<string>("option1")
</script>
```

  </template>
</Demo>

## 群組用法

<Demo>
  <GroupDemo />

<template #code>

```vue
<template>
  <div class="demo">
    <h3>Radio Group</h3>
    <div class="demo__content">
      <SHRadioGroup
        v-model:value="groupSelected"
        :options="options"
        label="選擇一個選項"
        orientation="vertical"
      />
      <p class="mt-4">選中值: {{ groupSelected }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const groupSelected = ref<string>("")
const options = [
  { label: "選項一", value: "option1" },
  { label: "選項二", value: "option2" },
  { label: "選項三（禁用）", value: "option3", disabled: true },
]
</script>
```

  </template>
</Demo>

<!-- 已移除不存在的 DisabledDemo 範例，因 demos 資料夾僅包含 Basic.vue 及 Group.vue -->

## API

### Radio 屬性

| 屬性名      | 說明                             | 類型                              | 默認值     |
| ----------- | -------------------------------- | ----------------------------------- | ---------- |
| value       | 目前選中的值（v-model:value）    | `any`                               | -          |
| nativeValue | 原生表單值 / 此單選框代表的值    | `any`                               | -          |
| name        | 原生 name 屬性                   | `string`                            | -          |
| size        | 尺寸                             | `'small' \| 'medium' \| 'large'`    | `'medium'` |
| disabled    | 是否禁用                         | `boolean`                           | `false`    |
| readonly    | 是否唯讀                         | `boolean`                           | `false`    |
| required    | 是否必填                         | `boolean`                           | `false`    |
| inputId     | input 元素的 ID                  | `string`                            | -          |
| inputClass  | input 元素的類名                 | `string`                            | -          |
| inputStyle  | input 元素的樣式                 | `StyleValue`                        | -          |
| label       | 標籤文字                         | `string`                            | -          |

### RadioGroup 屬性

| 屬性名         | 說明                 | 類型                         | 默認值       |
| -------------- | -------------------- | ---------------------------- | ------------ |
| value          | 綁定值               | `any`                        | -            |
| options        | 選項陣列             | `(RadioOption \| string)[]`  | `[]`         |
| optionLabel    | 選項標籤的屬性名     | `string`                     | `'label'`    |
| optionValue    | 選項值的屬性名       | `string`                     | `'value'`    |
| optionDisabled | 選項禁用狀態的屬性名 | `string`                     | `'disabled'` |
| size           | 尺寸（套用至所有子選項） | `'small' \| 'medium' \| 'large'` | `'medium'` |
| disabled       | 是否禁用整個群組     | `boolean`                    | `false`      |
| readonly       | 是否唯讀整個群組     | `boolean`                    | `false`      |
| name           | 表單名稱             | `string`                     | -            |
| orientation    | 佈局方向             | `'horizontal' \| 'vertical'` | `'vertical'` |
| label          | 群組標籤             | `string`                     | -            |

### Radio 事件

| 事件名       | 說明         | 回調參數                      |
| ------------ | ------------ | ----------------------------- |
| update:value | 更新模型值   | `(value: any) => void`        |
| change       | 值變更事件（帶新值） | `(value: any) => void`      |
| focus        | 獲得焦點事件 | `(event: FocusEvent) => void` |
| blur         | 失去焦點事件 | `(event: FocusEvent) => void` |

### RadioGroup 事件

| 事件名       | 說明       | 回調參數                |
| ------------ | ---------- | ------------------------ |
| update:value | 更新模型值 | `(value: any) => void`   |
| change       | 值變更事件 | `(value: any) => void`   |

### 插槽 Slots

| 插槽名  | 說明     |
| ------- | -------- |
| default | 預設插槽 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Radio/demos/Basic.vue'
import GroupDemo from '@/components/Radio/demos/Group.vue'
</script>
