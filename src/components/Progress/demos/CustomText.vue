<template>
  <div class="demo-section">
    <h4>自定義顯示文字格式</h4>
    <Progress
      :value="customProgress"
      :show-text="true"
      class="mb-4"
      :format-text="
        (value, max) => {
          if (value === null) return '未知'
          return `已完成 ${Math.round((value / max) * 100)}% 📶`
        }
      "
    />
    <button @click="increaseCustom" class="demo-button">增加進度</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Progress from '../index.vue'

const customProgress = ref(40)

const increaseCustom = () => {
  if (customProgress.value >= 100) {
    customProgress.value = 0
    return
  }
  customProgress.value = Math.min(customProgress.value + 10, 100)
}
</script>

<style scoped lang="postcss">
.demo-section {
  @apply space-y-5 w-[300px];
}
.demo-button {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors;
}
</style>
