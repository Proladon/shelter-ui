import {
  IconInfoCircle,
  IconCircleCheck,
  IconAlertTriangle,
  IconX,
  IconInfoSquare,
  IconAlertCircle,
} from '@tabler/icons-vue'
import type { Component } from 'vue'
import type { NotificationType } from '@/components/Notification/types'
import type { MessageBoxType } from '@/components/MessageBox/types'
import type { AlertDialogType } from '@/components/AlertDialog/types'

// Tabler icon mapping for Notification
export const notificationIconMap: Record<NotificationType, Component> = {
  info: IconInfoCircle,
  success: IconCircleCheck,
  warning: IconAlertTriangle,
  danger: IconX,
}

// Tabler icon mapping for MessageBox
export const messageBoxIconMap: Record<MessageBoxType, Component> = {
  info: IconInfoCircle,
  danger: IconX,
  success: IconCircleCheck,
  warning: IconAlertTriangle,
  default: IconInfoSquare,
}

// Tabler icon mapping for AlertDialog
export const alertDialogIconMap: Record<AlertDialogType, Component> = {
  danger: IconAlertCircle,
  warning: IconAlertTriangle,
  info: IconInfoCircle,
  success: IconCircleCheck,
}
