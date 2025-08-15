<template>
  <div class="demo-section">
    <h4>未設置 / 未知</h4>
    <Progress :value="null" :show-text="true" class="mb-4" />
  </div>
</template>

<script setup lang="ts">
import Progress from '../index.vue'
</script>

<style scoped lang="postcss">
.demo-section {
  @apply space-y-5 w-[300px];
}
</style>
