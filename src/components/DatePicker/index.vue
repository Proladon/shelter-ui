<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  PopoverContent,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNext,
  RangeCalendarPrev,
  RangeCalendarRoot,
} from 'reka-ui'
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from '@tabler/icons-vue'
import type { DateValue } from '@internationalized/date'
import type { DatePickerProps, DatePickerEmits, DateRange } from './types'
import { Calendar as SHCalendar } from '@/components/Calendar'
import { useComponentSize } from '@/composables/useComponentSize'

defineOptions({ name: 'SHDatePicker' })

const props = withDefaults(defineProps<DatePickerProps>(), {
  range: false,
  size: 'medium',
  disabled: false,
  readonly: false,
  clearable: false,
  weekdayFormat: 'short',
  fixedWeeks: false,
  weekStartsOn: 0,
  placeholder: 'Select date',
  open: undefined,
})

const emit = defineEmits<DatePickerEmits>()

const sizeClass = useComponentSize('sh-date-picker', () => props.size)

/* ── Open state ─────────────────────────────────────────────────── */
const internalOpen = ref(false)

const isOpen = computed(() => props.open ?? internalOpen.value)

const handleOpenUpdate = (val: boolean) => {
  if (val && (props.disabled || props.readonly)) return
  internalOpen.value = val
  emit('update:open', val)
}

const closePopover = () => {
  internalOpen.value = false
  emit('update:open', false)
}

/* ── Single date model ────────────────────────────────────────────── */
const singleValue = computed({
  get: () =>
    !props.range
      ? ((props.value as DateValue | null | undefined) ?? undefined)
      : undefined,
  set: (val: DateValue | undefined) => {
    emit('update:value', val)
    emit('change', val)
    if (val !== undefined) closePopover()
  },
})

/* ── Range date model ─────────────────────────────────────────────── */
const rangeValue = computed({
  get: () => {
    if (!props.range) return undefined
    const v = props.value as DateRange | null | undefined
    return v ?? ({ start: undefined, end: undefined } as DateRange)
  },
  set: (val: DateRange | undefined) => {
    emit('update:value', val)
    emit('change', val)
    if (val?.start && val?.end) closePopover()
  },
})

/* ── Format helpers ─────────────────────────────────────────────── */
const formatDateValue = (val: DateValue): string => {
  const y = val.year.toString().padStart(4, '0')
  const m = val.month.toString().padStart(2, '0')
  const d = val.day.toString().padStart(2, '0')
  return `${y}/${m}/${d}`
}

const formattedSingle = computed(() => {
  const val = singleValue.value
  return val ? formatDateValue(val) : ''
})

const formattedRange = computed(() => {
  const val = rangeValue.value
  if (!val?.start && !val?.end) return ''
  const start = val.start ? formatDateValue(val.start) : ''
  const end = val.end ? formatDateValue(val.end) : ''
  if (start && end) return `${start} \u2013 ${end}`
  if (start) return `${start} \u2013`
  return `\u2013 ${end}`
})

/* ── Clear ─────────────────────────────────────────────────────────── */
const handleClear = (e: MouseEvent) => {
  e.stopPropagation()
  emit('update:value', undefined)
  emit('clear')
}

const hasValue = computed(() => {
  if (props.range) {
    const v = props.value as DateRange | null | undefined
    return !!(v?.start || v?.end)
  }
  return props.value != null
})

/* ── Expose ────────────────────────────────────────────────────────── */
const focus = () => {}
const blur = () => {}
const clear = () => {
  emit('update:value', undefined)
  emit('clear')
}

defineExpose({ focus, blur, clear })
</script>

