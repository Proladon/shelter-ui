<template>
  <div class="demo-container">
    <h3>不同尺寸</h3>

    <div class="demo-section">
      <h4>Small</h4>
      <Textarea
        v-model:value="smallText"
        placeholder="Small textarea..."
        size="small"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>Medium（預設）</h4>
      <Textarea
        v-model:value="mediumText"
        placeholder="Medium textarea..."
        size="medium"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>Large</h4>
      <Textarea
        v-model:value="largeText"
        placeholder="Large textarea..."
        size="large"
        :rows="3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const smallText = ref('')
const mediumText = ref('')
const largeText = ref('')
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply p-4;
}

.demo-section {
  @apply mb-6;
}

h4 {
  @apply mb-2 font-medium;
}
</style>
