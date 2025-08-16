<template>
  <slot />
  <Teleport to="body">
    <div
      v-if="notifications.length > 0"
      class="sh-notification-container"
      :class="[`sh-notification-container--${placement}`]"
      :style="containerStyle"
    >
      <TransitionGroup
        name="notification"
        tag="div"
        class="sh-notification-list"
        :style="listStyle"
      >
        <SHNotification
          v-for="notification in notifications"
          :key="notification.key"
          :config="notification"
          :on-close="removeNotification"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, provide, reactive } from 'vue'
import type {
  NotificationProviderProps,
  NotificationApi,
  NotificationConfig,
  NotificationInstance,
} from './types'
import SHNotification from './Notification.vue'

defineOptions({
  name: 'SHNotificationProvider',
})

const props = withDefaults(defineProps<NotificationProviderProps>(), {
  max: 10,
  placement: 'top-right',
  gap: 8,
  offset: 16,
})

// 通知列表
const notifications = reactive<NotificationInstance[]>([])

// 生成唯一 key
const generateKey = (): string => {
  return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// 創建通知實例
const createNotification = (config: NotificationConfig): string => {
  const key = generateKey()
  const notification: NotificationInstance = {
    ...config,
    key,
    timestamp: Date.now(),
    type: config.type || 'info',
    duration: config.duration ?? 4500,
    closable: config.closable ?? true,
  }

  // 檢查數量限制
  if (notifications.length >= props.max) {
    // 移除最舊的通知
    notifications.shift()
  }

  notifications.push(notification)
  return key
}

// 移除通知
const removeNotification = (key: string): void => {
  const index = notifications.findIndex((n) => n.key === key)
  if (index > -1) {
    notifications.splice(index, 1)
  }
}

// 銷毀所有通知
const destroyAll = (): void => {
  notifications.splice(0)
}

// 通知 API
const notificationApi: NotificationApi = {
  create: createNotification,
  info: (config) => createNotification({ ...config, type: 'info' }),
  success: (config) => createNotification({ ...config, type: 'success' }),
  warning: (config) => createNotification({ ...config, type: 'warning' }),
  error: (config) => createNotification({ ...config, type: 'error' }),
  destroy: removeNotification,
  destroyAll,
}

// 注入 API
provide('notificationApi', notificationApi)

// 計算容器樣式
const containerStyle = computed(() => {
  const styles: Record<string, string> = {
    zIndex: '9999',
    position: 'fixed',
    pointerEvents: 'none',
  }

  switch (props.placement) {
    case 'top-right':
      styles.top = `${props.offset}px`
      styles.right = `${props.offset}px`
      break
    case 'top-left':
      styles.top = `${props.offset}px`
      styles.left = `${props.offset}px`
      break
    case 'bottom-right':
      styles.bottom = `${props.offset}px`
      styles.right = `${props.offset}px`
      break
    case 'bottom-left':
      styles.bottom = `${props.offset}px`
      styles.left = `${props.offset}px`
      break
    case 'top':
      styles.top = `${props.offset}px`
      styles.left = '50%'
      styles.transform = 'translateX(-50%)'
      break
    case 'bottom':
      styles.bottom = `${props.offset}px`
      styles.left = '50%'
      styles.transform = 'translateX(-50%)'
      break
  }

  return styles
})

// 計算列表樣式
const listStyle = computed(() => ({
  display: 'flex',
  flexDirection: props.placement.includes('bottom')
    ? 'column-reverse'
    : 'column',
  gap: `${props.gap}px`,
  pointerEvents: 'auto',
}))
</script>

<style lang="scss" scoped>
.sh-notification-container {
  @apply max-w-screen-sm;
}

.sh-notification-list {
  @apply space-y-0;
}

/* 通知進入/離開動畫 */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.notification-move {
  transition: transform 0.3s ease;
}

/* 針對不同位置的動畫調整 */
.sh-notification-container--top-left .notification-enter-from,
.sh-notification-container--bottom-left .notification-enter-from {
  transform: translateX(-100%);
}

.sh-notification-container--top-left .notification-leave-to,
.sh-notification-container--bottom-left .notification-leave-to {
  transform: translateX(-100%);
}

.sh-notification-container--top .notification-enter-from,
.sh-notification-container--bottom .notification-enter-from {
  transform: translateY(-100%);
}

.sh-notification-container--top .notification-leave-to,
.sh-notification-container--bottom .notification-leave-to {
  transform: translateY(-100%);
}
</style>
