<template>
  <SplitterResizeHandle
    v-bind="rootProps"
    class="sh-splitter-resize-handle"
    :class="[
      `sh-splitter-resize-handle--${variant}`,
      {
        'sh-splitter-resize-handle--with-handle': showHandle,
      },
    ]"
  >
    <slot>
      <div v-if="showHandle" class="sh-splitter-resize-handle__indicator">
        <IconGripVertical
          v-if="orientation === 'horizontal'"
          :size="16"
          class="sh-splitter-resize-handle__icon"
        />
        <IconGripHorizontal
          v-else
          :size="16"
          class="sh-splitter-resize-handle__icon"
        />
      </div>
    </slot>
  </SplitterResizeHandle>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import { SplitterResizeHandle, useForwardPropsEmits } from 'reka-ui'
import { IconGripVertical, IconGripHorizontal } from '@tabler/icons-vue'
import type { SplitterResizeHandleCustomProps } from './types'

const props = withDefaults(defineProps<SplitterResizeHandleCustomProps>(), {
  variant: 'default',
  showHandle: true,
})

const emits = defineEmits<{
  dragging: [isDragging: boolean]
}>()

const rootProps = useForwardPropsEmits(props, emits)

// 從父級 SplitterGroup 獲取方向信息
const orientation = inject('splitterOrientation', 'horizontal')
</script>

<style lang="postcss">
.sh-splitter-resize-handle {
  @apply relative flex items-center justify-center bg-transparent;

  &:hover {
    @apply bg-gray-100;
  }

  &:focus-visible {
    @apply outline-none ring-2 ring-blue-500;
  }
}

.sh-splitter-resize-handle[data-orientation='horizontal'] {
  @apply w-2 cursor-col-resize;
}

.sh-splitter-resize-handle[data-orientation='vertical'] {
  @apply h-2 cursor-row-resize;
}

/* 變體樣式 */
.sh-splitter-resize-handle--default {
  @apply border-gray-200;
}

.sh-splitter-resize-handle[data-orientation='horizontal'].sh-splitter-resize-handle--default {
  @apply border-l border-r;
}

.sh-splitter-resize-handle[data-orientation='vertical'].sh-splitter-resize-handle--default {
  @apply border-t border-b;
}

.sh-splitter-resize-handle--thick {
  @apply bg-gray-200;
}

.sh-splitter-resize-handle[data-orientation='horizontal'].sh-splitter-resize-handle--thick {
  @apply w-4;
}

.sh-splitter-resize-handle[data-orientation='vertical'].sh-splitter-resize-handle--thick {
  @apply h-4;
}

.sh-splitter-resize-handle--invisible {
  @apply bg-transparent border-transparent;

  &:hover {
    @apply bg-gray-100/50;
  }
}

/* 拖拽指示器 */
.sh-splitter-resize-handle__indicator {
  @apply flex items-center justify-center text-gray-400;
}

.sh-splitter-resize-handle__icon {
  @apply transition-colors duration-150;
}

.sh-splitter-resize-handle:hover .sh-splitter-resize-handle__icon {
  @apply text-gray-600;
}

/* 狀態樣式 */
.sh-splitter-resize-handle[data-state='drag'] {
  @apply bg-blue-500/20;

  .sh-splitter-resize-handle__icon {
    @apply text-blue-600;
  }
}

.sh-splitter-resize-handle[data-state='hover'] {
  @apply bg-gray-100;
}

.sh-splitter-resize-handle[data-disabled] {
  @apply opacity-50 cursor-not-allowed;

  &:hover {
    @apply bg-transparent;
  }
}
</style>
