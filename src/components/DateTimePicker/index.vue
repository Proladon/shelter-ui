<template>
  <div
    class="sh-datetime-picker"
    :class="{ 'sh-datetime-picker--disabled': disabled }"
  >
    <div
      ref="triggerRef"
      class="sh-datetime-picker__trigger"
      :class="{
        'sh-datetime-picker__trigger--active': isOpen,
        'sh-datetime-picker__trigger--readonly': readonly,
      }"
      @click="handleTriggerClick"
    >
      <input
        ref="inputRef"
        v-model="displayValue"
        class="sh-datetime-picker__input"
        :placeholder="computedPlaceholder"
        :disabled="disabled"
        :readonly="readonly"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      <div class="sh-datetime-picker__icon">
        <IconCalendarClock v-if="!hasValue" />
        <IconX
          v-else-if="!readonly && !disabled"
          @click.stop="handleClear"
          class="sh-datetime-picker__clear-icon"
        />
        <IconCalendarClock v-else />
      </div>
    </div>

    <Teleport to="body">
      <Transition name="sh-datetime-picker-fade">
        <div
          v-if="isOpen"
          ref="popoverRef"
          class="sh-datetime-picker__popover"
          :style="popoverStyle"
        >
          <div class="sh-datetime-picker__content">
            <div
              v-if="showTimezone && currentTimezone"
              class="sh-datetime-picker__timezone-info"
            >
              <div class="sh-datetime-picker__timezone-current">
                時區: {{ currentTimezone }}
              </div>
              <select
                v-if="timezoneList && timezoneList.length > 0"
                v-model="currentTimezone"
                class="sh-datetime-picker__timezone-select"
                @change="handleTimezoneChange"
              >
                <option v-for="tz in timezoneList" :key="tz" :value="tz">
                  {{ tz }}
                </option>
              </select>
            </div>

            <div v-if="!range" class="sh-datetime-picker__single-container">
              <div class="sh-datetime-picker__datetime-selector">
                <div class="sh-datetime-picker__date-section">
                  <h4 class="sh-datetime-picker__section-title">選擇日期</h4>
                  <div class="sh-datetime-picker__calendar">
                    <!-- Calendar Header -->
                    <div class="sh-datetime-picker__calendar-header">
                      <button
                        class="sh-datetime-picker__nav-button"
                        @click="navigateMonth(-1)"
                        :disabled="disabled"
                      >
                        <IconChevronLeft />
                      </button>
                      <div class="sh-datetime-picker__month-year">
                        {{ formatMonthYear(currentMonth) }}
                      </div>
                      <button
                        class="sh-datetime-picker__nav-button"
                        @click="navigateMonth(1)"
                        :disabled="disabled"
                      >
                        <IconChevronRight />
                      </button>
                    </div>

                    <!-- Calendar Grid -->
                    <div class="sh-datetime-picker__calendar-grid">
                      <!-- Weekday Headers -->
                      <div class="sh-datetime-picker__weekdays">
                        <div
                          v-for="weekday in weekdays"
                          :key="weekday"
                          class="sh-datetime-picker__weekday"
                        >
                          {{ weekday }}
                        </div>
                      </div>

                      <!-- Date Cells -->
                      <div class="sh-datetime-picker__dates">
                        <button
                          v-for="date in calendarDates"
                          :key="date.key"
                          class="sh-datetime-picker__date"
                          :class="{
                            'sh-datetime-picker__date--today': date.isToday,
                            'sh-datetime-picker__date--selected':
                              date.isSelected,
                            'sh-datetime-picker__date--other-month':
                              date.isOtherMonth,
                            'sh-datetime-picker__date--disabled':
                              date.isDisabled,
                          }"
                          :disabled="date.isDisabled"
                          @click="handleDateClick(date.date)"
                        >
                          {{ date.day }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="sh-datetime-picker__time-section">
                  <h4 class="sh-datetime-picker__section-title">選擇時間</h4>
                  <div class="sh-datetime-picker__time-selector">
                    <!-- Hour Selector -->
                    <div class="sh-datetime-picker__time-unit">
                      <label class="sh-datetime-picker__time-label">時</label>
                      <select
                        v-model="currentHour"
                        class="sh-datetime-picker__time-select"
                        @change="updateSingleDateTime"
                      >
                        <option
                          v-for="hour in hourOptions"
                          :key="hour.value"
                          :value="hour.value"
                        >
                          {{ hour.label }}
                        </option>
                      </select>
                    </div>

                    <!-- Minute Selector -->
                    <div class="sh-datetime-picker__time-unit">
                      <label class="sh-datetime-picker__time-label">分</label>
                      <select
                        v-model="currentMinute"
                        class="sh-datetime-picker__time-select"
                        @change="updateSingleDateTime"
                      >
                        <option
                          v-for="minute in minuteOptions"
                          :key="minute.value"
                          :value="minute.value"
                        >
                          {{ minute.label }}
                        </option>
                      </select>
                    </div>

                    <!-- Second Selector -->
                    <div
                      v-if="showSeconds"
                      class="sh-datetime-picker__time-unit"
                    >
                      <label class="sh-datetime-picker__time-label">秒</label>
                      <select
                        v-model="currentSecond"
                        class="sh-datetime-picker__time-select"
                        @change="updateSingleDateTime"
                      >
                        <option
                          v-for="second in secondOptions"
                          :key="second.value"
                          :value="second.value"
                        >
                          {{ second.label }}
                        </option>
                      </select>
                    </div>

                    <!-- AM/PM Selector -->
                    <div v-if="use12Hour" class="sh-datetime-picker__time-unit">
                      <label class="sh-datetime-picker__time-label">時段</label>
                      <select
                        v-model="currentAmPm"
                        class="sh-datetime-picker__time-select"
                        @change="updateSingleDateTime"
                      >
                        <option value="AM">上午</option>
                        <option value="PM">下午</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="sh-datetime-picker__range-container">
              <div class="sh-datetime-picker__range-info">
                <div class="sh-datetime-picker__range-item">
                  <span class="sh-datetime-picker__range-label">開始:</span>
                  <span class="sh-datetime-picker__range-value">
                    {{
                      formatDateTimeForDisplay(rangeValue?.start) || '未選擇'
                    }}
                  </span>
                </div>
                <div class="sh-datetime-picker__range-item">
                  <span class="sh-datetime-picker__range-label">結束:</span>
                  <span class="sh-datetime-picker__range-value">
                    {{ formatDateTimeForDisplay(rangeValue?.end) || '未選擇' }}
                  </span>
                </div>
              </div>

              <!-- Range selection UI would be more complex - simplified for now -->
              <div class="sh-datetime-picker__range-note">
                範圍選擇功能開發中...
              </div>
            </div>

            <div class="sh-datetime-picker__actions">
              <button
                class="sh-datetime-picker__button sh-datetime-picker__button--secondary"
                @click="handleClear"
              >
                清除
              </button>
              <button
                class="sh-datetime-picker__button sh-datetime-picker__button--primary"
                @click="handleConfirm"
              >
                確認
              </button>
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
  IconCalendarClock,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from '@tabler/icons-vue'
import type {
  DateTimePickerProps,
  DateTimePickerEmits,
  DateTimePickerExpose,
  DateTimeRange,
} from './types'

defineOptions({
  name: 'ShDateTimePicker',
})

const props = withDefaults(defineProps<DateTimePickerProps>(), {
  range: false,
  format: 'YYYY-MM-DD HH:mm:ss',
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss',
  showSeconds: true,
  use12Hour: false,
  minuteStep: 1,
  secondStep: 1,
  showTimeFirst: false,
  showTimezone: false,
  utcMode: false,
  autoTimezoneDetection: true,
  enableTimezoneConversion: true,
  timezone: undefined,
})

const emit = defineEmits<DateTimePickerEmits>()

// Refs
const triggerRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()
const popoverRef = ref<HTMLDivElement>()

// State
const isOpen = ref(false)
const currentMonth = ref(new Date())
const selectedDate = ref<Date | null>(null)
const currentTimezone = ref(
  props.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
)

// Time state
const currentHour = ref<number>(0)
const currentMinute = ref<number>(0)
const currentSecond = ref<number>(0)
const currentAmPm = ref<'AM' | 'PM'>('AM')

// Computed
const computedPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  return props.range ? '選擇日期時間範圍' : '選擇日期時間'
})

