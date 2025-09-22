<template>
  <div class="flex flex-col gap-4">
    <div class="mb-4">
      <h4 class="text-lg font-semibold mb-2">默認主題</h4>
      <div class="p-4 rounded border border-border-base bg-bg-secondary">
        <div class="flex flex-wrap gap-3 mb-4">
          <SHButton type="primary">主要按鈕</SHButton>
          <SHButton type="default">默認按鈕</SHButton>
          <SHButton type="info">信息按鈕</SHButton>
          <SHButton type="success">成功按鈕</SHButton>
          <SHButton type="warning">警告按鈕</SHButton>
          <SHButton type="danger">危險按鈕</SHButton>
        </div>
        <div class="flex flex-wrap gap-3 mb-4">
          <SHInput placeholder="請輸入內容" style="width: 200px" />
          <SHBadge :count="5">
            <div class="px-3 py-1 border border-border-base rounded">通知</div>
          </SHBadge>
        </div>
      </div>
    </div>

    <div class="mb-4">
      <h4 class="text-lg font-semibold mb-2">自定義主題</h4>
      <SHConfigProvider :theme-config="customTheme">
        <div class="p-4 rounded border border-border-base bg-bg-secondary">
          <div class="flex flex-wrap gap-3 mb-4">
            <SHButton type="primary">主要按鈕</SHButton>
            <SHButton type="default">默認按鈕</SHButton>
            <SHButton type="info">信息按鈕</SHButton>
            <SHButton type="success">成功按鈕</SHButton>
            <SHButton type="warning">警告按鈕</SHButton>
            <SHButton type="danger">危險按鈕</SHButton>
          </div>
          <div class="flex flex-wrap gap-3 mb-4">
            <SHInput placeholder="請輸入內容" style="width: 200px" />
            <SHBadge :count="5">
              <div class="px-3 py-1 border border-border-base rounded">
                通知
              </div>
            </SHBadge>
          </div>
        </div>
      </SHConfigProvider>
    </div>

    <div class="mb-4">
      <h4 class="text-lg font-semibold mb-2">明亮主題</h4>
      <SHConfigProvider :theme-config="lightTheme">
        <div class="p-4 rounded border border-border-base bg-bg-secondary">
          <div class="flex flex-wrap gap-3 mb-4">
            <SHButton type="primary">主要按鈕</SHButton>
            <SHButton type="default">默認按鈕</SHButton>
            <SHButton type="info">信息按鈕</SHButton>
            <SHButton type="success">成功按鈕</SHButton>
            <SHButton type="warning">警告按鈕</SHButton>
            <SHButton type="danger">危險按鈕</SHButton>
          </div>
          <div class="flex flex-wrap gap-3 mb-4">
            <SHInput placeholder="請輸入內容" style="width: 200px" />
            <SHBadge :count="5">
              <div class="px-3 py-1 border border-border-base rounded">
                通知
              </div>
            </SHBadge>
          </div>
        </div>
      </SHConfigProvider>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ThemeVarsConfig } from "../types"
import SHConfigProvider from "../index.vue"
import SHButton from "../../Button/index.vue"
import SHInput from "../../Input/index.vue"
import SHBadge from "../../Badge/index.vue"

// 自定義主題 - 藍綠色調
const customTheme: ThemeVarsConfig = {
  primary: "#1890ff",
  bg: {
    primary: "#001529",
    secondary: "#002140",
  },
  text: {
    base: "#ffffff",
  },
  border: {
    base: "#40a9ff",
  },
  status: {
    info: "#1890ff",
    danger: "#ff4d4f",
    warning: "#faad14",
    success: "#52c41a",
  },
}

// 明亮主題
const lightTheme: ThemeVarsConfig = {
  primary: "#e91e63",
  bg: {
    primary: "#ffffff",
    secondary: "#f5f5f5",
  },
  text: {
    base: "#212121",
  },
  border: {
    base: "#e0e0e0",
  },
  status: {
    info: "#2196f3",
    danger: "#f44336",
    warning: "#ff9800",
    success: "#4caf50",
  },
}
</script>
