<template>
  <button
    class="s-button"
    :class="[
      `s-button--${type}`,
      `s-button--${size}`,
      {
        'is-disabled': disabled || loading,
        's-button--loading': loading,
      },
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="s-button__loading">
      <svg
        class="s-button__loading-icon"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="60 30"
        />
      </svg>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import type { ButtonProps, ButtonEmits } from "./types"

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "default",
  size: "default",
  disabled: false,
  loading: false,
})

const emit = defineEmits<ButtonEmits>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit("click", event)
}
</script>

<style lang="postcss">
.s-button {
  @apply px-4 py-2 rounded-lg font-medium  cursor-pointer relative;
  @apply flex items-center justify-center;
  @apply transition-all duration-300 ease-in-out;
}

.s-button--primary {
  @apply bg-primary text-white hover:bg-primary-dark;
}

.s-button--success {
  @apply bg-secondary text-white hover:bg-secondary-dark;
}

.s-button--warning {
  @apply bg-yellow-500 text-white hover:bg-yellow-600;
}

.s-button--danger {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.s-button--info {
  @apply bg-gray-500 text-white hover:bg-gray-600;
}

.s-button--default {
  @apply bg-white text-gray-700 border border-gray-300 hover:(bg-gray-100);
}

.s-button--plain {
  @apply bg-transparent text-gray-700 border border-gray-300 hover:(bg-gray-50);
}

.s-button--dashed {
  @apply bg-transparent text-gray-700 border border-gray-300 border-dashed hover:(bg-gray-50);
}

.s-button--text {
  @apply bg-transparent text-gray-700 border-0 hover:text-primary hover:(bg-gray-50);
}

.s-button--large {
  @apply text-lg px-6 py-3;
}

.s-button--small {
  @apply text-sm px-3 py-1;
}

.s-button.is-disabled {
  @apply opacity-60 cursor-not-allowed;
}

.s-button__loading {
  @apply inline-flex items-center justify-center mr-2;
}

.s-button__loading-icon {
  @apply w-4 h-4 animate-spin;
}

.s-button--loading {
  @apply relative;
}
</style>
