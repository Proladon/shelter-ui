import {
  IconAlertTriangle,
  IconAlertCircle,
  IconCircleCheck,
  IconInfoCircle,
} from '@tabler/icons-vue'
import type { Component } from 'vue'
import type { AlertDialogType } from './types'

export const alertDialogIconMap: Record<AlertDialogType, Component> = {
  danger: IconAlertCircle,
  warning: IconAlertTriangle,
  info: IconInfoCircle,
  success: IconCircleCheck,
}
