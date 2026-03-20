<template>
  <div
    class="sh-border-container"
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

<style lang="postcss" scoped>
.sh-border-container {
  @apply relative box-border border-solid border-border.base transition-all duration-300 ease-in-out;
  /* Default styles */
  @apply border-text-base-fade bg-background-base;
}

.sh-border-container.type-primary {
  @apply border-primary;
}

.sh-border-container.type-success {
  @apply border-status-success;
}

.sh-border-container.type-warning {
  @apply border-status-warning;
}

.sh-border-container.type-danger {
  @apply border-status-danger;
}

.sh-border-container.type-info {
  @apply border-status-info;
}

.sh-border-container.with-shadow {
  @apply shadow-md;
}

.sh-border-container.with-shadow.type-primary {
  @apply shadow-primary-fade;
}

.sh-border-container.with-shadow.type-success {
  @apply shadow-status-success-fade;
}

.sh-border-container.with-shadow.type-warning {
  @apply shadow-status-warning-fade;
}

.sh-border-container.with-shadow.type-danger {
  @apply shadow-status-danger-fade;
}

.sh-border-container.with-shadow.type-info {
  @apply shadow-status-info-fade;
}

.sh-border-container.is-transparent {
  @apply bg-transparent;
}

.sh-border-container.is-disabled {
  @apply opacity-50 cursor-not-allowed;
  @apply pointer-events-none select-none;
}

.sh-border-container__content {
  @apply w-full h-full;
}
</style>
