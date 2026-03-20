<template>
  <div
    class="sh-base-container"
    :class="[
      {
        'with-shadow': shadow,
        'is-disabled': disabled,
      },
    ]"
    :style="{
      width: typeof width === 'number' ? `${width}px` : width,
      height: typeof height === 'number' ? `${height}px` : height,
    }"
    @click="handleClick"
  >
    <div class="sh-base-container__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BaseContainerProps, BaseContainerEmits } from './types'

const props = withDefaults(defineProps<BaseContainerProps>(), {
  width: 'auto',
  height: 'auto',
  shadow: false,
  disabled: false,
})

const emit = defineEmits<BaseContainerEmits>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled) return
  emit('click', event)
}
</script>

<style lang="postcss" scoped>
.sh-base-container {
  @apply relative box-border border border-solid transition-all duration-300 ease-in-out;
  @apply border-border.base bg-bg.primary rounded-sh-md p-4;
}

.sh-base-container.with-shadow {
  @apply shadow-md;
}

.sh-base-container.is-disabled {
  @apply opacity-50 cursor-not-allowed;
  @apply pointer-events-none select-none;
}

.sh-base-container__content {
  @apply w-full h-full;
}
</style>
