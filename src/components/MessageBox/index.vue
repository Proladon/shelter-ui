<template>
  <div class="sh-message-box" :class="[`type-${type}`]">
    <span class="sh-message-box__icon">
      <slot name="icon">
        <component :is="iconComponent" />
      </slot>
    </span>
    <div class="sh-message-box__content">
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

<style lang="postcss" scoped>
.sh-message-box {
  @apply flex items-start gap-3 p-4 rounded-md border bg-bg.primary.fade;
  @apply text-text.base.lighten;
  @apply w-full;
}

.sh-message-box.type-info {
  @apply bg-primary.fade;
  @apply border border-solid border-primary;
}
.sh-message-box.type-info .sh-message-box__icon {
  @apply text-primary;
}

.sh-message-box.type-danger {
  @apply bg-status.danger.fade;
  @apply border border-solid border-status.danger;
}
.sh-message-box.type-danger .sh-message-box__icon {
  @apply text-status.danger;
}

.sh-message-box.type-success {
  @apply bg-status.success.fade;
  @apply border border-solid border-status.success;
}
.sh-message-box.type-success .sh-message-box__icon {
  @apply text-status.success;
}

.sh-message-box.type-warning {
  @apply bg-status.warning.fade;
  @apply border border-solid border-status.warning;
}
.sh-message-box.type-warning .sh-message-box__icon {
  @apply text-status.warning;
}

.sh-message-box.type-default {
  @apply bg-status.info.fade;
  @apply border border-solid border-status.info;
}
.sh-message-box.type-default .sh-message-box__icon {
  @apply text-status.info;
}

.sh-message-box__icon {
  @apply flex-shrink-0 flex items-center justify-center w-6 h-6 mt-0.5;
  font-size: 20px;
}

.sh-message-box__content {
  @apply flex-1 min-w-0;
}
</style>
