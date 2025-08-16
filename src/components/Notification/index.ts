import SHNotificationProvider from './NotificationProvider.vue'
import SHNotification from './Notification.vue'
import { useNotification } from './useNotification'

export { SHNotificationProvider, SHNotification, useNotification }
export default SHNotificationProvider

export type {
  NotificationConfig,
  NotificationInstance,
  NotificationProviderProps,
  NotificationApi,
  NotificationProps,
  NotificationEmits,
  NotificationSlots,
  NotificationType,
} from './types'
