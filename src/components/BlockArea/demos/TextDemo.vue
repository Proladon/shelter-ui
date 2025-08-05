<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">文字示例</h3>

    <div class="space-y-4">
      <!-- 純文字 -->
      <div>
        <h4 class="text-sm font-medium mb-2">純文字提示</h4>
        <BlockArea :active="false" text="此區域已禁用">
          <div class="p-4 bg-gray-100 rounded border">
            <p>這是一個表單區域</p>
            <input
              type="text"
              placeholder="輸入文字"
              class="mt-2 p-2 border rounded w-full"
            />
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
              提交
            </button>
          </div>
        </BlockArea>
      </div>

      <!-- 圖示 + 文字 -->
      <div>
        <h4 class="text-sm font-medium mb-2">圖示 + 文字</h4>
        <BlockArea :active="false" :icon="IconLock" text="需要權限才能編輯">
          <div class="p-4 bg-gray-100 rounded border">
            <p>敏感資料編輯區</p>
            <input
              type="password"
              placeholder="輸入密碼"
              class="mt-2 p-2 border rounded w-full"
            />
            <button class="mt-2 px-3 py-1 bg-red-500 text-white rounded">
              刪除資料
            </button>
          </div>
        </BlockArea>
      </div>

      <!-- 不同文字示例 -->
      <div>
        <h4 class="text-sm font-medium mb-2">不同文字示例</h4>
        <div class="grid grid-cols-1 gap-4">
          <BlockArea :active="false" text="維護中">
            <div class="p-4 bg-gray-100 rounded border">
              <p>系統功能</p>
              <button class="mt-2 px-3 py-1 bg-green-500 text-white rounded">
                執行操作
              </button>
            </div>
          </BlockArea>

          <BlockArea :active="false" text="即將推出">
            <div class="p-4 bg-gray-100 rounded border">
              <p>新功能預覽</p>
              <button class="mt-2 px-3 py-1 bg-purple-500 text-white rounded">
                體驗功能
              </button>
            </div>
          </BlockArea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IconLock } from "@tabler/icons-vue"
import BlockArea from "../index.vue"
</script>
