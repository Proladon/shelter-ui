export interface TextareaProps {
  /**
   * Textarea 的值
   */
  value: string
  /**
   * 占位符文字
   */
  placeholder?: string
  /**
   * 預設顯示的行數
   */
  rows?: number
  /**
   * 調整大小的方式
   */
  resize?: 'none' | 'both' | 'horizontal' | 'vertical'
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 是否唯讀
   */
  readonly?: boolean
  /**
   * 最大字元長度
   */
  maxlength?: number
  /**
   * 是否顯示字元計數
   */
  showWordLimit?: boolean
  /**
   * 是否自動調整高度
   */
  autosize?: boolean
}

export interface TextareaEmits {
  (e: 'update:value', value: string): void
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
