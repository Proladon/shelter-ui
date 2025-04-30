<template>
  <div
    class="s-border-container"
    :class="[
      `type-${type}`,
      {
        'with-shadow': shadow,
        'is-transparent': transparent,
        'is-disabled': disabled,
      },
    ]"
    :style="{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
      borderWidth:
        typeof borderWidth === 'number' ? `${borderWidth}px` : borderWidth,
      borderRadius:
        typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      padding: typeof padding === 'number' ? `${padding}px` : padding,
    }"
    @click="handleClick"
  >
    <div class="s-border-container__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BorderContainerProps, BorderContainerEmits } from './types'

const props = withDefaults(defineProps<BorderContainerProps>(), {
  type: 'default',
  width: 'auto',
  height: 'auto',
  borderWidth: 1,
  borderRadius: 6,
  padding: 16,
  shadow: false,
  transparent: false,
  disabled: false,
})

const emit = defineEmits<BorderContainerEmits>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return
  emit('click', event)
}
</script>

<style lang="scss" scoped>
.s-border-container {
  @apply relative box-border border-solid border-border.base transition-all duration-300 ease-in-out;

  /* Default styles */
  @apply border-text-base-fade bg-background-base;

  &.type-primary {
    @apply border-primary;
  }

  &.type-success {
    @apply border-status-success;
  }

  &.type-warning {
    @apply border-status-warning;
  }

  &.type-danger {
    @apply border-status-danger;
  }

  &.type-info {
    @apply border-status-info;
  }

  &.with-shadow {
    @apply shadow-md;

    &.type-primary {
      @apply shadow-primary-fade;
    }

    &.type-success {
      @apply shadow-status-success-fade;
    }

    &.type-warning {
      @apply shadow-status-warning-fade;
    }

    &.type-danger {
      @apply shadow-status-danger-fade;
    }

    &.type-info {
      @apply shadow-status-info-fade;
    }
  }

  &.is-transparent {
    @apply bg-transparent;
  }

  &.is-disabled {
    @apply opacity-50 cursor-not-allowed;
    @apply pointer-events-none select-none;
  }

  &__content {
    @apply w-full h-full;
  }
}
</style>
