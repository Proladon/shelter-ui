export interface SwitchProps {
  modelValue?: boolean
  disabled?: boolean
}

export interface SwitchEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}
