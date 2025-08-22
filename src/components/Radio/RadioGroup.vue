<template>
  <fieldset class="sh-radio-group" :class="radioGroupClasses">
    <legend v-if="label" class="sh-radio-group__label">{{ label }}</legend>
    <div class="sh-radio-group__content">
      <SHRadio
        v-for="option in normalizedOptions"
        :key="getOptionValue(option)"
        v-model="modelValue"
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
import type { RadioGroupProps, RadioGroupEmits, RadioOption } from "./types"
import SHRadio from "./index.vue"

defineOptions({
  name: "SHRadioGroup",
})

const props = withDefaults(defineProps<RadioGroupProps>(), {
  options: () => [],
  optionLabel: "label",
  optionValue: "value",
  optionDisabled: "disabled",
  disabled: false,
  orientation: "vertical",
})

const emit = defineEmits<RadioGroupEmits>()

const modelValue = defineModel<any>()

const radioGroupClasses = computed(() => {
  return {
    "sh-radio-group--horizontal": props.orientation === "horizontal",
    "sh-radio-group--vertical": props.orientation === "vertical",
    "sh-radio-group--disabled": props.disabled,
  }
})

const normalizedOptions = computed(() => {
  return props.options || []
})

const getOptionLabel = (option: RadioOption | any) => {
  if (typeof option === "object" && option !== null) {
    return option[props.optionLabel] || option.label
  }
  return option
}

const getOptionValue = (option: RadioOption | any) => {
  if (typeof option === "object" && option !== null) {
    return option[props.optionValue] !== undefined
      ? option[props.optionValue]
      : option.value
  }
  return option
}

const getOptionDisabled = (option: RadioOption | any) => {
  if (typeof option === "object" && option !== null) {
    return option[props.optionDisabled] || option.disabled || false
  }
  return false
}

// 監聽模型值變化，發出 change 事件
watch(
  modelValue,
  (newValue) => {
    emit("change", newValue)
  },
  { deep: true }
)
</script>

<style lang="postcss">
.sh-radio-group {
  @apply border-none p-0 m-0;
}

.sh-radio-group__label {
  @apply block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2;
}

.sh-radio-group__content {
  @apply flex;
}

.sh-radio-group--horizontal .sh-radio-group__content {
  @apply flex-row gap-4;
}

.sh-radio-group--vertical .sh-radio-group__content {
  @apply flex-col gap-2;
}

.sh-radio-group--disabled {
  @apply opacity-50;
}
</style>
