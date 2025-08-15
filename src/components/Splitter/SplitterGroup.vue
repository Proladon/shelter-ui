<template>
  <SplitterGroup
    v-bind="rootProps"
    class="sh-splitter-group"
    :class="[
      `sh-splitter-group--${variant}`,
      `sh-splitter-group--${direction}`,
    ]"
    :style="gapStyle"
  >
    <slot />
  </SplitterGroup>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SplitterGroup, useForwardPropsEmits } from 'reka-ui'
import type { SplitterGroupCustomProps } from './types'

const props = withDefaults(defineProps<SplitterGroupCustomProps>(), {
  variant: 'default',
  gap: 0,
})

const emits = defineEmits<{
  layout: [val: number[]]
}>()

const rootProps = useForwardPropsEmits(props, emits)

const gapStyle = computed(() => {
  if (props.gap > 0) {
    return {
      gap: `${props.gap}px`,
    }
  }
  return {}
})
</script>

<style lang="postcss">
.sh-splitter-group {
  @apply w-full h-full;
}

.sh-splitter-group--default {
  @apply bg-transparent;
}

.sh-splitter-group--bordered {
  @apply border border-gray-200 rounded-lg overflow-hidden;
}

.sh-splitter-group--card {
  @apply bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden;
}

.sh-splitter-group--horizontal {
  @apply flex-row;
}

.sh-splitter-group--vertical {
  @apply flex-col;
}
</style>
