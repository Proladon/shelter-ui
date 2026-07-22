export interface TooltipProps {
  defaultValue?: boolean
  value?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
  delayDuration?: number
  disabled?: boolean
  arrow?: boolean
}

export interface TooltipEmits {
  'update:value': [value: boolean]
}
