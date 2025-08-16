<template>
  <div class="demo-section">
    <div class="demo-controls">
      <SHButton @click="showInfo">信息通知</SHButton>
      <SHButton @click="showSuccess" type="success">成功通知</SHButton>
      <SHButton @click="showWarning" type="warning">警告通知</SHButton>
      <SHButton @click="showError" type="danger">錯誤通知</SHButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from '../useNotification'
import SHButton from '../../Button/index.vue'

const notification = useNotification()

const showInfo = () => {
  notification.info({
    title: '信息通知',
    message: '這是一則信息通知，用於提示用戶一般性信息。',
  })
}

const showSuccess = () => {
  notification.success({
    title: '操作成功',
    message: '您的操作已成功完成！',
  })
}

const showWarning = () => {
  notification.warning({
    title: '注意事項',
    message: '請注意，這個操作可能會影響您的數據。',
  })
}

const showError = () => {
  notification.error({
    title: '錯誤發生',
    message: '抱歉，操作失敗了，請稍後再試。',
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
