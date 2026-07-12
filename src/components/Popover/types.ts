export interface PopoverProps {
  defaultValue?: boolean
  value?: boolean
  modal?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  disabled?: boolean
  arrow?: boolean
}

export interface PopoverEmits {
  (e: 'update:value', value: boolean): void
  (e: 'valueChange', value: boolean): void
}
