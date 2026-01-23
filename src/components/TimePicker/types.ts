export interface TimeRange {
  start?: string
  end?: string
}

export interface TimePickerProps {
  /** 綁定的值，單一時間選擇時為 string (HH:mm:ss)，範圍選擇時為 TimeRange */
  modelValue?: string | TimeRange
  /** 是否啟用時間範圍選擇模式，預設為 false */
  range?: boolean
  /** 輸入框佔位符文字 */
  placeholder?: string
  /** 是否禁用組件 */
  disabled?: boolean
  /** 是否為只讀模式 */
  readonly?: boolean
  /** 時間顯示格式，預設為 'HH:mm:ss' */
  format?: string
  /** 是否顯示小時選擇，預設為 true */
  hour?: boolean
  /** 是否顯示分鐘選擇，預設為 true */
  minute?: boolean
  /** 是否顯示秒數選擇，預設為 false (依據 user request 改為 default: true 但通常秒數是選用的? User said default: true) */
  second?: boolean
  /** @deprecated Use 'second' prop instead. 是否顯示秒數選擇，預設為 true */
  showSeconds?: boolean
  /** 是否使用 12 小時制，預設為 false */
  use12Hour?: boolean
  /** 小時步進值，預設為 1 */
  hourStep?: number
  /** 分鐘步進值，預設為 1 */
  minuteStep?: number
  /** 秒數步進值，預設為 1 */
  secondStep?: number
  /** 最小可選時間 */
  minTime?: string
  /** 最大可選時間 */
  maxTime?: string
  /** 禁用的特定時間 */
  disabledTimes?: string[]
}

export interface TimePickerEmits {
  (event: 'update:modelValue', value?: string | TimeRange): void
  (event: 'change', value?: string | TimeRange): void
  (event: 'focus', focusEvent: FocusEvent): void
  (event: 'blur', blurEvent: FocusEvent): void
  (event: 'clear'): void
}

export interface TimePickerExpose {
  focus: () => void
  blur: () => void
  clear: () => void
}
