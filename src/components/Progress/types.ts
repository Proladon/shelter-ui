import type { ProgressRootProps } from 'reka-ui'

export interface ProgressProps extends ProgressRootProps {
  value: number | null
  max?: number
  size?: 'small' | 'default' | 'large'
  variant?: 'default' | 'striped' | 'animated'
  showText?: boolean
  formatText?: (value: number | null, max: number) => string
  color?: string
  height?: string | number
  textPosition?: 'left' | 'bottom' | 'right'
}

export interface ProgressSlots {
  default?: any
}
