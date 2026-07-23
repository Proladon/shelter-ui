# 遷移指南：v2 → v3

v3.0.0 依 [`IMPROVEMENT_PLAN.md`](./IMPROVEMENT_PLAN.md) 的規範決策（D1–D10）對全庫做了一次性的破壞性對齊。本文件列出所有需要調整消費端程式碼的變更。非破壞性的內部重構（barrel 匯出機制、emits 型別語法、樣式檔案結構）不影響套件公開 API，不列於此。

## 如何使用本文件

- 依元件分類，每個變更標明「舊 → 新」。
- 純新增（不影響既有用法）以「新增」標記，不需要修改既有程式碼即可繼續運作。
- 標記「行為變更」的項目沒有改 prop 名稱，但預設行為改變了，容易被忽略，請特別留意。
- 標記「錯誤修正」的項目是 v2 沒有真正生效的功能，在 v3 修正後才開始如預期運作——嚴格來說不是「破壞」，但如果你的程式碼曾經依賴舊的（錯誤的）行為，升級後表現會不同。

---

## 全域

### `SHConfigProvider` 的 `themePrefix` prop 已移除（D9）

`themePrefix` 在 v2 是「文件承諾但實際無效」的假功能（組件內部 181 處寫死 `--sh-` 前綴、class 寫死 `sh-*`，這個 prop 從未真正改變過任何輸出）。v3 移除此 prop。

```diff
- <SHConfigProvider :theme-prefix="'my-'" :theme-config="customTheme">
+ <SHConfigProvider :theme-config="customTheme">
```

客製主題色維持用 `theme-config`（型別 `ThemeVarsConfig` / `DeepPartial<DesignTokens>`），CSS 變數前綴本身不可自訂。`ConfigProvider` 現在可以巢狀使用，覆寫範圍僅限於自身容器。

---

## Size 尺寸統一（D1）

全部收斂為 `size?: 'small' | 'medium' | 'large'`，預設 `'medium'`。

### 值域改名

| 元件 | 舊值域 | 新值域 |
| --- | --- | --- |
| Button、Pagination、NumberInput、Slider、Progress | `'small' \| 'default' \| 'large'` | `'small' \| 'medium' \| 'large'` |
| PinInput、UploadZone | `'sm' \| 'md' \| 'lg'` | `'small' \| 'medium' \| 'large'` |

```diff
- <SHButton size="default">按鈕</SHButton>
+ <SHButton size="medium">按鈕</SHButton>

- <SHPinInput size="md" />
+ <SHPinInput size="medium" />
```

Spin 的 `size` 型別（`'small' | 'medium' | 'large' | number`）本來就合規，無需變更。

### 新增 `size`（previously 沒有這個 prop）

`Input`、`Textarea`、`Select`、`Switch`、`DatePicker`、`TimePicker`、`Tag` 新增 `size` prop，預設 `'medium'`，不影響現有用法（未指定 `size` 時行為與 v2 相同）。

---

## 語意色統一（D2）

| 元件 | 舊值 | 新值 |
| --- | --- | --- |
| `SHNotification` / `notify({ type })` | `'error'` | `'danger'` |
| `useNotification().error()` | 方法名 `error` | 方法名 `danger` |
| `SHMessageBox` `type` | `'normal'` | `'default'` |
| `SHSlider` | `color` prop | 改名為 `type` prop（值域不變，額外支援 `'default'`） |
| `SHButton` `type` | 含 `'text'` | 移除 `'text'`，改用既有的 `text: boolean` prop 表達文字按鈕 |

```diff
- notify({ type: 'error', message: '發生錯誤' })
+ notify({ type: 'danger', message: '發生錯誤' })

- const { error } = useNotification()
- error({ message: '發生錯誤' })
+ const { danger } = useNotification()
+ danger({ message: '發生錯誤' })

- <SHSlider color="success" />
+ <SHSlider type="success" />

- <SHButton type="text">文字按鈕</SHButton>
+ <SHButton text>文字按鈕</SHButton>
```

### `SHScrollArea` 的 `type` 改名為 `visibility`

避免與 D2 語意色 `type` 撞名（ScrollArea 的 `type` 原本控制的是捲軸顯示行為，與顏色無關）。

```diff
- <SHScrollArea type="hover">...</SHScrollArea>
+ <SHScrollArea visibility="hover">...</SHScrollArea>
```

---

## v-model 統一（D3）

全部收斂為 `value` / `update:value`。

| 元件 | 變更 |
| --- | --- |
| `SHCheckbox`（單獨使用） | `modelValue`/`update:modelValue` → `value`/`update:value` |
| `SHRadio`（單獨使用） | `modelValue`/`update:modelValue` → `value`/`update:value` |
| `SHSpin` | `show` prop → `value`（v-model） |

