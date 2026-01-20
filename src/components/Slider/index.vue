<template>
  <div class="sh-slider-wrapper">
    <SliderRoot
      v-slot="{ modelValue }"
      v-bind="rootProps"
      class="sh-slider"
      :class="[
        `sh-slider-size--${size}`,
        `sh-slider-color--${color}`,
        `sh-slider-orientation--${orientation}`,
      ]"
    >
      <SliderTrack class="sh-slider__track">
        <SliderRange class="sh-slider__range" />
      </SliderTrack>

      <SliderThumb
        v-for="(value, index) in modelValue"
        :key="index"
        class="sh-slider__thumb"
        :class="`sh-slider__thumb--${color}`"
      >
        <div v-if="showTooltip" class="sh-slider__tooltip">
          <slot name="tooltip" :value="value" :index="index">
            {{ formatTooltip ? formatTooltip(value) : value }}
          </slot>
        </div>
      </SliderThumb>
    </SliderRoot>

    <!-- 標記 -->
    <div
      v-if="showMarks && marks"
      class="sh-slider__marks"
      :class="`sh-slider__marks--${orientation}`"
    >
      <div
        v-for="(label, value) in marks"
        :key="value"
        class="sh-slider__mark"
        :style="getMarkStyle(Number(value))"
      >
        <slot name="mark" :value="Number(value)" :label="label">
          <span class="sh-slider__mark-label">{{ label }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  SliderRoot,
  SliderTrack,
  SliderRange,
  SliderThumb,
  useForwardPropsEmits,
} from 'reka-ui'
import type { SliderProps } from './types'

const props = withDefaults(defineProps<SliderProps>(), {
  size: 'default',
  color: 'primary',
  orientation: 'horizontal',
  showTooltip: false,
  showMarks: false,
  min: 0,
  max: 100,
  step: 1,
})

const emits = defineEmits<{
  'update:modelValue': [value: number[]]
  valueCommit: [value: number[]]
}>()

const rootProps = useForwardPropsEmits(props, emits)

const getMarkStyle = (value: number) => {
  const min = props.min ?? 0
  const max = props.max ?? 100
  const percentage = ((value - min) / (max - min)) * 100

  if (props.orientation === 'vertical') {
    return {
      bottom: `${percentage}%`,
    }
  } else {
    return {
      left: `${percentage}%`,
    }
  }
}
</script>

<style lang="postcss">
.sh-slider-wrapper {
  @apply relative;
}

.sh-slider {
  @apply relative flex items-center select-none touch-none;
}

.sh-slider-orientation--horizontal {
  @apply w-full;
}

.sh-slider-orientation--vertical {
  @apply flex-col h-full;
}

.sh-slider__track {
  @apply relative grow rounded-full bg-bg.primary.lighten;
}

.sh-slider-orientation--horizontal {
  .sh-slider__track {
    @apply h-[5px];
  }
}

.sh-slider-orientation--vertical {
  .sh-slider__track {
    @apply w-[5px] h-full;
  }
}

.sh-slider__range {
  @apply absolute rounded-full;
}

.sh-slider-orientation--horizontal {
  .sh-slider__range {
    @apply h-full;
  }
}

.sh-slider-orientation--vertical {
  .sh-slider__range {
    @apply w-full;
  }
}

.sh-slider__thumb {
  @apply relative block rounded-full bg-text.base border-2 shadow-lg
  @apply cursor-grab;
  /* @apply focus:(outline-none ring-2 ring-offset-2); */
  @apply focus:(outline-none);
  @apply active:cursor-grabbing;
  /* 
  &:focus {
    @apply ring-blue-500;
  } */

  &:hover {
    @apply shadow-md;
  }
}

/* 尺寸變化 */
.sh-slider-size--small {
  .sh-slider__thumb {
    @apply w-[15px] h-[15px];
  }
}

.sh-slider-size--default {
  .sh-slider__track {
    @apply h-[7px];
  }
  .sh-slider__thumb {
    @apply w-[16px] h-[16px];
  }
}

.sh-slider-size--large {
  .sh-slider__track {
    @apply h-[10px];
  }
  .sh-slider__thumb {
    @apply w-[20px] h-[20px];
  }
}

/* 顏色變化 */
.sh-slider-color--primary {
  .sh-slider__range {
    @apply bg-primary;
  }
}

.sh-slider-color--secondary {
  .sh-slider__range {
    @apply bg-secondary;
  }
}

.sh-slider-color--success {
  .sh-slider__range {
    @apply bg-status.success;
  }
}

.sh-slider-color--warning {
  .sh-slider__range {
    @apply bg-status.warning;
  }
}

.sh-slider-color--danger {
  .sh-slider__range {
    @apply bg-status.danger;
  }
}

.sh-slider-color--info {
  .sh-slider__range {
    @apply bg-status.info;
  }
}

/* 提示框 */
.sh-slider__tooltip {
  @apply absolute bg-bg.primary text-secondary text-xs rounded px-2 py-1 pointer-events-none whitespace-nowrap;
  @apply border-solid border-border.base border-1;
  transform: translateX(-50%);
  bottom: calc(100% + 8px);

  &::after {
    content: '';
    @apply absolute top-full left-1/2 transform -translate-x-1/2 border-t-4 border-t-gray-900 border-l-4 border-l-transparent border-r-4 border-r-transparent;
  }
}

.sh-slider-orientation--vertical {
  .sh-slider__tooltip {
    @apply transform translate-y-1/2;
    bottom: auto;
    left: calc(100% + 8px);
    top: 50%;

    &::after {
      @apply top-1/2 left-0 transform -translate-y-1/2 border-r-4 border-r-gray-900 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-0;
      left: -4px;
    }
  }
}

/* 標記 */
.sh-slider__marks {
  @apply absolute;
}

.sh-slider__marks--horizontal {
  @apply w-full top-full mt-2;
}

.sh-slider__marks--vertical {
  @apply h-full left-full ml-2;
}

.sh-slider__mark {
  @apply absolute;
}

.sh-slider__marks--horizontal {
  .sh-slider__mark {
    @apply transform -translate-x-1/2;
  }
}

.sh-slider__marks--vertical {
  .sh-slider__mark {
    @apply transform -translate-y-1/2;
  }
}

.sh-slider__mark-label {
  @apply text-xs text-gray-500;
}

/* 禁用狀態 */
.sh-slider[data-disabled] {
  @apply opacity-50 cursor-not-allowed;

  .sh-slider__thumb {
    @apply cursor-not-allowed;
  }
}
</style>
