<template>
  <div class="demo-section">
    <h4>垂直滑桿</h4>
    <div class="flex items-center space-x-4">
      <span class="demo-label">值：{{ verticalValue[0] }}</span>
      <Slider
        v-model="verticalValue"
        orientation="vertical"
        :min="0"
        :max="100"
        class="h-48"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../index.vue'

const verticalValue = ref([80])
</script>
