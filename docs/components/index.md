# 組件

Shelter UI 提供了一系列簡潔、高效、易用的 UI 組件，幫助你快速構建界面。

## 組件列表

### 基礎組件

- [ActiveButtonGroup 活動按鈕組](/components/active-button-group) - 提供帶平滑過渡動畫的按鈕組切換功能
- [Badge 徽章](/components/badge) - 用於顯示計數或狀態信息的小型標記
- [Button 按鈕](/components/button) - 用於觸發操作的按鈕組件
- [Input 輸入框](/components/input) - 用於接收用戶輸入的文本框組件
- [ScrollArea 滾動區域](/components/scroll-area) - 可客製化樣式的滾動區塊元件
- [Select 選擇器](/components/select) - 用於從一組選項中選擇一個或多個值的下拉選擇組件
- [Switch 開關](/components/switch) - 用於切換開啟/關閉狀態的開關元件
- [Spin 加載中](/components/spin) - 用於顯示加載中的狀態組件
- [BorderContainer 邊框容器](/components/border-container) - 用於創建具有自定義邊框的容器
- [Dialog 對話框](/components/dialog) - 用於在不離開當前頁面的情況下與用戶進行交互
- [Tooltip 工具提示](/components/tooltip) - 用於顯示元素相關的簡短信息的提示框
- [MessageBox 訊息盒](/components/message-box) - 用於顯示帶 icon 與型態的訊息提示容器

## 使用方式

所有組件都支持全局引入和按需引入兩種方式：

### 全局引入

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ShelterUI from 'shelter-ui'
import 'shelter-ui/dist/style.css'

const app = createApp(App)
app.use(ShelterUI)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <SHButton type="primary">按鈕</SHButton>
</template>

<script setup lang="ts">
import { SHButton } from 'shelter-ui'
</script>
```
