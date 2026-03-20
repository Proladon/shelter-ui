<template>
  <div class="demo-container">
    <div class="demo-row">
      <p class="demo-label">Disabled</p>
      <Calendar disabled />
    </div>
    <div class="demo-row">
      <p class="demo-label">Readonly</p>
      <Calendar readonly />
    </div>
  </div>
</template>

<script setup lang="ts">
import Calendar from '../index.vue'
</script>

<style scoped>
.demo-container {
  display: flex;
  gap: var(--sh-spacing-xl);
  padding: var(--sh-spacing-xl);
  flex-wrap: wrap;
}

.demo-row {
  display: flex;
  flex-direction: column;
  gap: var(--sh-spacing-sm);
}

.demo-label {
  @apply text-text.primary text-[length:var(--sh-font-size-sm)];
  margin: 0;
}
</style>
