<template>
  <div class="sh-calendar" :class="calendarClass">
    <CalendarRoot
      v-slot="{ weekDays, grid }"
      :model-value="modelValue"
      :default-placeholder="defaultPlaceholder"
      :default-value="defaultValue"
      :dir="dir"
      :disabled="disabled"
      :fixed-weeks="fixedWeeks"
      :initial-focus="initialFocus"
      :is-date-disabled="isDateDisabled"
      :is-date-unavailable="isDateUnavailable"
      :locale="locale"
      :max-value="maxValue"
      :min-value="minValue"
      :multiple="multiple"
      :next-page="nextPage"
      :number-of-months="numberOfMonths"
      :paged-navigation="pagedNavigation"
      :placeholder="placeholder"
      :prevent-deselect="preventDeselect"
      :prev-page="prevPage"
      :readonly="readonly"
      :weekday-format="weekdayFormat"
      :week-starts-on="weekStartsOn"
      :calendar-label="calendarLabel"
      class="sh-calendar__root"
      @update:model-value="handleModelValueUpdate"
      @update:placeholder="handlePlaceholderUpdate"
    >
      <CalendarHeader class="sh-calendar__header">
        <CalendarPrev
          class="sh-calendar__nav-button sh-calendar__nav-button--prev"
        >
          <IconChevronLeft class="sh-calendar__nav-icon" />
        </CalendarPrev>

        <CalendarHeading class="sh-calendar__heading" />

        <CalendarNext
          class="sh-calendar__nav-button sh-calendar__nav-button--next"
        >
          <IconChevronRight class="sh-calendar__nav-icon" />
        </CalendarNext>
      </CalendarHeader>

      <div class="sh-calendar__content" :class="contentClass">
        <CalendarGrid
          v-for="month in grid"
          :key="month.value.toString()"
          class="sh-calendar__grid"
        >
          <CalendarGridHead class="sh-calendar__grid-head">
            <CalendarGridRow
              class="sh-calendar__grid-row sh-calendar__grid-row--head"
            >
              <CalendarHeadCell
                v-for="day in weekDays"
                :key="day"
                class="sh-calendar__head-cell"
              >
                {{ day }}
              </CalendarHeadCell>
            </CalendarGridRow>
          </CalendarGridHead>

          <CalendarGridBody class="sh-calendar__grid-body">
            <CalendarGridRow
              v-for="(weekDates, index) in month.rows"
              :key="`weekDate-${index}`"
              class="sh-calendar__grid-row"
            >
              <CalendarCell
                v-for="weekDate in weekDates"
                :key="weekDate.toString()"
                :date="weekDate"
                class="sh-calendar__cell"
              >
                <CalendarCellTrigger
                  :day="weekDate"
                  :month="month.value"
                  class="sh-calendar__cell-trigger"
                />
              </CalendarCell>
            </CalendarGridRow>
          </CalendarGridBody>
        </CalendarGrid>
      </div>
    </CalendarRoot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  CalendarRoot,
  CalendarHeader,
  CalendarPrev,
  CalendarNext,
  CalendarHeading,
  CalendarGrid,
  CalendarGridHead,
  CalendarGridBody,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarCell,
  CalendarCellTrigger,
} from 'reka-ui'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'
import type { CalendarProps, CalendarEmits } from './types'

defineOptions({
  name: 'ShCalendar',
})

const props = withDefaults(defineProps<CalendarProps>(), {
  locale: 'zh-TW',
  fixedWeeks: true,
  numberOfMonths: 1,
  weekdayFormat: 'narrow',
  weekStartsOn: 0,
})

const emits = defineEmits<CalendarEmits>()

// 計算樣式類
const calendarClass = computed(() => {
  return [
    {
      'sh-calendar--disabled': props.disabled,
      'sh-calendar--readonly': props.readonly,
      'sh-calendar--multiple': props.multiple,
    },
  ]
})

const contentClass = computed(() => {
  return [
    `sh-calendar__content--months-${props.numberOfMonths}`,
    {
      'sh-calendar__content--multiple-months': props.numberOfMonths > 1,
    },
  ]
})

// 事件處理器
const handleModelValueUpdate = (value: any) => {
  emits('update:modelValue', value)
}

const handlePlaceholderUpdate = (value: any) => {
  emits('update:placeholder', value)
}

