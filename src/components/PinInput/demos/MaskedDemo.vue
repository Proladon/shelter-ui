<template>
  <div class="demo-container flex flex-col gap-[var(--sh-spacing-lg)]">
    <div>
      <p
        class="text-text.primary text-[length:var(--sh-font-size-sm)] mb-[var(--sh-spacing-sm)]"
      >
        Masked (password)
      </p>
      <SHPinInput v-model="maskedValue" :mask="true" />
    </div>

    <div>
      <p
        class="text-text.primary text-[length:var(--sh-font-size-sm)] mb-[var(--sh-spacing-sm)]"
      >
        Number type
      </p>
      <SHPinInput v-model="numericValue" type="number" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHPinInput from '../index.vue'

const maskedValue = ref<string[]>([])
const numericValue = ref<string[]>([])
</script>
