<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-sm font-medium text-gray-700 mb-3">不同顏色的分隔線</h3>
      <div class="space-y-4">
        <!-- 預設顏色 -->
        <div>
          <p class="text-sm text-gray-500 mb-2">預設顏色 (#e5e7eb)</p>
          <Divider />
        </div>

        <!-- 紅色 -->
        <div>
          <p class="text-sm text-gray-500 mb-2">紅色 (#ef4444)</p>
          <Divider color="#ef4444" />
        </div>

        <!-- 藍色 -->
        <div>
          <p class="text-sm text-gray-500 mb-2">藍色 (#3b82f6)</p>
          <Divider color="#3b82f6" />
        </div>

        <!-- 綠色 -->
        <div>
          <p class="text-sm text-gray-500 mb-2">綠色 (#10b981)</p>
          <Divider color="#10b981" />
        </div>

        <!-- 紫色 -->
        <div>
          <p class="text-sm text-gray-500 mb-2">紫色 (#8b5cf6)</p>
          <Divider color="#8b5cf6" />
        </div>

        <!-- 使用 CSS 變數 -->
        <div>
          <p class="text-sm text-gray-500 mb-2">
            使用 CSS 變數 (var(--primary-color))
          </p>
          <div style="--primary-color: #f59e0b">
            <Divider color="var(--primary-color)" />
          </div>
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-sm font-medium text-gray-700 mb-3">帶文字的彩色分隔線</h3>
      <div class="space-y-4">
        <Divider color="#ef4444">紅色分隔線</Divider>
        <Divider color="#3b82f6">藍色分隔線</Divider>
        <Divider color="#10b981">綠色分隔線</Divider>
      </div>
    </div>

    <div>
      <h3 class="text-sm font-medium text-gray-700 mb-3">垂直彩色分隔線</h3>
      <div class="flex items-center space-x-4 h-16">
        <span class="text-sm">左側內容</span>
        <Divider orientation="vertical" color="#ef4444" />
        <span class="text-sm">中間內容</span>
        <Divider orientation="vertical" color="#3b82f6" />
        <span class="text-sm">右側內容</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Divider from '../index.vue'
</script>
