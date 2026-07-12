import type { SliderRootProps } from 'reka-ui'

export interface SliderProps extends Omit<SliderRootProps, 'modelValue'> {
  /** The controlled value of the slider. Bind with `v-model:value`. */
  value?: number[] | null
  size?: 'small' | 'default' | 'large'
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  showTooltip?: boolean
  formatTooltip?: (value: number) => string
  showMarks?: boolean
  marks?: Record<number, string>
}

export interface SliderSlots {
  default?: any
  tooltip?: { value: number; index: number }
  mark?: { value: number; label: string }
}
