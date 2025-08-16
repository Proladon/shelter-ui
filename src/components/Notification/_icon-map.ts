// Tabler icon mapping for Notification
import {
  IconInfoCircle,
  IconCircleCheck,
  IconAlertTriangle,
  IconX,
} from '@tabler/icons-vue'
import type { Component } from 'vue'
import type { NotificationType } from './types'

export const notificationIconMap: Record<NotificationType, Component> = {
  info: IconInfoCircle,
  success: IconCircleCheck,
  warning: IconAlertTriangle,
  error: IconX,
}
