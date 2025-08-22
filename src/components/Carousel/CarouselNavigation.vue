<template>
  <div class="sh-carousel-navigation">
    <button
      type="button"
      class="sh-carousel-navigation__button sh-carousel-navigation__button--prev"
      :class="prevButtonClasses"
      :disabled="disabled || (!loop && currentIndex === 0)"
      @click="handlePrev"
      aria-label="Previous slide"
    >
      <IconChevronLeft class="sh-carousel-navigation__icon" />
    </button>

    <button
      type="button"
      class="sh-carousel-navigation__button sh-carousel-navigation__button--next"
      :class="nextButtonClasses"
      :disabled="disabled || (!loop && currentIndex === totalItems - 1)"
      @click="handleNext"
      aria-label="Next slide"
    >
      <IconChevronRight class="sh-carousel-navigation__icon" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue"
import type { CarouselNavigationProps, CarouselNavigationEmits } from "./types"

defineOptions({
  name: "SHCarouselNavigation",
})

const props = withDefaults(defineProps<CarouselNavigationProps>(), {
  currentIndex: 0,
  totalItems: 0,
  loop: false,
  disabled: false,
})

const emit = defineEmits<CarouselNavigationEmits>()

const prevButtonClasses = computed(() => {
  return {
    "sh-carousel-navigation__button--disabled":
      !props.loop && props.currentIndex === 0,
  }
})

const nextButtonClasses = computed(() => {
  return {
    "sh-carousel-navigation__button--disabled":
      !props.loop && props.currentIndex === props.totalItems - 1,
  }
})

const handlePrev = () => {
  if (!props.disabled && (props.loop || props.currentIndex > 0)) {
    emit("prev")
  }
}

const handleNext = () => {
  if (
    !props.disabled &&
    (props.loop || props.currentIndex < props.totalItems - 1)
  ) {
    emit("next")
  }
}
</script>

<style lang="postcss">
.sh-carousel-navigation {
  @apply relative;
}

.sh-carousel-navigation__button {
  @apply absolute top-1/2 transform -translate-y-1/2 z-10;
  @apply w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border-0;
  @apply flex items-center justify-center cursor-pointer transition-all duration-200;
  @apply hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.sh-carousel-navigation__button--prev {
  @apply left-4;
}

.sh-carousel-navigation__button--next {
  @apply right-4;
}

.sh-carousel-navigation__button--disabled {
  @apply opacity-50 cursor-not-allowed;
}

.sh-carousel-navigation__icon {
  @apply w-5 h-5 text-gray-700;
}
</style>
