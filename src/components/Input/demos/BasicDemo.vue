<template>
  <div class="demo-container">
    <s-input v-model="inputValue" placeholder="Please input..." />
    <div class="value-display">Current Value: {{ inputValue }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
</script>

<style scoped>
.demo-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}

.value-display {
  margin-top: 16px;
  font-size: 14px;
  color: #666;
}
</style>
