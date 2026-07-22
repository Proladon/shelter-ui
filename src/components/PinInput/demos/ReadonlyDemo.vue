<template>
  <div class="demo-container">
    <p
      class="text-text.primary text-[length:var(--sh-font-size-sm)] mb-[var(--sh-spacing-sm)]"
    >
      Readonly
    </p>
    <SHPinInput v-model:value="value" readonly />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHPinInput from '../index.vue'

const value = ref<string[]>(['1', '2', '3'])
</script>
