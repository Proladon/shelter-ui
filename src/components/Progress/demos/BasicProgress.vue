<template>
  <div class="demo-section">
    <h4>基本進度條</h4>
    <Progress :value="basicProgress" :show-text="true" class="mb-4" />
    <button @click="increaseBasic" class="demo-button">增加進度</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Progress from '../index.vue'

const basicProgress = ref(30)

const increaseBasic = () => {
  if (basicProgress.value >= 100) {
    basicProgress.value = 0
    return
  }
  basicProgress.value = Math.min(basicProgress.value + 10, 100)
}
</script>

<style scoped lang="postcss">
.demo-section {
  @apply space-y-5 w-[300px];
}
.demo-button {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors;
}
</style>
