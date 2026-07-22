export interface SwitchProps {
  value?: boolean
  disabled?: boolean
  /**
   * 尺寸
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * 是否唯讀
   */
  readonly?: boolean
}

export interface SwitchEmits {
  /**
   * 綁定值變化時觸發
   */
  'update:value': [value: boolean]
  /**
   * 狀態切換時觸發
   */
  change: [value: boolean]
  /**
   * 獲得焦點時觸發
   */
  focus: [event: FocusEvent]
  /**
   * 失去焦點時觸發
   */
  blur: [event: FocusEvent]
}
