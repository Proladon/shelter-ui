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
  defaultValue: undefined,
  value: undefined,
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
  emit('update:value', value)
}
</script>

<template>
  <PopoverRoot
    :default-open="defaultValue"
    :open="value"
    :modal="modal"
    @update:open="handleOpenChange"
  >
    <PopoverTrigger :disabled="disabled" class="sh-popover-trigger">
      <slot name="trigger"></slot>
    </PopoverTrigger>
    <PopoverPortal>
      <PopoverContent
        :side="side"
        :side-offset="sideOffset"
        :align="align"
        :align-offset="alignOffset"
        class="sh-popover-content"
        @open-auto-focus.prevent
      >
        <div class="sh-popover-body">
          <slot></slot>
        </div>
        <!-- <slot name="close">
          <PopoverClose class="sh-popover-close" aria-label="Close">
            <IconX :size="14" />
          </PopoverClose>
        </slot> -->
        <PopoverArrow v-if="arrow" class="sh-popover-arrow" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style lang="postcss" scoped>
:deep(.sh-popover-content) {
  @apply rounded-md py-5 px-5 bg-bg.primary text-text.base shadow-lg;
  @apply z-[var(--sh-z-popover)] outline-none;
  animation-duration: var(--sh-duration-slow);
  animation-timing-function: var(--sh-ease-enter);
  will-change: transform, opacity;
}

:deep(.sh-popover-content[data-state='open'][data-side='top']) {
  animation-name: sh-slide-down-fade;
}

:deep(.sh-popover-content[data-state='open'][data-side='right']) {
  animation-name: sh-slide-left-fade;
}

:deep(.sh-popover-content[data-state='open'][data-side='bottom']) {
  animation-name: sh-slide-up-fade;
}

:deep(.sh-popover-content[data-state='open'][data-side='left']) {
  animation-name: sh-slide-right-fade;
}

:deep(.sh-popover-trigger) {
  @apply inline-flex items-center justify-center h-[var(--sh-component-size-md)] w-[var(--sh-component-size-md)] rounded-full cursor-pointer;
}
:deep(.sh-popover-trigger:disabled) {
  @apply cursor-not-allowed opacity-50;
}

:deep(.sh-popover-body) {
  @apply w-full text-text.base;
}

:deep(.sh-popover-close) {
  @apply text-lg leading-none font-semibold;
  @apply absolute top-1 right-1 inline-flex items-center justify-center h-6 w-6 rounded-full;
  @apply text-text.base hover:bg-bg.secondary transition-colors cursor-pointer;
  @apply focus:(outline-none);
}

:deep(.sh-popover-arrow) {
  @apply fill-bg.primary;
}
</style>
