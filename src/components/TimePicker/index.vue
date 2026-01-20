<template>
  <div class="sh-time-picker" :class="{ 'sh-time-picker--disabled': disabled }">
    <div
      ref="triggerRef"
      class="sh-time-picker__trigger"
      :class="{
        'sh-time-picker__trigger--active': isOpen,
        'sh-time-picker__trigger--readonly': readonly,
      }"
      @click="handleTriggerClick"
    >
      <input
        ref="inputRef"
        v-model="displayValue"
        class="sh-time-picker__input"
        :placeholder="computedPlaceholder"
        :disabled="disabled"
        :readonly="readonly"
        @focus="handleFocus"
        @blur="handleBlur"
        @keydown="handleKeydown"
      />
      <div class="sh-time-picker__icon">
        <IconClock
          v-if="
            !modelValue ||
            (!range && !modelValue) ||
            (range && (!modelValue || (!rangeValue?.start && !rangeValue?.end)))
          "
        />
        <IconX
          v-else-if="!readonly && !disabled"
          @click.stop="handleClear"
          class="sh-time-picker__clear-icon"
        />
        <IconClock v-else />
      </div>
    </div>

    <Teleport to="body">
      <Transition name="sh-time-picker-fade">
        <div
          v-if="isOpen"
          ref="popoverRef"
          class="sh-time-picker__popover"
          :style="popoverStyle"
        >
          <div class="sh-time-picker__content">
            <div
              v-if="showTimezone && timezone"
              class="sh-time-picker__timezone-info"
            >
              時區: {{ timezone }}
            </div>

            <div v-if="!range" class="sh-time-picker__single-selector">
              <div class="sh-time-picker__time-selector">
                <!-- Hour Selector -->
                <div class="sh-time-picker__time-unit">
                  <label class="sh-time-picker__label">時</label>
                  <select
                    v-model="currentHour"
                    class="sh-time-picker__select"
                    @change="updateSingleTime"
                  >
                    <option
                      v-for="hour in hourOptions"
                      :key="hour.value"
                      :value="hour.value"
                      :disabled="hour.disabled"
                    >
                      {{ hour.label }}
                    </option>
                  </select>
                </div>

                <!-- Minute Selector -->
                <div class="sh-time-picker__time-unit">
                  <label class="sh-time-picker__label">分</label>
                  <select
                    v-model="currentMinute"
                    class="sh-time-picker__select"
                    @change="updateSingleTime"
                  >
                    <option
                      v-for="minute in minuteOptions"
                      :key="minute.value"
                      :value="minute.value"
                      :disabled="minute.disabled"
                    >
                      {{ minute.label }}
                    </option>
                  </select>
                </div>

                <!-- Second Selector -->
                <div v-if="showSeconds" class="sh-time-picker__time-unit">
                  <label class="sh-time-picker__label">秒</label>
                  <select
                    v-model="currentSecond"
                    class="sh-time-picker__select"
                    @change="updateSingleTime"
                  >
                    <option
                      v-for="second in secondOptions"
                      :key="second.value"
                      :value="second.value"
                      :disabled="second.disabled"
                    >
                      {{ second.label }}
                    </option>
                  </select>
                </div>

                <!-- AM/PM Selector -->
                <div v-if="use12Hour" class="sh-time-picker__time-unit">
                  <label class="sh-time-picker__label">時段</label>
                  <select
                    v-model="currentAmPm"
                    class="sh-time-picker__select"
                    @change="updateSingleTime"
                  >
                    <option value="AM">上午</option>
                    <option value="PM">下午</option>
                  </select>
                </div>
              </div>
            </div>

            <div v-else class="sh-time-picker__range-selector">
              <!-- Start Time -->
              <div class="sh-time-picker__range-section">
                <h4 class="sh-time-picker__range-title">開始時間</h4>
                <div class="sh-time-picker__time-selector">
                  <div class="sh-time-picker__time-unit">
                    <label class="sh-time-picker__label">時</label>
                    <select
                      v-model="startHour"
                      class="sh-time-picker__select"
                      @change="updateRangeTime"
                    >
                      <option
                        v-for="hour in hourOptions"
                        :key="hour.value"
                        :value="hour.value"
                        :disabled="hour.disabled"
                      >
                        {{ hour.label }}
                      </option>
                    </select>
                  </div>

                  <div class="sh-time-picker__time-unit">
                    <label class="sh-time-picker__label">分</label>
                    <select
                      v-model="startMinute"
                      class="sh-time-picker__select"
                      @change="updateRangeTime"
                    >
                      <option
                        v-for="minute in minuteOptions"
                        :key="minute.value"
                        :value="minute.value"
                        :disabled="minute.disabled"
                      >
                        {{ minute.label }}
                      </option>
                    </select>
                  </div>

                  <div v-if="showSeconds" class="sh-time-picker__time-unit">
                    <label class="sh-time-picker__label">秒</label>
                    <select
                      v-model="startSecond"
                      class="sh-time-picker__select"
                      @change="updateRangeTime"
                    >
                      <option
                        v-for="second in secondOptions"
                        :key="second.value"
                        :value="second.value"
                        :disabled="second.disabled"
                      >
                        {{ second.label }}
                      </option>
                    </select>
                  </div>

                  <div v-if="use12Hour" class="sh-time-picker__time-unit">
                    <label class="sh-time-picker__label">時段</label>
                    <select
                      v-model="startAmPm"
                      class="sh-time-picker__select"
                      @change="updateRangeTime"
                    >
                      <option value="AM">上午</option>
                      <option value="PM">下午</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- End Time -->
              <div class="sh-time-picker__range-section">
                <h4 class="sh-time-picker__range-title">結束時間</h4>
                <div class="sh-time-picker__time-selector">
                  <div class="sh-time-picker__time-unit">
                    <label class="sh-time-picker__label">時</label>
                    <select
                      v-model="endHour"
                      class="sh-time-picker__select"
                      @change="updateRangeTime"
                    >
                      <option
                        v-for="hour in hourOptions"
                        :key="hour.value"
                        :value="hour.value"
                        :disabled="hour.disabled"
                      >
                        {{ hour.label }}
                      </option>
                    </select>
                  </div>

                  <div class="sh-time-picker__time-unit">
                    <label class="sh-time-picker__label">分</label>
                    <select
                      v-model="endMinute"
                      class="sh-time-picker__select"
                      @change="updateRangeTime"
                    >
                      <option
                        v-for="minute in minuteOptions"
                        :key="minute.value"
                        :value="minute.value"
                        :disabled="minute.disabled"
                      >
                        {{ minute.label }}
                      </option>
                    </select>
                  </div>

                  <div v-if="showSeconds" class="sh-time-picker__time-unit">
                    <label class="sh-time-picker__label">秒</label>
                    <select
                      v-model="endSecond"
                      class="sh-time-picker__select"
                      @change="updateRangeTime"
                    >
                      <option
                        v-for="second in secondOptions"
                        :key="second.value"
                        :value="second.value"
                        :disabled="second.disabled"
                      >
                        {{ second.label }}
                      </option>
                    </select>
                  </div>

                  <div v-if="use12Hour" class="sh-time-picker__time-unit">
                    <label class="sh-time-picker__label">時段</label>
                    <select
                      v-model="endAmPm"
                      class="sh-time-picker__select"
                      @change="updateRangeTime"
                    >
                      <option value="AM">上午</option>
                      <option value="PM">下午</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div class="sh-time-picker__actions">
              <button
                class="sh-time-picker__button sh-time-picker__button--secondary"
                @click="handleClear"
              >
                清除
              </button>
              <button
                class="sh-time-picker__button sh-time-picker__button--primary"
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
import { IconClock, IconX } from '@tabler/icons-vue'
import type {
  TimePickerProps,
  TimePickerEmits,
  TimePickerExpose,
  TimeRange,
} from './types'

