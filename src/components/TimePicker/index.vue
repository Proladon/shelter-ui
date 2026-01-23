<template>
  <div class="sh-time-picker" :class="{ 'sh-time-picker--disabled': disabled }">
    <SHPopover
      v-model:open="isOpen"
      side="bottom"
      align="start"
      :disabled="disabled || readonly"
    >
      <template #trigger>
        <div
          class="sh-time-picker__trigger"
          :class="{
            'sh-time-picker__trigger--active': isOpen,
            'sh-time-picker__trigger--readonly': readonly,
          }"
        >
          <input
            ref="inputRef"
            :value="displayValue"
            class="sh-time-picker__input"
            :placeholder="computedPlaceholder"
            :disabled="disabled"
            readonly
          />
          <div class="sh-time-picker__icon">
            <IconClock
              class="text-text.base"
              v-if="
                !displayValue ||
                (!range && !modelValue) ||
                (range && !rangeValue?.start && !rangeValue?.end)
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
      </template>

      <div class="sh-time-picker__content" @mousedown.prevent>
        <div
          class="sh-time-picker__panels"
          :class="{ 'sh-time-picker__panels--range': range }"
        >
          <!-- Start Time Panel -->
          <div class="sh-time-picker__panel">
            <div v-if="range" class="sh-time-picker__panel-title">開始時間</div>
            <div class="sh-time-picker__columns">
              <!-- Hour -->
              <div
                v-if="hour"
                ref="startHourRef"
                class="sh-time-picker__column"
                @scroll="handleScroll('start', 'hour', $event)"
                @mousedown="handleMouseDown"
              >
                <div class="sh-time-picker__spacer"></div>
                <div
                  v-for="item in hourOptions"
                  :key="item.value"
                  class="sh-time-picker__item"
                  :class="{
                    'sh-time-picker__item--active': item.value === startHour,
                  }"
                  @click="scrollToItem('start', 'hour', item.value)"
                >
                  {{ item.label }}
                </div>
                <div class="sh-time-picker__spacer"></div>
              </div>

              <!-- Minute -->
              <div
                v-if="minute"
                ref="startMinuteRef"
                class="sh-time-picker__column"
                @scroll="handleScroll('start', 'minute', $event)"
                @mousedown="handleMouseDown"
              >
                <div class="sh-time-picker__spacer"></div>
                <div
                  v-for="item in minuteOptions"
                  :key="item.value"
                  class="sh-time-picker__item"
                  :class="{
                    'sh-time-picker__item--active': item.value === startMinute,
                  }"
                  @click="scrollToItem('start', 'minute', item.value)"
                >
                  {{ item.label }}
                </div>
                <div class="sh-time-picker__spacer"></div>
              </div>

              <!-- Second -->
              <div
                v-if="second"
                ref="startSecondRef"
                class="sh-time-picker__column"
                @scroll="handleScroll('start', 'second', $event)"
                @mousedown="handleMouseDown"
              >
                <div class="sh-time-picker__spacer"></div>
                <div
                  v-for="item in secondOptions"
                  :key="item.value"
                  class="sh-time-picker__item"
                  :class="{
                    'sh-time-picker__item--active': item.value === startSecond,
                  }"
                  @click="scrollToItem('start', 'second', item.value)"
                >
                  {{ item.label }}
                </div>
                <div class="sh-time-picker__spacer"></div>
              </div>

              <!-- AM/PM -->
              <div
                v-if="use12Hour"
                ref="startAmPmRef"
                class="sh-time-picker__column"
                @scroll="handleScroll('start', 'ampm', $event)"
                @mousedown="handleMouseDown"
              >
                <div class="sh-time-picker__spacer"></div>
                <div
                  v-for="item in amPmOptions"
                  :key="item.value"
                  class="sh-time-picker__item"
                  :class="{
                    'sh-time-picker__item--active': item.value === startAmPm,
                  }"
                  @click="scrollToItem('start', 'ampm', item.value)"
                >
                  {{ item.label }}
                </div>
                <div class="sh-time-picker__spacer"></div>
              </div>
            </div>
          </div>

          <!-- End Time Panel (Only for range) -->
          <div v-if="range" class="sh-time-picker__panel">
            <div class="sh-time-picker__panel-title">結束時間</div>
            <div class="sh-time-picker__columns">
              <!-- Hour -->
              <div
                v-if="hour"
                ref="endHourRef"
                class="sh-time-picker__column"
                @scroll="handleScroll('end', 'hour', $event)"
                @mousedown="handleMouseDown"
              >
                <div class="sh-time-picker__spacer"></div>
                <div
                  v-for="item in hourOptions"
                  :key="item.value"
                  class="sh-time-picker__item"
                  :class="{
                    'sh-time-picker__item--active': item.value === endHour,
                  }"
                  @click="scrollToItem('end', 'hour', item.value)"
                >
                  {{ item.label }}
                </div>
                <div class="sh-time-picker__spacer"></div>
              </div>

              <!-- Minute -->
              <div
                v-if="minute"
                ref="endMinuteRef"
                class="sh-time-picker__column"
                @scroll="handleScroll('end', 'minute', $event)"
                @mousedown="handleMouseDown"
              >
                <div class="sh-time-picker__spacer"></div>
                <div
                  v-for="item in minuteOptions"
                  :key="item.value"
                  class="sh-time-picker__item"
                  :class="{
                    'sh-time-picker__item--active': item.value === endMinute,
                  }"
                  @click="scrollToItem('end', 'minute', item.value)"
                >
                  {{ item.label }}
                </div>
                <div class="sh-time-picker__spacer"></div>
              </div>

              <!-- Second -->
              <div
                v-if="second"
                ref="endSecondRef"
                class="sh-time-picker__column"
                @scroll="handleScroll('end', 'second', $event)"
                @mousedown="handleMouseDown"
              >
                <div class="sh-time-picker__spacer"></div>
                <div
                  v-for="item in secondOptions"
                  :key="item.value"
                  class="sh-time-picker__item"
                  :class="{
                    'sh-time-picker__item--active': item.value === endSecond,
                  }"
                  @click="scrollToItem('end', 'second', item.value)"
                >
                  {{ item.label }}
                </div>
                <div class="sh-time-picker__spacer"></div>
              </div>

              <!-- AM/PM -->
              <div
                v-if="use12Hour"
                ref="endAmPmRef"
                class="sh-time-picker__column"
                @scroll="handleScroll('end', 'ampm', $event)"
                @mousedown="handleMouseDown"
              >
                <div class="sh-time-picker__spacer"></div>
                <div
                  v-for="item in amPmOptions"
                  :key="item.value"
                  class="sh-time-picker__item"
                  :class="{
                    'sh-time-picker__item--active': item.value === endAmPm,
                  }"
                  @click="scrollToItem('end', 'ampm', item.value)"
                >
                  {{ item.label }}
                </div>
                <div class="sh-time-picker__spacer"></div>
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
    </SHPopover>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { IconClock, IconX } from '@tabler/icons-vue'
