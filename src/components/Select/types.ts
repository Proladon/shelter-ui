export interface SelectOption {
  /**
   * Option value
   */
  value: string | number
  /**
   * Option label
   */
  label: string
  /**
   * Whether the option is disabled
   */
  disabled?: boolean
  /**
   * Option group (for grouped options)
   */
  group?: string
}

export interface SelectProps {
  /**
   * Select model value
   */
  value?: string | number | (string | number)[]
  /**
   * Select options
   */
  options?: SelectOption[]
  /**
   * Component size
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Whether the select is disabled
   */
  disabled?: boolean
  /**
   * Whether to show the clear button
   */
  clearable?: boolean
  /**
   * Select placeholder
   */
  placeholder?: string
  /**
   * Whether the select is readonly
   */
  readonly?: boolean
  /**
   * Whether multiple selection is allowed
   */
  multiple?: boolean
  /**
   * Whether to allow search/filter
   */
  filterable?: boolean
  /**
   * Custom filter method
   */
  filterMethod?: (query: string, option: SelectOption) => boolean
  /**
   * Loading state
   */
  loading?: boolean
  /**
   * No data text
   */
  noDataText?: string
  /**
   * No match text (for filterable)
   */
  noMatchText?: string
  /**
   * Component width
   */
  width?: string | number
  /**
   * Dropdown placement
   */
  placement?: 'top' | 'bottom' | 'auto'
  /**
   * Maximum height of dropdown
   */
  maxHeight?: string | number
}

export interface SelectEmits {
  'update:value': [value: string | number | (string | number)[] | undefined]
  change: [value: string | number | (string | number)[] | undefined]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
  'visible-change': [visible: boolean]
  'remove-tag': [value: string | number]
}
