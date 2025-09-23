<template>
  <div class="demo-container">
    <TimePicker
      v-model="time12Hour"
      :use12-hour="true"
      placeholder="選擇時間（12小時制）"
    />
    <p class="demo-result">選中的時間: {{ time12Hour || '無' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TimePicker from '../index.vue'

const time12Hour = ref<string>()
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-result {
  margin-top: 10px;
  padding: 10px;
  background-color: #f3f4f6;
  border-radius: 4px;
  font-family: monospace;
}
</style>