import SHPopover from '../Popover/index.vue'
import type { TimePickerProps, TimePickerEmits, TimeRange } from './types'

defineOptions({
  name: 'SHTimePicker',
})

const props = withDefaults(defineProps<TimePickerProps>(), {
  range: false,
  format: 'HH:mm:ss',
  hour: true,
  minute: true,
  second: true,
  // Maintaining compatibility if needed, but props above take precedence defaults
  use12Hour: false,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
})

const emit = defineEmits<TimePickerEmits>()

const isOpen = ref(false)

// Refs
const startHourRef = ref<HTMLElement>()
const startMinuteRef = ref<HTMLElement>()
const startSecondRef = ref<HTMLElement>()
const startAmPmRef = ref<HTMLElement>()

const endHourRef = ref<HTMLElement>()
const endMinuteRef = ref<HTMLElement>()
const endSecondRef = ref<HTMLElement>()
const endAmPmRef = ref<HTMLElement>()

// State
const startHour = ref(0)
const startMinute = ref(0)
const startSecond = ref(0)
const startAmPm = ref<'AM' | 'PM'>('AM')

const endHour = ref(0)
const endMinute = ref(0)
const endSecond = ref(0)
const endAmPm = ref<'AM' | 'PM'>('AM')

const ITEM_HEIGHT = 32

