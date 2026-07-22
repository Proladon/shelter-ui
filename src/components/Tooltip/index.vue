<script setup lang="ts">
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'reka-ui'
import type { TooltipProps, TooltipEmits } from './types'

defineOptions({
  name: 'SHTooltip',
})

// Props are used in the template
withDefaults(defineProps<TooltipProps>(), {
  defaultValue: undefined,
  value: undefined,
  side: 'top',
  sideOffset: 5,
  align: 'center',
  alignOffset: 0,
  delayDuration: 300,
  disabled: false,
  arrow: true,
})

const emit = defineEmits<TooltipEmits>()

const handleOpenChange = (value: boolean) => {
  emit('update:value', value)
}
</script>

<template>
  <TooltipProvider>
    <TooltipRoot
      :default-open="defaultValue"
      :open="value"
      :delay-duration="delayDuration"
      @update:open="handleOpenChange"
    >
      <TooltipTrigger :disabled="disabled" class="sh-tooltip-trigger">
        <slot name="trigger"></slot>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          :side="side"
          :side-offset="sideOffset"
          :align="align"
          :align-offset="alignOffset"
          class="sh-tooltip-content"
        >
          <slot></slot>
          <TooltipArrow v-if="arrow" class="sh-tooltip-arrow" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>

<style scoped>
:deep(.sh-tooltip-content) {
  @apply rounded-md py-2 px-3 bg-bg.primary text-text.base shadow-lg;
  @apply z-[var(--sh-z-tooltip)] outline-none text-sm;
  animation-duration: var(--sh-duration-slow);
  animation-timing-function: var(--sh-ease-enter);
  will-change: transform, opacity;
}

:deep(.sh-tooltip-content[data-state='delayed-open'][data-side='top']) {
  animation-name: sh-slide-down-fade;
}

:deep(.sh-tooltip-content[data-state='delayed-open'][data-side='right']) {
  animation-name: sh-slide-left-fade;
}

:deep(.sh-tooltip-content[data-state='delayed-open'][data-side='bottom']) {
  animation-name: sh-slide-up-fade;
}

:deep(.sh-tooltip-content[data-state='delayed-open'][data-side='left']) {
  animation-name: sh-slide-right-fade;
}

:deep(.sh-tooltip-trigger) {
  @apply inline-flex cursor-pointer;
}

:deep(.sh-tooltip-trigger:disabled) {
  @apply cursor-not-allowed opacity-50;
}

:deep(.sh-tooltip-arrow) {
  @apply fill-bg.primary;
}
</style>
