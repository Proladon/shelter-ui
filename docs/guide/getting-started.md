# 快速開始

## 安裝

使用 npm 安裝 Shelter UI：

```bash
npm install shelter-ui
```

或使用 yarn：

```bash
yarn add shelter-ui
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
  <s-button type="primary">按鈕</s-button>
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
    <s-button type="primary" @click="handleClick">點擊我</s-button>
    <s-input v-model="inputValue" placeholder="請輸入內容" />
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

## TypeScript 支持

Shelter UI 提供了完整的 TypeScript 類型定義，可以獲得良好的開發體驗。