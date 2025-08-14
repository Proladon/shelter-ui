<template>
  <div class="demo-container">
    <h3>基本用法</h3>
    <Textarea
      v-model:value="text"
      placeholder="請輸入內容..."
      :rows="4"
    />
    
    <div class="mt-4">
      <strong>輸入的內容：</strong>
      <p class="mt-2 p-2 bg-gray-100 rounded">{{ text || '尚未輸入內容' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const text = ref('')
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply p-4;
}
</style>
