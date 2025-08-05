<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">圖示示例</h3>

    <div class="space-y-4">
      <!-- 使用 icon prop -->
      <div>
        <h4 class="text-sm font-medium mb-2">使用圖示 prop</h4>
        <BlockArea :active="false" :icon="IconLock">
          <div class="p-4 bg-gray-100 rounded border">
            <p>這個區域被鎖定了</p>
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
              操作按鈕
            </button>
          </div>
        </BlockArea>
      </div>

      <!-- 使用圖示插槽 -->
      <div>
        <h4 class="text-sm font-medium mb-2">使用圖示插槽</h4>
        <BlockArea :active="false">
          <template #icon>
            <IconExclamationCircle class="w-8 h-8 text-orange-500" />
          </template>
          <div class="p-4 bg-gray-100 rounded border">
            <p>這個區域有警告</p>
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
              操作按鈕
            </button>
          </div>
        </BlockArea>
      </div>

      <!-- 不同圖示示例 -->
      <div>
        <h4 class="text-sm font-medium mb-2">不同圖示示例</h4>
        <div class="grid grid-cols-2 gap-4">
          <BlockArea :active="false" :icon="IconShield">
            <div class="p-4 bg-gray-100 rounded border">
              <p>受保護區域</p>
            </div>
          </BlockArea>

          <BlockArea :active="false" :icon="IconEye">
            <div class="p-4 bg-gray-100 rounded border">
              <p>僅供查看</p>
            </div>
          </BlockArea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  IconLock,
  IconExclamationCircle,
  IconShield,
  IconEye,
} from "@tabler/icons-vue"
import BlockArea from "../index.vue"
</script>
