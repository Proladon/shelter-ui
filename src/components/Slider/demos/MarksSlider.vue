<template>
  <div class="demo-section">
    <h4>帶標記</h4>
    <div class="mb-4">
      <span class="demo-label">值：{{ marksValue[0] }}</span>
      <Slider
        v-model="marksValue"
        :show-marks="true"
        :marks="marks"
        :min="0"
        :max="100"
        :step="25"
        class="mt-2 mb-8"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../index.vue'

const marksValue = ref([50])

const marks = {
  0: '0%',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '100%',
}
</script>

<style scoped lang="postcss">
.demo-section {
  @apply w-[300px];
}
</style>
