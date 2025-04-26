<template>
  <button
    class="s-button"
    :class="[
      `s-button--type-${type}`,
      `s-button--size-${size}`,
      {
        'is-disabled': disabled || loading,
        's-button--loading': loading,
        's-button--text': text,
        's-button--ghost': ghost,
        's-button--dashed': dashed,
        's-button--outline': outline,
      },
      outline && type !== 'default' ? `s-button--outline-${type}` : ''
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
import { computed } from 'vue';
import type { ButtonProps, ButtonEmits } from './types'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'default',
  disabled: false,
  loading: false,
  text: false,
  ghost: false,
  dashed: false,
  outline: false,
})

const emit = defineEmits<ButtonEmits>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

const computedClass = computed(() => {
  const classList: string[] = []
  if (props.outline) {
    classList.push('s-button--outline')
  }
  return []
})


</script>

<style lang="postcss" scoped>
.s-button {
  @apply px-4 py-2 rounded-lg font-medium cursor-pointer relative;
  @apply flex items-center justify-center;
  @apply transition-all duration-300 ease-in-out;
  @apply outline-none border-solid border;
}

/* Type */
.s-button--type-primary {
  @apply text-white;
  @apply bg-primary border-primary;
}

.s-button--type-success {
  @apply text-white;
  @apply bg-status.success border-status.success;
}

.s-button--type-warning {
  @apply text-white;
  @apply bg-status.warning border-status.warning;
}

.s-button--type-danger {
  @apply text-white;
  @apply bg-status.danger border-status.danger;
}

.s-button--type-info {
  @apply text-white;
  @apply bg-status.info border-status.info;
}

.s-button--type-default {
  @apply text-white border hover:(bg-status.info);
}

/* Size */
.s-button--size-large {
  @apply text-lg px-6 py-3;
}

.s-button--size-small {
  @apply text-sm px-3 py-1;
}

/* Style */
.s-button--outline {
  @apply border bg-transparent;
}

.s-button--dashed {
  @apply border border-dashed;
}

.s-button--text {
  @apply bg-transparent text-white border-none hover:(bg-transparent text-primary);
}

.s-button--ghost {
  @apply bg-transparent text-white;
  @apply border-transparent;
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

/* Outline + Type Text Color */
.s-button--outline-primary {
  @apply text-primary hover:(bg-primary/30);
}

.s-button--outline-success {
  @apply text-status.success hover:(bg-status.success/30);
}

.s-button--outline-warning {
  @apply text-status.warning hover:(bg-status.warning/30);
}

.s-button--outline-danger {
  @apply text-status.danger hover:(bg-status.danger/30);
}

.s-button--outline-info {
  @apply text-status.info hover:(bg-status.info/30);
}
</style>