// 暴露方法
const focus = () => {
  // 這裡可以添加聚焦邏輯
}

defineExpose({
  focus,
})
</script>

<style lang="postcss">
.sh-calendar {
  --sh-calendar-border-radius: 8px;
  --sh-calendar-bg: var(--sh-bg-primary);
  --sh-calendar-border: var(--sh-border-base);
  --sh-calendar-text: var(--sh-text-base);
  --sh-calendar-text-muted: var(--sh-text-primary);
  --sh-calendar-selected-bg: var(--sh-primary);
  --sh-calendar-selected-text: var(--sh-bg-secondary);
  --sh-calendar-hover-bg: var(--sh-primary-fade);
  --sh-calendar-today-bg: var(--sh-primary-fade);
  --sh-calendar-today-text: var(--sh-primary);
  --sh-calendar-disabled-text: var(--sh-text-primary);
  --sh-calendar-nav-hover-bg: var(--sh-bg-secondary);

  display: inline-block;
  border-radius: var(--sh-calendar-border-radius);
  background: var(--sh-calendar-bg);
  border: 1px solid var(--sh-calendar-border);
  padding: 1rem;
  color: var(--sh-calendar-text);
}

.sh-calendar--disabled {
  opacity: 0.6;
  pointer-events: none;
}

.sh-calendar--readonly .sh-calendar__cell-trigger {
  pointer-events: none;
}

.sh-calendar__root {
  width: 100%;
}

.sh-calendar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.sh-calendar__nav-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  background: transparent;
  border: none;
  color: var(--sh-calendar-text);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.sh-calendar__nav-button:hover:not([data-disabled]) {
  background: var(--sh-calendar-nav-hover-bg);
}

.sh-calendar__nav-button[data-disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}

.sh-calendar__nav-button:focus-visible {
  outline: 2px solid var(--sh-calendar-selected-bg);
  outline-offset: 2px;
}

.sh-calendar__nav-icon {
  width: 1rem;
  height: 1rem;
}

.sh-calendar__heading {
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--sh-calendar-text);
}

.sh-calendar__content {
  display: flex;
  gap: 1.5rem;
}

.sh-calendar__content--multiple-months {
  flex-direction: row;
}

.sh-calendar__content--months-1 .sh-calendar__grid {
  width: 100%;
}

.sh-calendar__grid {
  width: 100%;
  border-collapse: collapse;
  user-select: none;
}

.sh-calendar__grid-head .sh-calendar__grid-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 0.5rem;
}

.sh-calendar__grid-body .sh-calendar__grid-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.sh-calendar__head-cell {
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--sh-calendar-text-muted);
  padding: 0.5rem 0;
}

.sh-calendar__cell {
  position: relative;
  text-align: center;
  padding: 0;
}

.sh-calendar__cell-trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  margin: 0 auto;
  border-radius: 6px;
  background: transparent;
  border: none;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--sh-calendar-text);
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
}

.sh-calendar__cell-trigger:hover:not([data-disabled]):not([data-outside-view]) {
  background: var(--sh-calendar-hover-bg);
}

.sh-calendar__cell-trigger:focus-visible {
  outline: 2px solid var(--sh-calendar-selected-bg);
  outline-offset: 2px;
}

.sh-calendar__cell-trigger[data-selected] {
  background: var(--sh-calendar-selected-bg) !important;
  color: var(--sh-calendar-selected-text) !important;
  font-weight: 500;
}

.sh-calendar__cell-trigger[data-today]:not([data-selected]) {
  background: var(--sh-calendar-today-bg);
  color: var(--sh-calendar-today-text);
  font-weight: 500;
}

.sh-calendar__cell-trigger[data-outside-view] {
  color: var(--sh-calendar-text-muted);
  opacity: 0.5;
}

.sh-calendar__cell-trigger[data-disabled] {
  color: var(--sh-calendar-disabled-text);
  cursor: not-allowed;
  opacity: 0.5;
}

.sh-calendar__cell-trigger[data-unavailable] {
  color: var(--sh-calendar-disabled-text);
  text-decoration: line-through;
  cursor: not-allowed;
  opacity: 0.5;
}

/* 多月份顯示的響應式布局 */
@media (max-width: 640px) {
  .sh-calendar__content--multiple-months {
    flex-direction: column;
    gap: 1rem;
  }
}
</style>
