<template>
  <div class="space-y-6">
    <h3 class="text-lg font-semibold">基本用法</h3>

    <div class="space-y-4">
      <!-- 基本禁用狀態 -->
      <div>
        <h4 class="text-sm font-medium mb-2">基本禁用</h4>
        <BlockArea :active="false">
          <div class="p-4 bg-gray-100 rounded border">
            <p>這是一個被禁用的區域</p>
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
              點擊我
            </button>
          </div>
        </BlockArea>
      </div>

      <!-- 正常狀態 -->
      <div>
        <h4 class="text-sm font-medium mb-2">正常狀態</h4>
        <BlockArea :active="true">
          <div class="p-4 bg-gray-100 rounded border">
            <p>這是一個正常的區域</p>
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
              點擊我
            </button>
          </div>
        </BlockArea>
      </div>

      <!-- 切換狀態 -->
      <div>
        <h4 class="text-sm font-medium mb-2">切換狀態</h4>
        <label class="flex items-center gap-2 mb-2">
          <input v-model="isActive" type="checkbox" class="rounded" />
          <span>啟用區域</span>
        </label>
        <BlockArea :active="isActive">
          <div class="p-4 bg-gray-100 rounded border">
            <p>這個區域的狀態可以切換</p>
            <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
              點擊我
            </button>
          </div>
        </BlockArea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import BlockArea from "../index.vue"

const isActive = ref(false)
</script>
