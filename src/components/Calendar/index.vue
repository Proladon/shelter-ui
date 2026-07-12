<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarNext,
  CalendarPrev,
  CalendarRoot,
} from 'reka-ui'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'
import { getLocalTimeZone, today } from '@internationalized/date'
import type { DateValue } from '@internationalized/date'
import type { CalendarProps, CalendarEmits } from './types'
import { SHSelect } from '@/components/Select'

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

const boundValue = computed({
  get: () => props.value ?? undefined,
  set: (val: DateValue | DateValue[] | undefined) =>
    emit('update:value', val),
})

// ── Placeholder (controls displayed month/year) ──────────────
const internalPlaceholder = ref<DateValue>(
  props.placeholder ?? props.defaultPlaceholder ?? today(getLocalTimeZone()),
)

const placeholder = computed({
  // cast to `any` to bypass @internationalized/date version mismatch with reka-ui types
  get: () => (props.placeholder ?? internalPlaceholder.value) as any,
  set: (val: DateValue) => {
    internalPlaceholder.value = val
    emit('update:placeholder', val)
  },
})

// ── Month / Year selectors ────────────────────────────────────
const monthOptions = computed(() => {
  const fmt = new Intl.DateTimeFormat(props.locale ?? 'en-US', {
    month: 'long',
  })
  return Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: fmt.format(new Date(2024, i, 1)),
  }))
})

const todayYear = today(getLocalTimeZone()).year
const yearRange = Array.from({ length: 201 }, (_, i) => todayYear - 100 + i)
const yearOptions = yearRange.map((y) => ({ value: y, label: String(y) }))

function onMonthChange(month: number) {
  placeholder.value = placeholder.value.set({ month })
}

function onYearChange(year: number) {
  placeholder.value = placeholder.value.set({ year })
}
</script>

<template>
  <CalendarRoot
    v-model="boundValue"
    v-model:placeholder="placeholder"
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

        <div class="sh-calendar__heading">
          <SHSelect
            class="sh-calendar__month-select"
            :value="placeholder.month"
            :options="monthOptions"
            @update:value="onMonthChange($event as number)"
          />
          <SHSelect
            class="sh-calendar__year-select"
            :value="placeholder.year"
            :options="yearOptions"
            @update:value="onYearChange($event as number)"
          />
        </div>

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
  @apply bg-bg.primary border border-solid border-border.base rounded-[length:var(--sh-radius-lg)];
  padding: var(--sh-spacing-md);
  width: fit-content;
}

/* ── Header ──────────────────────────────────────────────────── */

.sh-calendar__header {
  @apply flex items-center justify-between;
  margin-bottom: var(--sh-spacing-sm);
}

.sh-calendar__heading {
  @apply flex items-center justify-center;
  gap: var(--sh-spacing-xs);
  flex: 1;
}

/* ── Month / Year Selects ────────────────────────────────────── */

.sh-calendar__month-select {
  width: 120px;
}

.sh-calendar__year-select {
  width: 80px;
}

/* ── Navigation Buttons ──────────────────────────────────────── */

.sh-calendar__nav-btn {
  @apply flex items-center justify-center rounded-[length:var(--sh-radius-md)];
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

.sh-calendar .sh-calendar__grid {
  border-collapse: collapse;
  border-spacing: 0;
  border: 0;
  margin: 0;
  background: none;
}

/* ── Weekday Header Row ──────────────────────────────────────── */

.sh-calendar__weekdays {
  margin-bottom: var(--sh-spacing-xs);
}

.sh-calendar .sh-calendar__weekday {
  @apply text-center text-text.primary font-medium text-[length:var(--sh-font-size-xs)];
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-sm);
  padding: 0;
  border: 0;
  background: none;
}

/* ── Week Row ────────────────────────────────────────────────── */

.sh-calendar__week {
  /* spacing handled by cell dimensions */
}

/* ── Cell (td wrapper) ───────────────────────────────────────── */

.sh-calendar .sh-calendar__cell {
  padding: 0;
  text-align: center;
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-md);
  border: 0;
  background: none;
}

/* ── Day Trigger ─────────────────────────────────────────────── */

.sh-calendar__day {
  @apply flex items-center justify-center;
  @apply rounded-[length:var(--sh-radius-md)];
  @apply text-text.base text-[length:var(--sh-font-size-sm)];
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
  @apply bg-primary text-white;
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
