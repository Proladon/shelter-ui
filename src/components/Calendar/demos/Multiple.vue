<template>
  <div class="demo-container">
    <Calendar v-model="selected" multiple />
    <p class="demo-result">
      Selected:
      {{
        selected?.length ? selected.map((d) => d.toString()).join(', ') : 'None'
      }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DateValue } from '@internationalized/date'
import Calendar from '../index.vue'

const selected = ref<DateValue[]>([])
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: var(--sh-spacing-md);
  padding: var(--sh-spacing-xl);
}

.demo-result {
  @apply text-text.base text-[length:var(--sh-font-size-sm)];
}
</style>
