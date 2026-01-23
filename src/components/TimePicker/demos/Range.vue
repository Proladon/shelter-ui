<template>
  <div class="demo-container">
    <TimePicker v-model="timeRange" :range="true" placeholder="選擇時間範圍" />
    <p class="demo-result">
      選中的範圍:
      {{
        timeRange?.start && timeRange?.end
          ? `${timeRange.start} ~ ${timeRange.end}`
          : '無'
      }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TimePicker from '../index.vue'
import type { TimeRange } from '../types'

const timeRange = ref<TimeRange>()
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

.demo-result {
  @apply text-text.base;
}
</style>
