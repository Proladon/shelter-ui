<template>
  <div>
    <SHDatePicker v-model="selectedDate" placeholder="請選擇日期" />
    <p>選擇的日期: {{ selectedDate }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHDatePicker } from '@proladon/shelter-ui'

const selectedDate = ref()
</script>
