# Design System 設計規範

本文件定義了 Shelter UI 組件庫的視覺設計規範，確保所有組件在色彩、邊框、間距、文字等方面保持一致的風格。

所有組件 **必須** 使用 Design Token（CSS 變數）而非硬編碼的色值。

---

## Design Tokens 概覽

所有 token 以 `--sh-` 為前綴，定義於 `src/themes/default.ts`，由 Vite 插件自動產生至 `src/generated/baseline.css`。

每個色彩 token 會自動衍生三種變體：

- `{token}-darken` — 加深 30%
- `{token}-lighten` — 提亮 30%
- `{token}-fade` — 透明度 30%（70% fade）

---

## 色彩系統

### 語意色彩對照表

| Token              | CSS 變數              | 用途                                           |
| ------------------ | --------------------- | ---------------------------------------------- |
| **primary**        | `--sh-primary`        | 品牌主色、互動焦點狀態、互動高亮文字、選中指示 |
| **bg.primary**     | `--sh-bg-primary`     | 組件主要背景（輸入框、下拉選單、彈窗）         |
| **bg.secondary**   | `--sh-bg-secondary`   | 次要背景（disabled 狀態、表頭）                |
| **text.base**      | `--sh-text-base`      | **所有一般文字**（標籤、選項、內容）           |
| **text.primary**   | `--sh-text-primary`   | **低強調文字**（placeholder、圖示預設）        |
| **border.base**    | `--sh-border-base`    | 所有預設邊框（輸入框、選單、分隔線）           |
| **border.primary** | `--sh-border-primary` | 強調邊框（NumberInput hover）                  |
| **status.info**    | `--sh-status-info`    | 資訊狀態                                       |
| **status.danger**  | `--sh-status-danger`  | 錯誤 / 危險狀態                                |
| **status.warning** | `--sh-status-warning` | 警告狀態                                       |
| **status.success** | `--sh-status-success` | 成功狀態                                       |

### ⚠️ primary 使用準則

這是最容易混淆的部分，請嚴格遵守：

| 場景                       | 使用           | 說明                       |
| -------------------------- | -------------- | -------------------------- |
| Focus ring / border        | `primary`      | 輸入框獲得焦點時的邊框色   |
| Checkbox / Radio 選中      | `primary`      | 勾選指示器的背景 / 邊框色  |
| Switch 開啟態              | `primary`      | 開關打開時的軌道色         |
| 選項 hover / selected 背景 | `primary-fade` | 下拉選項、選單項高亮底色   |
| 選項 hover / selected 文字 | `primary`      | 高亮底色上的文字用 primary |
| Button fill 背景           | `primary-fade` | 填充按鈕的底色             |
| Button fill 文字           | `primary`      | 填充按鈕的文字色           |
| 進度條 / Slider 軌道       | `primary`      | 已完成/活躍部分            |
| Tag / Chip 底色            | `{type}-fade`  | 根據 type 決定的淡底色     |
| Tag / Chip 文字            | `{type}`       | 與底色對應的全彩文字       |

**口訣**：

> - `primary` = 焦點邊框、選中標記、進度指示、高亮容器內的文字
> - `primary-fade` = 高亮容器的背景

---

## 文字色彩

### 角色劃分

| 角色                   | UnoCSS class        | 使用場景                                            |
| ---------------------- | ------------------- | --------------------------------------------------- |
| 一般文字               | `text-text.base`    | 選項文字、標籤、內容、表格儲存格                    |
| 低強調文字             | `text-text.primary` | placeholder、次要說明、圖示預設色                   |
| 低強調文字（替代寫法） | `text-text.base/60` | opacity 方式降低文字強調度                          |
| 高亮文字               | `text-primary`      | hover / selected 狀態下的文字                       |
| 互動強調 / 高亮        | `text-primary`      | 可點擊連結、選中指示、hover / selected 狀態下的文字 |

### ❌ 禁止事項

- **不要** 使用 Tailwind 預設灰階：`text-gray-500`, `text-gray-700`, `text-stone-*` 等
- **不要** 使用硬編碼色值：`color: #6b7280`, `text-[#374151]`
- **不要** 使用 `text-white`（以免在主題切換時失效，使用 `text-text.base` 或自適應 token）
- **不要** 使用 `text-mauve11` 等第三方 palette 名稱

---

## 邊框

### 規範

