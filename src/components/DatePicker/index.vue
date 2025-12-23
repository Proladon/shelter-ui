<template>
  <div class="sh-date-picker" :class="{ 'sh-date-picker--disabled': disabled }">
    <div
      ref="triggerRef"
      class="sh-date-picker__trigger"
      :class="{
        'sh-date-picker__trigger--active': isOpen,
        'sh-date-picker__trigger--readonly': readonly,
      }"
      @click="handleTriggerClick"
    >
      <input
        ref="inputRef"
        v-model="displayValue"
        class="sh-date-picker__input"
        :placeholder="computedPlaceholder"
        :disabled="disabled"
        :readonly="readonly"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      <div class="sh-date-picker__icon">
        <IconCalendar
          v-if="
            !modelValue ||
            (!range && !modelValue) ||
            (range && (!modelValue || (!rangeValue?.start && !rangeValue?.end)))
          "
        />
        <IconX
          v-else-if="!readonly && !disabled"
          @click.stop="handleClear"
          class="sh-date-picker__clear-icon"
        />
        <IconCalendar v-else />
      </div>
    </div>

    <Teleport to="body">
      <Transition name="sh-date-picker-fade">
        <div
          v-if="isOpen"
          ref="popoverRef"
          class="sh-date-picker__popover"
          :style="popoverStyle"
        >
          <div class="sh-date-picker__content">
            <div
              v-if="showTimezone && timezone"
              class="sh-date-picker__timezone-info"
            >
              時區: {{ timezone }}
            </div>

            <div class="sh-date-picker__calendar">
              <!-- Calendar Header -->
              <div class="sh-date-picker__header">
                <button
                  class="sh-date-picker__nav-button"
                  @click="navigateMonth(-1)"
                  :disabled="disabled"
                >
                  <IconChevronLeft />
                </button>
                <div class="sh-date-picker__month-year">
                  {{ formatMonthYear(currentMonth) }}
                </div>
                <button
                  class="sh-date-picker__nav-button"
                  @click="navigateMonth(1)"
                  :disabled="disabled"
                >
                  <IconChevronRight />
                </button>
              </div>

              <!-- Calendar Grid -->
              <div class="sh-date-picker__grid">
                <!-- Weekday Headers -->
                <div class="sh-date-picker__weekdays">
                  <div
                    v-for="weekday in weekdays"
                    :key="weekday"
                    class="sh-date-picker__weekday"
                  >
                    {{ weekday }}
                  </div>
                </div>

                <!-- Date Cells -->
                <div class="sh-date-picker__dates">
                  <button
                    v-for="date in calendarDates"
                    :key="date.key"
                    class="sh-date-picker__date"
                    :class="{
                      'sh-date-picker__date--today': date.isToday,
                      'sh-date-picker__date--selected': date.isSelected,
                      'sh-date-picker__date--in-range': date.isInRange,
                      'sh-date-picker__date--range-start': date.isRangeStart,
                      'sh-date-picker__date--range-end': date.isRangeEnd,
                      'sh-date-picker__date--other-month': date.isOtherMonth,
                      'sh-date-picker__date--disabled': date.isDisabled,
                    }"
                    :disabled="date.isDisabled"
                    @click="handleDateClick(date.date)"
                    @mouseenter="handleDateHover(date.date)"
                  >
                    {{ date.day }}
                  </button>
                </div>
              </div>
            </div>

            <div v-if="range" class="sh-date-picker__range-info">
              <div class="sh-date-picker__range-item">
                <span class="sh-date-picker__range-label">開始:</span>
                <span class="sh-date-picker__range-value">
                  {{ formatDateForDisplay(rangeValue?.start) || '未選擇' }}
                </span>
              </div>
              <div class="sh-date-picker__range-item">
                <span class="sh-date-picker__range-label">結束:</span>
                <span class="sh-date-picker__range-value">
                  {{ formatDateForDisplay(rangeValue?.end) || '未選擇' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from '@tabler/icons-vue'
import type {
  DatePickerProps,
  DatePickerEmits,
  DatePickerExpose,
  DateRange,
} from './types'

defineOptions({
  name: 'ShDatePicker',
})

const props = withDefaults(defineProps<DatePickerProps>(), {
  range: false,
  format: 'YYYY-MM-DD',
  showTimezone: false,
  utcMode: false,
  timezone: undefined,
})

const emit = defineEmits<DatePickerEmits>()

// Refs
const triggerRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()
const popoverRef = ref<HTMLDivElement>()

// State
const isOpen = ref(false)
const currentMonth = ref(new Date())
const hoverDate = ref<Date | null>(null)
const rangeState = ref<'start' | 'end'>('start')

// Computed
const computedPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  return props.range ? '選擇日期範圍' : '選擇日期'
})

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

const singleValue = computed(() => {
  return props.range ? undefined : (props.modelValue as Date | undefined)
})

const rangeValue = computed(() => {
  return props.range ? (props.modelValue as DateRange | undefined) : undefined
})

