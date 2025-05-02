export interface TooltipProps {
  defaultOpen?: boolean
  open?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  delayDuration?: number
  disabled?: boolean
  arrow?: boolean
}

export interface TooltipEmits {
  (e: 'update:open', value: boolean): void
  (e: 'openChange', value: boolean): void
}
