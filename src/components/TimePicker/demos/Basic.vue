<template>
  <div class="demo-container">
    <div class="demo-item">
      <TimePicker v-model="singleTime" placeholder="選擇時間" />
      <p class="demo-result">選中的時間: {{ singleTime || '無' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TimePicker from '../index.vue'

const singleTime = ref<string>()
</script>

<style scoped>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-result {
  @apply text-text.base;
}

h3 {
  margin-bottom: 15px;
  color: #374151;
}
</style>