// Drag to scroll
const isDragging = ref(false)
// Flag to prevent click event after dragging
const wasDragging = ref(false)
const startY = ref(0)
const startScrollTop = ref(0)
let currentScrollTarget: HTMLElement | null = null

const handleMouseDown = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement
  isDragging.value = true
  wasDragging.value = false
  startY.value = e.clientY
  startScrollTop.value = target.scrollTop
  currentScrollTarget = target

  target.style.cursor = 'grabbing'
  target.style.scrollSnapType = 'none'
  target.style.scrollBehavior = 'auto'

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value || !currentScrollTarget) return
  e.preventDefault()

  // Check if moved significantly to consider it a drag
  if (Math.abs(e.clientY - startY.value) > 5) {
    wasDragging.value = true
  }

  const deltaY = e.clientY - startY.value
  currentScrollTarget.scrollTop = startScrollTop.value - deltaY
}

const handleMouseUp = () => {
  if (currentScrollTarget) {
    currentScrollTarget.style.cursor = 'grab'

    // Calculate precise snap position
    const scrollTop = currentScrollTarget.scrollTop
    const index = Math.round(scrollTop / ITEM_HEIGHT)
    const targetScrollTop = index * ITEM_HEIGHT

    // Manually snap first without enabling css snap yet to avoid conflict
    currentScrollTarget.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth',
    })

    // Re-enable CSS snap after a delay to allow smooth scroll to finish
    // or just let CSS snap take over if we didn't scroll?
    // Actually, setting scrollSnapType 'y mandatory' immediately might force the browser to snap
    // to where IT thinks it should go, which might fight with our scrollTo.
    // Let's rely on our manual snap for the drag end, then restore properties.

    const target = currentScrollTarget
    setTimeout(() => {
      if (target) {
        target.style.scrollSnapType = 'y mandatory'
        target.style.scrollBehavior = 'smooth'
      }
    }, 500) // Accessing variable from closure might be risky if currentScrollTarget is nullified. Capture it.

    currentScrollTarget = null
  }
  isDragging.value = false

  // Reset wasDragging after a short delay to block immediate click events
  setTimeout(() => {
    wasDragging.value = false
  }, 0)

  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', handleMouseUp)
}

// Options
const hourOptions = computed(() => {
  const options = []
  if (props.use12Hour) {
    for (let i = 1; i <= 12; i += props.hourStep) {
      options.push({ value: i, label: String(i).padStart(2, '0') })
    }
  } else {
    for (let i = 0; i <= 23; i += props.hourStep) {
      options.push({ value: i, label: String(i).padStart(2, '0') })
    }
  }
  return options
})

const amPmOptions = [
  { value: 'AM', label: 'AM' },
  { value: 'PM', label: 'PM' },
]

const minuteOptions = computed(() => {
  const options = []
  for (let i = 0; i < 60; i += props.minuteStep) {
    options.push({ value: i, label: String(i).padStart(2, '0') })
  }
  return options
})

const secondOptions = computed(() => {
  const options = []
  for (let i = 0; i < 60; i += props.secondStep) {
    options.push({ value: i, label: String(i).padStart(2, '0') })
  }
  return options
})

// Helpers
const formatTime = (h: number, m: number, s: number, ampm?: 'AM' | 'PM') => {
  let hour = h
  if (props.use12Hour && ampm) {
    if (ampm === 'PM' && h < 12) hour = h + 12
    if (ampm === 'AM' && h === 12) hour = 0
  }

  const pad = (n: number) => String(n).padStart(2, '0')
  const parts = []
  if (props.hour) parts.push(pad(hour))
  if (props.minute) parts.push(pad(m))
  if (props.second) parts.push(pad(s))
  return parts.join(':')
}

