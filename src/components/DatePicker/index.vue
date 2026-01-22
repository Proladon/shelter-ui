<script setup lang="ts">
import { computed } from 'vue'
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-vue'
import { fromDate, getLocalTimeZone } from '@internationalized/date'
import {
  DatePickerArrow,
  DatePickerCalendar,
  DatePickerCell,
  DatePickerCellTrigger,
  DatePickerContent,
  DatePickerField,
  DatePickerGrid,
  DatePickerGridBody,
  DatePickerGridHead,
  DatePickerGridRow,
  DatePickerHeadCell,
  DatePickerHeader,
  DatePickerHeading,
  DatePickerInput,
  DatePickerNext,
  DatePickerPrev,
  DatePickerRoot,
  DatePickerTrigger,
} from 'reka-ui'
import type { DatePickerProps, DatePickerEmits } from './types'

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

const minValue = computed(() =>
  props.minDate ? fromDate(props.minDate, getLocalTimeZone()) : undefined,
)
const maxValue = computed(() =>
  props.maxDate ? fromDate(props.maxDate, getLocalTimeZone()) : undefined,
)
</script>

<template>
  <div class="sh-datepicker">
    <DatePickerRoot
      v-model="internalValue"
      :disabled="disabled"
      :min-value="minValue"
      :max-value="maxValue"
    >
      <DatePickerField v-slot="{ segments }" class="sh-datepicker__field">
        <div class="sh-datepicker__input">
          <template v-for="item in segments" :key="item.part">
            <DatePickerInput
              v-if="item.part === 'literal'"
              :part="item.part"
              class="sh-datepicker__literal"
            >
              {{ item.value }}
            </DatePickerInput>
            <DatePickerInput
              v-else
              :part="item.part"
              class="sh-datepicker__segment"
            >
              {{ item.value }}
            </DatePickerInput>
          </template>
        </div>

        <DatePickerTrigger class="sh-datepicker__trigger">
          <IconCalendar class="sh-datepicker__icon" />
        </DatePickerTrigger>
      </DatePickerField>

      <DatePickerContent :side-offset="4" class="sh-datepicker__dropdown">
        <DatePickerArrow class="sh-datepicker__arrow" />
        <DatePickerCalendar
          v-slot="{ weekDays, grid }"
          class="sh-datepicker__calendar"
        >
          <DatePickerHeader class="sh-datepicker__header">
            <DatePickerPrev class="sh-datepicker__nav-btn">
              <IconChevronLeft class="sh-datepicker__nav-icon" />
            </DatePickerPrev>

            <DatePickerHeading class="sh-datepicker__heading" />
            <DatePickerNext class="sh-datepicker__nav-btn">
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
                      class="sh-datepicker__cell-trigger"
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
  @apply transition-colors duration-200 cursor-text;
  @apply select-none;

  &:hover {
    @apply border-primary;
  }

  &[data-focused] {
    @apply border-primary outline-none;
    box-shadow: 0 0 0 2px rgba(var(--sh-primary-fade), 0.2);
  }

  &[data-disabled] {
    @apply opacity-60 cursor-not-allowed;
  }

  &[data-invalid] {
    @apply border-status.danger;
  }
}

.sh-datepicker__input {
  @apply flex items-center gap-0.5;
}

.sh-datepicker__segment {
  @apply px-0.5 rounded-sm outline-none text-text.base;
  @apply focus:bg-primary.fade focus:text-primary;
  @apply data-[placeholder]:text-text.base/40;
}

.sh-datepicker__literal {
  @apply text-text.base/60;
}

.sh-datepicker__trigger {
  @apply flex items-center justify-center p-1 rounded transition-colors text-text.base/60;
  @apply hover:text-text.base;
}

.sh-datepicker__icon {
  @apply w-4 h-4;
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
