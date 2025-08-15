<template>
  <div class="demo-section">
    <h4>不同尺寸</h4>
    <div class="space-y-4">
      <div>
        <span class="demo-label">小尺寸：</span>
        <Progress :value="sizeProgress" size="small" :show-text="true" />
      </div>
      <div>
        <span class="demo-label">默認尺寸：</span>
        <Progress :value="sizeProgress" size="default" :show-text="true" />
      </div>
      <div>
        <span class="demo-label">大尺寸：</span>
        <Progress :value="sizeProgress" size="large" :show-text="true" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Progress from '../index.vue'

const sizeProgress = ref(60)

let timer: number | null = null

onMounted(() => {
  timer = setInterval(() => {
    sizeProgress.value = (sizeProgress.value + 5) % 100
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped lang="postcss">
.demo-section {
  @apply space-y-5 w-[300px];
}
.demo-label {
  @apply text-sm text-gray-600 inline-block w-20;
}
.space-y-4 > * + * {
  @apply mt-4;
}
</style>
