<template>
  <div class="demo-container">
    <h3>自動調整高度</h3>

    <div class="demo-section">
      <h4>自動調整高度（最小 3 行）</h4>
      <Textarea
        v-model:value="autoText"
        placeholder="輸入多行內容試試看自動調整高度的效果..."
        :autosize="true"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>固定高度（對比）</h4>
      <Textarea
        v-model:value="fixedText"
        placeholder="這是固定高度的 textarea..."
        :autosize="false"
        :rows="3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const autoText = ref('')
const fixedText = ref('')
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
