import type { InjectionKey } from 'vue'
import type { NotificationApi } from './types'

export const notificationApiKey: InjectionKey<NotificationApi> =
  Symbol('notificationApi')
