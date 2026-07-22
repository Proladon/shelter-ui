# Shelter UI

基於 Vue 3 和 UnoCSS 的現代組件庫

## 特性

- 🚀 基於 Vue 3、TypeScript 和 Vite
- 🎨 使用 UnoCSS 實現原子化 CSS
- 📦 支持按需引入
- 📚 完善的文檔和示例

## 安裝

```bash
yarn add @proladon/shelter-ui
```

## 使用

### 完整引入

```ts
import { createApp } from 'vue'
import ShelterUI from '@proladon/shelter-ui'
import '@proladon/shelter-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(ShelterUI)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <SHButton type="primary">按鈕</SHButton>
  <SHInput v-model:value="input" placeholder="請輸入內容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHButton, SHInput } from '@proladon/shelter-ui'
import '@proladon/shelter-ui/dist/index.css'

const input = ref('')
</script>
```

## 給 AI Agent / 消費端專案

若你的專案安裝了 `@proladon/shelter-ui` 並想讓 AI coding agent（如 Claude Code）了解怎麼正確使用這個庫，請參考：

- [`SKILL.md`](SKILL.md) — 安裝方式、命名與 v-model 慣例、常見踩雷點（v-model 例外、size 屬性因元件而異等）
- [`components-catalog.json`](components-catalog.json) — 每個元件完整的 Props / Events / Slots / Methods，機器可讀

兩者都會隨 npm 套件一起發布（`node_modules/@proladon/shelter-ui/`）。

## 開發

```bash
# 安裝依賴
yarn install

# 啟動開發伺服器
yarn dev

# 構建組件庫
yarn lib:build

# 啟動文件開發伺服器
yarn docs:dev

# 構建文檔
yarn docs:build
```

## 文檔

查看 [在線文檔](https://your-website.com) 獲取更多信息。

## 許可證

[MIT](LICENSE)
