export interface SpinProps {
  size?: 'small' | 'medium' | 'large' | number
  description?: string
  rotate?: boolean
  show?: boolean
  stroke?: string
  strokeWidth?: number
  delay?: number
}

export interface SpinEmits {
  (e: 'update:show', value: boolean): void
}