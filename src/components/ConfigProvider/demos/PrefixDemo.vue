<template>
  <div class="flex flex-col gap-6">
    <div>
      <h4 class="text-lg font-semibold mb-2">默認前綴 (sh)</h4>
      <div class="p-4 rounded border border-border-base bg-bg-secondary">
        <div class="flex gap-3 mb-3">
          <SHButton type="primary">主要按鈕</SHButton>
          <SHButton type="info">信息按鈕</SHButton>
        </div>
        <p class="text-sm text-text-base">
          CSS 變數: --sh-primary, --sh-bg-primary 等
        </p>
      </div>
    </div>

    <div>
      <h4 class="text-lg font-semibold mb-2">自定義前綴 (my-ui)</h4>
      <SHConfigProvider theme-prefix="my-ui" :theme-config="customTheme">
        <div class="p-4 rounded border border-border-base bg-bg-secondary">
          <div class="flex gap-3 mb-3">
            <SHButton type="primary">主要按鈕</SHButton>
            <SHButton type="info">信息按鈕</SHButton>
          </div>
          <p class="text-sm text-text-base">
            CSS 變數: --my-ui-primary, --my-ui-bg-primary 等
          </p>
        </div>
      </SHConfigProvider>
    </div>

    <div>
      <h4 class="text-lg font-semibold mb-2">組織前綴 (company)</h4>
      <SHConfigProvider theme-prefix="company" :theme-config="companyTheme">
        <div class="p-4 rounded border border-border-base bg-bg-secondary">
          <div class="flex gap-3 mb-3">
            <SHButton type="primary">主要按鈕</SHButton>
            <SHButton type="info">信息按鈕</SHButton>
          </div>
          <p class="text-sm text-text-base">
            CSS 變數: --company-primary, --company-bg-primary 等
          </p>
        </div>
      </SHConfigProvider>
    </div>

    <div class="mt-6 p-4 bg-bg-secondary rounded border border-border-base">
      <h4 class="text-lg font-semibold mb-2">說明</h4>
      <ul class="text-sm text-text-base space-y-1">
        <li>• 自定義前綴可以避免 CSS 變數名稱衝突</li>
        <li>• 適合在多個 UI 庫共存的項目中使用</li>
        <li>• 可以用於建立品牌專屬的主題命名空間</li>
        <li>• 前綴會應用到所有生成的 CSS 變數上</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ThemeVarsConfig } from "../types"
import SHConfigProvider from "../index.vue"
import SHButton from "../../Button/index.vue"

const customTheme: ThemeVarsConfig = {
  primary: "#7c3aed",
  bg: {
    primary: "#1e1b4b",
    secondary: "#312e81",
  },
  text: {
    base: "#e0e7ff",
  },
  border: {
    base: "#6366f1",
  },
  status: {
    info: "#3b82f6",
    danger: "#ef4444",
    warning: "#f59e0b",
    success: "#10b981",
  },
}

const companyTheme: ThemeVarsConfig = {
  primary: "#dc2626",
  bg: {
    primary: "#7f1d1d",
    secondary: "#991b1b",
  },
  text: {
    base: "#fef2f2",
  },
  border: {
    base: "#f87171",
  },
  status: {
    info: "#3b82f6",
    danger: "#dc2626",
    warning: "#d97706",
    success: "#059669",
  },
}
</script>