defineOptions({
  name: 'ShTimePicker',
})

const props = withDefaults(defineProps<TimePickerProps>(), {
  range: false,
  format: 'HH:mm:ss',
  showSeconds: true,
  use12Hour: false,
  minuteStep: 1,
  secondStep: 1,
  showTimezone: false,
  utcMode: false,
  autoTimezoneDetection: true,
  timezone: undefined,
})

const emit = defineEmits<TimePickerEmits>()

// Refs
const triggerRef = ref<HTMLDivElement>()
const inputRef = ref<HTMLInputElement>()
const popoverRef = ref<HTMLDivElement>()

// State
const isOpen = ref(false)

// Single time state
const currentHour = ref<number>(0)
const currentMinute = ref<number>(0)
const currentSecond = ref<number>(0)
const currentAmPm = ref<'AM' | 'PM'>('AM')

// Range time state
const startHour = ref<number>(0)
const startMinute = ref<number>(0)
const startSecond = ref<number>(0)
const startAmPm = ref<'AM' | 'PM'>('AM')

const endHour = ref<number>(0)
const endMinute = ref<number>(0)
const endSecond = ref<number>(0)
const endAmPm = ref<'AM' | 'PM'>('AM')

// Computed
const computedPlaceholder = computed(() => {
  if (props.placeholder) return props.placeholder
  return props.range ? '選擇時間範圍' : '選擇時間'
})

