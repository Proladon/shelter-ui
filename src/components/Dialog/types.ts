export interface DialogProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  width?: string | number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
  title?: string
}

export interface DialogEmits {
  (e: 'update:open', value: boolean): void
  (e: 'openChange', value: boolean): void
}
