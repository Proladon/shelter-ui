<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-vue'
import { fromDate, getLocalTimeZone, today } from '@internationalized/date'
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
} from 'reka-ui'
import type { DatePickerProps, DatePickerEmits, DateRange } from './types'
import SHSelect from '../Select/index.vue'

defineOptions({
  name: 'SHDatePicker',
})

const props = withDefaults(defineProps<DatePickerProps>(), {
  disabled: false,
})

const emit = defineEmits<DatePickerEmits>()

const toInternalValue = (val: any) => {
  if (!val) return undefined
  if (val instanceof Date) return fromDate(val, getLocalTimeZone())
  if (typeof val === 'object' && ('start' in val || 'end' in val)) {
    return {
      start:
        val.start instanceof Date
          ? fromDate(val.start, getLocalTimeZone())
          : val.start,
      end:
        val.end instanceof Date
          ? fromDate(val.end, getLocalTimeZone())
          : val.end,
    }
  }
  return val
}

const fromInternalValue = (val: any) => {
  if (!val) return undefined
  if (typeof val.toDate === 'function') return val.toDate(getLocalTimeZone())
  if (typeof val === 'object' && ('start' in val || 'end' in val)) {
    return {
      start:
        val.start && typeof val.start.toDate === 'function'
          ? val.start.toDate(getLocalTimeZone())
          : val.start,
      end:
        val.end && typeof val.end.toDate === 'function'
          ? val.end.toDate(getLocalTimeZone())
          : val.end,
    }
  }
  return val
}

const internalValue = computed({
  get: () => toInternalValue(props.modelValue),
  set: (val: any) => {
    emit('update:modelValue', fromInternalValue(val))
    emit('change', fromInternalValue(val))
  },
})

const toInternalPlaceholder = (val: any) => {
  const internal = toInternalValue(val)
  if (!internal) return today(getLocalTimeZone())
  if ('start' in internal) return internal.start || today(getLocalTimeZone())
  return internal
}

const internalPlaceholder = ref<any>(toInternalPlaceholder(props.modelValue))
const isOpen = ref(false)

watch(
  () => internalPlaceholder.value,
  (val) => {
    if (!val) {
      internalPlaceholder.value = today(getLocalTimeZone())
    }
  },
)

watch(
  () => props.modelValue,
  (newVal) => {
    internalPlaceholder.value = toInternalPlaceholder(newVal)
  },
)

const currentYear = computed({
  get: () => internalPlaceholder.value?.year || today(getLocalTimeZone()).year,
  set: (y) => {
    if (internalPlaceholder.value) {
      internalPlaceholder.value = internalPlaceholder.value.set({ year: y })
    }
  },
})

const currentMonth = computed({
  get: () =>
    internalPlaceholder.value?.month || today(getLocalTimeZone()).month,
  set: (m) => {
    if (internalPlaceholder.value) {
      internalPlaceholder.value = internalPlaceholder.value.set({ month: m })
    }
  },
})

const handleInteractOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (target?.closest('.sh-select-dropdown')) {
    event.preventDefault()
  }
}

const handleValueChange = (val: any) => {
  if (!props.range && val) {
    isOpen.value = false
  } else if (props.range && val?.start && val?.end) {
    isOpen.value = false
  }
}

const years = computed(() => {
  const current = today(getLocalTimeZone()).year
  const start = props.minDate?.getFullYear() || current - 100
  const end = props.maxDate?.getFullYear() || current + 100
  const res = []
  for (let i = start; i <= end; i++) {
    res.push({ label: `${i}年`, value: i })
  }
  return res.reverse()
})

const monthsList = [
  { value: 1, label: '1月' },
  { value: 2, label: '2月' },
  { value: 3, label: '3月' },
  { value: 4, label: '4月' },
  { value: 5, label: '5月' },
  { value: 6, label: '6月' },
  { value: 7, label: '7月' },
  { value: 8, label: '8月' },
  { value: 9, label: '9月' },
  { value: 10, label: '10月' },
  { value: 11, label: '11月' },
  { value: 12, label: '12月' },
]

