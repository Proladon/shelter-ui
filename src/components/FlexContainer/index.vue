<template>
  <div class="flex-layout" :style="computedStyle">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
interface IFlexLayoutProps {
  align?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  gap?: number
  col?: boolean
  wrap?: boolean
}

const props = withDefaults(defineProps<IFlexLayoutProps>(), {
  gap: 0,
  col: false,
})

const alignMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
}

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
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
    style.gap = `${props.gap}px`
  }
  if (props.wrap) {
    style.flexWrap = 'wrap'
  }
  return style
})
</script>

<style scoped>
.flex-layout {
  width: 100%;
  box-sizing: border-box;
}
</style>
