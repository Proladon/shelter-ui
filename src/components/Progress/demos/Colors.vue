<template>
  <div class="demo-section">
    <h4>自定義顏色和高度</h4>
    <div class="space-y-4">
      <div>
        <span class="demo-label">紅色：</span>
        <Progress :value="colorProgress" color="#ef4444" :show-text="true" />
      </div>
      <div>
        <span class="demo-label">綠色：</span>
        <Progress :value="colorProgress" color="#22c55e" :show-text="true" />
      </div>
      <div>
        <span class="demo-label">自定義高度 (15px)：</span>
        <Progress
          :value="colorProgress"
          color="#8b5cf6"
          height="15px"
          :show-text="true"
        />
      </div>
      <div>
        <span class="demo-label">數字高度 (20)：</span>
        <Progress
          :value="colorProgress"
          color="#f59e0b"
          :height="20"
          :show-text="true"
        />
      </div>
    </div>
    <SHButton @click="increaseColor">增加進度</SHButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Progress from '../index.vue'
import { SHButton } from '@/index'

const colorProgress = ref(65)

const increaseColor = () => {
  if (colorProgress.value >= 100) {
    colorProgress.value = 0
    return
  }
  colorProgress.value = Math.min(colorProgress.value + 10, 100)
}
</script>

<style scoped lang="postcss">
.demo-section {
  @apply space-y-5 w-[300px];
}
.demo-label {
  @apply text-sm text-gray-600 inline-block w-20;
}

.space-y-4 > * + * {
  @apply mt-4;
}
</style>
