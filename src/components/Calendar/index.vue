<script setup lang="ts">
import { computed } from 'vue'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
} from 'reka-ui'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'
import type { DateValue } from '@internationalized/date'
import type { CalendarProps, CalendarEmits } from './types'

defineOptions({ name: 'SHCalendar' })

const props = withDefaults(defineProps<CalendarProps>(), {
  multiple: false,
  disabled: false,
  readonly: false,
  weekdayFormat: 'short',
  fixedWeeks: false,
  numberOfMonths: 1,
  pagedNavigation: false,
  preventDeselect: false,
  disableDaysOutsideCurrentView: false,
  initialFocus: false,
})

const emit = defineEmits<CalendarEmits>()

const modelValue = computed({
  get: () => props.modelValue ?? undefined,
  set: (val: DateValue | DateValue[] | undefined) =>
    emit('update:modelValue', val),
})
</script>

<template>
  <CalendarRoot
    v-model="modelValue"
    :locale="locale"
    :disabled="disabled"
    :readonly="readonly"
    :min-value="minValue"
    :max-value="maxValue"
    :is-date-disabled="isDateDisabled"
    :is-date-unavailable="isDateUnavailable"
    :multiple="multiple"
    :week-starts-on="weekStartsOn"
    :weekday-format="weekdayFormat"
    :fixed-weeks="fixedWeeks"
    :number-of-months="numberOfMonths"
    :paged-navigation="pagedNavigation"
    :prevent-deselect="preventDeselect"
    :disable-days-outside-current-view="disableDaysOutsideCurrentView"
    :calendar-label="calendarLabel"
    :initial-focus="initialFocus"
    :default-placeholder="defaultPlaceholder"
    :default-value="defaultValue"
    class="sh-calendar"
  >
    <template #default="{ grid, weekDays }">
      <CalendarHeader class="sh-calendar__header">
        <CalendarPrev class="sh-calendar__nav-btn">
          <IconChevronLeft class="sh-calendar__nav-icon" />
        </CalendarPrev>
        <CalendarHeading class="sh-calendar__heading" />
        <CalendarNext class="sh-calendar__nav-btn">
          <IconChevronRight class="sh-calendar__nav-icon" />
        </CalendarNext>
      </CalendarHeader>

      <div class="sh-calendar__body">
        <template v-for="month in grid" :key="month.value.toString()">
          <CalendarGrid class="sh-calendar__grid">
            <CalendarGridHead>
              <CalendarGridRow class="sh-calendar__weekdays">
                <CalendarHeadCell
                  v-for="day in weekDays"
                  :key="day"
                  class="sh-calendar__weekday"
                >
                  {{ day }}
                </CalendarHeadCell>
              </CalendarGridRow>
            </CalendarGridHead>

            <CalendarGridBody>
              <CalendarGridRow
                v-for="(week, weekIndex) in month.rows"
                :key="weekIndex"
                class="sh-calendar__week"
              >
                <CalendarCell
                  v-for="date in week"
                  :key="date.toString()"
                  :date="date"
                  class="sh-calendar__cell"
                >
                  <CalendarCellTrigger
                    :day="date"
                    :month="month.value"
                    v-slot="{ dayValue }"
                    class="sh-calendar__day"
                  >
                    {{ dayValue }}
                  </CalendarCellTrigger>
                </CalendarCell>
              </CalendarGridRow>
            </CalendarGridBody>
          </CalendarGrid>
        </template>
      </div>
    </template>
  </CalendarRoot>
</template>

<style scoped>
.sh-calendar {
  @apply inline-flex flex-col select-none;
  @apply bg-bg.primary border border-solid border-border.base rounded-[var(--sh-radius-lg)];
  padding: var(--sh-spacing-md);
  width: fit-content;
}

/* ── Header ──────────────────────────────────────────────────── */

.sh-calendar__header {
  @apply flex items-center justify-between;
  margin-bottom: var(--sh-spacing-sm);
}

.sh-calendar__heading {
  @apply text-text.base font-medium text-[var(--sh-font-size-sm)];
  flex: 1;
  text-align: center;
}

.sh-calendar__heading[data-disabled] {
  @apply opacity-60;
}

/* ── Navigation Buttons ──────────────────────────────────────── */

.sh-calendar__nav-btn {
  @apply flex items-center justify-center rounded-[var(--sh-radius-md)];
  @apply text-text.base cursor-pointer transition-all duration-300 ease-in-out;
  @apply hover:bg-primary.fade hover:text-primary;
  width: var(--sh-component-size-sm);
  height: var(--sh-component-size-sm);
}

.sh-calendar__nav-btn[data-disabled] {
  @apply opacity-60 cursor-not-allowed;
  pointer-events: none;
}

.sh-calendar__nav-icon {
  width: var(--sh-font-size-md);
  height: var(--sh-font-size-md);
}

/* ── Calendar Body ───────────────────────────────────────────── */

.sh-calendar__body {
  @apply flex;
  gap: var(--sh-spacing-xl);
}

.sh-calendar__grid {
  border-collapse: collapse;
}

/* ── Weekday Header Row ──────────────────────────────────────── */

.sh-calendar__weekdays {
  margin-bottom: var(--sh-spacing-xs);
}

.sh-calendar__weekday {
  @apply text-center text-text.primary font-medium text-[var(--sh-font-size-xs)];
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-sm);
  padding: 0;
}

/* ── Week Row ────────────────────────────────────────────────── */

.sh-calendar__week {
  /* spacing handled by cell dimensions */
}

/* ── Cell (td wrapper) ───────────────────────────────────────── */

.sh-calendar__cell {
  padding: 0;
  text-align: center;
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-md);
}

/* ── Day Trigger ─────────────────────────────────────────────── */

.sh-calendar__day {
  @apply flex items-center justify-center;
  @apply rounded-[var(--sh-radius-md)];
  @apply text-text.base text-[var(--sh-font-size-sm)];
  @apply cursor-pointer transition-all duration-300 ease-in-out outline-none;
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-md);
}

/* Hover — skip outside-view, disabled, unavailable */
.sh-calendar__day:hover:not([data-disabled]):not([data-unavailable]):not(
    [data-outside-view]
  ) {
  @apply bg-primary.fade text-primary;
}

/* Selected */
.sh-calendar__day[data-selected] {
  @apply bg-primary.fade text-primary;
}

/* Today (not selected) */
.sh-calendar__day[data-today]:not([data-selected]) {
  @apply border border-solid border-primary text-primary;
}

/* Outside current month view */
.sh-calendar__day[data-outside-view] {
  @apply text-text.primary opacity-30 cursor-default;
  pointer-events: none;
}

/* Disabled */
.sh-calendar__day[data-disabled] {
  @apply opacity-60 cursor-not-allowed text-text.primary;
  pointer-events: none;
}

/* Unavailable */
.sh-calendar__day[data-unavailable] {
  @apply opacity-60 cursor-not-allowed text-text.primary line-through;
  pointer-events: none;
}

/* Focus ring */
.sh-calendar__day[data-focused] {
  @apply ring-2 ring-primary.fade;
}
</style>
