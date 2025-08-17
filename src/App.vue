<script setup lang="ts">
import ConfigProvider from '@/components/ConfigProvider/index.vue'
import NotificationTest from '@/components/Notification/TestApp.vue'
import ScrollArea from '@/components/ScrollArea/index.vue'
import { ref } from 'vue'

const scrollAreaRef = ref()

const items = Array.from({ length: 20 }, (_, i) => `項目 ${i + 1}`)

const scrollToTop = () => {
  scrollAreaRef.value?.scrollTop()
}

const scrollToBottom = () => {
  scrollAreaRef.value?.scrollBottom()
}
</script>

<template>
  <ConfigProvider>
    <div class="p-8 space-y-8">
      <!-- Notification Test -->
      <div>
        <h2 class="text-xl font-bold mb-4">Notification 測試</h2>
        <NotificationTest />
      </div>

      <!-- ScrollArea Test -->
      <div>
        <h2 class="text-xl font-bold mb-4">ScrollArea 測試</h2>
        <div class="space-y-4">
          <div class="flex gap-2">
            <button
              @click="scrollToTop"
              class="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              滾動到頂部
            </button>
            <button
              @click="scrollToBottom"
              class="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              滾動到底部
            </button>
          </div>

          <ScrollArea
            ref="scrollAreaRef"
            class="h-48 w-80 border border-gray-300 rounded-lg"
            type="hover"
          >
            <div class="p-4 space-y-2">
              <h3 class="font-semibold mb-2">測試項目</h3>
              <div v-for="item in items" :key="item" class="text-sm py-1">
                {{ item }}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  </ConfigProvider>
</template>

<style scoped>
/* App.vue 用於測試 Notification 組件 */
</style>
