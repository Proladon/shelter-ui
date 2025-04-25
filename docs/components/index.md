# 組件

Shelter UI 提供了一系列簡潔、高效、易用的 UI 組件，幫助你快速構建界面。

## 組件列表

### 基礎組件

- [Button 按鈕](/components/button) - 用於觸發操作的按鈕組件
- [Input 輸入框](/components/input) - 用於接收用戶輸入的文本框組件
- [Spin 加載中](/components/spin) - 用於顯示加載中的狀態組件

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
  <s-button type="primary">按鈕</s-button>
</template>

<script setup lang="ts">
import { SButton } from 'shelter-ui'
</script>
```