export interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}