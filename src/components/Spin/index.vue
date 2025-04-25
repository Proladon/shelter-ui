<template>
  <div
    class="s-spin"
    :class="[
      `s-spin--${mergedSize}`,
      {
        's-spin--rotating': rotate,
        's-spin--with-description': !!description,
        's-spin--with-content': !!$slots.default
      }
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
              <div
                class="s-spin__icon"
                :style="{
                  color: stroke,
                  width: `${mergedSize}px`,
                  height: `${mergedSize}px`
                }"
              >
                <svg
                  class="s-spin__svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    :stroke-width="mergedStrokeWidth"
                    stroke-linecap="round"
                    stroke-dasharray="60 30"
                  />
                </svg>
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
        <div
          class="s-spin__icon"
          :style="{
            color: stroke,
            width: `${mergedSize}px`,
            height: `${mergedSize}px`
          }"
        >
          <svg
            class="s-spin__svg"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              :stroke-width="mergedStrokeWidth"
              stroke-linecap="round"
              stroke-dasharray="60 30"
            />
          </svg>
        </div>
      </slot>
      <div v-if="description" class="s-spin__description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onBeforeUnmount } from 'vue'
import type { SpinProps, SpinEmits } from './types'

const props = withDefaults(defineProps<SpinProps>(), {
  size: 'medium',
  rotate: true,
  show: true,
  strokeWidth: 2,
  delay: 0
})

const emit = defineEmits<SpinEmits>()

// 計算實際尺寸
const mergedSize = computed(() => {
  if (typeof props.size === 'number') {
    return props.size
  }
  switch (props.size) {
    case 'small':
      return 18
    case 'large':
      return 36
    default:
      return 24
  }
})

// 計算描邊寬度
const mergedStrokeWidth = computed(() => {
  if (props.strokeWidth !== undefined) {
    return props.strokeWidth
  }
  return 2
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
    pointerEvents: shouldShowSpin.value ? 'none' : 'auto'
  }
})

watch(
  () => props.show,
  (show) => {
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
  { immediate: true }
)

onBeforeUnmount(() => {
  if (timerId !== null) {
    window.clearTimeout(timerId)
    timerId = null
  }
})
</script>

<style lang="postcss">
.s-spin {
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

.s-spin--rotating .s-spin__svg {
  animation: s-spin-rotate 1.2s linear infinite;
}

.s-spin__description {
  @apply mt-2 text-sm text-gray-600;
}

.s-spin--small .s-spin__description {
  @apply text-xs;
}

.s-spin--large .s-spin__description {
  @apply text-base;
}

.s-spin--with-description .s-spin__icon {
  @apply mb-1;
}

@keyframes s-spin-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>