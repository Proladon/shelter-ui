<template>
  <label class="sh-radio" :class="radioClasses">
    <input
      :id="inputId"
      v-model="value"
      type="radio"
      :name="name"
      :value="nativeValue"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :class="['sh-radio__input', inputClass]"
      :style="inputStyle"
      @click="onClick"
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
import { computed } from 'vue'
import type { RadioProps, RadioEmits } from './types'

defineOptions({
  name: 'SHRadio',
})

const props = withDefaults(defineProps<Omit<RadioProps, 'value'>>(), {
  disabled: false,
  readonly: false,
  required: false,
  size: 'medium',
})

const emit = defineEmits<RadioEmits>()

const value = defineModel<any>('value')

const radioClasses = computed(() => {
  return {
    [`sh-radio--${props.size}`]: true,
    'sh-radio--disabled': props.disabled,
    'sh-radio--checked': value.value === props.nativeValue,
  }
})

// 原生 readonly 屬性對 <input type="radio"> 沒有任何作用，且 Vue 的 v-model
// 會在底層另外綁定一個獨立的 change 監聽器來同步 value，不受此元件自身的
// disabled/readonly 判斷所限制。因此在 click 階段（瀏覽器套用「勾選」預設行為
// 與觸發 change 事件之前）就 preventDefault，才能真正阻止唯讀時被點擊切換。
const onClick = (event: MouseEvent) => {
  if (props.disabled || props.readonly) {
    event.preventDefault()
  }
}

const onChange = () => {
  if (props.disabled || props.readonly) return
  emit('change', props.nativeValue)
}

const onFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const onBlur = (event: FocusEvent) => {
  emit('blur', event)
}
</script>

<style lang="postcss" scoped>
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
  @apply relative border-1 border border-solid border-border.base rounded-full;
  @apply bg-bg.primary transition-colors duration-300;
  @apply flex items-center justify-center shadow-md;
}

.sh-radio--small .sh-radio__indicator {
  @apply w-3.5 h-3.5;
}

.sh-radio--medium .sh-radio__indicator {
  @apply w-4 h-4;
}

.sh-radio--large .sh-radio__indicator {
  @apply w-5 h-5;
}

.sh-radio__input:checked + .sh-radio__indicator {
  @apply border-primary bg-primary;
}

.sh-radio__input:focus + .sh-radio__indicator {
  box-shadow: var(--sh-focus-ring);
}

.sh-radio__input:disabled + .sh-radio__indicator {
  @apply opacity-70;
}

.sh-radio__dot {
  @apply w-2 h-2 rounded-full bg-border.base opacity-0 transition-opacity duration-300;
}

.sh-radio--small .sh-radio__dot {
  @apply w-1.5 h-1.5;
}

.sh-radio--large .sh-radio__dot {
  @apply w-2.5 h-2.5;
}

.sh-radio__input:checked + .sh-radio__indicator .sh-radio__dot {
  @apply opacity-100;
}

.sh-radio__label {
  @apply text-sm text-text.base;
}

.sh-radio--small .sh-radio__label {
  @apply text-xs;
}

.sh-radio--large .sh-radio__label {
  @apply text-base;
}

.sh-radio--disabled .sh-radio__label {
  @apply opacity-70;
}
</style>
