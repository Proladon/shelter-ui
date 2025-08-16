<template>
  <div class="demo-section">
    <div class="demo-controls">
      <SHButton @click="showWithCustomIcon">自定義圖標</SHButton>
      <SHButton @click="showWithActions">帶操作按鈕</SHButton>
      <SHButton @click="showWithCallback">帶回調函數</SHButton>
      <SHButton @click="showRichContent">豐富內容</SHButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from '../useNotification'
import SHButton from '../../Button/index.vue'
import { IconHeart, IconBell } from '@tabler/icons-vue'

const notification = useNotification()

const showWithCustomIcon = () => {
  notification.create({
    title: '自定義圖標',
    message: '這個通知使用了自定義的愛心圖標。',
    type: 'success',
    icon: IconHeart,
  })
}

const showWithActions = () => {
  notification.info({
    title: '系統更新可用',
    message: '新版本已發布，建議您更新到最新版本以獲得更好的使用體驗。',
    duration: 0,
    onClick: () => {
      console.log('通知被點擊了')
      alert('您點擊了通知！在實際應用中，這裡可以執行相應的操作。')
    },
  })
}

const showWithCallback = () => {
  notification.success({
    title: '帶回調的通知',
    message: '這個通知有點擊和關閉的回調函數。',
    onClick: () => {
      console.log('通知被點擊')
      alert('通知被點擊了！')
    },
    onClose: () => {
      console.log('通知被關閉')
      alert('通知被關閉了！')
    },
  })
}

const showRichContent = () => {
  notification.create({
    title: '📢 重要公告',
    message:
      '我們的系統將在今晚 23:00-01:00 進行維護升級，期間服務可能會短暫中斷。感謝您的耐心等候！如有疑問，請聯繫客服團隊。',
    type: 'warning',
    icon: IconBell,
    duration: 8000,
  })
}
</script>

<style lang="postcss" scoped>
.demo-section {
  @apply space-y-4;
}

.demo-controls {
  @apply flex gap-3 flex-wrap;
}
</style>
