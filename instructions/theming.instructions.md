---
applyTo: 'src/components/**/*.vue, src/themes/**, src/core/**, src/preset.ts, uno.config.ts'
description: 'Design token 使用規則（權威來源：IMPROVEMENT_PLAN.md 決策 D7–D9）。組件樣式怎麼寫顏色、間距、z-index、陰影、動畫，一律照這份文件。'
---

# Design Token 使用指南

Token 管線：`src/themes/default.ts`（token 原始定義）→ `src/core/theme-utils.ts`（衍生成 CSS 變數與 UnoCSS theme）→ `src/generated/baseline.css` + UnoCSS preset（實際輸出）。這份文件只講**怎麼用**現有/規劃中的 token；要新增 token 類別本身，是修改 `themes/default.ts` + `theme-utils.ts` 的維護工作。

## 顏色（現已可用）

- **禁止 raw Tailwind 調色**：`bg-white`、`text-gray-*`、`ring-blue-*`、`bg-gray-300` 這類直接寫死的 Tailwind 色一律不可用，一律改用語意 token。
- **色彩 utility 一律用 dot-notation**：`bg-bg.primary`、`text-text.base`、`border-border.base`，不要用 `text-text-base` 這種 hyphen 寫法。
- UnoCSS shortcut（`sh-fill-*`/`sh-ghost-*`/`sh-text-*`/`sh-outline-*`/`sh-dashed-*`/`sh-bordered-*`）內部才用 `var(--sh-*)` 方括號寫法，不要在 shortcut 或 `:class` 綁定裡用 `bg-status.danger` 這種 dot-notation。

語意 token 對照表：

| Token | CSS 變數 | 用途 |
| --- | --- | --- |
| `primary` | `--sh-primary` | focus 狀態、選中指示、互動文字 |
| `primary-fade` | `--sh-primary-fade` | hover / 選中背景 |
| `bg.primary` | `--sh-bg-primary` | 組件主背景 |
| `bg.secondary` | `--sh-bg-secondary` | 禁用狀態、表頭 |
| `text.base` | `--sh-text-base` | 一般文字 |
| `text.primary` | `--sh-text-primary` | 低強調文字（placeholder、圖示） |
| `border.base` | `--sh-border-base` | 預設邊框 |
| `border.primary` | `--sh-border-primary` | 強調邊框 |
| `status.info/danger/warning/success` | — | 狀態色 |

- **`color` prop 是例外**：Progress、Badge、Divider、Splitter 這類本來就需要自由色值的組件，`color?: string` 可以接受任意 hex/css color，不受上面 dot-notation 規則限制（那是 prop 的值域，不是 class 寫法）。
- **`dark:` variant 目前禁止使用**：深淺色機制（D8）尚未上線，現有 9 個檔案裡的 `dark:` 是死碼。上線前新增的 `dark:` 一律視為錯誤，等 `data-theme` 機制與 UnoCSS `darkMode` 設定到位後才會重新開放。

## 間距 / 圓角 / 字級（現已可用）

- 間距：`--sh-spacing-{xs,sm,md,lg,xl,2xl}`
- 圓角：`--sh-radius-{none,sm,md,lg,xl,full}`
- 字級：`--sh-font-size-{xs,sm,md,lg,xl,2xl}`
- 組件尺寸：`--sh-component-size-{xs,sm,md,lg,xl}`（對應 D1 的 `size` prop）
- **任意值 `[NNpx]` 原則上禁止**：不要寫 `w-[32px]`、`text-[13px]` 這種寫死像素，一律改用上面的 spacing/字級/component-size token。真的找不到對應 token 時可以用任意值，但要加註解說明理由（例如「reka-ui 內部元素需要精確對齊」）。

## z-index／陰影／動畫／focus-ring（Phase 2 待實作）

以下 token 類別**尚未加入** `themes/default.ts` 管線（IMPROVEMENT_PLAN.md Phase 2 待辦），目前程式碼裡對應的還是各處寫死的數值。這裡先定義完成後的目標規則，Phase 2 落地後這些 CSS 變數才會實際存在：

- **z-index**：`--sh-z-dropdown: 1000`、`--sh-z-sticky: 1020`、`--sh-z-overlay: 1040`、`--sh-z-modal: 1050`、`--sh-z-popover: 1060`、`--sh-z-tooltip: 1070`、`--sh-z-notification: 1080`。目的是修掉「Dialog 內開 Tooltip/Popover/Select 被蓋住」這類疊層 bug（現況是 Notification 9999、Select `z-[9999]`、Dialog z-99、Tooltip/Popover z-50、ContextMenu/DatePicker z-30 各寫各的）。
- **陰影**：`--sh-shadow-{sm,md,lg,focus}`。
- **動畫**：`--sh-duration-{fast: 150ms, normal: 250ms, slow: 400ms}`、`--sh-ease-{standard,enter,leave}`。Popover/Tooltip/ContextMenu 的 slide 系列與 Dialog 的 fade keyframes 之後會合併成共用定義，不要再各自複製一份。
- **focus ring**：`--sh-focus-ring`，用來取代目前 14 處複製貼上的 `box-shadow: 0 0 0 2px var(--sh-primary-fade)`（Input、NumberInput、Select、Radio、Checkbox、Switch 等）。**Phase 2 落地前**，新組件若需要 focus ring，暫時仍用 `box-shadow: 0 0 0 2px var(--sh-primary-fade)`（與現況一致），等 token 上線後統一替換，不要自己發明新的寫法。

## `<style>` 區塊規範

- 一律 `<style lang="postcss" scoped>`，兩者缺一都要補（現況約 16 檔缺 `scoped`、10 檔缺 `lang="postcss"`）。
- 沒有實際樣式規則的空 `<style>` 區塊直接刪除，不要留著只寫註解。

## ConfigProvider 與 themePrefix（D9）

- `themePrefix` 已於 v3.0（Phase 3 breaking change）移除：組件內部 181 處寫死 `--sh-` 前綴、class 寫死 `sh-*`，UnoCSS 映射也是建置期固定，這個 prop 先前是「文件承諾但實際無效」的假功能。**不要在程式碼或文件中再提及 `themePrefix`**，`SHConfigProvider` 現在只有 `theme-config` 一個 prop。
- 客製主題色一律用 `SHConfigProvider` 的 `theme-config` prop（`ThemeVarsConfig`，即 `DeepPartial<DesignTokens>`），不要期待改變 CSS 變數前綴本身。
