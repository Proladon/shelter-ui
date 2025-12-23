<template>
  <div
    class="sh-carousel"
    :class="carouselClasses"
    :style="carouselStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    role="region"
    aria-label="Carousel"
  >
    <div class="sh-carousel__container">
      <div
        class="sh-carousel__track"
        :style="trackStyle"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <CarouselItem
          v-for="(item, index) in normalizedItems"
          :key="item.id || index"
          :item="item"
          :index="index"
          :active="index === currentIndex"
          @click="handleItemClick"
        >
          <template v-if="$slots.item" #default>
            <slot
              name="item"
              :item="item"
              :index="index"
              :active="index === currentIndex"
            />
          </template>
        </CarouselItem>
      </div>

      <!-- Navigation -->
      <CarouselNavigation
        v-if="showNavigation && normalizedItems.length > 1"
        :current-index="currentIndex"
        :total-items="normalizedItems.length"
        :loop="loop"
        :disabled="disabled"
        @prev="goToPrev"
        @next="goToNext"
      >
        <template v-if="$slots['prev-button']" #prev-button>
          <slot name="prev-button" />
        </template>
        <template v-if="$slots['next-button']" #next-button>
          <slot name="next-button" />
        </template>
      </CarouselNavigation>
    </div>

    <!-- Indicators -->
    <CarouselIndicators
      v-if="showIndicators && normalizedItems.length > 1"
      :current-index="currentIndex"
      :total-items="normalizedItems.length"
      :disabled="disabled"
      @indicator-click="goToSlide"
    >
      <template v-if="$slots.indicator" #indicator="{ index, active }">
        <slot name="indicator" :index="index" :active="active" />
      </template>
    </CarouselIndicators>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import type {
  CarouselProps,
  CarouselEmits,
  CarouselItem as CarouselItemType,
} from './types'
import CarouselItem from './CarouselItem.vue'
import CarouselNavigation from './CarouselNavigation.vue'
import CarouselIndicators from './CarouselIndicators.vue'

defineOptions({
  name: 'SHCarousel',
})

const props = withDefaults(defineProps<CarouselProps>(), {
  modelValue: 0,
  items: () => [],
  autoplay: false,
  interval: 3000,
  showIndicators: true,
  showNavigation: true,
  loop: true,
  pauseOnHover: true,
  duration: 300,
  effect: 'slide',
  height: '400px',
  disabled: false,
})

const emit = defineEmits<CarouselEmits>()

const currentIndex = defineModel<number>({ default: 0 })

// Refs
const autoplayTimer = ref<number>()
const isTransitioning = ref(false)
const isHovered = ref(false)

// Touch events
const touchStartX = ref(0)
const touchStartY = ref(0)
const isDragging = ref(false)

// Computed
const carouselClasses = computed(() => {
  return {
    [`sh-carousel--${props.effect}`]: true,
    'sh-carousel--disabled': props.disabled,
  }
})

const carouselStyle = computed(() => {
  const style: Record<string, any> = {
    height:
      typeof props.height === 'number' ? `${props.height}px` : props.height,
  }

  if (props.style) {
    Object.assign(style, props.style)
  }

  return style
})

const normalizedItems = computed(() => {
  return props.items || []
})

const trackStyle = computed(() => {
  if (props.effect === 'slide') {
    return {
      transform: `translateX(-${currentIndex.value * 100}%)`,
      transition: isTransitioning.value
        ? `transform ${props.duration}ms ease-in-out`
        : 'none',
    }
  }
  return {}
})

// Methods
const goToSlide = (index: number) => {
  if (props.disabled || isTransitioning.value || index === currentIndex.value) {
    return
  }

  const previousIndex = currentIndex.value
  currentIndex.value = index

  isTransitioning.value = true

  emit('change', index, previousIndex)

  setTimeout(() => {
    isTransitioning.value = false
  }, props.duration)
}

const goToNext = () => {
  let nextIndex = currentIndex.value + 1

  if (nextIndex >= normalizedItems.value.length) {
    if (props.loop) {
      nextIndex = 0
    } else {
      return
    }
  }

  goToSlide(nextIndex)
}

const goToPrev = () => {
  let prevIndex = currentIndex.value - 1

  if (prevIndex < 0) {
    if (props.loop) {
      prevIndex = normalizedItems.value.length - 1
    } else {
      return
    }
  }

  goToSlide(prevIndex)
}

const startAutoplay = () => {
  if (!props.autoplay || props.disabled || normalizedItems.value.length <= 1) {
    return
  }

  stopAutoplay()
  autoplayTimer.value = window.setInterval(() => {
    if (!isHovered.value || !props.pauseOnHover) {
      goToNext()
    }
  }, props.interval)

  emit('autoplay-start')
}

const stopAutoplay = () => {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = undefined
    emit('autoplay-stop')
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}

const handleItemClick = (item: CarouselItemType, index: number) => {
  emit('item-click', item, index)
}

// Touch events
const handleTouchStart = (event: TouchEvent) => {
  if (props.disabled) return

  const touch = event.touches[0]
  if (!touch) return
  touchStartX.value = touch.clientX
  touchStartY.value = touch.clientY
  isDragging.value = true
}

const handleTouchMove = (event: TouchEvent) => {
  if (!isDragging.value || props.disabled) return

  event.preventDefault()
}

const handleTouchEnd = (event: TouchEvent) => {
  if (!isDragging.value || props.disabled) return

  const touch = event.changedTouches[0]
  if (!touch) return
  const deltaX = touch.clientX - touchStartX.value
  const deltaY = touch.clientY - touchStartY.value

  // 檢查是否為水平滑動
  if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      goToPrev()
    } else {
      goToNext()
    }
  }

  isDragging.value = false
}

// Watchers
watch(
  () => props.autoplay,
  (newValue) => {
    if (newValue) {
      startAutoplay()
    } else {
      stopAutoplay()
    }
  },
)

watch(
  () => props.interval,
  () => {
    if (props.autoplay) {
      startAutoplay()
    }
  },
)

watch(currentIndex, (newValue) => {
  if (newValue < 0) {
    currentIndex.value = 0
  } else if (newValue >= normalizedItems.value.length) {
    currentIndex.value = normalizedItems.value.length - 1
  }
})

// Lifecycle
onMounted(() => {
  if (props.autoplay) {
    nextTick(() => {
      startAutoplay()
    })
  }
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style lang="postcss">
.sh-carousel {
  @apply relative overflow-hidden bg-gray-100 dark:bg-gray-900 rounded-lg;
}

.sh-carousel--disabled {
  @apply opacity-50 pointer-events-none;
}

.sh-carousel__container {
  @apply relative w-full h-full;
}

.sh-carousel__track {
  @apply flex w-full h-full;
}

.sh-carousel--slide .sh-carousel__track {
  @apply transition-transform duration-300 ease-in-out;
}

.sh-carousel--fade .sh-carousel-item {
  @apply absolute inset-0 opacity-0 transition-opacity duration-300;
}

.sh-carousel--fade .sh-carousel-item--active {
  @apply opacity-100;
}
</style>
