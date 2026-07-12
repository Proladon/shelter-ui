<template>
  <div class="demo-container flex flex-col gap-[var(--sh-spacing-lg)]">
    <div>
      <p
        class="text-text.primary text-[length:var(--sh-font-size-sm)] mb-[var(--sh-spacing-sm)]"
      >
        Small
      </p>
      <SHPinInput v-model:value="value" size="sm" />
    </div>

    <div>
      <p
        class="text-text.primary text-[length:var(--sh-font-size-sm)] mb-[var(--sh-spacing-sm)]"
      >
        Medium (default)
      </p>
      <SHPinInput v-model:value="value" size="md" />
    </div>

    <div>
      <p
        class="text-text.primary text-[length:var(--sh-font-size-sm)] mb-[var(--sh-spacing-sm)]"
      >
        Large
      </p>
      <SHPinInput v-model:value="value" size="lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHPinInput from '../index.vue'

const value = ref<string[]>([])
</script>
