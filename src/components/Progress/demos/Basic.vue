<template>
  <div class="demo-container">
    <h3>Progress 基本示例</h3>

    <div class="demo-section">
      <h4>基本進度條</h4>
      <Progress v-model="basicProgress" :show-text="true" class="mb-4" />
      <button @click="increaseBasic" class="demo-button">增加進度</button>
    </div>

    <div class="demo-section">
      <h4>不同尺寸</h4>
      <div class="space-y-4">
        <div>
          <span class="demo-label">小尺寸：</span>
          <Progress v-model="sizeProgress" size="small" :show-text="true" />
        </div>
        <div>
          <span class="demo-label">默認尺寸：</span>
          <Progress v-model="sizeProgress" size="default" :show-text="true" />
        </div>
        <div>
          <span class="demo-label">大尺寸：</span>
          <Progress v-model="sizeProgress" size="large" :show-text="true" />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>不同變體</h4>
      <div class="space-y-4">
        <div>
          <span class="demo-label">默認：</span>
          <Progress
            v-model="variantProgress"
            variant="default"
            :show-text="true"
          />
        </div>
        <div>
          <span class="demo-label">條紋：</span>
          <Progress
            v-model="variantProgress"
            variant="striped"
            :show-text="true"
          />
        </div>
        <div>
          <span class="demo-label">動畫：</span>
          <Progress
            v-model="variantProgress"
            variant="animated"
            :show-text="true"
          />
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>自定義格式</h4>
      <Progress
        v-model="customProgress"
        :show-text="true"
        :format-text="(value, max) => `${value}/${max} 已完成`"
        class="mb-4"
      />
      <button @click="increaseCustom" class="demo-button">增加進度</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Progress from '../index.vue'

const basicProgress = ref(30)
const sizeProgress = ref(60)
const variantProgress = ref(75)
const customProgress = ref(40)

let timer: number | null = null

onMounted(() => {
  timer = setInterval(() => {
    sizeProgress.value = (sizeProgress.value + 5) % 100
    variantProgress.value = (variantProgress.value + 3) % 100
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const increaseBasic = () => {
  basicProgress.value = Math.min(basicProgress.value + 10, 100)
}

const increaseCustom = () => {
  customProgress.value = Math.min(customProgress.value + 10, 100)
}
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply p-6 space-y-6;
}

.demo-section {
  @apply space-y-3;
}

.demo-label {
  @apply text-sm text-gray-600 inline-block w-20;
}

.demo-button {
  @apply px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors;
}

.space-y-4 > * + * {
  @apply mt-4;
}

.space-y-3 > * + * {
  @apply mt-3;
}

.space-y-6 > * + * {
  @apply mt-6;
}
</style>
