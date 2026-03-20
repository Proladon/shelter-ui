import type { DateValue } from '@internationalized/date'

export type CalendarWeekdayFormat = 'narrow' | 'short' | 'long'

export interface CalendarProps {
  /** Controlled selected date value. Bind with v-model. */
  modelValue?: DateValue | DateValue[] | null
  /** Whether multiple dates can be selected */
  multiple?: boolean
  /** Whether the calendar is disabled */
  disabled?: boolean
  /** Whether the calendar is readonly */
  readonly?: boolean
  /** The locale to use for formatting dates (e.g. 'en-US', 'zh-TW') */
  locale?: string
  /** The minimum date that can be selected */
  minValue?: DateValue
  /** The maximum date that can be selected */
  maxValue?: DateValue
  /** A function that returns whether a date is disabled */
  isDateDisabled?: (date: DateValue) => boolean
  /** A function that returns whether a date is unavailable */
  isDateUnavailable?: (date: DateValue) => boolean
  /** Controlled placeholder date — determines the displayed month when nothing is selected */
  placeholder?: DateValue
  /** Default (uncontrolled) placeholder date */
  defaultPlaceholder?: DateValue
  /** Default (uncontrolled) selected value */
  defaultValue?: DateValue
  /** The day of the week to start the calendar on (0 = Sunday) */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6
  /** The format to use for weekday column headers */
  weekdayFormat?: CalendarWeekdayFormat
  /** Whether to always display 6 weeks in the calendar */
  fixedWeeks?: boolean
  /** The number of months to display at once */
  numberOfMonths?: number
  /** Whether Prev/Next buttons navigate by the full number of displayed months */
  pagedNavigation?: boolean
  /** Whether to prevent the user from deselecting a date without selecting another first */
  preventDeselect?: boolean
  /** Whether to disable days outside the current view */
  disableDaysOutsideCurrentView?: boolean
  /** Accessible label for the calendar (for screen readers) */
  calendarLabel?: string
  /** If true, focus the selected day / today / first day of month on mount */
  initialFocus?: boolean
}

export interface CalendarEmits {
  (event: 'update:modelValue', value: DateValue | DateValue[] | undefined): void
  (event: 'update:placeholder', value: DateValue): void
}

export interface CalendarExpose {
  // Reserved for future imperative API
}
