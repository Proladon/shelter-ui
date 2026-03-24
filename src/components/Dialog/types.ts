export interface DialogProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  width?: string | number
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  modal?: boolean
  title?: string
  /** Extra class(es) added to DialogContent — useful for child components that need to override inner layout */
  contentClass?: string | string[] | Record<string, boolean>
  /** Hide the default × close button */
  hideClose?: boolean
}

export interface DialogEmits {
  (e: 'update:open', value: boolean): void
  (e: 'openChange', value: boolean): void
}
