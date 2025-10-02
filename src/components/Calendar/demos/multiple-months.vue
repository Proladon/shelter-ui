<template>
  <div class="demo-container">
    <h3>多月份顯示</h3>
    <Calendar v-model="selectedDate" :number-of-months="2" />

    <p>選中的日期: {{ selectedDate ? selectedDate.toString() : '無' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Calendar from '../index.vue'

const selectedDate = ref<any>(undefined)
</script>

<style scoped>
.demo-container {
  padding: 2rem;
  max-width: 800px;
}

h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-weight: 600;
}

p {
  margin-top: 1rem;
  color: #6b7280;
}
</style>
