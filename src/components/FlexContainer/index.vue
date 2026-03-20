<template>
  <div class="flex-layout" :style="computedStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface FlexContainerProps {
  align?:
    | 'start'
    | 'center'
    | 'end'
    | 'between'
    | 'around'
    | 'evenly'
    | 'flex-end'
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'between'
    | 'around'
    | 'evenly'
    | 'space-between'
    | 'flex-end'
  gap?: number | string
  col?: boolean
  wrap?: boolean
}

const props = withDefaults(defineProps<FlexContainerProps>(), {
  gap: 0,
  col: false,
})

const alignMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'flex-end': 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'flex-end': 'flex-end',
  between: 'space-between',
  'space-between': 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const computedStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.col) {
    style.display = 'flex'
    style.flexDirection = 'column'
  } else {
    style.display = 'flex'
    style.flexDirection = 'row'
  }
  if (props.align) {
    style.alignItems = alignMap[props.align] || 'stretch'
  }
  if (props.justify) {
    style.justifyContent = justifyMap[props.justify] || 'flex-start'
  }
  if (props.gap) {
    style.gap = typeof props.gap === 'number' ? `${props.gap}px` : props.gap
  }
  if (props.wrap) {
    style.flexWrap = 'wrap'
  }
  return style
})
</script>

<style scoped>
.flex-layout {
  width: auto;
  box-sizing: border-box;
}
</style>
