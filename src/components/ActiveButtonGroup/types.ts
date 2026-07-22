export interface ActiveButtonGroupProps {
  value?: string
  defaultValue?: string
  showIndicator?: boolean
  /** 是否撐滿容器寬度 */
  block?: boolean
}

export interface ActiveButtonGroupEmits {
  'update:value': [value: string]
  change: [value: string]
}

export interface ActiveButtonItemProps {
  value: string
  disabled?: boolean
}
