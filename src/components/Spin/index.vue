<template>
  <div
    class="sh-spin"
    :class="[
      `sh-spin--${mergedSize}`,
      {
        'sh-spin--rotating': rotate,
        'sh-spin--with-description': !!description,
        'sh-spin--with-content': !!$slots.default,
      },
    ]"
  >
    <div v-if="$slots.default" class="s-spin__container">
      <div class="s-spin__content" :style="contentStyle">
        <slot></slot>
      </div>
      <div v-if="shouldShowSpin" class="s-spin__mask">
        <div class="s-spin__mask-inner">
          <div class="s-spin__body">
            <slot name="icon">
              <div class="s-spin__icon">
                <Spinner :color="mergedStroke" :size="mergedSize" />
              </div>
            </slot>
            <div v-if="description" class="s-spin__description">
              <slot name="description">{{ description }}</slot>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="s-spin__body">
      <slot name="icon">
        <div class="s-spin__icon">
          <Spinner :color="mergedStroke" :size="mergedSize" />
        </div>
      </slot>
      <div v-if="description" class="s-spin__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import type { SpinProps } from './types'
import Spinner from '@/components/Spinner/index.vue'

const props = withDefaults(defineProps<SpinProps>(), {
  size: 'medium',
  rotate: true,
  show: true,
  strokeWidth: 2,
  delay: 0,
})

// 計算實際尺寸
const mergedSize = computed(() => {
  if (typeof props.size === 'number') {
    return props.size
  }
  switch (props.size) {
    case 'small':
      return 24
    case 'large':
      return 50
    default:
      return 36
  }
})

// 計算描邊寬度
// const mergedStrokeWidth = computed(() => {
//   if (props.strokeWidth !== undefined) {
//     return props.strokeWidth
//   }
//   return 2
// })

// 計算顏色
const mergedStroke = computed(() => {
  if (props.stroke) {
    return props.stroke
  }
  return 'var(--sh-text-base)'
})

// 處理延遲顯示
const active = ref(false)
let timerId: number | null = null

const shouldShowSpin = computed(() => {
  return props.show && active.value
})

const contentStyle = computed(() => {
  return {
    opacity: shouldShowSpin.value ? 0.5 : 1,
    pointerEvents: shouldShowSpin.value
      ? 'none'
      : ('auto' as CSSProperties['pointerEvents']),
  }
})

watch(
  () => props.show,
  (show) => {
    if (typeof window === 'undefined') return

    if (timerId !== null) {
      window.clearTimeout(timerId)
      timerId = null
    }
    if (show) {
      if (props.delay > 0) {
        timerId = window.setTimeout(() => {
          active.value = true
          timerId = null
        }, props.delay)
      } else {
        active.value = true
      }
    } else {
      active.value = false
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  if (typeof window !== 'undefined' && timerId !== null) {
    window.clearTimeout(timerId)
    timerId = null
  }
})
</script>

<style lang="postcss">
.sh-spin {
  @apply inline-flex items-center justify-center box-border;
  position: relative;
}

.s-spin__container {
  @apply w-full h-full relative;
}

.s-spin__content {
  @apply w-full h-full transition-opacity duration-300;
}

.s-spin__mask {
  @apply absolute inset-0 z-10 flex items-center justify-center;
}

.s-spin__mask-inner {
  @apply flex items-center justify-center;
}

.s-spin__body {
  @apply flex flex-col items-center justify-center;
}

.s-spin__icon {
  @apply inline-flex items-center justify-center;
}

.s-spin__svg {
  @apply w-full h-full;
}

.sh-spin--rotating .s-spin__svg {
  animation: sh-spin-rotate 1.2s linear infinite;
}

.s-spin__description {
  @apply mt-2 text-sm text-gray-600;
}

.sh-spin--small .s-spin__description {
  @apply text-xs;
}

.sh-spin--large .s-spin__description {
  @apply text-base;
}

.sh-spin--with-description .s-spin__icon {
  @apply mb-1;
}

@keyframes sh-spin-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
