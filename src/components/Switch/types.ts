export interface SwitchProps {
  value?: boolean
  disabled?: boolean
}

export interface SwitchEmits {
  (e: 'update:value', value: boolean): void
  (e: 'change', value: boolean): void
}
