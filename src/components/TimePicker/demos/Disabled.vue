<template>
  <div class="demo-container">
    <div style="margin-bottom: 20px">
      <h4>禁用狀態</h4>
      <TimePicker
        v-model="disabledTime"
        :disabled="true"
        placeholder="禁用的時間選擇器"
      />
    </div>
    <div>
      <h4>唯讀狀態</h4>
      <TimePicker
        v-model="readonlyTime"
        :readonly="true"
        placeholder="唯讀的時間選擇器"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TimePicker from '../index.vue'

const disabledTime = ref<string>('14:30:00')
const readonlyTime = ref<string>('09:15:30')
</script>

<style scoped>
.demo-container {
  padding: 20px;
}

h4 {
  margin-bottom: 10px;
  color: #374151;
  font-size: 14px;
}
</style>
