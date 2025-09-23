<template>
  <div class="demo-container">
    <TimePicker
      v-model="stepTime"
      :minute-step="15"
      :second-step="30"
      placeholder="分鐘步進15，秒數步進30"
    />
    <p class="demo-result">選中的時間: {{ stepTime || '無' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TimePicker from '../index.vue'

const stepTime = ref<string>()
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
