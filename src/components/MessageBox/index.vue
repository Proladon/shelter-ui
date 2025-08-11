<template>
  <div class="s-message-box" :class="[`type-${type}`]">
    <span class="s-message-box__icon">
      <slot name="icon">
        <component :is="iconComponent" />
      </slot>
    </span>
    <div class="s-message-box__content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MessageBoxProps } from './types'
import { messageBoxIconMap } from './_icon-map'

defineOptions({
  name: 'SHMessageBox',
})

const props = withDefaults(defineProps<MessageBoxProps>(), {
  type: 'info',
  icon: undefined,
})

const iconComponent = computed(() => {
  if (props.icon && typeof props.icon === 'object') return props.icon
  return messageBoxIconMap[props.type ?? 'info']
})
</script>

<style lang="scss" scoped>
.s-message-box {
  @apply flex items-start gap-3 p-4 rounded-md border bg-bg.primary.fade;
  @apply text-text-base;
  @apply w-full;

  &.type-info {
    @apply bg-primary.fade;
    @apply border-[1px] border-solid border-primary;
  }
  &.type-danger {
    @apply bg-status.danger.fade;
    @apply border-[1px] border-solid border-status.danger;
  }
  &.type-success {
    @apply bg-status.success.fade;
    @apply border-[1px] border-solid border-status.success;
  }
  &.type-warning {
    @apply bg-status.warning.fade;
    @apply border-[1px] border-solid border-status.warning;
  }
  &.type-normal {
    @apply bg-status.info.fade;
    @apply border-[1px] border-solid border-status.info;
  }

  &__icon {
    @apply flex-shrink-0 flex items-center justify-center w-6 h-6 mt-0.5;
    font-size: 20px;
  }
  &__content {
    @apply flex-1 min-w-0;
  }
}
</style>
