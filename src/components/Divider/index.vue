<template>
  <div
    class="sh-divider"
    :class="props.class"
    role="separator"
    :aria-orientation="orientation"
    :data-orientation="orientation"
    :style="computedStyle"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { DividerProps } from './types'

// Props
const props = withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal',
  color: 'var(--sh-text-base)',
})

const computedStyle = computed(() => {
  const style: Record<string, string> = {
    '--sh-divider-color': props.color,
  }

  return style
})
</script>

<style scoped lang="postcss">
.sh-divider {
  --sh-divider-color: var(--sh-text-base);

  @apply border-0 bg-transparent;
}

/* 基本分隔線樣式 - 水平 */
.sh-divider[data-orientation='horizontal'] {
  @apply w-full h-px;
  background-color: var(--sh-divider-color);
}

/* 基本分隔線樣式 - 垂直 */
.sh-divider[data-orientation='vertical'] {
  @apply h-full w-px;
  background-color: var(--sh-divider-color);
}

/* 帶文字的分隔線 - 水平 */
.sh-divider[data-orientation='horizontal']:not(:empty) {
  @apply flex items-center text-sm text-gray-500 h-auto;
  background-color: transparent;
}

.sh-divider[data-orientation='horizontal']:not(:empty)::before,
.sh-divider[data-orientation='horizontal']:not(:empty)::after {
  @apply flex-1;
  content: '';
  height: 1px;
  background-color: var(--sh-divider-color);
}

.sh-divider[data-orientation='horizontal']:not(:empty)::before {
  @apply mr-4;
}

.sh-divider[data-orientation='horizontal']:not(:empty)::after {
  @apply ml-4;
}

/* 帶文字的分隔線 - 垂直 */
.sh-divider[data-orientation='vertical']:not(:empty) {
  @apply flex flex-col items-center text-sm text-gray-500 w-auto;
  background-color: transparent;
  writing-mode: vertical-lr;
  text-orientation: mixed;
}

.sh-divider[data-orientation='vertical']:not(:empty)::before,
.sh-divider[data-orientation='vertical']:not(:empty)::after {
  @apply flex-1;
  content: '';
  width: 1px;
  background-color: var(--sh-divider-color);
}

.sh-divider[data-orientation='vertical']:not(:empty)::before {
  @apply mb-4;
}

.sh-divider[data-orientation='vertical']:not(:empty)::after {
  @apply mt-4;
}
</style>
