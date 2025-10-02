<template>
  <div>
    <SHDatePicker
      v-model="selectedDate"
      timezone="America/New_York"
      show-timezone
      placeholder="選擇日期（紐約時區）"
    />
    <p>選擇的日期: {{ selectedDate }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHDatePicker } from '@proladon/shelter-ui'

const selectedDate = ref()
</script>
