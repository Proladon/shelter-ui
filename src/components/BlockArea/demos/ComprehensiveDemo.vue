<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">綜合示例</h3>

    <div class="space-y-4">
      <!-- 嵌套內容 -->
      <div>
        <h4 class="text-sm font-medium mb-2">複雜內容禁用</h4>
        <BlockArea :active="false" :icon="IconShieldLock" text="安全保護中">
          <div class="p-6 bg-white border rounded-lg shadow">
            <h5 class="text-lg font-semibold mb-4">用戶設定</h5>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium mb-1">用戶名稱</label>
                <input
                  type="text"
                  value="john_doe"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">電子郵件</label>
                <input
                  type="email"
                  value="john@example.com"
                  class="w-full p-2 border rounded"
                />
              </div>
              <div class="flex gap-2">
                <button class="px-4 py-2 bg-blue-500 text-white rounded">
                  保存
                </button>
                <button class="px-4 py-2 bg-gray-500 text-white rounded">
                  取消
                </button>
              </div>
            </div>
          </div>
        </BlockArea>
      </div>

      <!-- 卡片式佈局 -->
      <div>
        <h4 class="text-sm font-medium mb-2">卡片式佈局</h4>
        <div class="grid grid-cols-2 gap-4">
          <BlockArea :active="true">
            <div class="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h6 class="font-semibold text-green-800">可用功能</h6>
              <p class="text-sm text-green-600 mt-1">此功能已啟用</p>
              <button
                class="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                使用
              </button>
            </div>
          </BlockArea>

          <BlockArea :active="false" :icon="IconClock" text="開發中">
            <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h6 class="font-semibold text-yellow-800">開發中功能</h6>
              <p class="text-sm text-yellow-600 mt-1">即將推出</p>
              <button
                class="mt-2 px-3 py-1 bg-yellow-500 text-white rounded text-sm"
              >
                使用
              </button>
            </div>
          </BlockArea>
        </div>
      </div>

      <!-- 表格示例 -->
      <div>
        <h4 class="text-sm font-medium mb-2">表格禁用</h4>
        <BlockArea
          :active="!isTableDisabled"
          :icon="IconDatabase"
          text="資料載入中..."
        >
          <div class="bg-white border rounded-lg overflow-hidden">
            <table class="w-full">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-4 py-3 text-left text-sm font-medium text-gray-600"
                  >
                    姓名
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-medium text-gray-600"
                  >
                    職位
                  </th>
                  <th
                    class="px-4 py-3 text-left text-sm font-medium text-gray-600"
                  >
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="px-4 py-3 text-sm">張三</td>
                  <td class="px-4 py-3 text-sm">開發工程師</td>
                  <td class="px-4 py-3">
                    <button class="text-blue-600 hover:text-blue-800 text-sm">
                      編輯
                    </button>
                  </td>
                </tr>
                <tr>
                  <td class="px-4 py-3 text-sm">李四</td>
                  <td class="px-4 py-3 text-sm">設計師</td>
                  <td class="px-4 py-3">
                    <button class="text-blue-600 hover:text-blue-800 text-sm">
                      編輯
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BlockArea>

        <button
          @click="isTableDisabled = !isTableDisabled"
          class="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
        >
          {{ isTableDisabled ? "啟用表格" : "禁用表格" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { IconShieldLock, IconClock, IconDatabase } from "@tabler/icons-vue"
import BlockArea from "../index.vue"

const isTableDisabled = ref(true)
</script>
