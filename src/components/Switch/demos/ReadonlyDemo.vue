<template>
  <div class="demo-container">
    <div class="demo-row">
      <p class="demo-label">一般（可切換）</p>
      <SHSwitch v-model:value="normalChecked" />
    </div>

    <div class="demo-row">
      <p class="demo-label">唯讀（不可切換）</p>
      <SHSwitch v-model:value="readonlyChecked" readonly />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHSwitch from '../index.vue'

const normalChecked = ref(true)
const readonlyChecked = ref(true)
</script>

<style scoped>
.demo-container {
  @apply flex flex-col gap-4;
}
.demo-row {
  @apply flex items-center gap-3;
}
.demo-label {
  @apply w-36 text-sm text-text.base;
}
</style>
