<template>
  <div class="max-w-lg">
    <SHChatInput
      v-model:value="message"
      placeholder="詢問 AI 任何問題…"
      :submit-loading="loading"
      @submit="handleSubmit"
    >
      <template #block-start>
        <button class="context-chip" type="button">
          <IconAt :size="13" />
          <span>新增上下文</span>
        </button>
      </template>
    </SHChatInput>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconAt } from '@tabler/icons-vue'
import SHChatInput from '../index.vue'

const message = ref('')
const loading = ref(false)

function handleSubmit(value: string) {
  loading.value = true
  console.log('送出：', value)
  message.value = ''
  setTimeout(() => {
    loading.value = false
  }, 1500)
}
</script>

<style scoped>
.context-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: var(--sh-radius-sm);
  background: var(--sh-bg-secondary);
  border: 1px solid var(--sh-border-base);
  color: var(--sh-text-primary);
  font-size: var(--sh-font-size-sm);
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.context-chip:hover {
  background: var(--sh-primary-fade);
  border-color: var(--sh-primary);
  color: var(--sh-primary);
}
</style>
