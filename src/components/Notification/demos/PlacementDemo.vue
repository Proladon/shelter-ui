<template>
  <div class="demo-section">
    <div class="demo-controls">
      <div class="placement-grid">
        <SHButton @click="() => showNotification('top-left')">左上角</SHButton>
        <SHButton @click="() => showNotification('top')">頂部中央</SHButton>
        <SHButton @click="() => showNotification('top-right')">右上角</SHButton>
        <SHButton @click="() => showNotification('bottom-left')"
          >左下角</SHButton
        >
        <SHButton @click="() => showNotification('bottom')">底部中央</SHButton>
        <SHButton @click="() => showNotification('bottom-right')"
          >右下角</SHButton
        >
      </div>
    </div>

    <div class="demo-note">
      <p class="text-sm text-text.base.fade">
        注意：此演示僅顯示右上角位置的通知，因為組件位於 Provider 內部。
        在實際使用中，您可以設置 NotificationProvider 的 placement
        屬性來控制位置。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from '../useNotification'
import SHButton from '../../Button/index.vue'
import type { NotificationProviderProps } from '../types'

const notification = useNotification()

const showNotification = (
  placement: NotificationProviderProps['placement'],
) => {
  notification.info({
    title: `${placement} 位置`,
    message: `這是一個顯示在 ${placement} 位置的通知。`,
    duration: 3000,
  })
}
</script>

<style lang="postcss" scoped>
.demo-section {
  @apply space-y-4;
}

.placement-grid {
  @apply grid grid-cols-3 gap-3 max-w-md;
}

.demo-note {
  @apply p-3 bg-bg.secondary rounded-md border border-border.base;
}
</style>
