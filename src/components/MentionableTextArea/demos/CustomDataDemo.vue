<template>
  <div class="space-y-4">
    <MentionableTextArea
      v-model="value"
      label="自定義數據"
      placeholder="輸入 @ 來提及自定義用戶列表"
      :rows="4"
      :user-list="customUsers"
      :issue-list="customIssues"
      :emoji-list="customEmojis"
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
import type { MentionItem } from '../types'

const value = ref('使用自定義數據：@')

const customUsers: MentionItem[] = [
  { value: '@張小明', listValue: '張小明 - 前端工程師' },
  { value: '@李小華', listValue: '李小華 - 後端工程師' },
  { value: '@王小美', listValue: '王小美 - UI/UX 設計師' },
  { value: '@陳小強', listValue: '陳小強 - 產品經理' },
]

const customIssues: MentionItem[] = [
  { value: '#001', listValue: '#001 修復登入頁面問題' },
  { value: '#002', listValue: '#002 新增用戶管理功能' },
  { value: '#003', listValue: '#003 優化頁面載入速度' },
]

const customEmojis: MentionItem[] = [
  { value: '🎉', listValue: '🎉 慶祝' },
  { value: '✅', listValue: '✅ 完成' },
  { value: '🚀', listValue: '🚀 發布' },
  { value: '🐛', listValue: '🐛 錯誤' },
]
</script>
