import { inject } from 'vue'
import type { NotificationApi } from './types'

/**
 * 使用通知 API 的組合函數
 * 必須在 SHNotificationProvider 的子組件中使用
 */
export function useNotification(): NotificationApi {
  const api = inject<NotificationApi>('notificationApi')

  if (!api) {
    throw new Error(
      'useNotification() 必須在 SHNotificationProvider 的子組件中使用。' +
        '請確保將調用此 hook 的組件包裹在 <SHNotificationProvider> 標籤內。',
    )
  }

  return api
}
