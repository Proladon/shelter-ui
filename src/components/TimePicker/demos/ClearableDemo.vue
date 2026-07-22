<template>
  <div class="demo-container">
    <TimePicker v-model:value="selectedTime" clearable placeholder="選擇時間" />
    <p class="demo-result">選中的時間: {{ selectedTime || '無' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TimePicker from '../index.vue'

const selectedTime = ref<string>('14:30:00')
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-result {
  @apply text-text.base;
}
</style>