const singleValue = computed(() => {
  return props.range ? undefined : (props.modelValue as Date | undefined)
})

const rangeValue = computed(() => {
  return props.range
    ? (props.modelValue as DateTimeRange | undefined)
    : undefined
})

const hasValue = computed(() => {
  if (props.range) {
    return rangeValue.value?.start || rangeValue.value?.end
  }
  return !!singleValue.value
})

const weekdays = ['日', '一', '二', '三', '四', '五', '六']

// Generate time options
const hourOptions = computed(() => {
  const maxHour = props.use12Hour ? 12 : 23
  const minHour = props.use12Hour ? 1 : 0
  const options = []

  for (let i = minHour; i <= maxHour; i++) {
    const value = props.use12Hour ? i : i
    const label = String(i).padStart(2, '0')
    options.push({ value, label })
  }

  return options
})

const minuteOptions = computed(() => {
  const options = []
  for (let i = 0; i < 60; i += props.minuteStep) {
    options.push({
      value: i,
      label: String(i).padStart(2, '0'),
    })
  }
  return options
})

const secondOptions = computed(() => {
  const options = []
  for (let i = 0; i < 60; i += props.secondStep) {
    options.push({
      value: i,
      label: String(i).padStart(2, '0'),
    })
  }
  return options
})

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
    const isSelected =
      selectedDate.value && date.getTime() === selectedDate.value.getTime()

    dates.push({
      date,
      day: date.getDate(),
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
      isToday,
      isSelected,
      isOtherMonth,
      isDisabled,
    })
  }

  return dates
})

