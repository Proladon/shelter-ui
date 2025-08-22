<template>
  <div class="demo">
    <h3>Basic Carousel</h3>
    <div class="demo__content">
      <SHCarousel
        v-model="currentSlide"
        :items="basicItems"
        height="300px"
        :autoplay="false"
      />
      <p class="mt-4">Current slide: {{ currentSlide + 1 }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SHCarousel from "../index.vue"
import type { CarouselItem } from "../types"

const currentSlide = ref(0)

const basicItems: CarouselItem[] = [
  {
    id: 1,
    title: "First Slide",
    description: "This is the first slide content",
    image: "https://picsum.photos/800/300?random=1",
  },
  {
    id: 2,
    title: "Second Slide",
    description: "This is the second slide content",
    image: "https://picsum.photos/800/300?random=2",
  },
  {
    id: 3,
    title: "Third Slide",
    description: "This is the third slide content",
    image: "https://picsum.photos/800/300?random=3",
  },
]
</script>

<style scoped>
.demo {
  padding: 1rem;
}

.demo > * + * {
  margin-top: 1rem;
}

.demo__content {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