| 屬性         | 標準值                     | 說明                             |
| ------------ | -------------------------- | -------------------------------- |
| 預設邊框色   | `border-border.base`       | 所有可輸入元件、容器             |
| 預設邊框寬度 | `border`（1px）            | 輸入框、選單、卡片               |
| 強調邊框寬度 | `border-2`                 | Dialog type 指示條、特殊強調     |
| 圓角         | `rounded-md`（6px）        | 輸入框、按鈕、下拉選單           |
| Focus 邊框色 | `border-primary`           | 獲得焦點時                       |
| Focus ring   | `ring-2 ring-primary.fade` | Select / TimePicker 等可展開元件 |
| 分隔線色     | `bg-border.base`           | 以 1px 高度 div 呈現             |
| Error 邊框色 | `border-status.danger`     | 表單驗證失敗                     |

### 邊框聲明模式

對於表單輸入元件，統一使用以下模式：

```postcss
/* 預設狀態 */
@apply border border-solid border-border.base rounded-md;

/* Focus 狀態 */
&:focus,
&--focused {
  @apply border-primary outline-none;
}

/* 可展開元件的 Focus（Select, DatePicker, TimePicker） */
&--open {
  @apply border-primary ring-2 ring-primary.fade;
}

/* Error 狀態 */
&--error {
  @apply border-status.danger;
}
```

### ❌ 禁止事項

- **不要** 使用 Tailwind 預設色：`border-gray-300`, `border-stone-700`
- **不要** 使用硬編碼色值：`border-[#e5e7eb]`
- **不要** 混用 hyphen 和 dot notation：用 `border-border.base` 而非 `border-border-base`

---

## 背景

| 角色          | UnoCSS class            | 使用場景                    |
| ------------- | ----------------------- | --------------------------- |
| 組件背景      | `bg-bg.primary`         | 輸入框、下拉選單面板、彈窗  |
| 頁面/區域背景 | `bg-bg.secondary`       | 次要區域、disabled 元素底色 |
| 互動高亮背景  | `bg-primary.fade`       | hover / selected 選項       |
| 狀態填充背景  | `bg-status.{type}.fade` | 通知、Tag、Badge            |

### ❌ 禁止事項

- **不要** 使用 `bg-white`, `bg-gray-50`
- **不要** 使用硬編碼 `rgba(0, 0, 0, 0.4)`（用 `bg-bg.primary/40` 或定義新 token）
- **不要** 使用 hyphen notation：用 `bg-bg.primary` 而非 `bg-bg-primary`

---

## 間距 (Spacing)

| Token              | 值   | 建議用途                    |
| ------------------ | ---- | --------------------------- |
| `--sh-spacing-xs`  | 4px  | 緊湊間隙（icon 與文字間距） |
| `--sh-spacing-sm`  | 8px  | 小元件內距、項目間距        |
| `--sh-spacing-md`  | 12px | 標準內距（輸入框 padding）  |
| `--sh-spacing-lg`  | 16px | 區塊間距、Dialog padding    |
| `--sh-spacing-xl`  | 24px | 大區塊間距                  |
| `--sh-spacing-2xl` | 32px | 頁面級間距                  |

---

## 圓角 (Border Radius)

| Token              | 值     | 用途                                     |
| ------------------ | ------ | ---------------------------------------- |
| `--sh-radius-none` | 0px    | 無圓角                                   |
| `--sh-radius-sm`   | 4px    | 小元件（Tag、Chip）                      |
| `--sh-radius-md`   | 6px    | **標準**（輸入框、按鈕、卡片、下拉選單） |
| `--sh-radius-lg`   | 8px    | 大容器（Dialog）                         |
| `--sh-radius-xl`   | 12px   | 特殊裝飾                                 |
| `--sh-radius-full` | 9999px | 圓形（Badge dot、完全圓角按鈕）          |

**慣例**：大多數組件使用 `rounded-md` 作為預設圓角。

---

## 字體大小 (Font Size)

| Token                | 值   | 用途                               |
| -------------------- | ---- | ---------------------------------- |
| `--sh-font-size-xs`  | 12px | 輔助說明、Badge、下拉群組標題      |
| `--sh-font-size-sm`  | 14px | **標準**（輸入框、選項、按鈕文字） |
| `--sh-font-size-md`  | 16px | 標題層級內文                       |
| `--sh-font-size-lg`  | 18px | 小標題                             |
| `--sh-font-size-xl`  | 20px | Dialog 標題                        |
| `--sh-font-size-2xl` | 24px | 大型標題                           |

---

## 組件尺寸 (Component Size)

| Token                    | 值   | 用途                                  |
| ------------------------ | ---- | ------------------------------------- |
| `--sh-component-size-xs` | 24px | 迷你按鈕                              |
| `--sh-component-size-sm` | 30px | 小型輸入框 / 按鈕                     |
| `--sh-component-size-md` | 36px | **標準**高度（Input, Select, Button） |
| `--sh-component-size-lg` | 42px | 大型元件                              |
| `--sh-component-size-xl` | 48px | 超大元件                              |

