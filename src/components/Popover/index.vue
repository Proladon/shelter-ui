<script setup lang="ts">
import {
  PopoverArrow,
  // PopoverClose,
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
} from 'reka-ui'
import type { PopoverProps, PopoverEmits } from './types'
// import { IconX } from '@tabler/icons-vue'

defineOptions({
  name: 'SHPopover',
})

// Props are used in the template
withDefaults(defineProps<PopoverProps>(), {
  defaultOpen: undefined,
  open: undefined,
  modal: false,
  side: 'top',
  sideOffset: 5,
  align: 'center',
  alignOffset: 0,
  disabled: false,
  arrow: true,
})

const emit = defineEmits<PopoverEmits>()

const handleOpenChange = (value: boolean) => {
  emit('update:open', value)
  emit('openChange', value)
}
</script>

<template>
  <PopoverRoot
    :default-open="defaultOpen"
    :open="open"
    :modal="modal"
    @update:open="handleOpenChange"
  >
    <PopoverTrigger :disabled="disabled" class="s-popover-trigger">
      <slot name="trigger"></slot>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        :side="side"
        :side-offset="sideOffset"
        :align="align"
        :align-offset="alignOffset"
        class="s-popover-content"
      >
        <div class="s-popover-body">
          <slot></slot>
        </div>
        <!-- <slot name="close">
          <PopoverClose class="s-popover-close" aria-label="Close">
            <IconX :size="14" />
          </PopoverClose>
        </slot> -->
        <PopoverArrow v-if="arrow" class="s-popover-arrow" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style lang="scss" scoped>
:deep(.s-popover-content) {
  @apply rounded-md py-5 px-5 bg-bg.primary text-text.primary shadow-lg;
  @apply z-50 outline-none;
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state='open'][data-side='top'] {
    animation-name: slideDownAndFade;
  }

  &[data-state='open'][data-side='right'] {
    animation-name: slideLeftAndFade;
  }

  &[data-state='open'][data-side='bottom'] {
    animation-name: slideUpAndFade;
  }

  &[data-state='open'][data-side='left'] {
    animation-name: slideRightAndFade;
  }
}
:deep(.s-popover-trigger) {
  @apply inline-flex items-center justify-center h-[35px] w-[35px] rounded-full cursor-pointer;
}
:deep(.s-popover-trigger:disabled) {
  @apply cursor-not-allowed opacity-50;
}

:deep(.s-popover-body) {
  @apply w-full text-text-base;
}

:deep(.s-popover-close) {
  @apply text-lg leading-none font-semibold;
  @apply absolute top-[5px] right-[5px] inline-flex items-center justify-center h-6 w-6 rounded-full;
  @apply text-text-base hover:bg-bg-secondary transition-colors cursor-pointer;
  @apply focus:(outline-none);
}

:deep(.s-popover-arrow) {
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
