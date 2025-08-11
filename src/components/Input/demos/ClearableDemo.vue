<template>
  <div class="demo-container">
    <SHInput
      v-model="inputValue"
      placeholder="Hover to see clear button"
      clearable
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('This text can be cleared')
</script>

<style scoped>
.demo-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
}
</style>
