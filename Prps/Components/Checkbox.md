````markdown
## Goal

建立一個新的組件，名為 `Checkbox`

## What

Checkbox 組件用於選擇多個選項或切換單一選項的狀態，支援 checked、unchecked 和 indeterminate 三種狀態。

### How to use

```vue
<template>
  <SHCheckbox v-model="checked" label="接受條款" />
  <SHCheckbox v-model="indeterminate" :indeterminate="true" label="部分選取" />
  <SHCheckboxGroup
    v-model="selectedOptions"
    :options="options"
    label="選擇喜好"
    orientation="vertical"
  />
</template>

<script setup lang="ts">
const checked = ref(false)
const indeterminate = ref("indeterminate")
const selectedOptions = ref([])
const options = [
  { label: "選項一", value: "option1" },
  { label: "選項二", value: "option2" },
  { label: "選項三", value: "option3", disabled: true },
]
</script>
```

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://reka-ui.com/docs/components/checkbox
  why: 參考 reka-ui 的 checkbox 組件實作和設計模式
- url: https://primevue.org/checkbox/
  why: 參考 primevue 的 checkbox 組件作為補充參考
```

### Data models and structure

```
interface CheckboxProps {
  modelValue: boolean | 'indeterminate' | null
  value: any
  name: string
  disabled: boolean
  required: boolean
  inputId: string
  inputClass: string
  inputStyle: object
  binary: boolean
  indeterminate: boolean
}

interface CheckboxGroupProps {
  modelValue: any[]
  options: CheckboxOption[]
  optionLabel: string
  optionValue: string
  optionDisabled: string
  disabled: boolean
  name: string
  orientation: 'horizontal' | 'vertical'
}

interface CheckboxOption {
  label: string
  value: any
  disabled?: boolean
}

CheckboxSlots:
  - default
  - icon

CheckboxEmits:
  - update:modelValue
  - change
  - focus
  - blur
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Checkbox 組件相關檔案
CREATE: src/components/Checkbox/
    - CREATE: src/components/Checkbox/demos/
    - CREATE: src/components/Checkbox/index.vue
    - CREATE: src/components/Checkbox/CheckboxGroup.vue
    - CREATE: src/components/Checkbox/CheckboxIndicator.vue
    - CREATE: src/components/Checkbox/types.ts

- Task2: 建立 Checkbox 組件相關 demo
UPDATE: src/components/Checkbox/demos/

- Task3:
file: Prps/UpdateComponentDocs.md

- Task4:
file: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax

```
- Checkbox:
    - 基本樣式:
      - size: `w-4 h-4`
      - border: `border border-gray-300 dark:border-gray-600`
      - border-radius: `rounded`
      - background: `bg-white dark:bg-gray-800`
      - transition: `transition-all duration-200`

    - 狀態變化:
      - checked: `border-primary bg-primary`
      - indeterminate: `border-primary bg-primary`
      - disabled: `opacity-50 cursor-not-allowed`
      - focus: `ring-2 ring-primary.fade ring-offset-2`

    - CheckboxIndicator:
      - checked icon: `text-white w-3 h-3`
      - indeterminate icon: `text-white w-3 h-3`
      - transition: `transition-opacity duration-200`

    - CheckboxGroup:
      - horizontal: `flex flex-row gap-4 flex-wrap`
      - vertical: `flex flex-col gap-2`

    - Label:
      - text: `text-sm text-gray-700 dark:text-gray-300`
      - spacing: `ml-2`
      - disabled: `text-gray-400 dark:text-gray-600`
```

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'

  - checked: IconCheck
  - indeterminate: IconMinus

- Checkbox 必須支援鍵盤導航 (Tab, Space)

- 應包含無障礙功能 (ARIA labels, roles, states)

- 支援三種狀態：checked、unchecked、indeterminate
````
