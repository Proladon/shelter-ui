export type PinInputSize = 'small' | 'medium' | 'large'
export type PinInputType = 'text' | 'number'

export interface PinInputProps {
  /**
   * The controlled value of the pin input. Each item in the array represents a single cell.
   */
  value?: string[]
  /**
   * Number of input cells
   * @default 6
   */
  length?: number
  /**
   * Placeholder character shown in empty cells
   * @default '○'
   */
  placeholder?: string
  /**
   * Input type: text or number
   * @default 'text'
   */
  type?: PinInputType
  /**
   * Whether to mask the entered values (password-style)
   * @default false
   */
  mask?: boolean
  /**
   * Whether the input is disabled
   * @default false
   */
  disabled?: boolean
  /**
   * Whether the input is readonly (blocks typing, backspace, delete and paste)
   * @default false
   */
  readonly?: boolean
  /**
   * Size variant
   * @default 'medium'
   */
  size?: PinInputSize
  /**
   * One-time password mode (auto-fill from browser/SMS)
   * @default false
   */
  otp?: boolean
}

export interface PinInputEmits {
  'update:value': [value: string[]]
  complete: [value: string[]]
  change: [value: string[]]
  focus: [e: FocusEvent]
  blur: [e: FocusEvent]
}
