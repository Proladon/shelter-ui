<template>
  <div class="demo-container">
    <h3>基本用法</h3>
    <div class="demo-section">
      <SHRadio v-model="selectedValue" value="option1" label="選項一" />
      <SHRadio v-model="selectedValue" value="option2" label="選項二" />
      <SHRadio v-model="selectedValue" value="option3" label="選項三" />
    </div>

    <div class="demo-result">
      <p>選中的值：{{ selectedValue || "無" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import SHRadio from "../index.vue"

const selectedValue = ref(null)
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply space-y-4;
}

.demo-section {
  @apply space-y-2;
}

.demo-result {
  @apply mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded;
}
</style>
