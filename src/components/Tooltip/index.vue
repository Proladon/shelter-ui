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
  defaultOpen: undefined,
  open: undefined,
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
  emit('update:open', value)
  emit('openChange', value)
}
</script>

<template>
  <TooltipProvider>
    <TooltipRoot
      :default-open="defaultOpen"
      :open="open"
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

<style lang="scss" scoped>
:deep(.sh-tooltip-content) {
  @apply rounded-md py-2 px-3 bg-bg.primary text-text.primary shadow-lg;
  @apply z-50 outline-none text-sm;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state='delayed-open'][data-side='top'] {
    animation-name: slideDownAndFade;
  }

  &[data-state='delayed-open'][data-side='right'] {
    animation-name: slideLeftAndFade;
  }

  &[data-state='delayed-open'][data-side='bottom'] {
    animation-name: slideUpAndFade;
  }

  &[data-state='delayed-open'][data-side='left'] {
    animation-name: slideRightAndFade;
  }
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

@keyframes slideUpAndFade {
  from {
    opacity: 0;
    transform: translateY(2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideRightAndFade {
  from {
    opacity: 0;
    transform: translateX(-2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideDownAndFade {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideLeftAndFade {
  from {
    opacity: 0;
    transform: translateX(2px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