const isDateDisabled = (date: Date): boolean => {
  if (props.minDateTime && date < props.minDateTime) return true
  if (props.maxDateTime && date > props.maxDateTime) return true
  if (props.disabledDates) {
    return props.disabledDates.some(
      (disabledDate) => date.getTime() === disabledDate.getTime(),
    )
  }
  return false
}

// Format functions
const formatMonthYear = (date: Date): string => {
  try {
    if (currentTimezone.value) {
      return new Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: 'long',
        timeZone: currentTimezone.value,
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

const formatDateTimeForDisplay = (dateTime: Date | undefined): string => {
  if (!dateTime) return ''

  try {
    if (props.utcMode) {
      return dateTime.toISOString().replace('T', ' ').slice(0, 19)
    }

    if (currentTimezone.value) {
      return new Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: props.showSeconds ? '2-digit' : undefined,
        timeZone: currentTimezone.value,
        hour12: props.use12Hour,
      }).format(dateTime)
    }

    return dateTime.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: props.showSeconds ? '2-digit' : undefined,
      hour12: props.use12Hour,
    })
  } catch (error) {
    console.warn('DateTime formatting error:', error)
    return dateTime.toLocaleString('zh-TW')
  }
}

const displayValue = computed(() => {
  if (props.range && rangeValue.value) {
    const start = formatDateTimeForDisplay(rangeValue.value.start)
    const end = formatDateTimeForDisplay(rangeValue.value.end)
    if (start && end) {
      return `${start} ~ ${end}`
    } else if (start) {
      return start
    }
    return ''
  } else if (singleValue.value) {
    return formatDateTimeForDisplay(singleValue.value)
  }
  return ''
})

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
  selectedDate.value = date
  updateSingleDateTime()
}

