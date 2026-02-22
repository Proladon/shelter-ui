import type { NumberFieldRootProps } from 'reka-ui'

export interface NumberInputProps extends NumberFieldRootProps {
  size?: 'small' | 'default' | 'large'
  invalid?: boolean
}

export interface NumberInputEmits {
  'update:modelValue': [value: number]
}

export interface NumberInputSlots {
  decrement?: any
  increment?: any
}
