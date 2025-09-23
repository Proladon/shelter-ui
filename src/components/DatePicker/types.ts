export interface DateRange {
  start?: Date
  end?: Date
}

export interface DatePickerProps {
  /** 綁定的值，單一日期選擇時為 Date，範圍選擇時為 DateRange */
  modelValue?: Date | DateRange
  /** 是否啟用日期範圍選擇模式，預設為 false */
  range?: boolean
  /** 輸入框佔位符文字 */
  placeholder?: string
  /** 是否禁用組件 */
  disabled?: boolean
  /** 是否為只讀模式 */
  readonly?: boolean
  /** 日期顯示格式，預設為 'YYYY-MM-DD' */
  format?: string
  /** 最小可選日期 */
  minDate?: Date
  /** 最大可選日期 */
  maxDate?: Date
  /** 禁用的特定日期 */
  disabledDates?: Date[]
  /** 時區設定，預設為系統時區，例如 'Asia/Taipei', 'UTC', 'America/New_York' */
  timezone?: string
  /** 是否顯示時區資訊，預設為 false */
  showTimezone?: boolean
  /** 時區偏移量（分鐘），用於手動設定時區偏移 */
  timezoneOffset?: number
  /** 是否使用 UTC 模式，預設為 false */
  utcMode?: boolean
}

export interface DatePickerEmits {
  (event: 'update:modelValue', value?: Date | DateRange): void
  (event: 'change', value?: Date | DateRange): void
  (event: 'focus', focusEvent: FocusEvent): void
  (event: 'blur', blurEvent: FocusEvent): void
  (event: 'clear'): void
}

export interface DatePickerExpose {
  focus: () => void
  blur: () => void
  clear: () => void
}
