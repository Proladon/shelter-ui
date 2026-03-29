<template>
  <SHDialog
    :open="open"
    :modal="modal"
    :type="type"
    :width="400"
    content-class="sh-alert-dialog"
    @openChange="handleOpenChange"
  >
    <template #trigger>
      <slot name="trigger" />
    </template>

    <!-- Icon inline with title text, matching Dialog's header row -->
    <template #title>
      <div class="sh-alert-dialog__title-inner">
        <span class="sh-alert-dialog__icon-wrapper" :class="`type-${type}`">
          <component :is="iconComponent" :size="18" />
        </span>
        <slot name="title">{{ title }}</slot>
      </div>
    </template>

    <template #description>
      <slot name="description">{{ description }}</slot>
    </template>

    <!-- Footer: Cancel + Confirm -->
    <template #footer>
      <slot name="footer">
        <button
          class="sh-interactive sh-outline-default sh-size-md sh-rounded-md border border-solid"
          @click="handleCancel"
        >
          {{ cancelText }}
        </button>

        <button
          :class="[
            'sh-interactive sh-rounded-md border border-solid sh-size-md',
            `sh-fill-${type}`,
            { 'sh-disabled': confirmLoading },
          ]"
          :disabled="confirmLoading"
          @click="handleConfirm"
        >
          <Spinner v-if="confirmLoading" class="mr-1.5" :size="14" />
          {{ confirmText }}
        </button>
      </slot>
    </template>
  </SHDialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SHDialog from '@/components/Dialog/index.vue'
import Spinner from '@/components/Spinner/index.vue'
import type { AlertDialogProps, AlertDialogEmits } from './types'
import { alertDialogIconMap } from './_icon-map'

defineOptions({ name: 'SHAlertDialog' })

const props = withDefaults(defineProps<AlertDialogProps>(), {
  type: 'danger',
  modal: true,
  open: undefined,
  title: undefined,
  description: undefined,
  confirmText: '確認',
  cancelText: '取消',
  confirmLoading: false,
})

const emit = defineEmits<AlertDialogEmits>()

const iconComponent = computed(() => alertDialogIconMap[props.type ?? 'danger'])

// openChange fires when dialog is dismissed via Escape / external means — treat as cancel
const handleOpenChange = (value: boolean) => {
  emit('update:open', value)
  if (!value) emit('cancel')
}

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('update:open', false)
  emit('cancel')
}
</script>

<!--
  Non-scoped styles are required because Dialog teleports its content via Portal
  to <body>, outside this component's DOM subtree, so scoped :deep() cannot reach it.
  Selectors are prefixed with .sh-alert-dialog to avoid polluting global scope.
-->
<style>
/* Collapse the otherwise-empty default content area */
.sh-alert-dialog.sh-dialog .sh-dialog__content {
  display: none;
}

/* Inline icon + title wrapper — matches Dialog's existing flex-row header */
.sh-alert-dialog__title-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--sh-spacing-sm);
}

/* Small inline icon circle */
.sh-alert-dialog__icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.sh-alert-dialog__icon-wrapper.type-danger {
  color: var(--sh-status-danger);
}
.sh-alert-dialog__icon-wrapper.type-warning {
  color: var(--sh-status-warning);
}
.sh-alert-dialog__icon-wrapper.type-info {
  color: var(--sh-status-info);
}
.sh-alert-dialog__icon-wrapper.type-success {
  color: var(--sh-status-success);
}
</style>
