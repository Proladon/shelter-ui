<template>
  <div class="demo-container">
    <h3>不同狀態</h3>
    
    <div class="demo-section">
      <h4>正常狀態</h4>
      <Textarea
        v-model:value="normalText"
        placeholder="正常的 textarea..."
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>禁用狀態</h4>
      <Textarea
        v-model:value="disabledText"
        placeholder="這是禁用的 textarea..."
        :disabled="true"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>唯讀狀態</h4>
      <Textarea
        v-model:value="readonlyText"
        placeholder="這是唯讀的 textarea..."
        :readonly="true"
        :rows="3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const normalText = ref('')
const disabledText = ref('這是禁用狀態的預設內容')
const readonlyText = ref('這是唯讀狀態的內容，無法編輯')
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
