# 快速開始

## 安裝

::: code-group

```bash [pnpm]
pnpm add @proladon/shelter-ui
```

```bash [yarn]
yarn add @proladon/shelter-ui
```

```bash [npm]
npm install @proladon/shelter-ui
```

:::

## 全域引入

在 `main.ts` 中註冊整個組件庫：

```ts
import { createApp } from 'vue'
import App from './App.vue'
import ShelterUI from '@proladon/shelter-ui'
import '@proladon/shelter-ui/dist/index.css'

const app = createApp(App)
app.use(ShelterUI)
app.mount('#app')
```

## 按需引入

只引入需要的組件，享受最小化打包體積：

```vue
<template>
  <SHButton @click="handleClick">點擊我</SHButton>
  <SHInput v-model="value" placeholder="請輸入內容" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHButton, SHInput } from '@proladon/shelter-ui'

const value = ref('')
const handleClick = () => console.log('clicked')
</script>
```

## UnoCSS 整合

shelter-ui 提供官方 UnoCSS preset，讓消費端專案自動擁有所有必要的 shortcuts、safelist 與 theme tokens。

### 使用 UnoCSS 的專案

在 `uno.config.ts` 中加入 `presetShelterUI`：

```ts
import { defineConfig } from 'unocss'
import { presetUno } from 'unocss'
import { presetShelterUI } from '@proladon/shelter-ui/preset'

export default defineConfig({
  presets: [presetUno(), presetShelterUI()],
})
```

### 未使用 UnoCSS 的專案

shelter-ui 已將所有樣式編譯進 `dist/index.css`，只需引入即可正常顯示：

```ts
// main.ts
import '@proladon/shelter-ui/dist/index.css'
```

> UnoCSS 並非必要依賴。未使用 UnoCSS 時，組件依然能正常運作，但無法在自身專案中使用 `sh-*` utility class。

## 配置主題

用 `SHConfigProvider` 包裹應用根節點，透過 `theme-config` 覆蓋設計 Token：

```vue
<template>
  <SHConfigProvider :theme-config="customTheme">
    <App />
  </SHConfigProvider>
</template>

<script setup lang="ts">
import { SHConfigProvider } from '@proladon/shelter-ui'
import type { ThemeVarsConfig } from '@proladon/shelter-ui'

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

> `themePrefix` 預設為 `sh`，可透過 `:theme-prefix` prop 自訂 CSS 變數前綴。

## 配置通知

需要使用 `Notification` 時，在應用最外層加上 `SHNotificationProvider`，讓子組件可透過 `useNotification()` hook 觸發通知：

```vue
<template>
  <SHConfigProvider :theme-config="customTheme">
    <SHNotificationProvider>
      <App />
    </SHNotificationProvider>
  </SHConfigProvider>
</template>

<script setup lang="ts">
import { SHConfigProvider, SHNotificationProvider } from '@proladon/shelter-ui'
</script>
```

在子組件中使用：

```vue
<script setup lang="ts">
import { useNotification } from '@proladon/shelter-ui'

const { notify } = useNotification()

notify({ type: 'success', message: '操作成功！' })
</script>
```
