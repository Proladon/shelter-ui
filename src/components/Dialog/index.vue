<template>
  <DialogRoot
    :open="open"
    :defaultOpen="defaultOpen"
    :modal="modal"
    @update:open="handleOpenChange"
  >
    <slot name="trigger" :Dialog="DialogTrigger"></slot>
    <DialogPortal>
      <DialogOverlay class="sh-dialog-overlay" />
      <DialogContent
        class="sh-dialog"
        :class="[`type-${type}`, contentClass]"
        :style="{
          width: typeof width === 'number' ? `${width}px` : width,
        }"
      >
        <div class="sh-dialog__header" :class="`type-${type}`">
          <DialogTitle class="sh-dialog__title">
            <slot name="title">{{ props.title }}</slot>
          </DialogTitle>
          <DialogClose
            v-if="!hideClose"
            class="sh-dialog__close"
            aria-label="Close"
          >
            <div class="sh-dialog__close-icon">×</div>
          </DialogClose>
        </div>

        <DialogDescription class="sh-dialog__description">
          <slot name="description"></slot>
        </DialogDescription>

        <div class="sh-dialog__content">
          <slot></slot>
        </div>

        <div class="sh-dialog__footer">
          <slot name="footer"></slot>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from 'reka-ui'
import type { DialogProps, DialogEmits } from './types'

defineOptions({
  name: 'SHDialog',
})

const props = withDefaults(defineProps<DialogProps>(), {
  type: 'default',
  width: 400,
  open: undefined,
  defaultOpen: undefined,
  modal: true,
  title: undefined,
  contentClass: undefined,
  hideClose: false,
})

const emit = defineEmits<DialogEmits>()

const handleOpenChange = (value: boolean) => {
  emit('update:open', value)
  emit('openChange', value)
}
</script>

<style scoped>
.sh-dialog-overlay {
  @apply fixed inset-0 z-50 backdrop-blur-sm;
  background-color: rgba(0, 0, 0, 0.4);
}

.sh-dialog {
  @apply fixed inset-0 m-auto z-99;
  @apply bg-bg.primary rounded-md;
  @apply p-6 shadow-md;
  @apply focus:outline-none;
  @apply overflow-y-auto;
  @apply h-fit;
}

/* Type border variants */
.sh-dialog.type-primary {
  @apply border-primary border-2;
}
.sh-dialog.type-success {
  @apply border-status.success border-2;
}
.sh-dialog.type-warning {
  @apply border-status.warning border-2;
}
.sh-dialog.type-danger {
  @apply border-status.danger border-2;
}
.sh-dialog.type-info {
  @apply border-status.info border-2;
}

/* Header */
.sh-dialog__header {
  @apply flex items-center justify-between mb-4 pb-3;
  @apply border-b border-border.base;
}
.sh-dialog__header.type-primary {
  @apply border-primary;
}
.sh-dialog__header.type-success {
  @apply border-status.success;
}
.sh-dialog__header.type-warning {
  @apply border-status.warning;
}
.sh-dialog__header.type-danger {
  @apply border-status.danger;
}
.sh-dialog__header.type-info {
  @apply border-status.info;
}

/* Title */
.sh-dialog__title {
  @apply text-lg font-semibold text-text.base;
}
.type-primary .sh-dialog__title {
  @apply text-primary;
}
.type-success .sh-dialog__title {
  @apply text-status.success;
}
.type-warning .sh-dialog__title {
  @apply text-status.warning;
}
.type-danger .sh-dialog__title {
  @apply text-status.danger;
}
.type-info .sh-dialog__title {
  @apply text-status.info;
}

/* Close button */
.sh-dialog__close {
  @apply inline-flex items-center justify-center rounded-full p-1 w-6 h-6 transition-colors;
  @apply outline-none text-text.base hover:text-text.primary;
}
.sh-dialog__close-icon {
  @apply text-lg leading-none font-semibold;
}

/* Description */
.sh-dialog__description {
  @apply text-sm text-text.primary mb-4;
}

/* Content */
.sh-dialog__content {
  @apply mb-6;
}

/* Footer */
.sh-dialog__footer {
  @apply flex justify-end gap-2 mt-auto pt-3 border-t border-border.base;
}
.type-primary .sh-dialog__footer {
  @apply border-primary;
}
.type-success .sh-dialog__footer {
  @apply border-status.success;
}
.type-warning .sh-dialog__footer {
  @apply border-status.warning;
}
.type-danger .sh-dialog__footer {
  @apply border-status.danger;
}
.type-info .sh-dialog__footer {
  @apply border-status.info;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.sh-dialog-overlay[data-state='open'],
.sh-dialog[data-state='open'] {
  animation: fadeIn 300ms ease-out;
}

.sh-dialog-overlay[data-state='closed'],
.sh-dialog[data-state='closed'] {
  animation: fadeOut 300ms ease-in;
}
</style>
