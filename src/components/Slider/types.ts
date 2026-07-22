import type { SliderRootProps } from 'reka-ui'

export interface SliderProps extends Omit<SliderRootProps, 'modelValue'> {
  /** The controlled value of the slider. Bind with `v-model:value`. */
  value?: number[] | null
  size?: 'small' | 'medium' | 'large'
  type?: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'
  /** Whether the slider is read-only. Thumbs remain focusable, but drag and keyboard interactions no longer change the value. */
  readonly?: boolean
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
