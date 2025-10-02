<template>
  <div class="demo-container">
    <h3>帶禁用日期的日曆</h3>
    <p>週末日期和今天後7天內的日期被禁用</p>
    <Calendar
      v-model="selectedDate"
      :is-date-disabled="isDateDisabled"
      :is-date-unavailable="isDateUnavailable"
    />

    <p>選中的日期: {{ selectedDate ? selectedDate.toString() : '無' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { today, getLocalTimeZone } from '@internationalized/date'
import Calendar from '../index.vue'

const selectedDate = ref<any>(undefined)

// 禁用週末
const isDateDisabled = (date: any) => {
  return date.getDayOfWeek() === 6 || date.getDayOfWeek() === 0 // 週六和週日
}

// 標記未來7天為不可用
const isDateUnavailable = (date: any) => {
  const currentDate = today(getLocalTimeZone())
  const futureDate = currentDate.add({ days: 7 })
  return date.compare(currentDate) > 0 && date.compare(futureDate) <= 0
}
</script>

<style scoped>
.demo-container {
  padding: 2rem;
  max-width: 600px;
}

h3 {
  margin-bottom: 1rem;
  color: #374151;
  font-weight: 600;
}

p {
  margin: 1rem 0;
  color: #6b7280;
}
</style>
