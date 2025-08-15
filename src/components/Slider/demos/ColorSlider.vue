<template>
  <div class="demo-section">
    <h4>不同顏色</h4>
    <div class="space-y-4">
      <div>
        <span class="demo-label">一般：</span>
        <Slider v-model="colorValue" color="info" :min="0" :max="100" />
      </div>
      <div>
        <span class="demo-label">主要：</span>
        <Slider v-model="colorValue" color="primary" :min="0" :max="100" />
      </div>
      <div>
        <span class="demo-label">次要：</span>
        <Slider v-model="colorValue" color="secondary" :min="0" :max="100" />
      </div>
      <div>
        <span class="demo-label">成功：</span>
        <Slider v-model="colorValue" color="success" :min="0" :max="100" />
      </div>
      <div>
        <span class="demo-label">警告：</span>
        <Slider v-model="colorValue" color="warning" :min="0" :max="100" />
      </div>
      <div>
        <span class="demo-label">危險：</span>
        <Slider v-model="colorValue" color="danger" :min="0" :max="100" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../index.vue'

const colorValue = ref([70])
</script>

<style scoped lang="postcss">
.demo-section {
  @apply w-[300px];
}
</style>
