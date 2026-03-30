<template>
  <div class="max-w-lg flex flex-col gap-4">
    <p class="text-[length:var(--sh-font-size-sm)] text-text.primary">
      禁用狀態：
    </p>
    <SHChatInput v-model="message" placeholder="已停用輸入…" disabled />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHChatInput from '../index.vue'

const message = ref('')
</script>
