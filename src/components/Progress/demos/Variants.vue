<template>
  <div class="demo-section">
    <h4>不同變體</h4>
    <div class="space-y-4">
      <div>
        <span class="demo-label">默認：</span>
        <Progress
          size="large"
          :value="variantProgress"
          variant="default"
          :show-text="true"
        />
      </div>
      <div>
        <span class="demo-label">條紋：</span>
        <Progress
          size="large"
          :value="variantProgress"
          variant="striped"
          :show-text="true"
        />
      </div>
      <div>
        <span class="demo-label">動畫：</span>
        <Progress
          size="large"
          :value="variantProgress"
          variant="animated"
          :show-text="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Progress from '../index.vue'

const variantProgress = ref(75)

let timer: number | null = null

onMounted(() => {
  timer = setInterval(() => {
    variantProgress.value = (variantProgress.value + 3) % 100
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
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
