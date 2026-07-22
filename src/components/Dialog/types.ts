export interface DialogProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  width?: string | number
  value?: boolean
  defaultValue?: boolean
  onValueChange?: (value: boolean) => void
  modal?: boolean
  title?: string
  /** Extra class(es) added to DialogContent — useful for child components that need to override inner layout */
  contentClass?: string | string[] | Record<string, boolean>
  /** Hide the default × close button */
  hideClose?: boolean
}

export interface DialogEmits {
  (e: 'update:value', value: boolean): void
  (e: 'valueChange', value: boolean): void
}
