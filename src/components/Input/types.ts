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
  (e: 'update:value', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}
