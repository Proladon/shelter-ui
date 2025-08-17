<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">捲軸顯示類型</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        展示不同的捲軸顯示策略：auto、always、scroll、hover
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Auto 類型 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">Auto（預設）</h4>
          <p class="text-xs text-gray-500">內容溢出時顯示捲軸</p>
        </div>
        <ScrollArea
          type="auto"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 space-y-2">
            <div v-for="i in 10" :key="`auto-${i}`" class="text-sm">
              Auto 類型項目 {{ i }}
            </div>
          </div>
        </ScrollArea>
      </div>

      <!-- Always 類型 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">Always</h4>
          <p class="text-xs text-gray-500">總是顯示捲軸</p>
        </div>
        <ScrollArea
          type="always"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 space-y-2">
            <div v-for="i in 8" :key="`always-${i}`" class="text-sm">
              Always 類型項目 {{ i }}
            </div>
          </div>
        </ScrollArea>
      </div>

      <!-- Scroll 類型 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">Scroll</h4>
          <p class="text-xs text-gray-500">滾動時顯示捲軸</p>
        </div>
        <ScrollArea
          type="scroll"
          :scroll-hide-delay="1000"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 space-y-2">
            <div v-for="i in 12" :key="`scroll-${i}`" class="text-sm">
              Scroll 類型項目 {{ i }}
            </div>
          </div>
        </ScrollArea>
      </div>

      <!-- Hover 類型 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">Hover</h4>
          <p class="text-xs text-gray-500">hover 或滾動時顯示捲軸</p>
        </div>
        <ScrollArea
          type="hover"
          :scroll-hide-delay="500"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 space-y-2">
            <div v-for="i in 12" :key="`hover-${i}`" class="text-sm">
              Hover 類型項目 {{ i }}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>

    <!-- 水平滾動範例 -->
    <div class="space-y-3">
      <div>
        <h4 class="font-medium">水平滾動</h4>
        <p class="text-xs text-gray-500">包含水平和垂直滾動的內容</p>
      </div>
      <ScrollArea
        class="h-40 w-full border border-gray-300 dark:border-gray-600 rounded"
      >
        <div class="p-4 w-[600px]">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left p-2 min-w-[120px]">名稱</th>
                <th class="text-left p-2 min-w-[100px]">狀態</th>
                <th class="text-left p-2 min-w-[150px]">描述</th>
                <th class="text-left p-2 min-w-[120px]">建立時間</th>
                <th class="text-left p-2 min-w-[100px]">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="i in 15"
                :key="`table-${i}`"
                class="border-b border-gray-100 dark:border-gray-800"
              >
                <td class="p-2">專案項目 {{ i }}</td>
                <td class="p-2">
                  <span
                    class="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  >
                    進行中
                  </span>
                </td>
                <td class="p-2">
                  這是一個很長的描述文字，用來測試水平滾動功能
                </td>
                <td class="p-2">2024-08-{{ String(i).padStart(2, '0') }}</td>
                <td class="p-2">
                  <button class="text-blue-500 hover:text-blue-700 text-xs">
                    編輯
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '../index'
</script>
