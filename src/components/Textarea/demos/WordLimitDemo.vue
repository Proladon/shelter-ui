<template>
  <div class="demo-container">
    <h3>字元計數</h3>
    
    <div class="demo-section">
      <h4>顯示字元計數（最大 100 字元）</h4>
      <Textarea
        v-model:value="limitedText"
        placeholder="最多可輸入 100 個字元..."
        :maxlength="100"
        :show-word-limit="true"
        :rows="4"
      />
    </div>

    <div class="demo-section">
      <h4>限制字元數但不顯示計數</h4>
      <Textarea
        v-model:value="hiddenLimitText"
        placeholder="最多可輸入 50 個字元，但不顯示計數..."
        :maxlength="50"
        :show-word-limit="false"
        :rows="3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const limitedText = ref('')
const hiddenLimitText = ref('')
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
