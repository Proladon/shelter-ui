<template>
  <DialogRoot
    :open="open"
    :defaultOpen="defaultOpen"
    :modal="modal"
    @update:open="handleOpenChange"
  >
    <slot name="trigger" :Dialog="DialogTrigger"></slot>
    <DialogPortal>
      <DialogOverlay class="s-dialog-overlay" />
      <DialogContent
        class="s-dialog"
        :class="[
          `type-${type}`,
          {
            'with-shadow': true,
          },
        ]"
        :style="{
          width: typeof width === 'number' ? `${width}px` : width,
        }"
      >
        <div class="s-dialog__header" :class="`type-${type}`">
          <DialogTitle class="s-dialog__title">
            <slot name="title">{{ props.title }}</slot>
          </DialogTitle>
          <DialogClose class="s-dialog__close" aria-label="Close">
            <div class="s-dialog__close-icon">×</div>
          </DialogClose>
        </div>

        <DialogDescription class="s-dialog__description">
          <slot name="description"></slot>
        </DialogDescription>

        <div class="s-dialog__content">
          <slot></slot>
        </div>

        <div class="s-dialog__footer">
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
})

const emit = defineEmits<DialogEmits>()

const handleOpenChange = (value: boolean) => {
  emit('update:open', value)
  emit('openChange', value)
}
</script>

<style scoped>
.s-dialog-overlay {
  @apply fixed inset-0 z-50 backdrop-blur-sm;
  background-color: rgba(0, 0, 0, 0.4);
}

.s-dialog {
  @apply fixed inset-0 m-auto z-99;
  @apply bg-bg.primary rounded-md;
  @apply p-6 shadow-md;
  @apply focus:outline-none;
  @apply overflow-y-auto;
  @apply h-fit;
}

/* Type border variants */
.s-dialog.type-primary {
  @apply border-primary border-2;
}
.s-dialog.type-success {
  @apply border-status.success border-2;
}
.s-dialog.type-warning {
  @apply border-status.warning border-2;
}
.s-dialog.type-danger {
  @apply border-status.danger border-2;
}
.s-dialog.type-info {
  @apply border-status.info border-2;
}

/* Colored glow shadows */
.s-dialog.with-shadow.type-primary {
  box-shadow: 0 0 30px var(--sh-primary-fade);
}
.s-dialog.with-shadow.type-success {
  box-shadow: 0 0 30px var(--sh-status-success-fade);
}
.s-dialog.with-shadow.type-warning {
  box-shadow: 0 0 30px var(--sh-status-warning-fade);
}
.s-dialog.with-shadow.type-danger {
  box-shadow: 0 0 30px var(--sh-status-danger-fade);
}
.s-dialog.with-shadow.type-info {
  box-shadow: 0 0 30px var(--sh-status-info-fade);
}

/* Header */
.s-dialog__header {
  @apply flex items-center justify-between mb-4 pb-3;
  @apply border-b border-border.base;
}
.s-dialog__header.type-primary {
  @apply border-primary;
}
.s-dialog__header.type-success {
  @apply border-status.success;
}
.s-dialog__header.type-warning {
  @apply border-status.warning;
}
.s-dialog__header.type-danger {
  @apply border-status.danger;
}
.s-dialog__header.type-info {
  @apply border-status.info;
}

/* Title */
.s-dialog__title {
  @apply text-lg font-semibold text-text.base;
}
.type-primary .s-dialog__title {
  @apply text-primary;
}
.type-success .s-dialog__title {
  @apply text-status.success;
}
.type-warning .s-dialog__title {
  @apply text-status.warning;
}
.type-danger .s-dialog__title {
  @apply text-status.danger;
}
.type-info .s-dialog__title {
  @apply text-status.info;
}

/* Close button */
.s-dialog__close {
  @apply inline-flex items-center justify-center rounded-full p-1 w-6 h-6 transition-colors;
  @apply outline-none text-text.base hover:text-text.primary;
}
.s-dialog__close-icon {
  @apply text-lg leading-none font-semibold;
}

/* Description */
.s-dialog__description {
  @apply text-sm text-text.primary mb-4;
}

/* Content */
.s-dialog__content {
  @apply mb-6;
}

/* Footer */
.s-dialog__footer {
  @apply flex justify-end gap-2 mt-auto pt-3 border-t border-border.base;
}
.type-primary .s-dialog__footer {
  @apply border-primary;
}
.type-success .s-dialog__footer {
  @apply border-status.success;
}
.type-warning .s-dialog__footer {
  @apply border-status.warning;
}
.type-danger .s-dialog__footer {
  @apply border-status.danger;
}
.type-info .s-dialog__footer {
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

.s-dialog-overlay[data-state='open'],
.s-dialog[data-state='open'] {
  animation: fadeIn 300ms ease-out;
}

.s-dialog-overlay[data-state='closed'],
.s-dialog[data-state='closed'] {
  animation: fadeOut 300ms ease-in;
}
</style>