const updateSingleDateTime = () => {
  if (!selectedDate.value) return

  let hour = currentHour.value
  if (props.use12Hour && currentAmPm.value === 'PM' && hour !== 12) {
    hour += 12
  } else if (props.use12Hour && currentAmPm.value === 'AM' && hour === 12) {
    hour = 0
  }

  const dateTime = new Date(selectedDate.value)
  dateTime.setHours(hour, currentMinute.value, currentSecond.value, 0)

  emit('update:modelValue', dateTime)
  emit('change', dateTime)
}

const handleClear = () => {
  selectedDate.value = null

  if (props.range) {
    const emptyRange: DateTimeRange = { start: undefined, end: undefined }
    emit('update:modelValue', emptyRange)
    emit('change', emptyRange)
  } else {
    emit('update:modelValue', undefined)
    emit('change', undefined)
  }
  emit('clear')
}

const handleConfirm = () => {
  isOpen.value = false
}

const handleTimezoneChange = () => {
  emit('timezone-change', currentTimezone.value)
}

const navigateMonth = (direction: number) => {
  const newMonth = new Date(currentMonth.value)
  newMonth.setMonth(newMonth.getMonth() + direction)
  currentMonth.value = newMonth
}

// Initialize values
const initializeValues = () => {
  if (singleValue.value) {
    selectedDate.value = new Date(singleValue.value)
    currentMonth.value = new Date(
      singleValue.value.getFullYear(),
      singleValue.value.getMonth(),
      1,
    )

    const hour = singleValue.value.getHours()
    if (props.use12Hour) {
      if (hour === 0) {
        currentHour.value = 12
        currentAmPm.value = 'AM'
      } else if (hour > 12) {
        currentHour.value = hour - 12
        currentAmPm.value = 'PM'
      } else {
        currentHour.value = hour
        currentAmPm.value = hour === 12 ? 'PM' : 'AM'
      }
    } else {
      currentHour.value = hour
    }

    currentMinute.value = singleValue.value.getMinutes()
    currentSecond.value = singleValue.value.getSeconds()
  }
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
  }
})

watch(
  () => props.modelValue,
  () => {
    initializeValues()
  },
  { immediate: true },
)