// Format date based on timezone settings
const formatDate = (date: Date | undefined): string => {
  if (!date) return ''

  try {
    if (props.utcMode) {
      return date.toISOString().split('T')[0] || ''
    }

    if (props.timezone) {
      return new Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: props.timezone,
      })
        .format(date)
        .replace(/\//g, '-')
    }

    return date.toLocaleDateString('zh-TW').replace(/\//g, '-')
  } catch (error) {
    console.warn('Date formatting error:', error)
    return date.toLocaleDateString('zh-TW').replace(/\//g, '-')
  }
}

const formatDateForDisplay = (date: Date | undefined): string => {
  if (!date) return ''
  return formatDate(date)
}

const displayValue = computed(() => {
  if (props.range && rangeValue.value) {
    const start = formatDateForDisplay(rangeValue.value.start)
    const end = formatDateForDisplay(rangeValue.value.end)
    if (start && end) {
      return `${start} ~ ${end}`
    } else if (start) {
      return start
    }
    return ''
  } else if (singleValue.value) {
    return formatDateForDisplay(singleValue.value)
  }
  return ''
})

const formatMonthYear = (date: Date): string => {
  try {
    if (props.timezone) {
      return new Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: 'long',
        timeZone: props.timezone,
      }).format(date)
    }
    return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: 'long',
    }).format(date)
  } catch (error) {
    console.warn('Month/Year formatting error:', error)
    return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: 'long',
    }).format(date)
  }
}

// Calendar dates generation
const calendarDates = computed(() => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()

  const firstDay = new Date(year, month, 1)
  const startDate = new Date(firstDay)
  startDate.setDate(startDate.getDate() - firstDay.getDay())

  const dates = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)

    const isOtherMonth = date.getMonth() !== month
    const isToday = date.getTime() === today.getTime()
    const isDisabled = isDateDisabled(date)

    let isSelected = false
    let isInRange = false
    let isRangeStart = false
    let isRangeEnd = false

    if (props.range && rangeValue.value) {
      const { start, end } = rangeValue.value
      if (start) {
        isRangeStart = date.getTime() === start.getTime()
        isSelected = isRangeStart
      }
      if (end) {
        isRangeEnd = date.getTime() === end.getTime()
        isSelected = isSelected || isRangeEnd
      }
      if (start && end) {
        isInRange =
          date.getTime() > start.getTime() && date.getTime() < end.getTime()
      } else if (
        start &&
        hoverDate.value &&
        date.getTime() > start.getTime() &&
        date.getTime() < hoverDate.value.getTime()
      ) {
        isInRange = true
      }
    } else if (singleValue.value) {
      isSelected = date.getTime() === singleValue.value.getTime()
    }

    dates.push({
      date,
      day: date.getDate(),
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      isToday,
      isSelected,
      isInRange,
      isRangeStart,
      isRangeEnd,
      isOtherMonth,
      isDisabled,
    })
  }

  return dates
})

const isDateDisabled = (date: Date): boolean => {
  if (props.minDate && date < props.minDate) return true
  if (props.maxDate && date > props.maxDate) return true
  if (props.disabledDates) {
    return props.disabledDates.some(
      (disabledDate) => date.getTime() === disabledDate.getTime(),
    )
  }
  return false
}

// Popover positioning
const popoverStyle = ref<Record<string, string>>({})

const updatePopoverPosition = async () => {
  if (!triggerRef.value || !popoverRef.value) return

  await nextTick()

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()
  const viewportHeight = window.innerHeight
  const viewportWidth = window.innerWidth

  let top = triggerRect.bottom + 4
  let left = triggerRect.left

  // Adjust if popover would go off-screen
  if (top + popoverRect.height > viewportHeight) {
    top = triggerRect.top - popoverRect.height - 4
  }

  if (left + popoverRect.width > viewportWidth) {
    left = viewportWidth - popoverRect.width - 8
  }

  if (left < 8) {
    left = 8
  }

  popoverStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: '1000',
  }
}

// Event handlers
const handleTriggerClick = () => {
  if (props.disabled || props.readonly) return
  isOpen.value = !isOpen.value
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleTriggerClick()
  } else if (event.key === 'Escape') {
    isOpen.value = false
  }
}

const handleDateClick = (date: Date) => {
  if (isDateDisabled(date)) return

  if (props.range) {
    const current = rangeValue.value || {}

    if (rangeState.value === 'start' || !current.start) {
      const newRange: DateRange = { start: date, end: undefined }
      emit('update:modelValue', newRange)
      emit('change', newRange)
      rangeState.value = 'end'
    } else {
      if (date.getTime() < current.start!.getTime()) {
        // If selected date is before start, make it the new start
        const newRange: DateRange = { start: date, end: undefined }
        emit('update:modelValue', newRange)
        emit('change', newRange)
        rangeState.value = 'end'
      } else {
        // Complete the range
        const newRange: DateRange = { start: current.start, end: date }
        emit('update:modelValue', newRange)
        emit('change', newRange)
        isOpen.value = false
        rangeState.value = 'start'
      }
    }
  } else {
    emit('update:modelValue', date)
    emit('change', date)
    isOpen.value = false
  }
}