const singleValue = computed(() => {
  return props.range ? undefined : (props.modelValue as string | undefined)
})

const rangeValue = computed(() => {
  return props.range ? (props.modelValue as TimeRange | undefined) : undefined
})

// Generate time options
const hourOptions = computed(() => {
  const maxHour = props.use12Hour ? 12 : 23
  const minHour = props.use12Hour ? 1 : 0
  const options = []

  for (let i = minHour; i <= maxHour; i++) {
    const value = props.use12Hour ? i : i
    const label = String(i).padStart(2, '0')
    options.push({
      value,
      label,
      disabled: false, // TODO: Add time validation logic
    })
  }

  return options
})

const minuteOptions = computed(() => {
  const options = []
  for (let i = 0; i < 60; i += props.minuteStep) {
    options.push({
      value: i,
      label: String(i).padStart(2, '0'),
      disabled: false,
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
      disabled: false,
    })
  }
  return options
})

// Format time string
const formatTimeString = (
  hour: number,
  minute: number,
  second: number,
  ampm?: 'AM' | 'PM',
): string => {
  let actualHour = hour

  if (props.use12Hour && ampm) {
    if (ampm === 'PM' && hour !== 12) {
      actualHour = hour + 12
    } else if (ampm === 'AM' && hour === 12) {
      actualHour = 0
    }
  }

  const h = String(actualHour).padStart(2, '0')
  const m = String(minute).padStart(2, '0')
  const s = String(second).padStart(2, '0')

  if (props.showSeconds) {
    return `${h}:${m}:${s}`
  } else {
    return `${h}:${m}`
  }
}

// Parse time string
const parseTimeString = (timeStr: string) => {
  if (!timeStr) return { hour: 0, minute: 0, second: 0, ampm: 'AM' as const }

  const parts = timeStr.split(':')
  let hour = parseInt(parts[0] || '0') || 0
  const minute = parseInt(parts[1] || '0') || 0
  const second = parseInt(parts[2] || '0') || 0

  let ampm: 'AM' | 'PM' = 'AM'

  if (props.use12Hour) {
    if (hour >= 12) {
      ampm = 'PM'
      if (hour > 12) hour -= 12
    } else if (hour === 0) {
      hour = 12
    }
  }

  return { hour, minute, second, ampm }
}

