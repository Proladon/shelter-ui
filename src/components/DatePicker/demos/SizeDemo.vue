<script setup lang="ts">
import { shallowRef } from 'vue'
import SHDatePicker from '../index.vue'
import type { DateValue } from '@internationalized/date'

// shallowRef preserves class identity for DateValue, avoiding UnwrapRef
// stripping the #private discriminant that DateValue classes rely on.
const small = shallowRef<DateValue | undefined>(undefined)
const medium = shallowRef<DateValue | undefined>(undefined)
const large = shallowRef<DateValue | undefined>(undefined)
</script>

<template>
  <div class="flex flex-col gap-4" style="width: 260px">
    <SHDatePicker
      :value="small"
      size="small"
      @update:value="(v) => (small = v as DateValue | undefined)"
    />
    <SHDatePicker
      :value="medium"
      size="medium"
      @update:value="(v) => (medium = v as DateValue | undefined)"
    />
    <SHDatePicker
      :value="large"
      size="large"
      @update:value="(v) => (large = v as DateValue | undefined)"
    />
  </div>
</template>
