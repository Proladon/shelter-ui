export interface BaseContainerProps {
  width?: string | number
  height?: string | number
  shadow?: boolean
  disabled?: boolean
}

export interface BaseContainerEmits {
  click: [event: MouseEvent]
}
