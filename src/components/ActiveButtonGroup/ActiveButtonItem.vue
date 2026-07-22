<script setup lang="ts">
import { inject, onMounted, computed, useTemplateRef } from 'vue'
import type { ActiveButtonItemProps } from './types'
import { addButtonKey, activeValueKey, handleButtonClickKey } from './context'

defineOptions({
  name: 'SHActiveButtonItem',
})

const props = withDefaults(defineProps<ActiveButtonItemProps>(), {
  disabled: false,
})

const buttonRef = useTemplateRef<HTMLElement>('buttonRef')

// Inject functions and values from parent
const addButton = inject(addButtonKey)
const activeValue = inject(
  activeValueKey,
  computed(() => undefined),
)
const handleButtonClick = inject(handleButtonClickKey)

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

<style lang="postcss" scoped>
.sh-active-button-item {
  @apply relative px-4 py-2 rounded-md text-center cursor-pointer z-10;
  @apply flex-1 flex-shrink-0;
  @apply transition-colors duration-200 ease-in-out;
  @apply hover:(text-primary);
}

.sh-active-button-item--active {
  @apply text-primary;
}

.sh-active-button-item--disabled {
  @apply opacity-50 cursor-not-allowed;
  @apply hover:text-inherit;
}
</style>
