<template>
  <div class="demo">
    <h3>Autoplay Carousel</h3>
    <div class="demo__content">
      <SHCarousel
        v-model="currentSlide"
        :items="autoplayItems"
        height="350px"
        :autoplay="isAutoplay"
        :interval="2000"
        :pause-on-hover="true"
      />
      <div class="controls mt-4">
        <SHButton
          @click="toggleAutoplay"
          :type="isAutoplay ? 'danger' : 'default'"
        >
          {{ isAutoplay ? 'Stop' : 'Start' }} Autoplay
        </SHButton>
        <span class="ml-4"
          >Current: {{ currentSlide + 1 }} / {{ autoplayItems.length }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCarousel from '../index.vue'
import type { CarouselItem } from '../types'
import { SHButton } from '@/index'

const currentSlide = ref(0)
const isAutoplay = ref(true)

const autoplayItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Slide 1',
    description: 'Auto-advancing slide with timer',
    image: 'https://picsum.photos/800/350?random=4',
  },
  {
    id: 2,
    title: 'Slide 2',
    description: 'Hover to pause autoplay',
    image: 'https://picsum.photos/800/350?random=5',
  },
  {
    id: 3,
    title: 'Slide 3',
    description: 'Continues automatically',
    image: 'https://picsum.photos/800/350?random=6',
  },
  {
    id: 4,
    title: 'Slide 4',
    description: 'Last slide loops back',
    image: 'https://picsum.photos/800/350?random=7',
  },
]

const toggleAutoplay = () => {
  isAutoplay.value = !isAutoplay.value
}
</script>

<style scoped>
.demo {
  padding: 1rem;
}

.demo > * + * {
  margin-top: 1rem;
}

.controls {
  display: flex;
  align-items: center;
}

.mt-4 {
  margin-top: 1rem;
}

.ml-4 {
  margin-left: 1rem;
}
</style>
