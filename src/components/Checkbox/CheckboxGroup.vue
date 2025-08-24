<template>
  <fieldset class="sh-checkbox-group" :class="checkboxGroupClasses">
    <legend v-if="label" class="sh-checkbox-group__label">{{ label }}</legend>
    <div class="sh-checkbox-group__content">
      <SHCheckbox
        v-for="option in normalizedOptions"
        :key="getOptionValue(option)"
        :model-value="isOptionChecked(getOptionValue(option))"
        @update:model-value="(value) => updateOption(getOptionValue(option), value as boolean | 'indeterminate' | null)"
        :value="getOptionValue(option)"
        :name="name"
        :disabled="disabled || getOptionDisabled(option)"
        :label="getOptionLabel(option)"
      />
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { computed, watch } from "vue"
import type {
  CheckboxGroupProps,
  CheckboxGroupEmits,
  CheckboxOption,
} from "./types"
import SHCheckbox from "./index.vue"

defineOptions({
  name: "SHCheckboxGroup",
})

const props = withDefaults(defineProps<CheckboxGroupProps>(), {
  modelValue: () => [],
  options: () => [],
  optionLabel: "label",
  optionValue: "value",
  optionDisabled: "disabled",
  disabled: false,
  orientation: "vertical",
})

const emit = defineEmits<CheckboxGroupEmits>()

const modelValue = defineModel<any[]>({
  default: () => [],
})

const checkboxGroupClasses = computed(() => {
  return {
    "sh-checkbox-group--horizontal": props.orientation === "horizontal",
    "sh-checkbox-group--vertical": props.orientation === "vertical",
    "sh-checkbox-group--disabled": props.disabled,
  }
})

const normalizedOptions = computed(() => {
  return props.options || []
})

const getOptionLabel = (option: CheckboxOption | string | any) => {
  if (typeof option === "string") {
    return option
  }
  if (typeof option === "object" && option !== null) {
    return option[props.optionLabel] || option.label
  }
  return option
}

const getOptionValue = (option: CheckboxOption | string | any) => {
  if (typeof option === "string") {
    return option
  }
  if (typeof option === "object" && option !== null) {
    return option[props.optionValue] !== undefined
      ? option[props.optionValue]
      : option.value
  }
  return option
}

const getOptionDisabled = (option: CheckboxOption | string | any) => {
  if (typeof option === "string") {
    return false
  }
  if (typeof option === "object" && option !== null) {
    return option[props.optionDisabled] || option.disabled || false
  }
  return false
}

const isOptionChecked = (value: any) => {
  return modelValue.value.includes(value)
}

const updateOption = (
  value: any,
  checked: boolean | "indeterminate" | null
) => {
  const currentValues = [...(modelValue.value || [])]
  const index = currentValues.indexOf(value)

  if (checked && index === -1) {
    currentValues.push(value)
  } else if (!checked && index !== -1) {
    currentValues.splice(index, 1)
  }

  modelValue.value = currentValues
}

// 監聽模型值變化，發出 change 事件
watch(
  modelValue,
  (newValue) => {
    emit("change", newValue || [])
  },
  { deep: true }
)
</script>

<style lang="postcss">
.sh-checkbox-group {
  @apply border-none p-0 m-0;
}

.sh-checkbox-group__label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}

.sh-checkbox-group__content {
  @apply flex;
}

.sh-checkbox-group--horizontal .sh-checkbox-group__content {
  @apply flex-row gap-4 flex-wrap;
}

.sh-checkbox-group--vertical .sh-checkbox-group__content {
  @apply flex-col gap-2;
}

.sh-checkbox-group--disabled {
  @apply opacity-50;
}
</style>