const parseTime = (str?: string) => {
  if (!str) {
    return { h: props.use12Hour ? 12 : 0, m: 0, s: 0, ampm: 'AM' as const }
  }
  const parts = str.split(':').map((p) => parseInt(p, 10))

  let h = 0,
    m = 0,
    s = 0

  if (props.hour) h = parts.shift() || 0
  if (props.minute) m = parts.shift() || 0
  if (props.second) s = parts.shift() || 0

  let ampm: 'AM' | 'PM' = 'AM'

  if (props.use12Hour) {
    if (h >= 12) {
      ampm = 'PM'
      if (h > 12) h -= 12
    } else {
      ampm = 'AM'
      if (h === 0) h = 12
    }
  }

  return { h, m, s, ampm }
}

const displayValue = computed(() => {
  if (props.range) {
    const v = props.modelValue as TimeRange
    if (v?.start || v?.end) {
      if (props.use12Hour) {
        // Display in 12h format?
        // Assuming modelValue is stored as 24h, we want to show it as is or formatted?
        // Since native input type="text" is used, we can format it.
        // Let's format it for display if use12Hour is true
        const s = parseTime(v.start)
        const e = parseTime(v.end)
        // Only if start/end exists
        const startStr = v.start
          ? `${s.h}:${String(s.m).padStart(2, '0')}:${String(s.s).padStart(2, '0')} ${s.ampm}`
          : '--'
        const endStr = v.end
          ? `${e.h}:${String(e.m).padStart(2, '0')}:${String(e.s).padStart(2, '0')} ${e.ampm}`
          : '--'
        return `${startStr} ~ ${endStr}`
      }
      return `${v?.start || '--'} ~ ${v?.end || '--'}`
    }
    return ''
  }

  const val = props.modelValue as string
  if (props.use12Hour && val) {
    const t = parseTime(val)
    return `${t.h}:${String(t.m).padStart(2, '0')}:${String(t.s).padStart(2, '0')} ${t.ampm}`
  }
  return val || ''
})

const computedPlaceholder = computed(
  () => props.placeholder || (props.range ? '選擇時間範圍' : '選擇時間'),
)
const rangeValue = computed(() =>
  props.range ? (props.modelValue as TimeRange) : undefined,
)

const updateModel = () => {
  if (props.range) {
    const startStr = formatTime(
      startHour.value,
      startMinute.value,
      startSecond.value,
      startAmPm.value,
    )
    const endStr = formatTime(
      endHour.value,
      endMinute.value,
      endSecond.value,
      endAmPm.value,
    )
    const newVal = { start: startStr, end: endStr }
    emit('update:modelValue', newVal)
    emit('change', newVal)
  } else {
    const str = formatTime(
      startHour.value,
      startMinute.value,
      startSecond.value,
      startAmPm.value,
    )
    emit('update:modelValue', str)
    emit('change', str)
  }
}

// Scroll Handling
const debounceTimers: Record<string, any> = {}

const handleScroll = (
  type: 'start' | 'end',
  unit: 'hour' | 'minute' | 'second' | 'ampm',
  e: Event,
) => {
  const target = e.target as HTMLElement
  const key = `${type}-${unit}`

  if (debounceTimers[key]) clearTimeout(debounceTimers[key])

  debounceTimers[key] = setTimeout(() => {
    const scrollTop = target.scrollTop
    const index = Math.round(scrollTop / ITEM_HEIGHT)

    let options: any[] = []
    if (unit === 'hour') options = hourOptions.value
    else if (unit === 'minute') options = minuteOptions.value
    else if (unit === 'second') options = secondOptions.value
    else if (unit === 'ampm') options = amPmOptions

    // Safety check
    if (index < 0 || index >= options.length) return

    const val = options[index].value

    // Update state
    if (type === 'start') {
      if (unit === 'hour') startHour.value = val
      else if (unit === 'minute') startMinute.value = val
      else if (unit === 'second') startSecond.value = val
      else if (unit === 'ampm') startAmPm.value = val
    } else {
      if (unit === 'hour') endHour.value = val
      else if (unit === 'minute') endMinute.value = val
      else if (unit === 'second') endSecond.value = val
      else if (unit === 'ampm') endAmPm.value = val
    }

    updateModel()
  }, 100)
}

