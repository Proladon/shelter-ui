<template>
  <SplitterGroup v-bind="rootProps">
    <slot />
  </SplitterGroup>
</template>

<script setup lang="ts">
import { useForwardPropsEmits } from 'reka-ui'
import SplitterGroup from './SplitterGroup.vue'
import type { SplitterProps } from './types'

const props = defineProps<SplitterProps>()

const emits = defineEmits<{
  layout: [val: number[]]
}>()

const rootProps = useForwardPropsEmits(props, emits)
</script>
