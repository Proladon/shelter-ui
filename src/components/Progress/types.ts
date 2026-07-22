import type { ProgressRootProps } from 'reka-ui'

export interface ProgressProps extends ProgressRootProps {
  value?: number | null
  percentage?: number
  max?: number
  size?: 'small' | 'medium' | 'large'
  variant?: 'default' | 'striped' | 'animated'
  showText?: boolean
  formatText?: (value: number | null, max: number) => string
  color?: string
  height?: string | number
  textPosition?: 'left' | 'bottom' | 'right'
  status?: string
  strokeWidth?: number
}

export interface ProgressSlots {
  default?: any
}

export interface ProgressEmits {
  (e: 'update:value', value: number): void
}
