<template>
  <div class="demo-container">
    <h3>多選日曆</h3>
    <Calendar v-model="selectedDates" multiple />
    
    <div class="selected-dates">
      <h4>選中的日期:</h4>
      <ul v-if="selectedDates && selectedDates.length > 0">
        <li v-for="date in selectedDates" :key="date.toString()">
          {{ date.toString() }}
        </li>
      </ul>
      <p v-else>未選擇任何日期</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Calendar from '../index.vue'

const selectedDates = ref<any[]>([])
</script>
</script>

<style scoped>
.demo-container {
  padding: 2rem;
  max-width: 600px;
}

h3, h4 {
  margin-bottom: 1rem;
  color: #374151;
  font-weight: 600;
}

.selected-dates {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 8px;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0.5rem 0;
}

li {
  padding: 0.25rem 0;
  color: #6b7280;
}

p {
  color: #9ca3af;
  font-style: italic;
}
</style>