export interface ButtonProps {
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'default'
  size?: 'large' | 'default' | 'small'
  disabled?: boolean
  loading?: boolean
  text?: boolean
  ghost?: boolean
  dashed?: boolean
  outline?: boolean
  plain?: boolean
  borderd?: boolean
}

export interface ButtonEmits {
  (e: 'click', event: MouseEvent): void
}