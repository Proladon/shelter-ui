import type { DateValue } from '@internationalized/date'

export type Matcher = (date: DateValue) => boolean

export interface CalendarProps {
  /** 綁定的值，單一日期或多個日期數組 */
  modelValue?: any
  /** 預設佔位符日期 */
  defaultPlaceholder?: any
  /** 預設值 */
  defaultValue?: any
  /** 閱讀方向 */
  dir?: 'ltr' | 'rtl'
  /** 是否禁用日曆 */
  disabled?: boolean
  /** 是否固定顯示6週 */
  fixedWeeks?: boolean
  /** 是否在掛載時自動聚焦 */
  initialFocus?: boolean
  /** 判斷日期是否禁用的函數 */
  isDateDisabled?: Matcher
  /** 判斷日期是否不可用的函數 */
  isDateUnavailable?: Matcher
  /** 語言環境，預設為 'zh-TW' */
  locale?: string
  /** 最大可選日期 */
  maxValue?: any
  /** 最小可選日期 */
  minValue?: any
  /** 是否支援多選 */
  multiple?: boolean
  /** 下一頁函數 */
  nextPage?: (placeholder: any) => any
  /** 顯示的月份數量 */
  numberOfMonths?: number
  /** 是否按頁導航 */
  pagedNavigation?: boolean
  /** 佔位符日期 */
  placeholder?: any
  /** 是否阻止取消選擇 */
  preventDeselect?: boolean
  /** 上一頁函數 */
  prevPage?: (placeholder: any) => any
  /** 是否為只讀模式 */
  readonly?: boolean
  /** 星期幾格式 */
  weekdayFormat?: 'narrow' | 'short' | 'long'
  /** 每週開始日 */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** 日曆標籤，用於無障礙訪問 */
  calendarLabel?: string
}

export interface CalendarEmits {
  /** 當模型值變化時觸發 */
  (event: 'update:modelValue', value?: any): void
  /** 當佔位符變化時觸發 */
  (event: 'update:placeholder', value: any): void
}

export interface CalendarExpose {
  /** 聚焦日曆 */
  focus: () => void
}
