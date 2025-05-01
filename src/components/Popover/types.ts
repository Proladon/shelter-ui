export interface PopoverProps {
  defaultOpen?: boolean
  open?: boolean
  modal?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  disabled?: boolean
  arrow?: boolean
}

export interface PopoverEmits {
  (e: 'update:open', value: boolean): void
  (e: 'openChange', value: boolean): void
}
