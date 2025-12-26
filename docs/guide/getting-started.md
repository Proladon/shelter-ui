# 快速開始

## 安裝

使用 yarn 安裝 Shelter UI（推薦）：

```bash
yarn add shelter-ui
```

或使用 npm：

```bash
npm install shelter-ui
```

## 全局引入

在你的 main.ts 文件中引入 Shelter UI：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ShelterUI from 'shelter-ui'
import 'shelter-ui/dist/style.css'

const app = createApp(App)
app.use(ShelterUI)
app.mount('#app')
```

## 按需引入

你也可以只引入需要的組件：

```vue
<template>
  <SHButton type="primary">按鈕</SHButton>
</template>

<script setup lang="ts">
import { SButton } from 'shelter-ui'
</script>
```

## 基本使用

以下是一個簡單的示例：

```vue
<template>
  <div>
    <SHButton type="primary" @click="handleClick">點擊我</SHButton>
    <SHInput v-model="inputValue" placeholder="請輸入內容" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const inputValue = ref('')
const handleClick = () => {
  alert('按鈕被點擊了！')
}
</script>
```

## 配置主題

你可以使用 `SHConfigProvider` 來配置全局主題：

```vue
<template>
  <SHConfigProvider :theme-config="customTheme">
    <div id="app">
      <!-- 你的應用內容 -->
    </div>
  </SHConfigProvider>
</template>

<script setup lang="ts">
import { SHConfigProvider } from 'shelter-ui'
import type { ThemeVarsConfig } from 'shelter-ui'

const customTheme: ThemeVarsConfig = {
  primary: '#1890ff',
  bg: {
    primary: '#ffffff',
    secondary: '#f5f5f5',
  },
  text: {
    base: '#333333',
  },
  border: {
    base: '#d9d9d9',
  },
  status: {
    info: '#1890ff',
    danger: '#ff4d4f',
    warning: '#faad14',
    success: '#52c41a',
  },
}
</script>
```

## 配置通知

如果你需要使用通知組件（Notification），需要在應用的最外層包裹 `SHNotificationProvider`：

```vue
<template>
  <SHConfigProvider :theme-config="customTheme">
    <SHNotificationProvider>
      <div id="app">
        <!-- 你的應用內容 -->
      </div>
    </SHNotificationProvider>
  </SHConfigProvider>
</template>

<script setup lang="ts">
import { SHConfigProvider, SHNotificationProvider } from 'shelter-ui'
// ...
</script>
```

這樣你就可以在任何子組件中使用 `useNotification` hook 來顯示通知了。

## TypeScript 支持

Shelter UI 提供了完整的 TypeScript 類型定義，可以獲得良好的開發體驗。