const handleDateHover = (date: Date) => {
  if (props.range && rangeValue.value?.start && !rangeValue.value.end) {
    hoverDate.value = date
  }
}

const handleClear = () => {
  emit(
    'update:modelValue',
    props.range ? { start: undefined, end: undefined } : undefined,
  )
  emit('change', props.range ? { start: undefined, end: undefined } : undefined)
  emit('clear')
}

const navigateMonth = (direction: number) => {
  const newMonth = new Date(currentMonth.value)
  newMonth.setMonth(newMonth.getMonth() + direction)
  currentMonth.value = newMonth
}

// Click outside handler
const handleClickOutside = (event: MouseEvent) => {
  if (
    !triggerRef.value?.contains(event.target as Node) &&
    !popoverRef.value?.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

// Watchers
watch(isOpen, async (newValue) => {
  if (newValue) {
    await updatePopoverPosition()
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
    hoverDate.value = null
  }
})

// Lifecycle
onMounted(() => {
  // Initialize current month based on model value
  if (singleValue.value) {
    currentMonth.value = new Date(
      singleValue.value.getFullYear(),
      singleValue.value.getMonth(),
      1,
    )
  } else if (rangeValue.value?.start) {
    currentMonth.value = new Date(
      rangeValue.value.start.getFullYear(),
      rangeValue.value.start.getMonth(),
      1,
    )
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// Expose
const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const clear = () => {
  handleClear()
}

defineExpose<DatePickerExpose>({
  focus,
  blur,
  clear,
})
</script>

<style lang="postcss">
.sh-date-picker {
  @apply relative inline-block w-full max-w-sm;
}

.sh-date-picker--disabled {
  @apply opacity-60 cursor-not-allowed;
}

.sh-date-picker__trigger {
  @apply relative flex items-center w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer transition-colors duration-200;
}

.sh-date-picker__trigger:hover:not(.sh-date-picker__trigger--readonly) {
  @apply border-blue-400;
}

.sh-date-picker__trigger--active {
  @apply border-blue-500 ring-2 ring-blue-200;
}

.sh-date-picker__trigger--readonly {
  @apply cursor-default bg-gray-50;
}

.sh-date-picker__input {
  @apply flex-1 outline-none bg-transparent text-sm;
}

.sh-date-picker__input:disabled {
  @apply cursor-not-allowed;
}

.sh-date-picker__icon {
  @apply flex items-center justify-center w-5 h-5 text-gray-400;
}

.sh-date-picker__clear-icon {
  @apply cursor-pointer hover:text-gray-600 transition-colors duration-200;
}

.sh-date-picker__popover {
  @apply bg-white border border-gray-200 rounded-lg shadow-lg;
}

.sh-date-picker__content {
  @apply p-4;
}

.sh-date-picker__timezone-info {
  @apply text-xs text-gray-500 mb-3 text-center;
}

.sh-date-picker__header {
  @apply flex items-center justify-between mb-4;
}

.sh-date-picker__nav-button {
  @apply flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors duration-200;
}

.sh-date-picker__nav-button:disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-transparent;
}

.sh-date-picker__month-year {
  @apply text-sm font-medium;
}

.sh-date-picker__grid {
  @apply select-none;
}

.sh-date-picker__weekdays {
  @apply grid grid-cols-7 gap-1 mb-2;
}

.sh-date-picker__weekday {
  @apply flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500;
}

.sh-date-picker__dates {
  @apply grid grid-cols-7 gap-1;
}

.sh-date-picker__date {
  @apply flex items-center justify-center w-8 h-8 text-sm rounded-md hover:bg-gray-100 transition-colors duration-200;
}

.sh-date-picker__date--today {
  @apply font-semibold text-blue-600;
}

.sh-date-picker__date--selected {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.sh-date-picker__date--in-range {
  @apply bg-blue-100 text-blue-700;
}

.sh-date-picker__date--range-start {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.sh-date-picker__date--range-end {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.sh-date-picker__date--other-month {
  @apply text-gray-300;
}

.sh-date-picker__date--disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-transparent;
}

.sh-date-picker__range-info {
  @apply mt-4 pt-4 border-t border-gray-200 space-y-2;
}

.sh-date-picker__range-item {
  @apply flex justify-between items-center text-sm;
}

.sh-date-picker__range-label {
  @apply text-gray-500;
}

.sh-date-picker__range-value {
  @apply font-medium;
}

/* Transitions */
.sh-date-picker-fade-enter-active,
.sh-date-picker-fade-leave-active {
  @apply transition-all duration-200;
}

.sh-date-picker-fade-enter-from,
.sh-date-picker-fade-leave-to {
  @apply opacity-0 transform scale-95;
}
</style>
