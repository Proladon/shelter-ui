---
name: shelter-ui
description: Reference for consuming @proladon/shelter-ui (a Vue 3 + UnoCSS component library) in a downstream project — installation, global setup, naming/v-model conventions, common pitfalls, and where to find full per-component API. Use this whenever writing, reviewing, or debugging Vue code that imports from @proladon/shelter-ui, or when asked to add/use one of its components (SHButton, SHInput, SHSelect, SHDialog, etc.).
metadata:
  type: consumer-reference
  package: '@proladon/shelter-ui'
---

# Shelter UI 使用指南（供消費端專案的 AI Agent 參考）

這份文件是給**使用** `@proladon/shelter-ui` 的專案（而非開發此套件本身）閱讀的參考。目的是讓 AI agent 在幫使用者寫 Vue 代碼時，不用用猜測的 Vue 慣例（例如 `modelValue`），而是照這個套件實際的規則走。

> 本套件開發者自身的元件開發規範不在本文件範圍內（那是 `component.instructions.md` / `.github/skills/component-scaffold` 的事）。這裡只講「怎麼把這個庫用對」。

## 這是什麼

- Vue 3 + TypeScript 組件庫，共 **49 個公開元件**（含子元件），涵蓋表單、回饋/覆蓋層、資料展示、版面配置、對話（Chat）、日期時間。
- 樣式基於 UnoCSS，但**不強制**消費端專案使用 UnoCSS——已編譯的 CSS 可直接引入。
- 完整、逐元件的 Props / Events / Slots / Methods 定義在隨套件發布的 [`components-catalog.json`](components-catalog.json)，是機器可讀的權威來源，**優先查它，不要用記憶或猜測**。

## 安裝與初始化

```bash
pnpm add @proladon/shelter-ui   # 或 yarn add / npm install
```

**全域註冊**（一次引入全部元件）：

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import ShelterUI from '@proladon/shelter-ui'
import '@proladon/shelter-ui/dist/index.css'

createApp(App).use(ShelterUI).mount('#app')
```

**按需引入**（tree-shaking，元件個別具名匯出）：

```vue
<template>
  <SHButton type="primary" @click="onClick">送出</SHButton>
  <SHInput v-model:value="text" placeholder="請輸入" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHButton, SHInput } from '@proladon/shelter-ui'
import '@proladon/shelter-ui/dist/index.css'

const text = ref('')
const onClick = () => {}
</script>
```

**CSS 只需引入一次**（在應用入口）。若消費端專案本身也用 UnoCSS，可選擇改用官方 preset 取代 `dist/index.css`，讓 `sh-*` shortcuts 在自己專案內也能用：

```ts
// uno.config.ts
import { defineConfig, presetUno } from 'unocss'
import { presetShelterUI } from '@proladon/shelter-ui/preset'

