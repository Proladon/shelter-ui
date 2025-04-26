<template>
  <div class="s-input-wrapper" :class="{ 'is-disabled': disabled }">
    <div class="s-input-container">
      <div v-if="$slots.prefix" class="s-input-prefix">
        <slot name="prefix"></slot>
      </div>
      <input
        class="s-input"
        :class="[`s-input--${size}`, { 's-input--with-prefix': $slots.prefix, 's-input--with-suffix': $slots.suffix || clearable }]"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <div v-if="clearable && modelValue" class="s-input-clear" @click="handleClear">
        <span class="s-input-clear-icon">×</span>
      </div>
      <div v-if="$slots.suffix" class="s-input-suffix">
        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { InputProps, InputEmits } from './types'

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  size: 'default',
  disabled: false,
  clearable: false,
})

const emit = defineEmits<InputEmits>()

const handleInput = (event: Event) => {
  if (props.disabled) return
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  if (props.disabled) return
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  if (props.disabled) return
  emit('blur', event)
}

const handleClear = () => {
  if (props.disabled) return
  emit('update:modelValue', '')
}
</script>

<style lang="postcss">
.s-input-wrapper {
  @apply inline-block w-full;
}

.s-input-container {
  @apply relative flex items-center w-full;
}

.s-input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300;
}

.s-input--with-prefix {
  @apply pl-10;
}

.s-input--with-suffix {
  @apply pr-10;
}

.s-input--large {
  @apply text-lg px-5 py-3;
}

.s-input--small {
  @apply text-sm px-3 py-1;
}

.s-input-prefix {
  @apply absolute left-3 flex items-center justify-center text-gray-500;
}

.s-input-suffix {
  @apply absolute right-3 flex items-center justify-center text-gray-500;
}

.s-input-clear {
  @apply absolute right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer;
}

.s-input-clear-icon {
  @apply text-lg font-light;
}

.s-input-wrapper.is-disabled .s-input {
  @apply bg-gray-100 text-gray-400 cursor-not-allowed;
}

.s-input-wrapper.is-disabled .s-input-prefix,
.s-input-wrapper.is-disabled .s-input-suffix,
.s-input-wrapper.is-disabled .s-input-clear {
  @apply text-gray-300 cursor-not-allowed;
}
</style>