```diff
- <SHCheckbox v-model="checked" />
+ <SHCheckbox v-model:value="checked" />

- <SHRadio v-model="picked" value="a" />
+ <SHRadio v-model:value="picked" native-value="a" />

- <SHSpin :show="loading">內容</SHSpin>
+ <SHSpin v-model:value="loading">內容</SHSpin>
```

`SHCheckboxGroup`、`SHRadioGroup` 原本就是 `v-model:value`，不受影響。

### Checkbox / Radio：原本的 `value` prop 改名為 `nativeValue`

這是 v-model 收斂到 `value` 之後必然的連鎖變更：Checkbox/Radio 原本用 `value` 表達「這個選項在原生表單/群組中的識別值」，與新的 model 值撞名。比照 Vuetify 對同樣情境的解法，識別值改名為 `nativeValue`。

```diff
  <SHCheckboxGroup v-model:value="checkedList">
-   <SHCheckbox value="a">選項 A</SHCheckbox>
+   <SHCheckbox native-value="a">選項 A</SHCheckbox>
  </SHCheckboxGroup>

  <SHRadioGroup v-model:value="picked">
-   <SHRadio value="a">選項 A</SHRadio>
+   <SHRadio native-value="a">選項 A</SHRadio>
  </SHRadioGroup>
```

---

## 事件變更（D4）

### Checkbox / Radio 的 `change` 事件改發值

v2 發出原生 `Event`；v3 改發目前的值（Checkbox 為 `boolean | any[]`、Radio 為選項值），與其他表單元件的 `change` 事件慣例一致。

```diff
- <SHCheckbox @change="(e: Event) => console.log((e.target as HTMLInputElement).checked)" />
+ <SHCheckbox @change="(checked: boolean) => console.log(checked)" />
```

### `Dialog` / `Popover` / `Tooltip` 移除 `valueChange` 事件

與 `update:value` 重複，一律改聽 `update:value`。`AlertDialog` 也同步改為監聽 `update:value`。

```diff
- <SHDialog @value-change="handleChange" />
+ <SHDialog @update:value="handleChange" />
```

### 新增 `focus` / `blur` 事件

`NumberInput`、`Slider`、`PinInput`、`Switch` 新增 `focus`/`blur`，純新增，不影響既有用法。

---

## 通用 props 矩陣（D5）

| 元件 | 舊 | 新 |
| --- | --- | --- |
| `SHAlertDialog` | `confirmLoading` | `loading` |
| `SHChatInput` | `submitLoading` | `loading` |
| `SHActiveButtonGroup` | `fullWidth`（v2 其實是從未接線的死碼，設定它沒有任何效果） | `block`（v3 真正實作，會讓群組撐滿容器寬度） |
| `SHDatePicker` | `defaultPlaceholder` | `defaultPlaceholderDate` |

```diff
- <SHAlertDialog :confirm-loading="deleting" />
+ <SHAlertDialog :loading="deleting" />

- <SHChatInput :submit-loading="sending" />
+ <SHChatInput :loading="sending" />

- <SHActiveButtonGroup full-width>
+ <SHActiveButtonGroup block>
```

### `SHDatePicker` / `SHTimePicker` 新增 `clearable`（行為變更，預設 `false`）

**這是最容易被忽略的破壞性變更之一**：v2 的清除按鈕只要有值就無條件顯示；v3 新增 `clearable` prop 統一預設為 `false`（與 `SHInput`/`SHSelect` 既有慣例一致）。**升級後若沒有加上 `clearable`，清除按鈕會直接消失**，需要手動加回來。TimePicker 額外受影響的還有下拉面板內原本無條件顯示的「清除」按鈕，`clearable=false` 時同樣會一併隱藏。

```diff
- <SHDatePicker v-model:value="date" />
+ <SHDatePicker v-model:value="date" clearable />

- <SHTimePicker v-model:value="time" />
+ <SHTimePicker v-model:value="time" clearable />
```

### 新增 `readonly`

`Switch`、`Slider`、`PinInput` 新增 `readonly`，純新增。

### `SHTimePicker` 的 `showSeconds` prop 已移除

`showSeconds` 在 v2 已標記 `@deprecated`（建議改用 `second`），但實際上從未在 `withDefaults` 中給定預設值，元件邏輯也從未讀取它——是一個文件宣稱有效、實際上完全無效的死碼 prop。v3 移除此 prop，統一使用 `second` 控制秒數欄位的顯示。

```diff
- <SHTimePicker :show-seconds="false" />
+ <SHTimePicker :second="false" />
```

---

## 拼字修正

| 元件 | 舊 | 新 |
| --- | --- | --- |
| `SHButton`、`SHPagination` | `borderd` | `bordered` |
| `SHSplitterResizeHandle` | `visable` | `visible` |
| `SHChip` slot | `removeicon` | `remove-icon` |

