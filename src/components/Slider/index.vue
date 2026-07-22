<template>
  <div class="sh-slider-wrapper">
    <SliderRoot
      v-slot="{ modelValue }"
      :model-value="value"
      v-bind="delegatedProps"
      class="sh-slider"
      :class="[
        sizeClass,
        `sh-slider-type--${props.type}`,
        `sh-slider-orientation--${props.orientation}`,
      ]"
      @update:model-value="handleUpdate"
      @value-commit="(v: number[]) => emits('valueCommit', v)"
    >
      <SliderTrack class="sh-slider__track">
        <SliderRange class="sh-slider__range" />
      </SliderTrack>

      <SliderThumb
        v-for="(value, index) in modelValue"
        :key="index"
        class="sh-slider__thumb"
        :class="`sh-slider__thumb--${props.type}`"
        @focus="emits('focus', $event)"
        @blur="emits('blur', $event)"
      >
        <div v-if="props.showTooltip" class="sh-slider__tooltip">
          <slot name="tooltip" :value="value" :index="index">
            {{ props.formatTooltip ? props.formatTooltip(value) : value }}
          </slot>
        </div>
      </SliderThumb>
    </SliderRoot>

    <!-- 標記 -->
    <div
      v-if="props.showMarks && props.marks"
      class="sh-slider__marks"
      :class="`sh-slider__marks--${props.orientation}`"
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
import { reactiveOmit } from '@vueuse/core'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'reka-ui'
import { useComponentSize } from '@/composables/useComponentSize'
import type { SliderProps, SliderSlots } from './types'

const props = withDefaults(defineProps<SliderProps>(), {
  size: 'medium',
  type: 'primary',
  orientation: 'horizontal',
  readonly: false,
  showTooltip: false,
  showMarks: false,
  min: 0,
  max: 100,
  step: 1,
})

defineSlots<SliderSlots>()

const sizeClass = useComponentSize('sh-slider-size', () => props.size)

const emits = defineEmits<{
  'update:value': [value: number[] | undefined]
  valueCommit: [value: number[]]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const delegatedProps = reactiveOmit(
  props,
  'value',
  'size',
  'type',
  'readonly',
  'showTooltip',
  'formatTooltip',
  'showMarks',
  'marks',
)

const handleUpdate = (value: number[] | undefined) => {
  if (props.disabled || props.readonly) return
  emits('update:value', value)
}

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

<style lang="postcss" scoped>
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
    @apply h-1;
  }
}

.sh-slider-orientation--vertical {
  .sh-slider__track {
    @apply w-1 h-full;
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

  &:hover {
    @apply shadow-md;
  }
}

/* 尺寸變化 */
.sh-slider-size--small {
  .sh-slider__track {
    @apply h-1.5;
  }
  .sh-slider__thumb {
    @apply w-4 h-4;
  }
}

.sh-slider-size--medium {
  .sh-slider__track {
    @apply h-2;
  }
  .sh-slider__thumb {
    @apply w-4 h-4;
  }
}

.sh-slider-size--large {
  .sh-slider__track {
    @apply h-2.5;
  }
  .sh-slider__thumb {
    @apply w-5 h-5;
  }
}

/* 顏色變化 */
.sh-slider-type--default {
  .sh-slider__range {
    @apply bg-text.primary;
  }
}

.sh-slider-type--primary {
  .sh-slider__range {
    @apply bg-primary;
  }
}

.sh-slider-type--success {
  .sh-slider__range {
    @apply bg-status.success;
  }
}

.sh-slider-type--warning {
  .sh-slider__range {
    @apply bg-status.warning;
  }
}

.sh-slider-type--danger {
  .sh-slider__range {
    @apply bg-status.danger;
  }
}

.sh-slider-type--info {
  .sh-slider__range {
    @apply bg-status.info;
  }
}

/* 提示框 */
.sh-slider__tooltip {
  @apply absolute bg-bg.primary text-text.base text-xs rounded px-2 py-1 pointer-events-none whitespace-nowrap;
  @apply border-solid border-border.base border-1;
  transform: translateX(-50%);
  bottom: calc(100% + 8px);

  &::after {
    content: '';
    @apply absolute top-full left-1/2 transform -translate-x-1/2 border-t-4 border-t-bg.primary border-l-4 border-l-transparent border-r-4 border-r-transparent;
  }
}

.sh-slider-orientation--vertical {
  .sh-slider__tooltip {
    @apply transform translate-y-1/2;
    bottom: auto;
    left: calc(100% + 8px);
    top: 50%;

    &::after {
      @apply top-1/2 left-0 transform -translate-y-1/2 border-r-4 border-r-bg.primary border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-0;
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
  @apply text-xs text-text.primary;
}

/* 禁用狀態 */
.sh-slider[data-disabled] {
  @apply opacity-50 cursor-not-allowed;

  .sh-slider__thumb {
    @apply cursor-not-allowed;
  }
}
</style>
