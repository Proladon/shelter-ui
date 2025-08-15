<template>
  <div class="demo-section">
    <h4>不同尺寸</h4>
    <div class="space-y-4">
      <div>
        <span class="demo-label">小：</span>
        <Slider v-model="sizeValue" size="small" :min="0" :max="100" />
      </div>
      <div>
        <span class="demo-label">默認：</span>
        <Slider v-model="sizeValue" size="default" :min="0" :max="100" />
      </div>
      <div>
        <span class="demo-label">大：</span>
        <Slider v-model="sizeValue" size="large" :min="0" :max="100" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../index.vue'

const sizeValue = ref([60])
</script>

<style scoped lang="postcss">
.demo-section {
  @apply w-[300px];
}
</style>