// Lifecycle
onMounted(() => {
  initializeValues()
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

const setTimezone = (timezone: string) => {
  currentTimezone.value = timezone
  handleTimezoneChange()
}

defineExpose<DateTimePickerExpose>({
  focus,
  blur,
  clear,
  setTimezone,
})
</script>

<style lang="postcss">
.sh-datetime-picker {
  @apply relative inline-block w-full max-w-md;
}

.sh-datetime-picker--disabled {
  @apply opacity-60 cursor-not-allowed;
}

.sh-datetime-picker__trigger {
  @apply relative flex items-center w-full px-3 py-2 border border-gray-300 rounded-md bg-white cursor-pointer transition-colors duration-200;
}

.sh-datetime-picker__trigger:hover:not(.sh-datetime-picker__trigger--readonly) {
  @apply border-blue-400;
}

.sh-datetime-picker__trigger--active {
  @apply border-blue-500 ring-2 ring-blue-200;
}

.sh-datetime-picker__trigger--readonly {
  @apply cursor-default bg-gray-50;
}

.sh-datetime-picker__input {
  @apply flex-1 outline-none bg-transparent text-sm;
}

.sh-datetime-picker__input:disabled {
  @apply cursor-not-allowed;
}

.sh-datetime-picker__icon {
  @apply flex items-center justify-center w-5 h-5 text-gray-400;
}

.sh-datetime-picker__clear-icon {
  @apply cursor-pointer hover:text-gray-600 transition-colors duration-200;
}

.sh-datetime-picker__popover {
  @apply bg-white border border-gray-200 rounded-lg shadow-lg;
}

.sh-datetime-picker__content {
  @apply p-4 min-w-96;
}

.sh-datetime-picker__timezone-info {
  @apply mb-4 p-3 bg-gray-50 rounded-md;
}

.sh-datetime-picker__timezone-current {
  @apply text-sm text-gray-600 mb-2;
}

.sh-datetime-picker__timezone-select {
  @apply w-full text-sm border border-gray-300 rounded px-2 py-1;
}

.sh-datetime-picker__datetime-selector {
  @apply flex gap-6;
}

.sh-datetime-picker__date-section,
.sh-datetime-picker__time-section {
  @apply flex-1;
}

.sh-datetime-picker__section-title {
  @apply text-sm font-medium text-gray-700 mb-3;
}

.sh-datetime-picker__calendar-header {
  @apply flex items-center justify-between mb-4;
}

.sh-datetime-picker__nav-button {
  @apply flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-100 transition-colors duration-200;
}

.sh-datetime-picker__nav-button:disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-transparent;
}

.sh-datetime-picker__month-year {
  @apply text-sm font-medium;
}

.sh-datetime-picker__calendar-grid {
  @apply select-none;
}

.sh-datetime-picker__weekdays {
  @apply grid grid-cols-7 gap-1 mb-2;
}

.sh-datetime-picker__weekday {
  @apply flex items-center justify-center w-8 h-8 text-xs font-medium text-gray-500;
}

.sh-datetime-picker__dates {
  @apply grid grid-cols-7 gap-1;
}

.sh-datetime-picker__date {
  @apply flex items-center justify-center w-8 h-8 text-sm rounded-md hover:bg-gray-100 transition-colors duration-200;
}

.sh-datetime-picker__date--today {
  @apply font-semibold text-blue-600;
}

.sh-datetime-picker__date--selected {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.sh-datetime-picker__date--other-month {
  @apply text-gray-300;
}

.sh-datetime-picker__date--disabled {
  @apply opacity-50 cursor-not-allowed hover:bg-transparent;
}

.sh-datetime-picker__time-selector {
  @apply flex gap-2;
}

.sh-datetime-picker__time-unit {
  @apply flex flex-col;
}

.sh-datetime-picker__time-label {
  @apply text-xs text-gray-500 mb-1 text-center;
}

.sh-datetime-picker__time-select {
  @apply border border-gray-300 rounded px-2 py-1 text-sm min-w-16 text-center;
}

.sh-datetime-picker__time-select:focus {
  @apply outline-none border-blue-500 ring-1 ring-blue-200;
}

.sh-datetime-picker__range-container {
  @apply space-y-4;
}

.sh-datetime-picker__range-info {
  @apply space-y-2 p-3 bg-gray-50 rounded-md;
}

.sh-datetime-picker__range-item {
  @apply flex justify-between items-center text-sm;
}

.sh-datetime-picker__range-label {
  @apply text-gray-500;
}

.sh-datetime-picker__range-value {
  @apply font-medium;
}

.sh-datetime-picker__range-note {
  @apply text-center text-gray-500 text-sm py-8;
}

.sh-datetime-picker__actions {
  @apply flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200;
}

.sh-datetime-picker__button {
  @apply px-3 py-1.5 text-sm rounded-md transition-colors duration-200;
}

.sh-datetime-picker__button--primary {
  @apply bg-blue-500 text-white hover:bg-blue-600;
}

.sh-datetime-picker__button--secondary {
  @apply border border-gray-300 text-gray-700 hover:bg-gray-50;
}

/* Transitions */
.sh-datetime-picker-fade-enter-active,
.sh-datetime-picker-fade-leave-active {
  @apply transition-all duration-200;
}

.sh-datetime-picker-fade-enter-from,
.sh-datetime-picker-fade-leave-to {
  @apply opacity-0 transform scale-95;
}
</style>
