<template>
  <div class="demo-section">
    <h4>基本折疊面板</h4>
    <Collapsible v-model:open="basicOpen">
      <template #trigger>
        <span>點擊展開/收合內容</span>
      </template>
      <div class="demo-content">
        <p>這是一段可以展開和收合的內容。</p>
        <p>你可以在這裡放置任何內容，比如表單、列表或其他組件。</p>
      </div>
    </Collapsible>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Collapsible from '../index.vue'

const basicOpen = ref(false)
</script>

<style lang="postcss" scoped>
.demo-section {
  @apply space-y-3;
  width: 300px;
}

.space-y-3 > * + * {
  @apply mt-3;
}

.space-y-1 > * + * {
  @apply mt-1;
}

h5 {
  @apply text-sm font-medium text-gray-900;
}

h6 {
  @apply text-sm font-semibold text-gray-900;
}
</style>
