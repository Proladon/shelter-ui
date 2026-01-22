<template>
  <div class="demo-container">
    <h3>基本日期選擇</h3>
    <div class="demo-item">
      <DatePicker v-model="singleDate" placeholder="選擇日期" />
      <p class="demo-result">
        選中的日期:
        {{ singleDate ? singleDate.toLocaleDateString('zh-TW') : '無' }}
      </p>
    </div>

    <h3>日期範圍選擇</h3>
    <div class="demo-item">
      <DatePicker
        v-model="dateRange"
        :range="true"
        placeholder="選擇日期範圍"
      />
      <p class="demo-result">
        選中的範圍:
        {{
          dateRange?.start && dateRange?.end
            ? `${dateRange.start.toLocaleDateString(
                'zh-TW',
              )} ~ ${dateRange.end.toLocaleDateString('zh-TW')}`
            : '無'
        }}
      </p>
    </div>

    <h3>帶時區顯示</h3>
    <div class="demo-item">
      <DatePicker
        v-model="timezoneDate"
        :show-timezone="true"
        timezone="Asia/Taipei"
        placeholder="選擇日期（台北時區）"
      />
      <p class="demo-result">
        選中的日期:
        {{ timezoneDate ? timezoneDate.toLocaleDateString('zh-TW') : '無' }}
      </p>
    </div>

    <h3>禁用狀態</h3>
    <div class="demo-item">
      <DatePicker
        v-model="disabledDate"
        :disabled="true"
        placeholder="禁用的日期選擇器"
      />
    </div>

    <h3>唯讀狀態</h3>
    <div class="demo-item">
      <DatePicker
        v-model="readonlyDate"
        :readonly="true"
        placeholder="唯讀的日期選擇器"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DatePicker from '../index.vue'
import type { DateRange } from '../types'

const singleDate = ref<Date>()
const dateRange = ref<DateRange>()
const timezoneDate = ref<Date>()
const disabledDate = ref<Date>(new Date())
const readonlyDate = ref<Date>(new Date())
</script>

<style scoped lang="postcss">
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-item {
  @apply flex flex-col;
}

h3 {
  @apply text-text.base mb-15px;
}
</style>
