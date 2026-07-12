<template>
  <div class="max-w-lg">
    <SHChatInput
      v-model:value="message"
      placeholder="輸入訊息…"
      @submit="handleSubmit"
      @file-select="handleFile"
      @image-select="handleImage"
    />
    <p
      v-if="lastSubmit"
      class="mt-3 text-[length:var(--sh-font-size-sm)] text-text.primary"
    >
      已送出：{{ lastSubmit }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHChatInput from '../index.vue'

const message = ref('')
const lastSubmit = ref('')

function handleSubmit(value: string) {
  lastSubmit.value = value
  message.value = ''
}

function handleFile(files: FileList) {
  console.log('選擇檔案：', files)
}

function handleImage(files: FileList) {
  console.log('選擇圖片：', files)
}
</script>
