export interface ButtonProps {
  type?:
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'default'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  loading?: boolean
  text?: boolean
  ghost?: boolean
  dashed?: boolean
  outline?: boolean
  bordered?: boolean
  /** 是否撐滿容器寬度 */
  block?: boolean
}

export interface ButtonEmits {
  click: [event: MouseEvent]
}
