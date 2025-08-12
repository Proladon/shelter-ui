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
   * Maximum number of selections (only for multiple)
   */
  maxSelections?: number
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
   * Dropdown placement
   */
  placement?: 'top' | 'bottom' | 'auto'
  /**
   * Dropdown width
   */
  dropdownWidth?: string | number
  /**
   * Maximum height of dropdown
   */
  maxHeight?: string | number
}

export interface SelectEmits {
  (e: 'update:value', value: string | number | (string | number)[]): void
  (e: 'change', value: string | number | (string | number)[]): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
  (e: 'visible-change', visible: boolean): void
  (e: 'remove-tag', value: string | number): void
}
