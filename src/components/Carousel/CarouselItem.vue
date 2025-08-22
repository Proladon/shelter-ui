<template>
  <div class="sh-carousel-item" :class="itemClasses">
    <component
      :is="item.href ? 'a' : 'div'"
      :href="item.href"
      :target="item.target"
      class="sh-carousel-item__content"
      @click="handleClick"
    >
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.alt || item.title || ''"
        class="sh-carousel-item__image"
      />

      <div
        v-if="item.title || item.description || $slots.default"
        class="sh-carousel-item__overlay"
      >
        <div class="sh-carousel-item__text">
          <h3 v-if="item.title" class="sh-carousel-item__title">
            {{ item.title }}
          </h3>
          <p v-if="item.description" class="sh-carousel-item__description">
            {{ item.description }}
          </p>
          <slot />
        </div>
      </div>

      <div
        v-if="item.content && !item.image"
        class="sh-carousel-item__content-text"
      >
        {{ item.content }}
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { CarouselItem } from "./types"

defineOptions({
  name: "SHCarouselItem",
})

interface Props {
  item: CarouselItem
  index: number
  active: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  click: [item: CarouselItem, index: number]
}>()

const itemClasses = computed(() => {
  return {
    "sh-carousel-item--active": props.active,
    "sh-carousel-item--clickable": props.item.href || emit,
  }
})

const handleClick = () => {
  emit("click", props.item, props.index)
}
</script>

<style lang="postcss">
.sh-carousel-item {
  @apply relative w-full h-full flex-shrink-0;
}

.sh-carousel-item__content {
  @apply block w-full h-full relative overflow-hidden;
  @apply no-underline text-inherit;
}

.sh-carousel-item--clickable .sh-carousel-item__content {
  @apply cursor-pointer;
}

.sh-carousel-item__image {
  @apply w-full h-full object-cover;
}

.sh-carousel-item__overlay {
  @apply absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent;
  @apply flex items-end justify-start p-6;
}

.sh-carousel-item__text {
  @apply text-white;
}

.sh-carousel-item__title {
  @apply text-xl font-bold mb-2 text-white;
}

.sh-carousel-item__description {
  @apply text-sm text-white/90 leading-relaxed;
}

.sh-carousel-item__content-text {
  @apply w-full h-full flex items-center justify-center p-6 text-center;
  @apply bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100;
}
</style>
