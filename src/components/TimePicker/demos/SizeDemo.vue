<template>
  <div class="demo-container">
    <div class="demo-item">
      <TimePicker v-model:value="small" size="small" placeholder="Small" />
    </div>
    <div class="demo-item">
      <TimePicker v-model:value="medium" size="medium" placeholder="Medium" />
    </div>
    <div class="demo-item">
      <TimePicker v-model:value="large" size="large" placeholder="Large" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TimePicker from '../index.vue'

const small = ref<string>()
const medium = ref<string>()
const large = ref<string>()
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
