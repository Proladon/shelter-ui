import type { NumberFieldRootProps } from 'reka-ui'

export interface NumberInputProps
  extends Omit<NumberFieldRootProps, 'modelValue'> {
  /** The controlled value of the number field. Bind with `v-model:value`. */
  value?: number | null
  size?: 'small' | 'medium' | 'large'
  invalid?: boolean
}

export interface NumberInputEmits {
  'update:value': [value: number]
  /** Emitted when the number field's text input gains focus. */
  focus: [event: FocusEvent]
  /** Emitted when the number field's text input loses focus. */
  blur: [event: FocusEvent]
}

export interface NumberInputSlots {
  decrement?: any
  increment?: any
}
