import type { CollapsibleRootProps } from 'reka-ui'

export interface CollapsibleProps extends CollapsibleRootProps {
  variant?: 'default' | 'card' | 'ghost'
  size?: 'small' | 'default' | 'large'
  headerClass?: string
  contentClass?: string
  triggerPosition?: 'left' | 'right'
}

export interface CollapsibleSlots {
  default?: any
  trigger?: any
  header?: any
}

export interface CollapsibleEmits {
  'update:open': [value: boolean]
}