const scrollToItem = (
  type: 'start' | 'end',
  unit: 'hour' | 'minute' | 'second' | 'ampm',
  value: number | string,
) => {
  if (wasDragging.value) return

  // Directly set value
  if (type === 'start') {
    if (unit === 'hour') startHour.value = value as number
    else if (unit === 'minute') startMinute.value = value as number
    else if (unit === 'second') startSecond.value = value as number
    else if (unit === 'ampm') startAmPm.value = value as 'AM' | 'PM'
  } else {
    if (unit === 'hour') endHour.value = value as number
    else if (unit === 'minute') endMinute.value = value as number
    else if (unit === 'second') endSecond.value = value as number
    else if (unit === 'ampm') endAmPm.value = value as 'AM' | 'PM'
  }

  updateModel()

  // Scroll UI
  scrollToValue(type, unit, value, true)
}

const scrollToValue = (
  type: 'start' | 'end',
  unit: 'hour' | 'minute' | 'second' | 'ampm',
  value: number | string,
  smooth = false,
) => {
  const refMap: any = {
    'start-hour': startHourRef,
    'start-minute': startMinuteRef,
    'start-second': startSecondRef,
    'start-ampm': startAmPmRef,
    'end-hour': endHourRef,
    'end-minute': endMinuteRef,
    'end-second': endSecondRef,
    'end-ampm': endAmPmRef,
  }

  const element = refMap[`${type}-${unit}`]?.value
  if (!element) return

  let options: any[] = []
  if (unit === 'hour') options = hourOptions.value
  else if (unit === 'minute') options = minuteOptions.value
  else if (unit === 'second') options = secondOptions.value
  else if (unit === 'ampm') options = amPmOptions

  const index = options.findIndex((o) => o.value === value)
  if (index >= 0) {
    element.scrollTo({
      top: index * ITEM_HEIGHT,
      behavior: smooth ? 'smooth' : 'auto',
    })
  }
}

const syncScrollToCurrentValues = () => {
  // Start
  if (props.hour) scrollToValue('start', 'hour', startHour.value)
  if (props.minute) scrollToValue('start', 'minute', startMinute.value)
  if (props.second) scrollToValue('start', 'second', startSecond.value)
  if (props.use12Hour) scrollToValue('start', 'ampm', startAmPm.value)

  // End
  if (props.range) {
    if (props.hour) scrollToValue('end', 'hour', endHour.value)
    if (props.minute) scrollToValue('end', 'minute', endMinute.value)
    if (props.second) scrollToValue('end', 'second', endSecond.value)
    if (props.use12Hour) scrollToValue('end', 'ampm', endAmPm.value)
  }
}

const initValues = () => {
  if (props.range) {
    const val = props.modelValue as TimeRange
    const s = parseTime(val?.start)
    const e = parseTime(val?.end)
    startHour.value = s.h
    startMinute.value = s.m
    startSecond.value = s.s
    startAmPm.value = s.ampm
    endHour.value = e.h
    endMinute.value = e.m
    endSecond.value = e.s
    endAmPm.value = e.ampm
  } else {
    const val = parseTime(props.modelValue as string)
    startHour.value = val.h
    startMinute.value = val.m
    startSecond.value = val.s
    startAmPm.value = val.ampm
  }
}

watch(
  () => isOpen.value,
  (val) => {
    if (val) {
      initValues()
      nextTick(() => {
        syncScrollToCurrentValues()
      })
    }
  },
)

watch(
  () => props.modelValue,
  () => {
    if (!isOpen.value) {
      initValues()
    }
  },
)

