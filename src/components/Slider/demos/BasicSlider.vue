<template>
  <div class="demo-section">
    <h4>基本滑桿</h4>
    <div class="mb-4">
      <span class="demo-label">值：{{ basicValue[0] }}</span>
      <Slider v-model="basicValue" :min="0" :max="100" :step="1" class="mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../index.vue'

const basicValue = ref([50])
</script>

<style scoped lang="postcss">
.demo-section {
  @apply w-[300px];
}
</style>
