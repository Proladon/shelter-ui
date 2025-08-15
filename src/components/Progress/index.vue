<template>
  <ProgressRoot
    v-bind="rootProps"
    class="sh-progress"
    :class="[
      `sh-progress--${size}`,
      `sh-progress--${variant}`,
      {
        'sh-progress--with-text': showText,
      },
    ]"
  >
    <div class="sh-progress__container">
      <ProgressIndicator
        class="sh-progress__indicator"
        :class="{
          'sh-progress__indicator--striped': variant === 'striped',
          'sh-progress__indicator--animated': variant === 'animated',
        }"
      />
    </div>

    <div v-if="showText" class="sh-progress__text">
      {{ displayText }}
    </div>

    <slot />
  </ProgressRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ProgressRoot, ProgressIndicator, useForwardPropsEmits } from 'reka-ui'
import type { ProgressProps } from './types'

const props = withDefaults(defineProps<ProgressProps>(), {
  size: 'default',
  variant: 'default',
  showText: false,
  max: 100,
})

const emits = defineEmits<{
  'update:modelValue': [value: number | null]
  'update:max': [value: number]
}>()

const rootProps = useForwardPropsEmits(props, emits)

const displayText = computed(() => {
  if (props.formatText) {
    return props.formatText(props.modelValue ?? null, props.max ?? 100)
  }

  const value = props.modelValue ?? 0
  const max = props.max ?? 100
  const percentage = Math.round((value / max) * 100)
  return `${percentage}%`
})
</script>

<style lang="postcss">
.sh-progress {
  @apply relative w-full;
}

.sh-progress__container {
  @apply relative w-full bg-gray-200 rounded-full overflow-hidden;
}

.sh-progress__indicator {
  @apply h-full bg-blue-500 rounded-full transition-all duration-300 ease-out;
  transform: translateX(calc(-100% + (var(--reka-progress-value, 0) * 1%)));
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
  @apply text-sm text-gray-600 mt-1 text-center;
}

/* 尺寸變化 */
.sh-progress--small .sh-progress__container {
  @apply h-2;
}

.sh-progress--default .sh-progress__container {
  @apply h-3;
}

.sh-progress--large .sh-progress__container {
  @apply h-4;
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
    @apply bg-green-500;
  }

  &[data-state='loading'] {
    @apply bg-blue-500;
  }

  &[data-state='indeterminate'] {
    @apply bg-gray-400;
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
