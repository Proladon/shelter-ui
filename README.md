# Shelter UI

基於 Vue 3 和 UnoCSS 的現代組件庫

## 特性

- 🚀 基於 Vue 3、TypeScript 和 Vite
- 🎨 使用 UnoCSS 實現原子化 CSS
- 📦 支持按需引入
- 📚 完善的文檔和示例

## 安裝

```bash
npm install shelter-ui
```

## 使用

### 完整引入

```ts
import { createApp } from 'vue'
import ShelterUI from 'shelter-ui'
import 'shelter-ui/dist/shelter-ui.css'
import App from './App.vue'

const app = createApp(App)
app.use(ShelterUI)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <SHButton type="primary">按鈕</SHButton>
  <SHInput v-model="input" placeholder="請輸入內容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SButton, SInput } from 'shelter-ui'
import 'shelter-ui/dist/shelter-ui.css'

const input = ref('')
</script>
```

## 開發

```bash
# 安裝依賴
npm install

# 啟動開發服務器
npm run dev

# 構建組件庫
npm run lib:build

# 啟動文檔開發服務器
npm run docs:dev

# 構建文檔
npm run docs:build
```

## 文檔

查看 [在線文檔](https://your-website.com) 獲取更多信息。

## 許可證

[MIT](LICENSE)
