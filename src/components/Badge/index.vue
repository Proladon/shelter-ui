<template>
  <div class="sh-badge-wrapper">
    <slot name="default"></slot>
    <div
      v-if="show"
      class="sh-badge -translate-y-1/2"
      :class="[{ 'is-dot': isDot }, positionClass]"
      :style="badgeStyle"
      @click="handleClick"
    >
      <slot name="content" v-if="!isDot && $slots.content"> </slot>
      <template v-else-if="!isDot && (content || content === 0)">
        {{ content }}
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { BadgeProps, BadgeEmits } from './types'

defineOptions({
  name: 'SHBadge',
})

const props = withDefaults(defineProps<BadgeProps>(), {
  value: '',
  color: '',
  textColor: '',
  isDot: false,
  max: Infinity,
  show: true,
  position: 'right',
  size: 12,
})

const emit = defineEmits<BadgeEmits>()

const content = computed(() => {
  if (typeof props.value === 'number' && typeof props.max === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value
  }
  return props.value
})

const formatUnit = (value: string | number) => {
  return typeof value === 'number' ? `${value}px` : value
}

const badgeStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.backgroundColor = props.color
  }
  if (props.textColor) {
    style.color = props.textColor
  }

  if (props.size) {
    style.fontSize = `${props.size}px`
  }

  if (props.offsetTop !== undefined) {
    style.top = formatUnit(props.offsetTop)
  }
  if (props.offsetBottom !== undefined) {
    style.bottom = formatUnit(props.offsetBottom)
    if (props.offsetTop === undefined) {
      style.top = 'auto'
    }
  }

  if (props.offsetLeft !== undefined) {
    style.left = formatUnit(props.offsetLeft)
    if (props.offsetRight === undefined) {
      style.right = 'auto'
    }
  }
  if (props.offsetRight !== undefined) {
    style.right = formatUnit(props.offsetRight)
    if (props.offsetLeft === undefined) {
      style.left = 'auto'
    }
  }

  return style
})

const positionClass = computed(() => {
  switch (props.position) {
    case 'left':
      return 'left-0 -translate-x-1/2'
    case 'center':
      return 'left-1/2 -translate-x-1/2'
    case 'right':
    default:
      return 'right-0 translate-x-1/2'
  }
})

const handleClick = (event: MouseEvent) => {
  emit('click', event)
}
</script>

<style lang="postcss" scoped>
.sh-badge-wrapper {
  @apply relative inline-flex align-middle;
}

.sh-badge {
  @apply rounded-full bg-status-danger text-white font-bold;
  @apply absolute top-0;
  @apply flex items-center justify-center whitespace-nowrap z-10;
  @apply px-2 py-1 min-w-[1.5rem] h-[1.5rem];

  &.is-dot {
    @apply w-2 h-2 p-0 min-w-0 rounded-full;
  }
}
</style>
