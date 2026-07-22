<script setup lang="ts">
import { shallowRef } from 'vue'
import { CalendarDate } from '@internationalized/date'
import SHDatePicker from '../index.vue'
import type { DateValue } from '@internationalized/date'

// shallowRef preserves class identity for DateValue, avoiding UnwrapRef
// stripping the #private discriminant that DateValue classes rely on.
const date = shallowRef<DateValue | undefined>(new CalendarDate(2026, 3, 21))
</script>

<template>
  <div class="demo-container">
    <SHDatePicker
      :value="date"
      clearable
      @update:value="
        (v) => {
          date = v as DateValue | undefined
        }
      "
    />
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 300px;
}
</style>
