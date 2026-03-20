export interface BaseContainerProps {
  width?: string | number
  height?: string | number
  shadow?: boolean
  disabled?: boolean
}

export interface BaseContainerEmits {
  (e: 'click', event: MouseEvent): void
}
