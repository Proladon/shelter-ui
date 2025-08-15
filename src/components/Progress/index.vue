<template>
  <ProgressRoot
    v-model="syncValue"
    class="sh-progress"
    :class="[
      `sh-progress--${size}`,
      textPositionClass,
      {
        'sh-progress--with-text': showText,
      },
    ]"
  >
    <div class="sh-progress__inner">
      <div class="sh-progress__container" :style="containerStyle">
        <ProgressIndicator
          class="sh-progress__indicator"
          :class="{
            'sh-progress__indicator--striped': variant === 'striped',
            'sh-progress__indicator--animated': variant === 'animated',
          }"
          :style="indicatorStyle"
        />
      </div>

      <slot name="text">
        <div v-if="showText" class="sh-progress__text">
          {{ displayText }}
        </div>
      </slot>
    </div>

    <slot />
  </ProgressRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ProgressRoot, ProgressIndicator } from 'reka-ui'
import type { ProgressProps } from './types'
import { useVModel } from '@vueuse/core'

const props = withDefaults(defineProps<ProgressProps>(), {
  value: null,
  size: 'default',
  variant: 'default',
  showText: false,
  max: 100,
  color: undefined,
  height: undefined,
  textPosition: 'bottom',
})

const emits = defineEmits<{
  'update:value': [value: number]
}>()

const syncValue = useVModel(props, 'value', emits)

const containerStyle = computed(() => {
  const styles: Record<string, string> = {}

  if (props.height !== undefined) {
    const heightValue =
      typeof props.height === 'number' ? `${props.height}px` : props.height
    styles.height = heightValue
  }

  return styles
})

const indicatorStyle = computed(() => {
  const value = syncValue.value ?? 0
  const styles: Record<string, string> = {
    transform: `translateX(-${100 - value}%)`,
  }

  if (props.color) {
    styles.backgroundColor = props.color
  }

  return styles
})
const displayText = computed(() => {
  const value = syncValue.value ?? 0
  const max = props.max ?? 100

  if (props.formatText) {
    return props.formatText(value, max)
  }

  const percentage = Math.round((value / max) * 100)
  return `${percentage}%`
})

const textPositionClass = computed(
  () => `sh-progress--text-${props.textPosition}`,
)
</script>

<style scoped lang="postcss">
.sh-progress {
  @apply relative w-full;
}

.sh-progress__container {
  @apply rounded-full w-full overflow-hidden bg-white dark:bg-stone-950 border border-muted;
}

.sh-progress__indicator {
  @apply h-full bg-blue-500 rounded-full transition-all duration-300 ease-out;
}

.sh-progress__indicator--striped {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
}

.sh-progress__indicator--animated {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  animation: sh-progress-stripes 1s linear infinite;
}

.sh-progress__text {
  @apply text-sm text-gray-600 text-center font-medium;
}

/* 布局：當文字在左或右時，水平排列 */
.sh-progress__inner {
  @apply flex items-center gap-[12px];
}

.sh-progress--text-bottom {
  .sh-progress__inner {
    @apply flex-col gap-[4px];
  }
}

.sh-progress--text-left {
  .sh-progress__inner {
    @apply flex-row-reverse;
  }
}

/* .sh-progress--text-right .sh-progress__text {
} */

/* 尺寸變化 - 如果沒有自定義 height 才生效 */
.sh-progress--small .sh-progress__container:not([style*='height']) {
  @apply h-[2px];
}

.sh-progress--default .sh-progress__container:not([style*='height']) {
  @apply h-[6px];
}

.sh-progress--large .sh-progress__container:not([style*='height']) {
  @apply h-[8px];
}

/* 條紋動畫 */
@keyframes sh-progress-stripes {
  0% {
    background-position: 1rem 0;
  }
  100% {
    background-position: 0 0;
  }
}

/* 顏色變化 */
.sh-progress__indicator {
  &[data-state='complete'] {
    @apply bg-primary;
  }

  &[data-state='loading'] {
    @apply bg-primary;
  }

  &[data-state='indeterminate'] {
    @apply bg-border.base;
    animation: sh-progress-indeterminate 2s ease-in-out infinite;
  }
}

@keyframes sh-progress-indeterminate {
  0% {
    transform: translateX(-100%);
    width: 100%;
  }
  50% {
    transform: translateX(-50%);
    width: 50%;
  }
  100% {
    transform: translateX(100%);
    width: 100%;
  }
}
</style>
