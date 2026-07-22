<template>
  <label class="sh-checkbox" :class="checkboxClasses">
    <input
      :id="inputId"
      ref="inputRef"
      type="checkbox"
      :name="name"
      :value="nativeValue"
      :disabled="disabled"
      :readonly="readonly"
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

const props = withDefaults(defineProps<Omit<CheckboxProps, 'value'>>(), {
  disabled: false,
  readonly: false,
  required: false,
  binary: false,
  indeterminate: false,
  size: 'medium',
})

const emit = defineEmits<CheckboxEmits>()

const value = defineModel<boolean | 'indeterminate' | null | any[]>('value')
const inputRef = ref<HTMLInputElement>()

const checkboxClasses = computed(() => {
  return {
    [`sh-checkbox--${props.size}`]: true,
    'sh-checkbox--disabled': props.disabled,
    'sh-checkbox--checked': isChecked.value,
    'sh-checkbox--indeterminate': isIndeterminate.value,
  }
})

const isChecked = computed(() => {
  if (props.nativeValue !== undefined) {
    // 當有 nativeValue 時，檢查是否在 value 陣列中
    if (Array.isArray(value.value)) {
      return value.value.includes(props.nativeValue)
    }
    return value.value === props.nativeValue
  }
  // 沒有 nativeValue 時，直接使用 value 的布林值
  return value.value === true
})

const isIndeterminate = computed(() => {
  return value.value === 'indeterminate' || props.indeterminate
})

const checkboxState = computed(() => {
  if (isIndeterminate.value) return 'indeterminate'
  if (isChecked.value) return 'checked'
  return 'unchecked'
})

const onChange = (event: Event) => {
  if (props.disabled || props.readonly) return

  const target = event.target as HTMLInputElement
  const checked = target.checked

  if (props.nativeValue !== undefined) {
    // 當有 nativeValue 時，更新陣列
    const currentValue = Array.isArray(value.value) ? [...value.value] : []
    if (checked) {
      if (!currentValue.includes(props.nativeValue)) {
        currentValue.push(props.nativeValue)
      }
    } else {
      const index = currentValue.indexOf(props.nativeValue)
      if (index > -1) {
        currentValue.splice(index, 1)
      }
    }
    value.value = currentValue
    emit('change', currentValue)
  } else {
    // 沒有 nativeValue 時，直接設定布林值
    value.value = checked
    emit('change', checked)
  }
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

<style lang="postcss" scoped>
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
  @apply relative border border-solid border-border.base rounded;
  @apply bg-bg.primary transition-all duration-200;
  @apply flex items-center justify-center shadow-sm;
}

.sh-checkbox--small .sh-checkbox__indicator {
  @apply w-3.5 h-3.5;
}

.sh-checkbox--medium .sh-checkbox__indicator {
  @apply w-4 h-4;
}

.sh-checkbox--large .sh-checkbox__indicator {
  @apply w-5 h-5;
}

.sh-checkbox__input:checked + .sh-checkbox__indicator,
.sh-checkbox--indeterminate .sh-checkbox__indicator {
  @apply border-primary bg-primary;
}

.sh-checkbox__input:focus + .sh-checkbox__indicator {
  box-shadow: var(--sh-focus-ring);
}

.sh-checkbox__input:disabled + .sh-checkbox__indicator {
  @apply opacity-50;
}

.sh-checkbox__label {
  @apply text-sm text-text.base;
}

.sh-checkbox--small .sh-checkbox__label {
  @apply text-xs;
}

.sh-checkbox--large .sh-checkbox__label {
  @apply text-base;
}

.sh-checkbox--disabled .sh-checkbox__label {
  @apply text-text.primary;
}

.sh-checkbox-indicator__icon {
  @apply text-bg.primary;
}
</style>
