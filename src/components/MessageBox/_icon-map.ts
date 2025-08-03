// Tabler icon mapping for MessageBox
import {
  IconInfoCircle,
  IconCircleCheck,
  IconX,
  IconInfoSquare,
  IconAlertTriangle,
} from '@tabler/icons-vue'
import type { Component } from 'vue'
import type { MessageBoxType } from './types'

export const messageBoxIconMap: Record<MessageBoxType, Component> = {
  info: IconInfoCircle,
  danger: IconX,
  success: IconCircleCheck,
  warning: IconAlertTriangle,
  normal: IconInfoSquare,
}
