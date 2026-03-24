<template>
  <div class="demo-container flex flex-col gap-[var(--sh-spacing-lg)]">
    <div>
      <p
        class="text-text.primary text-[length:var(--sh-font-size-sm)] mb-[var(--sh-spacing-sm)]"
      >
        Basic (6 cells)
      </p>
      <SHPinInput v-model="value1" @complete="onComplete" />
      <p
        class="text-text.primary text-[length:var(--sh-font-size-sm)] mt-[var(--sh-spacing-sm)]"
      >
        Value: {{ value1 }}
      </p>
    </div>

    <div>
      <p
        class="text-text.primary text-[length:var(--sh-font-size-sm)] mb-[var(--sh-spacing-sm)]"
      >
        4-cell PIN
      </p>
      <SHPinInput v-model="value2" :length="4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHPinInput from '../index.vue'

const value1 = ref<string[]>([])
const value2 = ref<string[]>([])

const onComplete = (val: string[]) => {
  console.log('Complete:', val.join(''))
}
</script>
