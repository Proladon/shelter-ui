import { inject } from 'vue'
import type { NotificationApi } from './types'
import { notificationApiKey } from './context'

/**
 * 使用通知 API 的組合函數
 * 必須在 SHNotificationProvider 的子組件中使用
 */
export function useNotification(): NotificationApi {
  const api = inject(notificationApiKey)

  if (!api) {
    throw new Error(
      'useNotification() 必須在 SHNotificationProvider 的子組件中使用。' +
        '請確保將調用此 hook 的組件包裹在 <SHNotificationProvider> 標籤內。',
    )
  }

  return api
}
