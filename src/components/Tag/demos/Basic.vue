<template>
  <div class="demo-container">
    <h3>基本用法</h3>
    <div class="demo-section">
      <SHTag value="基本標籤" />
      <SHTag value="預設" />
      <SHTag value="New" />
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
