<template>
  <div class="sh-carousel-indicators" :class="indicatorsClasses">
    <button
      v-for="(_, index) in totalItems"
      :key="index"
      type="button"
      class="sh-carousel-indicators__item"
      :class="getIndicatorClasses(index)"
      :aria-label="`Go to slide ${index + 1}`"
      :disabled="disabled"
      @click="handleIndicatorClick(index)"
    >
      <span class="sh-carousel-indicators__dot"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { CarouselIndicatorsProps, CarouselIndicatorsEmits } from "./types"

defineOptions({
  name: "SHCarouselIndicators",
})

const props = withDefaults(defineProps<CarouselIndicatorsProps>(), {
  currentIndex: 0,
  totalItems: 0,
  disabled: false,
  position: "bottom",
})

const emit = defineEmits<CarouselIndicatorsEmits>()

const indicatorsClasses = computed(() => {
  return {
    [`sh-carousel-indicators--${props.position}`]: true,
    "sh-carousel-indicators--disabled": props.disabled,
  }
})

const getIndicatorClasses = (index: number) => {
  return {
    "sh-carousel-indicators__item--active": index === props.currentIndex,
  }
}

const handleIndicatorClick = (index: number) => {
  if (!props.disabled) {
    emit("indicator-click", index)
  }
}
</script>

<style lang="postcss">
.sh-carousel-indicators {
  @apply flex justify-center items-center gap-2;
}

.sh-carousel-indicators--bottom {
  @apply absolute bottom-4 left-1/2 transform -translate-x-1/2;
}

.sh-carousel-indicators--top {
  @apply absolute top-4 left-1/2 transform -translate-x-1/2;
}

.sh-carousel-indicators--left {
  @apply absolute left-4 top-1/2 transform -translate-y-1/2 flex-col;
}

.sh-carousel-indicators--right {
  @apply absolute right-4 top-1/2 transform -translate-y-1/2 flex-col;
}

.sh-carousel-indicators__item {
  @apply w-3 h-3 rounded-full bg-white/50 border-0 cursor-pointer transition-all duration-200;
  @apply hover:bg-white/75 focus:outline-none focus:ring-2 focus:ring-white/50;
}

.sh-carousel-indicators__item--active {
  @apply bg-white scale-110;
}

.sh-carousel-indicators__item:disabled {
  @apply cursor-not-allowed opacity-50;
}

.sh-carousel-indicators--disabled {
  @apply opacity-50 pointer-events-none;
}

.sh-carousel-indicators__dot {
  @apply block w-full h-full rounded-full;
}
</style>
