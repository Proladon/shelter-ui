<template>
  <div class="demo-container">
    <h3>Loading 狀態</h3>
    <div class="demo-section">
      <SHStatusTag value="Connecting..." type="primary" loading />
      <SHStatusTag value="Syncing" type="info" loading />
      <SHStatusTag value="Processing" type="warning" loading />
      <SHStatusTag value="Uploading" type="success" loading />
    </div>
  </div>
</template>

<script setup lang="ts">
import SHStatusTag from '../index.vue'
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply space-y-4;
}
.demo-section {
  @apply flex items-center gap-3 flex-wrap;
}
</style>
