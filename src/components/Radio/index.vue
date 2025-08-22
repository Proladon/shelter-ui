<template>
  <label class="sh-radio" :class="radioClasses">
    <input
      :id="inputId"
      v-model="modelValue"
      type="radio"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
      :class="['sh-radio__input', inputClass]"
      :style="inputStyle"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
    <span class="sh-radio__indicator">
      <span class="sh-radio__dot"></span>
    </span>
    <span v-if="label || $slots.default" class="sh-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { RadioProps, RadioEmits } from "./types"

defineOptions({
  name: "SHRadio",
})

const props = withDefaults(defineProps<RadioProps>(), {
  disabled: false,
  required: false,
})

const emit = defineEmits<RadioEmits>()

const modelValue = defineModel<any>()

const radioClasses = computed(() => {
  return {
    "sh-radio--disabled": props.disabled,
    "sh-radio--checked": modelValue.value === props.value,
  }
})

const onChange = (event: Event) => {
  if (!props.disabled) {
    emit("change", event)
  }
}

const onFocus = (event: FocusEvent) => {
  emit("focus", event)
}

const onBlur = (event: FocusEvent) => {
  emit("blur", event)
}
</script>

<style lang="postcss">
.sh-radio {
  @apply inline-flex items-center cursor-pointer gap-2;
}

.sh-radio--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.sh-radio__input {
  @apply sr-only;
}

.sh-radio__indicator {
  @apply relative w-4 h-4 border border-gray-300 dark:border-gray-600 rounded-full;
  @apply bg-white dark:bg-gray-800 transition-colors duration-200;
  @apply flex items-center justify-center;
}

.sh-radio__input:checked + .sh-radio__indicator {
  @apply border-primary bg-primary;
}

.sh-radio__input:focus + .sh-radio__indicator {
  @apply ring-2 ring-primary.fade ring-offset-2;
}

.sh-radio__input:disabled + .sh-radio__indicator {
  @apply opacity-50;
}

.sh-radio__dot {
  @apply w-2 h-2 rounded-full bg-white opacity-0 transition-opacity duration-200;
}

.sh-radio__input:checked + .sh-radio__indicator .sh-radio__dot {
  @apply opacity-100;
}

.sh-radio__label {
  @apply text-sm text-gray-700 dark:text-gray-300;
}

.sh-radio--disabled .sh-radio__label {
  @apply text-gray-400 dark:text-gray-600;
}
</style>
