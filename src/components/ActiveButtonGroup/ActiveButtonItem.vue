<script setup lang="ts">
import { ref, inject, onMounted, computed, useTemplateRef } from 'vue'
import type { ActiveButtonItemProps } from './types'

defineOptions({
  name: 'SHActiveButtonItem',
})

const props = withDefaults(defineProps<ActiveButtonItemProps>(), {
  disabled: false,
})

const buttonRef = useTemplateRef<HTMLElement>('buttonRef')

// Inject functions and values from parent
const addButton = inject('addButton', null) as
  | ((button: { value: string; disabled?: boolean; ref?: HTMLElement }) => void)
  | null
const activeValue = inject('activeValue', ref('')) as { value: string }
const handleButtonClick = inject('handleButtonClick', null) as
  | ((value: string) => void)
  | null

// Check if this button is active
const isActive = computed(() => activeValue.value === props.value)

// Register this button with the parent on mount
onMounted(() => {
  if (addButton && buttonRef.value) {
    addButton({
      value: props.value,
      disabled: props.disabled,
      ref: buttonRef.value,
    })
  }
})

// Handle button click
const onClick = () => {
  if (props.disabled || !handleButtonClick) return
  handleButtonClick(props.value)
}
</script>

<template>
  <button
    ref="buttonRef"
    class="sh-active-button-item"
    :class="{
      'sh-active-button-item--active': isActive,
      'sh-active-button-item--disabled': disabled,
    }"
    @click="onClick"
    :disabled="disabled"
    type="button"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
.sh-active-button-item {
  @apply relative px-4 py-2 rounded-md text-center cursor-pointer z-10;
  @apply flex-1 flex-shrink-0;
  @apply transition-colors duration-200 ease-in-out;
  @apply hover:(text-secondary);

  &--active {
    @apply text-primary;
  }

  &--disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply hover:text-inherit;
  }
}
</style>
