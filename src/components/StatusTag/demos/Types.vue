<template>
  <div class="demo-container">
    <h3>圈點顏色類型</h3>
    <div class="demo-section">
      <SHStatusTag value="Primary" type="primary" />
      <SHStatusTag value="Success" type="success" />
      <SHStatusTag value="Info" type="info" />
      <SHStatusTag value="Warning" type="warning" />
      <SHStatusTag value="Danger" type="danger" />
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
