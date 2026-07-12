export type PinInputSize = 'sm' | 'md' | 'lg'
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
   * Size variant
   * @default 'md'
   */
  size?: PinInputSize
  /**
   * One-time password mode (auto-fill from browser/SMS)
   * @default false
   */
  otp?: boolean
}

export interface PinInputEmits {
  (e: 'update:value', value: string[]): void
  (e: 'complete', value: string[]): void
  (e: 'change', value: string[]): void
}
