import type { NumberFieldRootProps } from 'reka-ui'

export interface NumberInputProps
  extends Omit<NumberFieldRootProps, 'modelValue'> {
  /** The controlled value of the number field. Bind with `v-model:value`. */
  value?: number | null
  size?: 'small' | 'default' | 'large'
  invalid?: boolean
}

export interface NumberInputEmits {
  'update:value': [value: number]
}

export interface NumberInputSlots {
  decrement?: any
  increment?: any
}
