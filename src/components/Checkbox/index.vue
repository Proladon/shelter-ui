<template>
  <label class="sh-checkbox" :class="checkboxClasses">
    <input
      :id="inputId"
      ref="inputRef"
      type="checkbox"
      :name="name"
      :value="value"
      :disabled="disabled"
      :required="required"
      :indeterminate="isIndeterminate"
      :class="['sh-checkbox__input', inputClass]"
      :style="inputStyle"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
    <span class="sh-checkbox__indicator">
      <CheckboxIndicator :state="checkboxState">
        <template #icon>
          <slot name="icon" />
        </template>
      </CheckboxIndicator>
    </span>
    <span v-if="label || $slots.default" class="sh-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { CheckboxProps, CheckboxEmits } from './types'
import CheckboxIndicator from './CheckboxIndicator.vue'

defineOptions({
  name: 'SHCheckbox',
})

const props = withDefaults(defineProps<CheckboxProps>(), {
  disabled: false,
  required: false,
  binary: false,
  indeterminate: false,
})

const emit = defineEmits<CheckboxEmits>()

const modelValue = defineModel<boolean | 'indeterminate' | null | any[]>()
const inputRef = ref<HTMLInputElement>()

const checkboxClasses = computed(() => {
  return {
    'sh-checkbox--disabled': props.disabled,
    'sh-checkbox--checked': isChecked.value,
    'sh-checkbox--indeterminate': isIndeterminate.value,
  }
})

const isChecked = computed(() => {
  if (props.value !== undefined) {
    // 當有 value 時，檢查是否在 modelValue 陣列中
    if (Array.isArray(modelValue.value)) {
      return modelValue.value.includes(props.value)
    }
    return modelValue.value === props.value
  }
  // 沒有 value 時，直接使用 modelValue 的布林值
  return modelValue.value === true
})

const isIndeterminate = computed(() => {
  return modelValue.value === 'indeterminate' || props.indeterminate
})

const checkboxState = computed(() => {
  if (isIndeterminate.value) return 'indeterminate'
  if (isChecked.value) return 'checked'
  return 'unchecked'
})

const onChange = (event: Event) => {
  if (props.disabled) return

  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (props.value !== undefined) {
    // 當有 value 時，更新陣列
    const currentValue = Array.isArray(modelValue.value)
      ? [...modelValue.value]
      : []
    if (checked) {
      if (!currentValue.includes(props.value)) {
        currentValue.push(props.value)
      }
    } else {
      const index = currentValue.indexOf(props.value)
      if (index > -1) {
        currentValue.splice(index, 1)
      }
    }
    modelValue.value = currentValue
  } else {
    // 沒有 value 時，直接設定布林值
    modelValue.value = checked
  }

  emit('change', event)
}

const onFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const onBlur = (event: FocusEvent) => {
  emit('blur', event)
}

// 同步 indeterminate 狀態到 DOM
watch(
  isIndeterminate,
  (newValue) => {
    if (inputRef.value) {
      inputRef.value.indeterminate = newValue
    }
  },
  { immediate: true },
)

// 同步 checked 狀態到 DOM
watch(
  isChecked,
  (newValue) => {
    if (inputRef.value) {
      inputRef.value.checked = newValue
    }
  },
  { immediate: true },
)
</script>

<style lang="postcss">
.sh-checkbox {
  @apply inline-flex items-center cursor-pointer gap-2;
}

.sh-checkbox--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.sh-checkbox__input {
  @apply sr-only;
}

.sh-checkbox__indicator {
  @apply relative w-4 h-4 border border-solid border-border.base dark:border-border.base rounded;
  @apply bg-white dark:bg-bg.primary transition-all duration-200;
  @apply flex items-center justify-center shadow-sm;
}

.sh-checkbox__input:checked + .sh-checkbox__indicator,
.sh-checkbox--indeterminate .sh-checkbox__indicator {
  @apply border-primary bg-primary;
}

.sh-checkbox__input:focus + .sh-checkbox__indicator {
  /* @apply ring-2 ring-primary.fade ring-offset-2; */
}

.sh-checkbox__input:disabled + .sh-checkbox__indicator {
  @apply opacity-50;
}

.sh-checkbox__label {
  @apply text-sm text-gray-700 dark:text-gray-300;
}

.sh-checkbox--disabled .sh-checkbox__label {
  @apply text-gray-400 dark:text-gray-600;
}

.sh-checkbox-indicator__icon {
  @apply text-bg.primary;
}
</style>
