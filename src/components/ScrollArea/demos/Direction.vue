<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">滾動方向控制</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        透過 horizontal 和 vertical props 控制允許的滾動方向
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 僅垂直滾動 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">僅垂直滾動</h4>
          <p class="text-xs text-gray-500">
            scrollY=true, scrollX=false（預設）
          </p>
        </div>
        <ScrollArea
          :scroll-y="true"
          :scroll-x="false"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 w-[400px]">
            <div class="space-y-2">
              <div v-for="i in 12" :key="`vertical-${i}`" class="text-sm">
                垂直滾動項目 {{ i }} -
                這是一段很長的文字用來測試水平方向的內容溢出但不會顯示水平捲軸
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <!-- 僅水平滾動 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">僅水平滾動</h4>
          <p class="text-xs text-gray-500">scrollY=false, scrollX=true</p>
        </div>
        <ScrollArea
          :scroll-y="false"
          :scroll-x="true"
          type="always"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 w-[600px] h-20 flex items-center">
            <div class="flex gap-4 whitespace-nowrap">
              <div
                v-for="i in 20"
                :key="`horizontal-${i}`"
                class="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded"
              >
                水平項目 {{ i }}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <!-- 雙向滾動 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">雙向滾動</h4>
          <p class="text-xs text-gray-500">scrollY=true, scrollX=true</p>
        </div>
        <ScrollArea
          :scroll-y="true"
          :scroll-x="true"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 w-[500px]">
            <div class="space-y-2">
              <div
                v-for="i in 10"
                :key="`both-${i}`"
                class="text-sm flex gap-2"
              >
                <span class="min-w-fit">雙向滾動項目 {{ i }}:</span>
                <span
                  >這是一段很長的文字內容，會觸發水平滾動，同時垂直方向也有多行內容會觸發垂直滾動</span
                >
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      <!-- 無滾動 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">禁用滾動</h4>
          <p class="text-xs text-gray-500">scrollY=false, scrollX=false</p>
        </div>
        <ScrollArea
          :scroll-y="false"
          :scroll-x="false"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 w-[500px]">
            <div class="space-y-2">
              <div v-for="i in 10" :key="`none-${i}`" class="text-sm">
                無滾動項目 {{ i }} - 內容溢出但不會顯示任何捲軸，內容會被裁切
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '../index'
</script>
