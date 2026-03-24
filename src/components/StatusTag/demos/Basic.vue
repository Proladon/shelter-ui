<template>
  <div class="demo-container">
    <h3>基本用法</h3>
    <div class="demo-section">
      <SHStatusTag value="Online" type="success" />
      <SHStatusTag value="Offline" type="danger" />
      <SHStatusTag value="Idle" type="warning" />
      <SHStatusTag value="Unknown" type="info" />
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
