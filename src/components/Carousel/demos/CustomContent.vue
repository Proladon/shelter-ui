<template>
  <div class="demo">
    <h3>Carousel with Custom Content</h3>
    <div class="demo__content">
      <SHCarousel
        v-model="currentSlide"
        :items="customItems"
        :show-indicators="false"
        effect="fade"
      >
        <template #item="{ item, active }">
          <div class="custom-item" :class="{ active }">
            <div class="custom-content">
              <h2>{{ item.title }}</h2>
              <p>{{ item.description }}</p>
              <div class="custom-actions">
                <SHButton>Learn More</SHButton>
                <SHButton>Contact</SHButton>
              </div>
            </div>
          </div>
        </template>
      </SHCarousel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCarousel from '../index.vue'
import type { CarouselItem } from '../types'
import { SHButton } from '@/index'

const currentSlide = ref(0)

const customItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Welcome to Our Service',
    description:
      'Discover amazing features that will transform your workflow and boost productivity.',
  },
  {
    id: 2,
    title: 'Easy Integration',
    description:
      'Seamlessly integrate with your existing tools and platforms in just a few clicks.',
  },
  {
    id: 3,
    title: 'Expert Support',
    description:
      '24/7 customer support from our team of experts ready to help you succeed.',
  },
]
</script>

<style scoped lang="postcss">
.demo {
  padding: 1rem;
}

.demo > * + * {
  margin-top: 1rem;
}

.custom-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.custom-item.active {
  opacity: 1;
}

.custom-content {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
}

.custom-content h2 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.custom-content p {
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.custom-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>
