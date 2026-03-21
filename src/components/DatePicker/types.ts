import type { DateValue } from '@internationalized/date'

export interface DateRange {
  start: DateValue | undefined
  end: DateValue | undefined
}

export type DatePickerWeekdayFormat = 'narrow' | 'short' | 'long'

export interface DatePickerProps {
  /** Controlled selected date value. Single mode: DateValue. Range mode: DateRange. Bind with v-model. */
  modelValue?: DateValue | DateRange | null
  /** Whether to enable date range selection mode, default false */
  range?: boolean
  /** Input placeholder text (string label shown on the trigger) */
  placeholder?: string
  /** Whether the date picker is disabled */
  disabled?: boolean
  /** Whether the date picker is readonly */
  readonly?: boolean
  /** The locale to use for formatting dates (e.g. 'en-US', 'zh-TW') */
  locale?: string
  /** The minimum date that can be selected */
  minValue?: DateValue
  /** The maximum date that can be selected */
  maxValue?: DateValue
  /** A function that returns whether a date is unavailable */
  isDateUnavailable?: (date: DateValue) => boolean
  /** The day of the week to start the calendar on (0 = Sunday) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** The format to use for weekday column headers */
  weekdayFormat?: DatePickerWeekdayFormat
  /** Whether to always display 6 weeks in the calendar grid */
  fixedWeeks?: boolean
  /** Controlled open state of the date picker popover */
  open?: boolean
  /** Default (uncontrolled) placeholder DateValue — determines displayed month when nothing is selected */
  defaultPlaceholder?: DateValue
}

export interface DatePickerEmits {
  (event: 'update:modelValue', value: DateValue | DateRange | undefined): void
  (event: 'update:open', value: boolean): void
  (event: 'change', value: DateValue | DateRange | undefined): void
  (event: 'clear'): void
  (event: 'focus', focusEvent: FocusEvent): void
  (event: 'blur', blurEvent: FocusEvent): void
}

export interface DatePickerExpose {
  focus: () => void
  blur: () => void
  clear: () => void
}
