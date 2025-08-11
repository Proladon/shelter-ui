<template>
  <div class="sh-badge-wrapper">
    <slot name="default"></slot>
    <div
      v-if="show"
      class="sh-badge"
      :class="{ 'is-dot': isDot }"
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
})

const emit = defineEmits<BadgeEmits>()

const content = computed(() => {
  if (typeof props.value === 'number' && typeof props.max === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value
  }
  return props.value
})

const badgeStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.color) {
    style.backgroundColor = props.color
  }
  if (props.textColor) {
    style.color = props.textColor
  }
  return style
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
  @apply rounded-full bg-status-danger text-white text-xs font-bold;
  @apply px-2 py-1 absolute top-0 right-0 translate-x-1/2 -translate-y-1/2;
  @apply min-w-[1.5rem] h-[1.5rem] flex items-center justify-center whitespace-nowrap z-10;

  &.is-dot {
    @apply w-2 h-2 p-0 min-w-0 rounded-full;
  }
}
</style>
