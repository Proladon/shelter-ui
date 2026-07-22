<template>
  <div class="demo-container">
    <SHInput v-model:value="smallValue" size="small" placeholder="Small" />
    <SHInput
      v-model:value="mediumValue"
      size="medium"
      placeholder="Medium (default)"
    />
    <SHInput v-model:value="largeValue" size="large" placeholder="Large" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const smallValue = ref('')
const mediumValue = ref('')
const largeValue = ref('')
</script>

<style scoped>
.demo-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
