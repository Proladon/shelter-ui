<template>
  <div class="space-y-4">
    <MentionableTextArea
      v-model="value"
      label="事件處理"
      placeholder="監聽各種事件"
      :rows="4"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
      @mention="handleMention"
    />
    
    <div class="mt-4 p-3 bg-muted rounded">
      <h3 class="text-sm font-medium mb-2">事件日誌：</h3>
      <div class="max-h-32 overflow-y-auto">
        <div
          v-for="(event, index) in events"
          :key="index"
          class="text-xs text-muted-foreground"
        >
          {{ event }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MentionableTextArea from '../index.vue'

const value = ref('')
const events = ref<string[]>([])

function addEvent(eventName: string, data?: any) {
  const timestamp = new Date().toLocaleTimeString()
  const eventText = data 
    ? `[${timestamp}] ${eventName}: ${JSON.stringify(data)}`
    : `[${timestamp}] ${eventName}`
  
  events.value.unshift(eventText)
  
  // 保持最多 10 個事件
  if (events.value.length > 10) {
    events.value.splice(10)
  }
}

function handleChange(newValue: string) {
  addEvent('change', { length: newValue.length })
}

function handleFocus() {
  addEvent('focus')
}

function handleBlur() {
  addEvent('blur')
}

function handleMention(trigger: string, searchValue: string) {
  addEvent('mention', { trigger, searchValue })
}
</script>