const displayValue = computed(() => {
  if (props.range && rangeValue.value) {
    const start = rangeValue.value.start || ''
    const end = rangeValue.value.end || ''
    if (start && end) {
      return `${start} ~ ${end}`
    } else if (start) {
      return start
    }
    return ''
  } else if (singleValue.value) {
    return singleValue.value
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

const updateSingleTime = () => {
  const timeStr = formatTimeString(
    currentHour.value,
    currentMinute.value,
    currentSecond.value,
    currentAmPm.value,
  )
  emit('update:modelValue', timeStr)
  emit('change', timeStr)
}

const updateRangeTime = () => {
  const startTime = formatTimeString(
    startHour.value,
    startMinute.value,
    startSecond.value,
    startAmPm.value,
  )
  const endTime = formatTimeString(
    endHour.value,
    endMinute.value,
    endSecond.value,
    endAmPm.value,
  )

  const newRange: TimeRange = {
    start: startTime,
    end: endTime,
  }

  emit('update:modelValue', newRange)
  emit('change', newRange)
}

const handleClear = () => {
  if (props.range) {
    const emptyRange: TimeRange = { start: undefined, end: undefined }
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

// Click outside handler
const handleClickOutside = (event: MouseEvent) => {
  if (
    !triggerRef.value?.contains(event.target as Node) &&
    !popoverRef.value?.contains(event.target as Node)
  ) {
    isOpen.value = false
  }
}

// Initialize values from props
const initializeValues = () => {
  if (props.range && rangeValue.value) {
    if (rangeValue.value.start) {
      const startParsed = parseTimeString(rangeValue.value.start)
      startHour.value = startParsed.hour
      startMinute.value = startParsed.minute
      startSecond.value = startParsed.second
      startAmPm.value = startParsed.ampm
    }

    if (rangeValue.value.end) {
      const endParsed = parseTimeString(rangeValue.value.end)
      endHour.value = endParsed.hour
      endMinute.value = endParsed.minute
      endSecond.value = endParsed.second
      endAmPm.value = endParsed.ampm
    }
  } else if (singleValue.value) {
    const parsed = parseTimeString(singleValue.value)
    currentHour.value = parsed.hour
    currentMinute.value = parsed.minute
    currentSecond.value = parsed.second
    currentAmPm.value = parsed.ampm
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

defineExpose<TimePickerExpose>({
  focus,
  blur,
  clear,
})
</script>

<style lang="scss" scoped>
.sh-time-picker {
  @apply w-full inline-flex flex-col relative;

  &:not(.sh-time-picker--disabled) {
    .sh-time-picker__trigger:hover {
      @apply border-primary;
    }
  }

  &.sh-time-picker--disabled {
    @apply opacity-60;

    .sh-time-picker__trigger {
      @apply cursor-not-allowed;
    }

    .sh-time-picker__input {
      @apply cursor-not-allowed;
    }
  }
}

.sh-time-picker__trigger {
  @apply inline-flex items-center w-full bg-bg.primary;
  @apply rounded-md overflow-hidden;
  @apply transition duration-300 ease-in-out;
  @apply border-[1px] border-solid border-border.base;
  @apply h-[36px];
  padding: 0 12px;
  cursor: pointer;

  &.sh-time-picker__trigger--active {
    @apply border-primary outline-none;
    box-shadow: 0 0 0 2px rgba(var(--sh-primary-fade), 0.2);
  }

  &.sh-time-picker__trigger--readonly {
    @apply cursor-default;
  }
}

.sh-time-picker__input {
  @apply flex-1 w-full h-full outline-none bg-transparent text-text.base;
  @apply placeholder:text-gray-500;
}

.sh-time-picker__icon {
  @apply inline-flex items-center justify-center;
  @apply ml-2;
  width: 16px;
  height: 16px;
}

.sh-time-picker__clear-icon {
  @apply text-gray-400 hover:text-text.base transition-colors cursor-pointer;
}

.sh-time-picker__popover {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.sh-time-picker__content {
  padding: 16px;
  min-width: 320px;
}

.sh-time-picker__timezone-info {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 12px;
  text-align: center;
}

.sh-time-picker__time-selector {
  display: flex;
  align-items: end;
  gap: 12px;
}

.sh-time-picker__time-unit {
  display: flex;
  flex-direction: column;
}

.sh-time-picker__label {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 4px;
  text-align: center;
}

.sh-time-picker__select {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 14px;
  min-width: 64px;
  text-align: center;
  background: white;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &:focus {
    outline: none;
    border-color: rgb(var(--sh-primary));
    box-shadow: 0 0 0 2px rgba(var(--sh-primary-fade), 0.2);
  }
}

.sh-time-picker__range-selector {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sh-time-picker__range-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sh-time-picker__range-title {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.sh-time-picker__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.sh-time-picker__button {
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;
  border: none;

  &.sh-time-picker__button--primary {
    background: rgb(var(--sh-primary));
    color: white;

    &:hover {
      background: rgb(var(--sh-primary-dark));
    }
  }

  &.sh-time-picker__button--secondary {
    border: 1px solid #d1d5db;
    color: #374151;
    background: white;

    &:hover {
      background: #f9fafb;
    }
  }
}

/* Transitions */
.sh-time-picker-fade-enter-active,
.sh-time-picker-fade-leave-active {
  transition: all 0.2s ease;
}

.sh-time-picker-fade-enter-from,
.sh-time-picker-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
