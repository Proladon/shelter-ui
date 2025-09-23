export interface DateTimeRange {
  start?: Date
  end?: Date
}

export interface DateTimePickerProps {
  /** 綁定的值，單一日期時間選擇時為 Date，範圍選擇時為 DateTimeRange */
  modelValue?: Date | DateTimeRange
  /** 是否啟用日期時間範圍選擇模式，預設為 false */
  range?: boolean
  /** 輸入框佔位符文字 */
  placeholder?: string
  /** 是否禁用組件 */
  disabled?: boolean
  /** 是否為只讀模式 */
  readonly?: boolean
  /** 日期時間顯示格式，預設為 'YYYY-MM-DD HH:mm:ss' */
  format?: string
  /** 日期部分顯示格式，預設為 'YYYY-MM-DD' */
  dateFormat?: string
  /** 時間部分顯示格式，預設為 'HH:mm:ss' */
  timeFormat?: string
  /** 是否顯示秒數選擇，預設為 true */
  showSeconds?: boolean
  /** 是否使用 12 小時制，預設為 false */
  use12Hour?: boolean
  /** 分鐘步進值，預設為 1 */
  minuteStep?: number
  /** 秒數步進值，預設為 1 */
  secondStep?: number
  /** 最小可選日期時間 */
  minDateTime?: Date
  /** 最大可選日期時間 */
  maxDateTime?: Date
  /** 禁用的特定日期 */
  disabledDates?: Date[]
  /** 禁用的特定時間 */
  disabledTimes?: string[]
  /** 是否優先顯示時間選擇器，預設為 false */
  showTimeFirst?: boolean
  /** 時區設定，預設為系統時區，例如 'Asia/Taipei', 'UTC', 'America/New_York' */
  timezone?: string
  /** 是否顯示時區資訊，預設為 false */
  showTimezone?: boolean
  /** 時區偏移量（分鐘），用於手動設定時區偏移 */
  timezoneOffset?: number
  /** 是否使用 UTC 模式，預設為 false */
  utcMode?: boolean
  /** 是否自動偵測用戶時區，預設為 true */
  autoTimezoneDetection?: boolean
  /** 可選擇的時區列表，用於時區選擇器 */
  timezoneList?: string[]
  /** 是否啟用時區轉換功能，預設為 true */
  enableTimezoneConversion?: boolean
}

export interface DateTimePickerEmits {
  (event: 'update:modelValue', value?: Date | DateTimeRange): void
  (event: 'change', value?: Date | DateTimeRange): void
  (event: 'focus', focusEvent: FocusEvent): void
  (event: 'blur', blurEvent: FocusEvent): void
  (event: 'clear'): void
  (event: 'timezone-change', timezone: string): void
}

export interface DateTimePickerExpose {
  focus: () => void
  blur: () => void
  clear: () => void
  setTimezone: (timezone: string) => void
}
