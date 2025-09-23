<template>
  <div class="demo-container">
    <TimePicker
      v-model="timeNoSeconds"
      :show-seconds="false"
      placeholder="選擇時間（不含秒）"
    />
    <p class="demo-result">選中的時間: {{ timeNoSeconds || '無' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TimePicker from '../index.vue'

const timeNoSeconds = ref<string>()
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