使用 `sh-size-{sm|md|lg}` shortcut 可同時設定高度、字體、padding。

---

## UnoCSS Class 書寫規範

### Dot Notation（強制）

Shelter UI 使用**點號分隔** (`.`) 來對應巢狀 token：

```
✅ text-text.base         → var(--sh-text-base)
✅ border-border.base     → var(--sh-border-base)
✅ bg-bg.primary          → var(--sh-bg-primary)
✅ bg-primary.fade        → var(--sh-primary-fade)
✅ ring-primary.fade      → var(--sh-primary-fade)

❌ text-text-base          ← hyphen notation，不要使用
❌ bg-bg-primary           ← 同上
❌ border-border-base      ← 同上
```

### 動態 Shortcut

按鈕和狀態變體使用 `sh-{variant}-{type}` 格式：

```
sh-fill-primary     → 填充按鈕
sh-ghost-primary    → 幽靈按鈕
sh-text-primary     → 純文字按鈕
sh-outline-primary  → 線框按鈕
sh-dashed-primary   → 虛線按鈕
sh-bordered-primary → 帶框按鈕
```

Type 映射：`default`, `primary`, `success`, `warning`, `danger`, `info`

---

## 互動元件狀態模式

所有可互動元件應實現以下狀態一致性：

### 表單輸入元件 (Input, Select, Textarea, NumberInput, DatePicker, TimePicker)

| 狀態        | 邊框                   | 背景              | 文字                        |
| ----------- | ---------------------- | ----------------- | --------------------------- |
| 預設        | `border-border.base`   | `bg-bg.primary`   | `text-text.base`            |
| Hover       | `border-border.base`   | `bg-bg.primary`   | `text-text.base`            |
| Focus       | `border-primary`       | `bg-bg.primary`   | `text-text.base`            |
| Disabled    | `border-border.base`   | `bg-bg.secondary` | `text-text.base opacity-60` |
| Error       | `border-status.danger` | `bg-bg.primary`   | `text-text.base`            |
| Placeholder | —                      | —                 | `text-text.primary`         |

### 下拉選項 (Select option, ContextMenu item, DatePicker cell)

| 狀態                | 背景              | 文字                       |
| ------------------- | ----------------- | -------------------------- |
| 預設                | `transparent`     | `text-text.base`           |
| Hover / Highlighted | `bg-primary.fade` | `text-primary`             |
| Selected / Checked  | `bg-primary.fade` | `text-primary`             |
| Selected / Checked  | `bg-primary.fade` | `text-primary` opacity-50` |

### 按鈕 (Button)

使用 `sh-{variant}-{type}` shortcut 系統，無需手動組合。

---

## 浮層 / 彈出面板

適用於：Popover, Select dropdown, ContextMenu, DatePicker panel, TimePicker panel, Tooltip

| 屬性    | 標準值                                   |
| ------- | ---------------------------------------- |
| 背景    | `bg-bg.primary`                          |
| 邊框    | `border border-solid border-border.base` |
| 圓角    | `rounded-md`                             |
| 陰影    | `shadow-lg`                              |
| z-index | 確保 `z-[30]` 以上                       |

```postcss
/* 浮層標準模式 */
@apply bg-bg.primary border border-solid border-border.base rounded-md shadow-lg;
```

---

## 分隔線

| 屬性         | 標準值                           |
| ------------ | -------------------------------- |
| 顏色         | `bg-border.base`（用背景色模擬） |
| 高度（水平） | `h-[1px]`                        |
| 寬度（垂直） | `w-[1px]`                        |

---

## Transition / 動畫

所有互動元件應使用統一的 transition：

```postcss
@apply transition-all duration-300 ease-in-out;
/* 或使用 shortcut */
@apply sh-interactive;
```

---

## Checklist：新增組件前的自檢

在新增或修改組件時，請檢查以下項目：

- [ ] 所有色彩是否使用 design token（無硬編碼 hex / Tailwind 預設色）
- [ ] 文字色使用 `text-text.base`（一般）或 `text-text.primary`（低強調）
- [ ] 邊框使用 `border-border.base`，focus 時 `border-primary`
- [ ] 背景使用 `bg-bg.primary`（主背景）/ `bg-bg.secondary`（次背景）
- [ ] 高亮選項使用 `bg-primary.fade text-primary`
- [ ] 圓角使用 `rounded-md`（除非有特殊設計需求）prim
- [ ] 使用 dot notation（`.`）而非 hyphen notation（`-`）
- [ ] 浮層面板有 `border border-solid border-border.base shadow-lg`
- [ ] 有 disabled 狀態且使用 `sh-disabled` 或 `opacity-60 cursor-not-allowed`
- [ ] transition 使用 `sh-interactive` 或等效的 `transition-all duration-300`
