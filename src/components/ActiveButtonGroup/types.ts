export interface ActiveButtonGroupProps {
  value?: string
  defaultValue?: string
  showIndicator?: boolean
  /** 是否撐滿容器寬度 */
  block?: boolean
}

export interface ActiveButtonGroupEmits {
  (e: 'update:value', value: string): void
  (e: 'change', value: string): void
}

export interface ActiveButtonItemProps {
  value: string
  disabled?: boolean
}
