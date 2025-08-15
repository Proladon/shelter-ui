<template>
  <SplitterPanel v-bind="rootProps" class="sh-splitter-panel">
    <slot />
  </SplitterPanel>
</template>

<script setup lang="ts">
import { SplitterPanel, useForwardPropsEmits } from 'reka-ui'
import type { SplitterPanelCustomProps } from './types'

const props = withDefaults(defineProps<SplitterPanelCustomProps>(), {
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

/* 狀態樣式 */
.sh-splitter-panel[data-state='collapsed'] {
  @apply opacity-80;
}

.sh-splitter-panel[data-state='expanded'] {
  @apply opacity-100;
}
</style>
