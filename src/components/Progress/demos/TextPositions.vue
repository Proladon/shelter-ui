<template>
  <div class="demo-section">
    <h4>不同文字位置</h4>
    <div class="space-y-4">
      <div>
        <span class="demo-label">左側：</span>
        <Progress
          :value="basicProgress"
          :show-text="true"
          text-position="left"
        />
      </div>
      <div>
        <span class="demo-label">中間：</span>
        <Progress
          :value="basicProgress"
          :show-text="true"
          text-position="bottom"
        />
      </div>
      <div>
        <span class="demo-label">右側：</span>
        <Progress
          :value="basicProgress"
          :show-text="true"
          text-position="right"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Progress from '../index.vue'

const basicProgress = ref(30)
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