```diff
- <SHButton borderd>按鈕</SHButton>
+ <SHButton bordered>按鈕</SHButton>

- <SHSplitterResizeHandle visable />
+ <SHSplitterResizeHandle visible />
```

---

## 結構調整（D6）

### `SHSplitter` 標記為 deprecated（仍可使用，未移除）

`SHSplitter` 是 `SHSplitterGroup` 的薄包裝，長期維護兩份幾乎重複的 API 沒有必要。v3 保留 `SHSplitter` 繼續運作（修正了一個既存 bug：`color` 等 prop 之前會被靜默忽略，現在會正確轉發），但建議改用 `SHSplitterGroup` + `SHSplitterPanel` + `SHSplitterResizeHandle` 組合，這也是本庫文件與範例現在採用的寫法。

```diff
- <SHSplitter direction="horizontal">
-   <SHSplitterPanel>A</SHSplitterPanel>
-   <SHSplitterResizeHandle />
-   <SHSplitterPanel>B</SHSplitterPanel>
- </SHSplitter>
+ <SHSplitterGroup direction="horizontal">
+   <SHSplitterPanel>A</SHSplitterPanel>
+   <SHSplitterResizeHandle />
+   <SHSplitterPanel>B</SHSplitterPanel>
+ </SHSplitterGroup>
```

### 型別匯出補完（純新增，不影響既有用法）

套件根目錄新增了先前完全沒有匯出的型別：`CarouselProps`/`CarouselEmits`/`CarouselItem`/`CarouselSlots`/`CarouselNavigationProps` 等、`RadioProps`/`RadioGroupProps`/`RadioOption`/`RadioSlots`/`RadioEmits`/`RadioGroupEmits`、`CheckboxProps`/`CheckboxGroupProps`/`CheckboxOption`/`CheckboxSlots`/`CheckboxEmits`/`CheckboxGroupEmits`。若你先前透過內部路徑（如 `@proladon/shelter-ui/dist/components/Radio/types`）匯入這些型別繞過限制，現在可以直接從套件根目錄匯入。

---

## 錯誤修正（v2 沒有真正生效，v3 修正後才如預期運作）

以下項目沒有改變 API 名稱或型別，但 v2 的實際行為與文件承諾不符，v3 修正後行為才變得「正常」。如果你的程式碼曾經意外依賴舊的（錯誤的）行為，請重新測試。

- **`SHCheckboxGroup`**：v2 群組內的 checkbox 從不會正確顯示勾選狀態（無論實際狀態為何），取消勾選也從不會真的從綁定陣列移除該項目。v3 修正。
- **`SHRadio` 的 `readonly`**：v2 完全不會阻擋點擊（原生 `readonly` 對 radio input 無效，且 Vue 的 v-model 指令繞過了元件自己的守衛）。v3 修正。
- **`SHConfigProvider`**：v2 在掛載時直接傳入的**靜態** `theme-config` 會被靜默忽略，只有之後動態改變這個 prop 才會生效（最常見的用法完全沒用）。v3 修正，掛載時傳入即可正確套用。
- **`SHPopover`**：v2 開啟後幾個 tick 內會自己關閉（缺少必要的 auto-focus guard）。v3 修正。
- **`SHTimePicker` 的 `disabled`/`readonly`**：v2 完全不會阻擋下拉選單開啟。v3 修正。
- **`SHTooltip` 的 `disabled`**：v2 只是裝飾用的原生 HTML 屬性，不會真的阻擋 hover/focus 觸發顯示。v3 修正。
- **`SHContextMenu`**：v2 點擊 disabled 選項在 JS 層仍會觸發 `item-click`（只靠 CSS 視覺阻擋，看起來像擋住了但事件其實有發出）。v3 修正，disabled 選項不再發出任何事件。

---

## 已知但尚未修正的問題（backlog，非本次遷移範圍）

以下是撰寫測試過程中發現、但嚴重度或範圍不足以列入本次破壞性發佈的既存缺陷，供參考：

- `SHProgress` 的填充條視覺上無視 `max` prop（文字標籤有正確依 `max` 計算百分比，填充條沒有）。
- `SHSelect` 的 `filterMethod`、`readonly` prop 目前是死碼，設定它們沒有效果；篩選結果為空時 `noMatchText` 也不會正確顯示。
- `SHSplitterPanel` 的 `padding` prop 是死碼，設定它沒有視覺效果。
- `SHMessageBox` 的 `icon` prop 只接受 Component，傳入 `string`（如 SVG 字串）會被忽略。
- `SHBadge` 在完全未提供 `value` 時仍會渲染一個空白圓點（與 `value: 0` 明確顯示 "0" 的行為不對稱）。
- `SHTimePicker` 的 `minTime`、`maxTime`、`disabledTimes` prop 目前是死碼：型別已宣告，但元件邏輯完全未讀取，設定它們不會有任何時間篩選/限制效果。

這些項目已個別記錄為待辦事項，會在後續版本評估修正。
