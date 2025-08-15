<template>
  <div class="demo-section">
    <h4>帶提示框</h4>
    <div class="mb-4">
      <span class="demo-label">值：{{ tooltipValue[0] }}</span>
      <Slider
        v-model="tooltipValue"
        :show-tooltip="true"
        :format-tooltip="(value) => `${value}%`"
        :min="0"
        :max="100"
        class="mt-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../index.vue'

const tooltipValue = ref([40])
</script>

<style scoped lang="postcss">
.demo-section {
  @apply w-[300px];
}
</style>
