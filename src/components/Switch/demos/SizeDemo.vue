<template>
  <div class="demo-container">
    <div class="demo-row">
      <p class="demo-label">Small</p>
      <SHSwitch v-model:value="smallOff" size="small" />
      <SHSwitch v-model:value="smallOn" size="small" />
    </div>

    <div class="demo-row">
      <p class="demo-label">Medium (default)</p>
      <SHSwitch v-model:value="mediumOff" size="medium" />
      <SHSwitch v-model:value="mediumOn" size="medium" />
    </div>

    <div class="demo-row">
      <p class="demo-label">Large</p>
      <SHSwitch v-model:value="largeOff" size="large" />
      <SHSwitch v-model:value="largeOn" size="large" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHSwitch from '../index.vue'

const smallOff = ref(false)
const smallOn = ref(true)
const mediumOff = ref(false)
const mediumOn = ref(true)
const largeOff = ref(false)
const largeOn = ref(true)
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
