````markdown
## Goal

建立一個新的組件，名為 `Radio`

## What

Radio 組件用於在一組選項中選擇單一選項，提供清晰的選擇狀態和良好的使用者體驗。

### How to use

```vue
<template>
  <SHRadio v-model="selectedOption" value="option1" label="選項一" />
  <SHRadio v-model="selectedOption" value="option2" label="選項二" />
  <SHRadioGroup
    v-model="selectedOption"
    :options="options"
    label="選擇一個選項"
    orientation="vertical"
  />
</template>
<script setup lang="ts">
const selectedOption = ref(null)
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
- url: https://primevue.org/radiobutton/
  why: 參考 primevue 的 radio 組件實作
- url: https://primevue.org/radiobutton/#api
  why: 參考 primevue 的 radio 組件 api
```

### Data models and structure

```
interface RadioProps {
  value: any
  modelValue: any
  name: string
  disabled: boolean
  required: boolean
  inputId: string
  inputClass: string
  inputStyle: object
}

interface RadioGroupProps {
  modelValue: any
  options: RadioOption[]
  optionLabel: string
  optionValue: string
  optionDisabled: string
  disabled: boolean
  name: string
  orientation: 'horizontal' | 'vertical'
}

interface RadioOption {
  label: string
  value: any
  disabled?: boolean
}

RadioSlots:
  - default

RadioEmits:
  - update:modelValue
  - change
  - focus
  - blur
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Radio 組件相關檔案
CREATE: src/components/Radio/
    - CREATE: src/components/Radio/demos/
    - CREATE: src/components/Radio/index.vue
    - CREATE: src/components/Radio/RadioGroup.vue
    - CREATE: src/components/Radio/types.ts

- Task2: 建立 Radio 組件相關 demo
UPDATE: src/components/Radio/demos/

- Task3:
file: Prps/UpdateComponentDocs.md

- Task4:
file: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax

```
- Radio:
    - 基本樣式:
      - size: `w-4 h-4`
      - border: `border border-gray-300 dark:border-gray-600`
      - border-radius: `rounded-full`
      - background: `bg-white dark:bg-gray-800`
      - transition: `transition-colors duration-200`

    - 狀態變化:
      - checked: `border-primary bg-primary`
      - disabled: `opacity-50 cursor-not-allowed`
      - focus: `ring-2 ring-primary.fade ring-offset-2`

    - RadioGroup:
      - horizontal: `flex flex-row gap-4`
      - vertical: `flex flex-col gap-2`

    - Label:
      - text: `text-sm text-gray-700 dark:text-gray-300`
      - spacing: `ml-2`
      - disabled: `text-gray-400 dark:text-gray-600`
```

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'

- Radio 必須支援鍵盤導航 (Arrow keys, Tab, Space)

- 應包含無障礙功能 (ARIA labels, roles)
````
