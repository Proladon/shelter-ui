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
} from 'radix-vue'
import type { DialogProps, DialogEmits } from './types'

defineOptions({
  name: 'SDialog',
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

<style lang="scss" scoped>
.s-dialog-overlay {
  @apply fixed inset-0 z-50;
  @apply backdrop-blur-sm;
  background-color: rgba(0, 0, 0, 0.4);
}

.s-dialog {
  @apply fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2;
  @apply bg-bg.primary rounded-md shadow-lg;
  @apply p-6 shadow-md;
  @apply focus:outline-none;
  @apply max-h-[85vh] overflow-y-auto;
  @apply min-w-[320px];
  //   animation: contentShow 200ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Type styles - enhanced border styles */
  &.type-primary {
    @apply border-primary border-2;
  }

  &.type-success {
    @apply border-status-success border-2;
  }

  &.type-warning {
    @apply border-status-warning border-2;
  }

  &.type-danger {
    @apply border-status-danger border-2;
  }

  &.type-info {
    @apply border-status-info border-2;
  }

  &.with-shadow {
    &.type-primary {
      @apply shadow-primary-fade;
    }

    &.type-success {
      @apply shadow-status-success-fade;
    }

    &.type-warning {
      @apply shadow-status-warning-fade;
    }

    &.type-danger {
      @apply shadow-status-danger-fade;
    }

    &.type-info {
      @apply shadow-status-info-fade;
    }
  }

  &__header {
    @apply flex items-center justify-between mb-4 pb-3 border-b border-border-base;

    /* Type styles for header */
    &.type-primary {
      @apply border-primary;
    }

    &.type-success {
      @apply border-status-success;
    }

    &.type-warning {
      @apply border-status-warning;
    }

    &.type-danger {
      @apply border-status-danger;
    }

    &.type-info {
      @apply border-status-info;
    }
  }

  &__title {
    @apply text-lg font-semibold text-text-title;

    .type-primary & {
      @apply text-primary;
    }

    .type-success & {
      @apply text-status-success;
    }

    .type-warning & {
      @apply text-status-warning;
    }

    .type-danger & {
      @apply text-status-danger;
    }

    .type-info & {
      @apply text-status-info;
    }
  }

  &__close {
    @apply inline-flex items-center justify-center rounded-full p-1 w-6 h-6 transition-colors;
    @apply outline-none;

    &-icon {
      @apply text-lg leading-none font-semibold;
    }
  }

  &__description {
    @apply text-sm text-text-secondary mb-4;
  }

  &__content {
    @apply mb-6;
  }

  &__footer {
    @apply flex justify-end gap-2 mt-auto pt-3 border-t border-border-base;

    /* Type styles for footer */
    .type-primary & {
      @apply border-primary;
    }

    .type-success & {
      @apply border-status-success;
    }

    .type-warning & {
      @apply border-status-warning;
    }

    .type-danger & {
      @apply border-status-danger;
    }

    .type-info & {
      @apply border-status-info;
    }
  }
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