<template>
  <PopoverRoot :open="isOpen" @update:open="handleOpenUpdate">
    <PopoverTrigger as-child :disabled="disabled || readonly">
      <div
        class="sh-date-picker"
        :class="[
          sizeClass,
          {
            'sh-date-picker--disabled': disabled,
            'sh-date-picker--readonly': readonly,
            'sh-date-picker--open': isOpen,
          },
        ]"
        role="combobox"
        :aria-expanded="isOpen"
        :aria-disabled="disabled || undefined"
        :tabindex="disabled ? -1 : 0"
      >
        <span
          class="sh-date-picker__display"
          :class="{ 'sh-date-picker__display--placeholder': !hasValue }"
        >
          {{
            hasValue ? (range ? formattedRange : formattedSingle) : placeholder
          }}
        </span>
        <div class="sh-date-picker__suffix">
          <button
            v-if="clearable && hasValue && !disabled && !readonly"
            type="button"
            class="sh-date-picker__clear"
            @click="handleClear"
          >
            <IconX class="sh-date-picker__icon" />
          </button>
          <IconCalendar class="sh-date-picker__icon sh-date-picker__cal-icon" />
        </div>
      </div>
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        :side-offset="4"
        class="sh-date-picker__content"
        @open-auto-focus.prevent
      >
        <!-- ── Single date calendar ─────────────────────────────── -->
        <template v-if="!range">
          <SHCalendar
            :value="singleValue"
            :locale="locale"
            :disabled="disabled"
            :readonly="readonly"
            :min-value="minValue"
            :max-value="maxValue"
            :is-date-unavailable="isDateUnavailable"
            :week-starts-on="weekStartsOn"
            :weekday-format="weekdayFormat"
            :fixed-weeks="fixedWeeks"
            :default-placeholder="defaultPlaceholderDate"
            @update:value="
              (v: DateValue | DateValue[] | undefined) =>
                (singleValue = v as DateValue | undefined)
            "
          />
        </template>

        <!-- ── Range date calendar ─────────────────────────────── -->
        <template v-else>
          <RangeCalendarRoot
            v-model="rangeValue"
            :locale="locale"
            :disabled="disabled"
            :readonly="readonly"
            :min-value="minValue"
            :max-value="maxValue"
            :is-date-unavailable="isDateUnavailable"
            :week-starts-on="weekStartsOn"
            :weekday-format="weekdayFormat"
            :fixed-weeks="fixedWeeks"
            :default-placeholder="defaultPlaceholderDate"
          >
            <template #default="{ grid, weekDays }">
              <RangeCalendarHeader class="sh-date-picker__cal-header">
                <RangeCalendarPrev class="sh-date-picker__nav-btn">
                  <IconChevronLeft class="sh-date-picker__nav-icon" />
                </RangeCalendarPrev>
                <RangeCalendarHeading class="sh-date-picker__cal-heading" />
                <RangeCalendarNext class="sh-date-picker__nav-btn">
                  <IconChevronRight class="sh-date-picker__nav-icon" />
                </RangeCalendarNext>
              </RangeCalendarHeader>
              <div class="sh-date-picker__cal-body">
                <template v-for="month in grid" :key="month.value.toString()">
                  <RangeCalendarGrid class="sh-date-picker__grid">
                    <RangeCalendarGridHead>
                      <RangeCalendarGridRow class="sh-date-picker__weekdays">
                        <RangeCalendarHeadCell
                          v-for="day in weekDays"
                          :key="day"
                          class="sh-date-picker__weekday"
                        >
                          {{ day }}
                        </RangeCalendarHeadCell>
                      </RangeCalendarGridRow>
                    </RangeCalendarGridHead>
                    <RangeCalendarGridBody>
                      <RangeCalendarGridRow
                        v-for="(week, weekIndex) in month.rows"
                        :key="weekIndex"
                        class="sh-date-picker__week"
                      >
                        <RangeCalendarCell
                          v-for="date in week"
                          :key="date.toString()"
                          :date="date"
                          class="sh-date-picker__cell"
                        >
                          <RangeCalendarCellTrigger
                            :day="date"
                            :month="month.value"
                            v-slot="{ dayValue }"
                            class="sh-date-picker__day"
                          >
                            {{ dayValue }}
                          </RangeCalendarCellTrigger>
                        </RangeCalendarCell>
                      </RangeCalendarGridRow>
                    </RangeCalendarGridBody>
                  </RangeCalendarGrid>
                </template>
              </div>
            </template>
          </RangeCalendarRoot>
        </template>
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style lang="postcss" scoped>
.sh-date-picker {
  @apply inline-flex items-center w-full;
  @apply bg-bg.primary border border-solid border-border.base rounded-[length:var(--sh-radius-md)];
  @apply transition-all duration-300 ease-in-out cursor-pointer select-none outline-none;
  gap: var(--sh-spacing-xs);
}

.sh-date-picker:hover:not(.sh-date-picker--readonly):not(
    .sh-date-picker--disabled
  ) {
  @apply border-primary;
}

.sh-date-picker--open {
  @apply border-primary;
  box-shadow: var(--sh-focus-ring);
}

.sh-date-picker--disabled {
  @apply opacity-60 cursor-not-allowed;
}

.sh-date-picker--readonly {
  @apply bg-bg.secondary cursor-default;
}

.sh-date-picker--small {
  height: var(--sh-component-size-sm);
  padding-inline: var(--sh-spacing-sm);
  font-size: var(--sh-font-size-sm);
}

.sh-date-picker--medium {
  height: var(--sh-component-size-md);
  padding-inline: var(--sh-spacing-md);
  font-size: var(--sh-font-size-sm);
}

.sh-date-picker--large {
  height: var(--sh-component-size-lg);
  padding-inline: var(--sh-spacing-lg);
  font-size: var(--sh-font-size-lg);
}

