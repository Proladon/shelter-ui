<template>
  <div class="demo-container">
    <TimePicker
      v-model="stepTime"
      :hour-step="2"
      :minute-step="15"
      :second-step="30"
      placeholder="小時步進2，分鐘步進15，秒數步進30"
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
  @apply text-text.base;
}
</style>
