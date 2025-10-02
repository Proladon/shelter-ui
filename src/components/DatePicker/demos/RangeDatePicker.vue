<template>
  <div>
    <SHDatePicker v-model="dateRange" range placeholder="請選擇日期範圍" />
    <p>選擇的範圍: {{ dateRange }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SHDatePicker } from '@proladon/shelter-ui'

const dateRange = ref([])
</script>
