<template>
  <div class="demo-container">
    <Calendar :number-of-months="2" paged-navigation />
    <p class="demo-hint">Two months displayed side by side.</p>
  </div>
</template>

<script setup lang="ts">
import Calendar from '../index.vue'
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: var(--sh-spacing-md);
  padding: var(--sh-spacing-xl);
}

.demo-hint {
  @apply text-text.primary text-[length:var(--sh-font-size-sm)];
  margin: 0;
}
</style>
