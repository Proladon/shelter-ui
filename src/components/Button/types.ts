export interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default' | 'plain' | 'text' | 'dashed'
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  loading?: boolean
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}