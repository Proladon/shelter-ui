<template>
  <SplitterResizeHandle
    v-bind="rootProps"
    class="sh-splitter-resize-handle"
    :class="{
      'sh-splitter-resize-handle--with-handle': showHandle,
      'sh-splitter-resize-handle--visible': visable,
    }"
  >
    <slot />
  </SplitterResizeHandle>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue'
import { SplitterResizeHandle, useForwardPropsEmits } from 'reka-ui'
import type { SplitterResizeHandleCustomProps } from './types'

const props = withDefaults(defineProps<SplitterResizeHandleCustomProps>(), {
  showHandle: true,
  visable: false,
  color: 'var(--sh-secondary)',
  hoverColor: 'var(--sh-secondary)',
  dragColor: 'var(--sh-secondary)',
})

const emits = defineEmits<{
  dragging: [isDragging: boolean]
}>()

const rootProps = useForwardPropsEmits(props, emits)

const showHandle = computed(() => (props as any).showHandle)

const visable = computed(() => {
  return (props as any).visable
})

const handleStyle = computed(() => {
  return {
    default: props.visable ? props.color : 'transparent',
    hover: props.hoverColor || props.color,
    drag: props.dragColor || props.color,
  }
})

// orientation is provided by parent but not required directly here
</script>

<style lang="postcss">
.sh-splitter-resize-handle {
  @apply relative flex items-center justify-center bg-transparent;

  &:hover {
    @apply bg-primary;
  }

  &:focus-visible {
    @apply outline-none ring-2 ring-blue-500;
  }
}

.sh-splitter-resize-handle[data-orientation='horizontal'] {
  @apply w-[2px] cursor-col-resize;
}

.sh-splitter-resize-handle[data-orientation='vertical'] {
  @apply h-[2px] cursor-row-resize;
}

/* 拖拽指示器 */
.sh-splitter-resize-handle__indicator {
  @apply flex items-center justify-center text-gray-400;
}

.sh-splitter-resize-handle {
  background-color: v-bind(handleStyle.default);
}

/* 狀態樣式 */
.sh-splitter-resize-handle[data-state='drag'] {
  background-color: v-bind(handleStyle.drag);
}

.sh-splitter-resize-handle[data-state='hover'] {
  background-color: v-bind(handleStyle.hover);
}

.sh-splitter-resize-handle[data-disabled] {
  @apply opacity-50 cursor-not-allowed;

  &:hover {
    @apply bg-transparent;
  }
}
</style>
