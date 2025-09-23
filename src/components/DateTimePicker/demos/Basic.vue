<template>
  <div class="demo-container">
    <h3>基本日期時間選擇</h3>
    <div class="demo-item">
      <DateTimePicker v-model="singleDateTime" placeholder="選擇日期時間" />
      <p class="demo-result">
        選中的日期時間:
        {{ singleDateTime ? singleDateTime.toLocaleString('zh-TW') : '無' }}
      </p>
    </div>

    <h3>12小時制</h3>
    <div class="demo-item">
      <DateTimePicker
        v-model="dateTime12Hour"
        :use12-hour="true"
        placeholder="選擇日期時間（12小時制）"
      />
      <p class="demo-result">
        選中的日期時間:
        {{ dateTime12Hour ? dateTime12Hour.toLocaleString('zh-TW') : '無' }}
      </p>
    </div>

    <h3>不顯示秒數</h3>
    <div class="demo-item">
      <DateTimePicker
        v-model="dateTimeNoSeconds"
        :show-seconds="false"
        placeholder="選擇日期時間（不含秒）"
      />
      <p class="demo-result">
        選中的日期時間:
        {{
          dateTimeNoSeconds ? dateTimeNoSeconds.toLocaleString('zh-TW') : '無'
        }}
      </p>
    </div>

    <h3>帶時區顯示和選擇</h3>
    <div class="demo-item">
      <DateTimePicker
        v-model="timezoneDateTime"
        :show-timezone="true"
        :timezone-list="[
          'Asia/Taipei',
          'UTC',
          'America/New_York',
          'Europe/London',
        ]"
        timezone="Asia/Taipei"
        placeholder="選擇日期時間（可切換時區）"
      />
      <p class="demo-result">
        選中的日期時間:
        {{ timezoneDateTime ? timezoneDateTime.toLocaleString('zh-TW') : '無' }}
      </p>
    </div>

    <h3>日期時間範圍選擇（開發中）</h3>
    <div class="demo-item">
      <DateTimePicker
        v-model="dateTimeRange"
        :range="true"
        placeholder="選擇日期時間範圍"
      />
      <p class="demo-result">
        選中的範圍:
        {{
          dateTimeRange?.start && dateTimeRange?.end
            ? `${dateTimeRange.start.toLocaleString(
                'zh-TW',
              )} ~ ${dateTimeRange.end.toLocaleString('zh-TW')}`
            : '無'
        }}
      </p>
    </div>

    <h3>自訂步進值</h3>
    <div class="demo-item">
      <DateTimePicker
        v-model="stepDateTime"
        :minute-step="15"
        :second-step="30"
        placeholder="分鐘步進15，秒數步進30"
      />
      <p class="demo-result">
        選中的日期時間:
        {{ stepDateTime ? stepDateTime.toLocaleString('zh-TW') : '無' }}
      </p>
    </div>

    <h3>禁用狀態</h3>
    <div class="demo-item">
      <DateTimePicker
        v-model="disabledDateTime"
        :disabled="true"
        placeholder="禁用的日期時間選擇器"
      />
    </div>

    <h3>唯讀狀態</h3>
    <div class="demo-item">
      <DateTimePicker
        v-model="readonlyDateTime"
        :readonly="true"
        placeholder="唯讀的日期時間選擇器"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DateTimePicker from '../index.vue'
import type { DateTimeRange } from '../types'

const singleDateTime = ref<Date>()
const dateTime12Hour = ref<Date>()
const dateTimeNoSeconds = ref<Date>()
const timezoneDateTime = ref<Date>()
const dateTimeRange = ref<DateTimeRange>()
const stepDateTime = ref<Date>()
const disabledDateTime = ref<Date>(new Date())
const readonlyDateTime = ref<Date>(new Date())
</script>

<style scoped>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.demo-item {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.demo-result {
  margin-top: 10px;
  padding: 10px;
  background-color: #f3f4f6;
  border-radius: 4px;
  font-family: monospace;
}

h3 {
  margin-bottom: 15px;
  color: #374151;
}
</style>
