export interface InputProps {
  /**
   * Input model value
   */
  modelValue?: string | number
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
  (e: 'update:modelValue', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'clear'): void
}
