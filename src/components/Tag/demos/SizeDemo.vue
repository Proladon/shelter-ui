<template>
  <div class="demo-container">
    <h3>尺寸變化</h3>
    <div class="demo-section">
      <SHTag value="Small" type="primary" size="small" />
      <SHTag value="Medium" type="primary" size="medium" />
      <SHTag value="Large" type="primary" size="large" />
    </div>
  </div>
</template>

<script setup lang="ts">
import SHTag from "../index.vue"
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply space-y-4;
}

.demo-section {
  @apply flex items-center gap-2 flex-wrap;
}
</style>
