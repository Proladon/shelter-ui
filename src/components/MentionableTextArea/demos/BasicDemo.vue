<template>
  <div class="space-y-4">
    <MentionableTextArea
      v-model="value"
      label="基本使用"
      placeholder="輸入 @, # 或 : 來觸發提及功能"
      :rows="4"
    />

    <div class="mt-4 p-3 bg-muted rounded">
      <h3 class="text-sm font-medium mb-2">當前值：</h3>
      <pre class="text-xs">{{ value }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MentionableTextArea from '../index.vue'

const value = ref('嘗試輸入 @user 或 #issue 或 :emoji')
</script>
