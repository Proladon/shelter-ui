import type { CollapsibleRootProps } from 'reka-ui'

export interface CollapsibleProps
  extends Omit<CollapsibleRootProps, 'open' | 'defaultOpen'> {
  /** The controlled open state of the collapsible. Bind with `v-model:value`. */
  value?: boolean
  /** The open state of the collapsible when it is initially rendered (uncontrolled). */
  defaultValue?: boolean
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
  'update:value': [value: boolean]
}
