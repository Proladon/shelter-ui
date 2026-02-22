<template>
  <div class="number-input-demo">
    <h4 class="number-input-demo__title">基礎數字輸入</h4>

    <NumberInput v-model="value" :min="0" :max="100" :step="1" />

    <p class="number-input-demo__value">目前值：{{ value }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import NumberInput from '../index.vue'

const value = ref(10)
</script>

<style scoped lang="postcss">
.number-input-demo {
  @apply w-[280px] flex flex-col gap-3;
}

.number-input-demo__title {
  @apply text-text.base text-sm;
}

.number-input-demo__value {
  @apply text-text.base text-sm;
}
</style>
