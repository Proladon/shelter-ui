<script setup lang="ts">
import { ref } from 'vue'
import type { EditableAreaProps, EditableAreaEmits } from './types'
import { IconCheck, IconPencil } from '@tabler/icons-vue'
import { SHSpin } from '@/index'

defineOptions({
  name: 'SHEditableArea',
})

const props = withDefaults(defineProps<EditableAreaProps>(), {
  editable: true,
})

const emit = defineEmits<EditableAreaEmits>()

const editing = ref(false)
const loading = ref(false)

const handleEdit = async () => {
  if (loading.value) return
  if (props.editable) {
    // 如果原本是編輯狀態，則先執行 updateFn 後切換到檢視模式
    if (editing.value) {
      if (props.updateFn) {
        loading.value = true
        await props.updateFn()
        loading.value = false
      }
      emit('done')
      editing.value = false
    } else {
      // 切換到編輯模式
      editing.value = true
      emit('edit')
    }
  }
}
</script>

<template>
  <div
    class="sh-editable-area"
    :class="{
      'sh-editable-area--editable': editable,
      'sh-editable-area--not-editable': !editable,
      'sh-editable-area--active': editing,
      'sh-editable-area--loading': loading,
    }"
  >
    <button
      class="sh-editable-area__edit-btn"
      :class="{
        'sh-editable-area__edit-btn--disabled': !editable,
        'sh-editable-area__edit-btn--active': editing,
      }"
      @click="handleEdit"
      aria-label="edit"
      size="small"
    >
      <IconPencil v-if="!loading && !editing" :size="18" />
      <IconCheck v-if="!loading && editing" :size="18" />
      <SHSpin v-if="loading" :size="18" />
    </button>
    <div class="sh-editable-area__content">
      <slot :editing="editing" :loading="loading"></slot>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.sh-editable-area {
  @apply relative rounded-md transition-all duration-300;
  @apply border border-border.base border-solid;
  @apply overflow-hidden;
}

.sh-editable-area--active {
  @apply border-primary;
}

.sh-editable-area--editable:not(.sh-editable-area--active) {
  @apply hover:(border-border.primary);
}

.sh-editable-area--not-editable {
  @apply cursor-default opacity-50;
}

.sh-editable-area__edit-btn {
  @apply absolute top-0 right-0;
  @apply inline-flex items-center justify-center;
  @apply text-text.primary.darken;
  @apply bg-border.base outline-none;
  @apply rounded-bl-[6px] z-1;
  @apply py-[3px] px-[8px];
  @apply hover:(brightness-110) active:(brightness-90);
}

.sh-editable-area__edit-btn--disabled {
  @apply opacity-40 cursor-not-allowed;
}

.sh-editable-area__edit-btn--active {
  @apply text-primary;
}

.sh-editable-area__content {
  @apply p-3;
}

.sh-editable-area--loading {
  @apply pointer-events-none select-none opacity-70;
}
</style>