const minValue = computed(() =>
  props.minDate ? fromDate(props.minDate, getLocalTimeZone()) : undefined,
)
const maxValue = computed(() =>
  props.maxDate ? fromDate(props.maxDate, getLocalTimeZone()) : undefined,
)

const displayFormattedValue = computed(() => {
  if (!props.modelValue) return ''

  const formatFn = (d: Date) => {
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  if (props.range) {
    const range = props.modelValue as DateRange
    const start = range.start ? formatFn(range.start) : ''
    const end = range.end ? formatFn(range.end) : ''
    if (!start && !end) return ''
    return `${start} ~ ${end}`
  }

  return props.modelValue instanceof Date ? formatFn(props.modelValue) : ''
})
</script>

<template>
  <div class="sh-datepicker">
    <DatePickerRoot
      v-model="internalValue"
      v-model:placeholder="internalPlaceholder"
      v-model:open="isOpen"
      :disabled="disabled"
      :min-value="minValue"
      :max-value="maxValue"
      @update:model-value="handleValueChange"
    >
      <DatePickerTrigger as-child>
        <div class="sh-datepicker__field">
          <div class="sh-datepicker__display">
            <template v-if="displayFormattedValue">
              {{ displayFormattedValue }}
            </template>
            <template v-else>
              <span class="sh-datepicker__placeholder">{{ placeholder }}</span>
            </template>
          </div>
          <IconCalendar class="sh-datepicker__icon" />
        </div>
      </DatePickerTrigger>

      <DatePickerContent
        :side-offset="4"
        class="sh-datepicker__dropdown"
        @interact-outside="handleInteractOutside"
        @pointer-down-outside="handleInteractOutside"
      >
        <DatePickerArrow class="sh-datepicker__arrow" />
        <DatePickerCalendar
          v-slot="{ weekDays, grid }"
          class="sh-datepicker__calendar"
        >
          <DatePickerHeader class="sh-datepicker__header">
            <DatePickerPrev
              class="sh-datepicker__nav-btn hover:(text-secondary bg-primary.fade)"
            >
              <IconChevronLeft class="sh-datepicker__nav-icon" />
            </DatePickerPrev>

            <div class="sh-datepicker__selector">
              <SHSelect
                v-model:value="currentYear"
                :options="years"
                class="min-w-28"
              />
              <SHSelect
                v-model:value="currentMonth"
                :options="monthsList"
                class="min-w-24"
              />
            </div>

            <DatePickerNext
              class="sh-datepicker__nav-btn hover:(text-secondary bg-primary.fade)"
            >
              <IconChevronRight class="sh-datepicker__nav-icon" />
            </DatePickerNext>
          </DatePickerHeader>

          <div class="sh-datepicker__calendar-grid-wrapper">
            <DatePickerGrid
              v-for="month in grid"
              :key="month.value.toString()"
              class="sh-datepicker__grid"
            >
              <DatePickerGridHead>
                <DatePickerGridRow class="sh-datepicker__grid-row-head">
                  <DatePickerHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="sh-datepicker__head-cell"
                  >
                    {{ day }}
                  </DatePickerHeadCell>
                </DatePickerGridRow>
              </DatePickerGridHead>
              <DatePickerGridBody>
                <DatePickerGridRow
                  v-for="(weekDates, index) in month.rows"
                  :key="`weekDate-${index}`"
                  class="sh-datepicker__grid-row"
                >
                  <DatePickerCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                    class="sh-datepicker__cell"
                  >
                    <DatePickerCellTrigger
                      :day="weekDate"
                      :month="month.value"
                      class="sh-datepicker__cell-trigger hover:(text-secondary)"
                    />
                  </DatePickerCell>
                </DatePickerGridRow>
              </DatePickerGridBody>
            </DatePickerGrid>
          </div>
        </DatePickerCalendar>
      </DatePickerContent>
    </DatePickerRoot>
  </div>
</template>

<style lang="postcss">
.sh-datepicker {
  @apply relative inline-block w-full;
}

.sh-datepicker__field {
  @apply flex items-center justify-between w-full h-[36px] px-3;
  @apply bg-bg.primary border border-solid border-border.base rounded-md;
  @apply transition-colors duration-200 cursor-pointer;
  @apply select-none outline-none;

  &:hover {
    @apply border-primary;
  }

  &:focus-visible,
  &[data-state='open'] {
    @apply border-primary;
    box-shadow: 0 0 0 2px rgba(var(--sh-primary-fade), 0.2);
  }

  &[data-disabled] {
    @apply opacity-60 cursor-not-allowed;
  }

  &[data-invalid] {
    @apply border-status.danger;
  }
}

.sh-datepicker__display {
  @apply flex-1 text-sm text-text.base truncate text-left;
}

.sh-datepicker__placeholder {
  @apply text-text.base/40;
}

.sh-datepicker__trigger {
  @apply flex items-center justify-center p-1 rounded transition-colors text-text.base/60;
  @apply hover:text-text.base;
}

.sh-datepicker__icon {
  @apply w-4 h-4 text-text.base/60 ml-2;
}

.sh-datepicker__dropdown {
  @apply z-50 bg-bg.primary border border-solid border-border.base rounded-md shadow-lg;
  @apply animate-in fade-in zoom-in-95 duration-200;
  @apply overflow-hidden;
}

.sh-datepicker__arrow {
  @apply fill-bg.primary stroke-border.base;
}

.sh-datepicker__calendar {
  @apply p-4;
}

.sh-datepicker__header {
  @apply flex items-center justify-between gap-4 mb-4;
}

.sh-datepicker__nav-btn {
  @apply flex items-center justify-center w-8 h-8 rounded-md bg-transparent text-text.base;
  @apply transition-all hover:bg-bg.secondary active:scale-95 cursor-pointer;
  @apply disabled:opacity-30 disabled:cursor-not-allowed;
}

.sh-datepicker__nav-icon {
  @apply w-4 h-4;
}

.sh-datepicker__selector {
  @apply flex items-center gap-2;

  :deep(.sh-select) {
    @apply h-8 py-0 border-none bg-transparent hover:bg-bg.secondary transition-colors;

    .sh-select-arrow {
      @apply hidden;
    }

    .sh-select-selection {
      @apply text-text.base font-medium;
    }
  }
}

.sh-datepicker__heading {
  @apply text-text.base font-medium;
}

.sh-datepicker__calendar-grid-wrapper {
  @apply flex flex-col gap-4 sm:flex-row;
}

.sh-datepicker__grid {
  @apply w-full border-collapse select-none;
}

.sh-datepicker__grid-row-head {
  @apply flex w-full justify-between mb-2;
}

.sh-datepicker__grid-row {
  @apply flex w-full justify-between;
}

.sh-datepicker__head-cell {
  @apply w-8 h-8 flex items-center justify-center text-xs font-medium text-text.base/40;
}

.sh-datepicker__cell {
  @apply relative p-0;
}

.sh-datepicker__cell-trigger {
  @apply w-8 h-8 flex items-center justify-center rounded-md text-sm font-normal text-text.base;
  @apply transition-all cursor-pointer outline-none;
  @apply hover:bg-primary.fade hover:text-primary;

  &[data-selected] {
    @apply bg-primary text-white font-medium hover:bg-primary hover:text-white;
  }

  &[data-today] {
    @apply relative font-bold text-primary;

    &::after {
      content: '';
      @apply absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary;
    }

    &[data-selected]::after {
      @apply bg-white;
    }

    &[data-selected] {
      @apply text-white;
    }
  }

  &[data-outside-view] {
    @apply opacity-30;
  }

  &[data-disabled],
  &[data-unavailable] {
    @apply opacity-20 cursor-not-allowed line-through;
  }
}
</style>
