export interface BorderContainerProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  width?: string | number
  height?: string | number
  borderWidth?: string | number
  borderRadius?: string | number
  padding?: string | number
  shadow?: boolean
  transparent?: boolean
  disabled?: boolean
}

export interface BorderContainerEmits {
  (e: 'click', event: MouseEvent): void
}
