export interface InputProps {
  /**
   * Input model value
   */
  value?: string | number
  /**
   * Input size
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * Whether the input is disabled
   */
  disabled?: boolean
  /**
   * Whether to show the clear button
   */
  clearable?: boolean
  /**
   * Input placeholder
   */
  placeholder?: string
  /**
   * Input type
   */
  type?: string
  /**
   * Whether the input is readonly
   */
  readonly?: boolean
  /**
   * Input autocomplete attribute
   */
  autocomplete?: string
  /**
   * Maximum length of the input
   */
  maxlength?: number
  /**
   * Whether to show the character count when maxlength is set
   */
  showWordLimit?: boolean
}

export interface InputEmits {
  'update:value': [value: string]
  input: [value: string]
  change: [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  clear: []
}

export interface InputSlots {
  prefix?: () => any
  suffix?: () => any
}
