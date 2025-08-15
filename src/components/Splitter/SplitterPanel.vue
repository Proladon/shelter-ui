<template>
  <SplitterPanel
    v-bind="rootProps"
    class="sh-splitter-panel"
    :class="[
      `sh-splitter-panel--${variant}`,
      `sh-splitter-panel--padding-${padding}`,
    ]"
  >
    <slot />
  </SplitterPanel>
</template>

<script setup lang="ts">
import { SplitterPanel, useForwardPropsEmits } from 'reka-ui'
import type { SplitterPanelCustomProps } from './types'

const props = withDefaults(defineProps<SplitterPanelCustomProps>(), {
  variant: 'default',
  padding: 'default',
})

const emits = defineEmits<{
  collapse: []
  expand: []
  resize: [size: number, prevSize: number]
}>()

const rootProps = useForwardPropsEmits(props, emits)
</script>

<style lang="postcss">
.sh-splitter-panel {
  @apply relative;
}

.sh-splitter-panel--default {
  @apply bg-transparent;
}

.sh-splitter-panel--bordered {
  @apply border border-gray-200 bg-white;
}

.sh-splitter-panel--card {
  @apply bg-white border border-gray-200 rounded-lg shadow-sm;
}

/* 內距變化 */
.sh-splitter-panel--padding-none {
  @apply p-0;
}

.sh-splitter-panel--padding-small {
  @apply p-2;
}

.sh-splitter-panel--padding-default {
  @apply p-4;
}

.sh-splitter-panel--padding-large {
  @apply p-6;
}

/* 狀態樣式 */
.sh-splitter-panel[data-state='collapsed'] {
  @apply opacity-80;
}

.sh-splitter-panel[data-state='expanded'] {
  @apply opacity-100;
}
</style>
