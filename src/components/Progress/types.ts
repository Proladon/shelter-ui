import type { ProgressRootProps } from 'reka-ui'

export interface ProgressProps extends ProgressRootProps {
  size?: 'small' | 'default' | 'large'
  variant?: 'default' | 'striped' | 'animated'
  showText?: boolean
  formatText?: (value: number | null, max: number) => string
}

export interface ProgressSlots {
  default?: any
}
