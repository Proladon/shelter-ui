<template>
  <div class="demo-section">
    <h4>範圍滑桿</h4>
    <div class="mb-4">
      <span class="demo-label"
        >值：{{ rangeValue[0] }} - {{ rangeValue[1] }}</span
      >
      <Slider v-model="rangeValue" :min="0" :max="100" :step="1" class="mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../index.vue'

const rangeValue = ref([25, 75])
</script>

<style scoped lang="postcss">
.demo-section {
  @apply w-[300px];
}
</style>
