export interface ActiveButtonGroupProps {
  value?: string
  defaultValue?: string
  showIndicator?: boolean
  fullWidth?: boolean
}

export interface ActiveButtonGroupEmits {
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
}

export interface ActiveButtonItemProps {
  value: string
  disabled?: boolean
}