const handleClear = () => {
  emit('update:modelValue', props.range ? {} : undefined)
  emit('change', props.range ? {} : undefined)
  emit('clear')
}

const handleConfirm = () => {
  isOpen.value = false
}

// Expose methods
const focus = () => {
  /* No direct input focus needed on trigger */
}
const blur = () => {
  /* */
}
const clear = handleClear

defineExpose({ focus, blur, clear })
</script>

<style lang="scss" scoped>
.sh-time-picker {
  @apply inline-block relative border-1 border-solid border-border.base p-0 rounded-md;

  &--disabled {
    @apply opacity-60 cursor-not-allowed;

    .sh-time-picker__trigger {
      @apply cursor-not-allowed;
    }

    .sh-time-picker__input {
      @apply cursor-not-allowed;
    }
  }
}

.sh-time-picker__trigger {
  @apply flex items-center w-full px-3 py-2 h-[36px];
  @apply bg-bg.primary border border-border.base rounded-md text-sm;
  @apply transition-colors duration-200 cursor-pointer;

  &:hover:not(&--readonly) {
    @apply border-primary;
  }

  &--active {
    @apply border-primary ring-2 ring-primary-fade;
  }

  &--readonly {
    @apply bg-bg-secondary cursor-default;
  }
}

.sh-time-picker__input {
  @apply flex-1 w-full bg-transparent border-none outline-none text-text.base p-0 m-0 cursor-pointer;

  &::placeholder {
    @apply text-text-placeholder;
  }
}

.sh-time-picker__icon {
  @apply ml-2 text-text-secondary flex items-center justify-center w-4 h-4;
}

.sh-time-picker__clear-icon {
  @apply text-text.base cursor-pointer hover:(text-secondary);
}

.sh-time-picker__content {
  @apply flex flex-col gap-4;
  min-width: 200px;
}

.sh-time-picker__timezone-info {
  @apply text-xs text-text-secondary text-center;
}

.sh-time-picker__panels {
  @apply flex gap-4;

  &--range {
    /* Special styling for range if needed */
  }
}

.sh-time-picker__panel {
  @apply flex flex-col gap-2 w-full;
}

.sh-time-picker__panel-title {
  @apply text-xs font-semibold text-text-secondary text-center;
}

.sh-time-picker__columns {
  @apply flex gap-0 border-t border-b border-border.base relative w-full;
  height: calc(32px * 7); /* 7 items visible */

  /* Selection Highlight - Centered Absolute Div */
  &::after {
    content: '';
    @apply absolute left-0 right-0 h-8 pointer-events-none;
    top: calc(50% - 16px); /* Center */
    @apply bg-bg-secondary opacity-30;
    z-index: 0;
  }
}

.sh-time-picker__column {
  @apply w-full h-full overflow-y-auto overflow-x-hidden flex flex-col text-center relative;
  @apply cursor-grab active:cursor-grabbing select-none;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE */
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  z-index: 1;

  &::-webkit-scrollbar {
    display: none;
  }
}

.sh-time-picker__spacer {
  height: calc(32px * 3); /* 3 items spacer top and bottom */
  flex-shrink: 0;
}

.sh-time-picker__item {
  @apply flex items-center justify-center text-sm text-text.base transition-colors duration-200 select-none;
  @apply rounded-md;
  height: 32px; /* Fixed height for calc */
  flex-shrink: 0;
  scroll-snap-align: center;

  &:hover {
    @apply bg-primary.fade text-secondary;
  }

  &--active {
    @apply font-bold text-primary;
  }
}

.sh-time-picker__actions {
  @apply flex justify-end gap-2 pt-2 border-t border-border.base;
}

.sh-time-picker__button {
  @apply px-3 py-1 rounded text-sm transition-colors duration-200;

  &--secondary {
    @apply text-text-base bg-bg-secondary hover:bg-bg-tertiary;
  }

  &--primary {
    @apply text-white bg-primary hover:bg-primary-dark;
  }
}
</style>
