<template>
  <div class="demo-container">
    <TimePicker
      v-model="timezoneTime"
      :show-timezone="true"
      timezone="Asia/Taipei"
      placeholder="選擇時間（台北時區）"
    />
    <p class="demo-result">選中的時間: {{ timezoneTime || '無' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TimePicker from '../index.vue'

const timezoneTime = ref<string>()
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
