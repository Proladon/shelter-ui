<template>
  <SplitterGroup
    v-bind="$attrs"
    :variant="variant"
    :gap="gap"
    :direction="direction"
    @layout="$emit('layout', $event)"
  >
    <slot />
  </SplitterGroup>
</template>

<script setup lang="ts">
import SplitterGroup from './SplitterGroup.vue'
import type { SplitterGroupCustomProps } from './types'

interface SplitterProps extends SplitterGroupCustomProps {
  direction: 'horizontal' | 'vertical'
}

defineProps<SplitterProps>()

defineEmits<{
  layout: [val: number[]]
}>()
</script>

<style lang="postcss">
/* 基本樣式已在各個子組件中定義 */
</style>
