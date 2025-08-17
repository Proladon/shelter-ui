<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">自定義滾動控制</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        透過組件方法控制滾動位置，支援滾動到頂部、底部等功能
      </p>
    </div>

    <div class="space-y-4">
      <!-- 控制按鈕 -->
      <div class="flex flex-wrap gap-2">
        <button
          @click="scrollToTop"
          class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          滾動到頂部
        </button>
        <button
          @click="scrollToBottom"
          class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          滾動到底部
        </button>
        <button
          @click="scrollToMiddle"
          class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          滾動到中間
        </button>
        <button
          @click="scrollToTopLeft"
          class="px-3 py-1.5 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          滾動到左上角
        </button>
      </div>

      <!-- 滾動區域 -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <ScrollArea
          ref="scrollArea"
          class="h-64 w-full border border-gray-300 dark:border-gray-600 rounded"
          type="scroll"
        >
          <div class="p-4 w-[800px] h-[600px] relative">
            <!-- 網格背景 -->
            <div class="absolute inset-0 opacity-10">
              <div
                v-for="i in 20"
                :key="`h-${i}`"
                class="absolute w-full h-px bg-gray-400"
                :style="{ top: `${i * 30}px` }"
              />
              <div
                v-for="i in 26"
                :key="`v-${i}`"
                class="absolute h-full w-px bg-gray-400"
                :style="{ left: `${i * 30}px` }"
              />
            </div>

            <!-- 內容區塊 -->
            <div class="relative z-10 space-y-4">
              <div class="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <h4 class="font-semibold mb-2">頂部區域</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  這是滾動區域的頂部內容，點擊「滾動到頂部」可以滾動到這裡。
                </p>
              </div>

              <div
                v-for="item in items"
                :key="item.id"
                class="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
              >
                <h5 class="font-medium mb-1">{{ item.title }}</h5>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ item.description }}
                </p>
              </div>

              <div class="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <h4 class="font-semibold mb-2">底部區域</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  這是滾動區域的底部內容，點擊「滾動到底部」可以滾動到這裡。
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ScrollArea } from '../index'
import type { ScrollAreaMethods } from '../types'

const scrollArea = ref<ScrollAreaMethods | null>(null)

const items = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `項目 ${i + 1}`,
  description: `這是第 ${
    i + 1
  } 個項目的描述內容，用於展示滾動功能。內容可能會比較長，以便測試水平滾動效果。`,
}))

const scrollToTop = () => {
  scrollArea.value?.scrollTop()
}

const scrollToBottom = () => {
  scrollArea.value?.scrollBottom()
}

const scrollToTopLeft = () => {
  scrollArea.value?.scrollTopLeft()
}

const scrollToMiddle = () => {
  const viewport = scrollArea.value?.getViewport()
  if (viewport) {
    const maxScrollTop = viewport.scrollHeight - viewport.clientHeight
    const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth
    scrollArea.value?.scrollTo({
      top: maxScrollTop / 2,
      left: maxScrollLeft / 2,
      behavior: 'smooth',
    })
  }
}
</script>
