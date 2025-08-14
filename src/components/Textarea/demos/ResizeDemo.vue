<template>
  <div class="demo-container">
    <h3>調整大小選項</h3>
    
    <div class="demo-section">
      <h4>垂直調整（預設）</h4>
      <Textarea
        v-model:value="text1"
        placeholder="可以垂直調整大小..."
        resize="vertical"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>水平調整</h4>
      <Textarea
        v-model:value="text2"
        placeholder="可以水平調整大小..."
        resize="horizontal"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>雙向調整</h4>
      <Textarea
        v-model:value="text3"
        placeholder="可以雙向調整大小..."
        resize="both"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>禁止調整</h4>
      <Textarea
        v-model:value="text4"
        placeholder="無法調整大小..."
        resize="none"
        :rows="3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const text1 = ref('')
const text2 = ref('')
const text3 = ref('')
const text4 = ref('')
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