export default defineConfig({
  presets: [presetUno(), presetShelterUI()],
})
```

## 必讀慣例（務必遵守，否則元件會「看起來壞掉」）

### 1. 元件一律 `SH` 前綴

匯出名稱 = `SH` + PascalCase 元件名（`components-catalog.json` 裡的 `name` **不含** `SH` 前綴，記得自己補上）。

- 不確定某個元件的正確匯出名稱時，去 `node_modules/@proladon/shelter-ui/dist/index.d.ts` 或 catalog 對照，不要用猜的複數/單數或縮寫。

### 2. v-model 慣例：`value` / `update:value`（不是 Vue 預設的 `modelValue`）

這個庫**統一把雙向綁定改成 `value` / `update:value`**，而不是 Vue 生態圈常見的 `modelValue` / `update:modelValue`。所以絕大多數元件要寫：

```vue
<SHInput v-model:value="text" />
<SHSelect v-model:value="selected" :options="options" />
<SHSwitch v-model:value="enabled" />
```

**已知例外**（這兩個仍用原生 `modelValue` / `update:modelValue`，寫 `v-model` 不加 `:value` 即可）：

| 元件                    | v-model 寫法                    |
| ----------------------- | -------------------------------- |
| `SHCheckbox`（單獨使用）| `v-model="checked"`             |
| `SHRadio`（單獨使用）   | `v-model="picked"`               |
| `SHCheckboxGroup`       | `v-model:value="checkedList"`（回到統一慣例） |
| `SHRadioGroup`          | `v-model:value="picked"`（回到統一慣例）      |

> 遇到任何元件，若不確定用哪個，去 `components-catalog.json` 找該元件的 `events` 陣列，看它是 `update:value` 還是 `update:modelValue`，不要假設。

### 3. `size` 屬性的合法值因元件而異——不要憑印象套用

沒有全庫統一的 size 列舉。實際觀察到兩種風格並存：

- `'small' | 'default' | 'large'` — 例如 `SHButton`、`SHNumberInput`、`SHPagination`、`SHProgress`、`SHSlider`
- `'sm' | 'md' | 'lg'` — 例如 `SHUploadZone`、`SHPinInput`

寫 `size="sm"` 在 `SHButton` 上是錯的（要寫 `size="small"`）。**每次都去 catalog 查該元件實際的 `size` 型別**，不要跨元件複製貼上。

### 4. `type` 屬性通常是語意色彩，但 `SHInput` 是例外

多數元件的 `type` 是語意變體（`'primary' | 'success' | 'warning' | 'danger' | 'info'`，部分含 `'default'`），例如 `SHButton`、`SHDialog`、`SHTag`、`SHStatusTag`、`SHAlertDialog`、`SHMessageBox`。

但 **`SHInput` 的 `type` 是原生 HTML input type**（如 `'text' | 'password' | 'email'`），不是顏色。不要對 `SHInput` 寫 `type="primary"`。

### 5. 需要包裹的全域 Provider

- **`SHConfigProvider`**：建議包在應用最外層（不是硬性要求，但要客製主題、或用到 `theme-config` 時必須有），透過 `theme-config` prop 傳入 `ThemeVarsConfig`（`DeepPartial<DesignTokens>`，例如 `{ colors: { primary: '#ff0000' } }`）覆蓋設計 token；可巢狀使用，覆寫範圍僅限於自身容器。
- **`SHNotificationProvider`**：只有用到 `SHNotification` / `useNotification()` 時才需要，且必須包在會呼叫 `useNotification()` 的元件之外層：

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

子元件使用：

```ts
import { useNotification } from '@proladon/shelter-ui'
const { notify } = useNotification()
notify({ type: 'success', message: '操作成功！' })
```

忘記包 `SHNotificationProvider` 會導致 `useNotification()` 內部拿不到 context（執行期錯誤或 no-op），這是最常見的踩雷點之一。

## 查詢完整 API（Props / Events / Slots / Methods）

**不要**在這份文件裡找逐屬性細節——這裡只講慣例。實際的 props/events/slots/methods 都在 [`components-catalog.json`](components-catalog.json)（隨套件安裝，位於 `node_modules/@proladon/shelter-ui/components-catalog.json`，`package.json` 也把它設為可 import 的 export path）。

每個元件的 JSON 結構：

```jsonc
{
  "name": "Select",              // 不含 SH 前綴，實際匯入用 SHSelect
  "description": "...",           // 繁中，一句話說明用途
  "subComponents": [],            // 需搭配使用的子元件（若有）
  "props": [{ "name", "type", "default", "description", "required?" }],
  "events": [{ "name", "payload", "description" }],
  "slots": [{ "name", "description" }],
  "methods": []                   // 透過 ref 呼叫的 expose 方法（如 focus/blur/clear）
}
```

查詢方式：讀取這個 JSON，用元件名稱（不含 `SH` 前綴）過濾出對應物件即可拿到該元件完整定義，**優先於**憑記憶或猜測 Vue 慣例編寫代碼。

少數元件透過 `ref` 暴露方法，需要程式化控制時才用得到：`SHInput`/`SHTextarea`（focus/blur/select）、`SHSelect`（focus/blur/toggleDropdown）、`SHDatePicker`（focus/blur/clear）、`SHScrollArea`（scrollTop/scrollBottom/scrollTo/getViewport）、`SHUploadZone`（openFilePicker）。

## 元件總覽（依分類，方便快速查找該用哪個）

> 下方僅列一句話用途，供快速定位；詳細 API 一律以 `components-catalog.json` 為準。除特別標註外，匯入名稱皆為 `SH` + 元件名。

**基礎表單**：`Button`、`Input`、`InputGroup`（+`InputGroupAddon`）、`NumberInput`、`Textarea`、`MentionableTextArea`、`Select`、`Checkbox`（+`CheckboxGroup`）、`Radio`（+`RadioGroup`）、`Switch`、`Slider`、`PinInput`、`UploadZone`

**日期時間**：`Calendar`、`DatePicker`、`TimePicker`

**回饋 / 覆蓋層**：`Dialog`、`AlertDialog`、`MessageBox`、`Notification`（+`NotificationProvider`、`useNotification`）、`Popover`、`Tooltip`、`Spin`、`Progress`、`BlockArea`、`ContextMenu`

**資料展示**：`Badge`、`Chip`、`Tag`、`StatusTag`、`Divider`、`Pagination`

**版面 / 容器**：`BaseContainer`、`FlexContainer`、`Collapsible`、`EditableContainer`、`ScrollArea`、`Splitter`（+`SplitterPanel`、`SplitterResizeHandle`）、`Carousel`（+`CarouselItem`、`CarouselNavigation`、`CarouselIndicators`）、`ActiveButtonGroup`（+`ActiveButtonItem`）

**對話 / Chat**：`ChatMessage`、`ChatInput`

**全域配置**：`ConfigProvider`

## 常見錯誤排查

| 現象                                   | 常見原因                                                          |
| -------------------------------------- | ------------------------------------------------------------------ |
| 元件完全沒樣式、跟原生 HTML 一樣       | 忘記引入 `dist/index.css`（且沒用 UnoCSS preset）                  |
| `v-model` 綁定沒反應                   | 用了 `v-model="x"`（等同 `modelValue`）而非 `v-model:value="x"`——反過來，若是單獨的 `SHCheckbox`/`SHRadio` 則相反 |
| `useNotification()` 噴錯或通知不顯示   | 沒有在外層包 `SHNotificationProvider`                              |
| 主題色/客製顏色沒生效                  | 沒有用 `SHConfigProvider` 包裹，或 `theme-config` 結構不符 `ThemeVarsConfig` |
| `size="sm"` 沒效果                     | 該元件實際合法值是 `'small' \| 'default' \| 'large'`，不是 `sm/md/lg`，需查 catalog 確認 |
| `SHInput :type="'primary'"` 沒有變色   | `SHInput` 的 `type` 是原生 input type，顏色變體要用其他 prop（查該元件 catalog 定義） |

## 需要客製樣式 / Design Token 時

一般「使用元件」不需要碰底層 design token。只有在需要**客製主題**（透過 `theme-config`）或在自己專案內用 `sh-*` UnoCSS shortcuts 時，才需要參考套件原始碼庫的 `docs/guide/design-system.md`（色彩、間距、圓角等 token 對照表）。多數消費端場景用不到。