.sh-date-picker__display {
  @apply flex-1 text-text.base truncate;
  font-size: inherit;
}

.sh-date-picker__display--placeholder {
  @apply text-text.primary;
}

.sh-date-picker__suffix {
  @apply flex items-center ml-auto;
  gap: var(--sh-spacing-xs);
}

.sh-date-picker__clear {
  @apply flex items-center justify-center rounded-sm;
  @apply text-text.primary bg-transparent border-none cursor-pointer;
  @apply transition-colors duration-200 hover:text-text.base;
  padding: 0;
}

.sh-date-picker__cal-icon {
  @apply text-text.primary;
}

.sh-date-picker__icon {
  width: var(--sh-font-size-md);
  height: var(--sh-font-size-md);
}

:deep(.sh-date-picker__content) {
  @apply bg-bg.primary border border-solid border-border.base rounded-[length:var(--sh-radius-lg)] shadow-lg z-[var(--sh-z-popover)];
  padding: var(--sh-spacing-md);
  width: fit-content;
}

/* ── SHCalendar used inside the popover: strip its own box so the
   popover wrapper provides the only visible border/background. ── */
:deep(.sh-calendar) {
  border: none !important;
  background: transparent !important;
  border-radius: 0 !important;
  padding: 0 !important;
  width: auto;
}

:deep(.sh-date-picker__cal-header) {
  @apply flex items-center justify-between;
  margin-bottom: var(--sh-spacing-sm);
}

:deep(.sh-date-picker__cal-heading) {
  @apply text-text.base font-medium;
  font-size: var(--sh-font-size-sm);
  flex: 1;
  text-align: center;
}

:deep(.sh-date-picker__cal-heading[data-disabled]) {
  @apply opacity-60;
}

:deep(.sh-date-picker__nav-btn) {
  @apply flex items-center justify-center rounded-[length:var(--sh-radius-md)];
  @apply text-text.base cursor-pointer transition-all duration-300 ease-in-out;
  @apply hover:bg-primary.fade hover:text-primary bg-transparent border-none;
  width: var(--sh-component-size-sm);
  height: var(--sh-component-size-sm);
}

:deep(.sh-date-picker__nav-btn[data-disabled]) {
  @apply opacity-60 cursor-not-allowed;
  pointer-events: none;
}

:deep(.sh-date-picker__nav-icon) {
  width: var(--sh-font-size-md);
  height: var(--sh-font-size-md);
}

:deep(.sh-date-picker__cal-body) {
  @apply flex;
  gap: var(--sh-spacing-xl);
}

:deep(.sh-date-picker__grid) {
  border-collapse: collapse;
}

:deep(.sh-date-picker__weekdays) {
  margin-bottom: var(--sh-spacing-xs);
}

:deep(.sh-date-picker__weekday) {
  @apply text-center text-text.primary font-medium;
  font-size: var(--sh-font-size-xs);
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-sm);
  padding: 0;
}

:deep(.sh-date-picker__cell) {
  padding: 0;
  text-align: center;
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-md);
}

:deep(.sh-date-picker__day) {
  @apply flex items-center justify-center rounded-[length:var(--sh-radius-md)] text-text.base;
  @apply cursor-pointer transition-all duration-300 ease-in-out outline-none;
  font-size: var(--sh-font-size-sm);
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-md);
}

:deep(
  .sh-date-picker__day:hover:not([data-disabled]):not([data-unavailable]):not(
      [data-outside-view]
    )
) {
  @apply bg-primary.fade text-primary;
}

:deep(.sh-date-picker__day[data-selected]) {
  /* white text for contrast on solid primary background */
  @apply bg-primary text-white;
}

:deep(.sh-date-picker__day[data-highlighted]) {
  @apply bg-primary.fade text-primary;
  border-radius: 0;
}

:deep(.sh-date-picker__day[data-selection-start]),
:deep(.sh-date-picker__day[data-selection-end]) {
  /* white text for contrast on solid primary background */
  @apply bg-primary text-white rounded-[length:var(--sh-radius-md)];
}

:deep(
  .sh-date-picker__day[data-today]:not([data-selected]):not([data-highlighted])
) {
  @apply border border-solid border-primary text-primary;
}

:deep(.sh-date-picker__day[data-outside-view]) {
  @apply text-text.primary opacity-30 cursor-default;
  pointer-events: none;
}

:deep(.sh-date-picker__day[data-disabled]) {
  @apply opacity-60 cursor-not-allowed text-text.primary;
  pointer-events: none;
}

:deep(.sh-date-picker__day[data-unavailable]) {
  @apply opacity-60 cursor-not-allowed text-text.primary line-through;
  pointer-events: none;
}

:deep(.sh-date-picker__day[data-focused]) {
  @apply ring-2 ring-primary.fade;
}
</style>
