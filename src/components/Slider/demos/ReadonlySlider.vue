<template>
  <div class="demo-section">
    <h4>唯讀滑桿</h4>
    <div class="mb-4">
      <span class="demo-label">值：{{ readonlyValue[0] }}（無法拖曳或以鍵盤變更）</span>
      <Slider
        v-model:value="readonlyValue"
        :min="0"
        :max="100"
        :step="1"
        readonly
        class="mt-2"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Slider from '../index.vue'

const readonlyValue = ref([50])
</script>

<style scoped lang="postcss">
.demo-section {
  @apply w-[300px];
}
</style>
