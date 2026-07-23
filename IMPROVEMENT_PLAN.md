# Shelter UI 改善計畫（v3.0 Roadmap）

> 最後更新：2026-07-22
> 依據：2026-07-22 全庫一致性稽核（API 一致性 / 主題系統 / 結構型別 / 文件測試 四面向）
> 目標：拉近與 naive-ui、element-plus、primevue 等成熟框架的一致性與完成度差距

## 如何使用這份文件

- 這份文件是**唯一的改善追蹤來源**：規範決策（D1–D10）一經寫入即為定案，後續開發（含 AI 協作）不再重新討論；要改決策就改這份文件。
- 各 Phase 的工作項目使用 checkbox 追蹤，完成即勾選。
- Phase 0–2 不破壞公開 API，可隨時發佈；**Phase 3 集中所有 breaking changes，一次以 v3.0.0 發佈**。
- 標記說明：`[BREAKING]` = 破壞公開 API、`[BUG]` = 現狀是壞的、`[DX]` = 開發者體驗。

---

## 一、現況診斷摘要

落差不在組件數量（44 個），而在四個層面：

1. **沒有被遵守的 API 規範** — size 有四套值、v-model 統一未完成（Checkbox/Radio 仍用 `modelValue`）、語意色 prop 混用 `type`/`color` 且值混用 `danger`/`error`/`normal`、事件 payload 不一致。根因：`instructions/component.instructions.md` 本身已過期（仍教 `modelValue`）。
2. **主題系統只有半套** — token 管線（`themes/default.ts` → `core/theme-utils.ts` → `baseline.css` + UnoCSS theme）設計良好，但缺 shadow / z-index / motion / typography 類別；無深淺色機制；`themePrefix` 功能實際無效。
3. **發佈品質沒有機制把關** — 匯出/註冊清單漂移（StatusTag、UploadZone）、`./preset` 子路徑壞掉、版本號四處不一致、components-catalog.json 記載不存在的組件、測試覆蓋率約 2%。
4. **功能缺口** — 無 Form（驗證）、無 Table、無 i18n、部分手刻組件有無障礙硬傷。

---

## 二、規範決策（Design Decisions）

以下為定案，Phase 1 會將其寫入規範文件，Phase 3 依此機械式套用到所有組件。

### D1. Size 尺寸

- 統一為 `'small' | 'medium' | 'large'`，預設 `'medium'`。
  - 理由：`medium` 明確表達尺寸語意（`default` 與「預設值」概念混淆）；未來可向 `componentSize` token 的 xs–xl 擴充 `'tiny'`/`'huge'`。
- 所有互動型組件**必須**提供 `size` prop：Button、Input、Textarea、Select、NumberInput、Switch、Checkbox、Radio、DatePicker、TimePicker、Pagination、PinInput、Slider、Tag、UploadZone。
- 純數字尺寸僅允許用於圖形類（Badge 字級、Spin/Spinner 直徑），且 prop 名改用 `iconSize`/`diameter` 等明確名稱時再議，現階段維持 `size?: number` 但需在 types 註解說明單位。

### D2. 語意色（semantic type）

- prop 名統一為 **`type`**，值統一為 `'default' | 'primary' | 'info' | 'success' | 'warning' | 'danger'`。
  - Notification 的 `'error'` → `'danger'`；MessageBox 的 `'normal'` → `'default'`。
  - Slider 的 `color`（值域與 type 相同）→ 改名 `type`。
- **`color` 保留給自由色值**（`string`，接受 hex/css color）：Progress、Badge、Divider、Splitter 維持 `color?: string` 用途不變。
- `type` 不得再承載非語意色意義：Button 的 `type: 'text'` 從 union 移除，文字按鈕改由既有的 `text: boolean` 表達（與 `ghost`/`dashed`/`outline` 同層級的樣式修飾）。樣式修飾 boolean 互斥優先序：`text > ghost > dashed > outline > 實心`，寫入規範。
- ScrollArea 的 `type`（捲軸行為）改名為 `visibility` 或 `scrollbar`（Phase 3 定案時擇一），避免與語意色 `type` 撞名。

### D3. v-model

- 一律 `value` / `update:value`，實作一律使用 `defineModel<T>('value')`（不再手寫 props + emit）。
- 尚未合規者：Checkbox、Radio（`modelValue`）、Spin（`show`）、DatePicker 的面板開合（`open`，次要 model 亦改為 `v-model:open` → 保留名稱但補進規範：**次要狀態 model 允許具名**，如 `v-model:open`，但主值一律 `value`）。
- 移除 Dialog / Popover / Tooltip 的冗餘 `valueChange` 事件（與 `update:value` 重複）。

### D4. 事件

- `change` 一律帶**值**（不帶原生 Event）；需要原生事件時另開 `focus`/`blur`/`click` 等並帶原生 Event 物件。
  - 修正對象：Checkbox、Radio（目前發 raw `Event`）。
- 表單類組件標配 `focus`、`blur`：補齊 Switch、NumberInput、PinInput、Slider。
- Emits 型別一律使用 named-tuple 語法：`{ change: [value: string] }`；淘汰 call-signature 寫法。
- emit 參數名一律 `e`（淘汰 DatePicker/TimePicker 系的 `event`）。

### D5. 通用 props 矩陣

| prop | 適用範圍 | 備註 |
|---|---|---|
| `disabled` | 所有互動組件 | 補：Chip |
| `loading` | Button、Select、Switch、StatusTag、確認類 | `confirmLoading`（AlertDialog）、`submitLoading`（ChatInput）改名為 `loading`（作用於主要動作鈕） |
| `readonly` | 所有輸入類 | 補：NumberInput、PinInput、Checkbox、Radio、Switch、Slider |
| `clearable` | Input、Select、NumberInput、DatePicker、TimePicker、Textarea | DatePicker/TimePicker 目前有 clear 事件但無 prop |
| `placeholder` | 文字輸入類 | PinInput 的遮罩字元改名 `mask`；Calendar/DatePicker 的顯示月份改名 `defaultPlaceholderDate`（避免同名異義） |
| `block` | Button、Select 等 | 新增；ActiveButtonGroup 的 `fullWidth` 改名 `block` |
| `bordered` / `rounded` | 外觀類 | 拼字統一：`borderd` → `bordered`（Button、Pagination）；`visable` → `visible`（SplitterResizeHandle） |

### D6. 檔案結構與程式風格

每個組件資料夾**必備**：

```
ComponentName/
  ├── index.ts        # barrel：匯出組件（SH 前綴名）與所有 public types
  ├── index.vue       # 主實作（多組件資料夾可用 ComponentName.vue + index.ts 聚合）
  ├── types.ts        # Props / Emits / Slots / Expose
  └── demos/          # 文檔範例，命名 XxxDemo.vue
```

- barrel 一律匯出 **SH 前綴名**（如 `SHRadioGroup`），根目錄 `src/index.ts` 不再做 import 改名。
- props 一律 `withDefaults(defineProps<XxxProps>(), {...})`，型別從 `types.ts` 匯入（禁止 inline 重複宣告，修正 ChatMessage、ConfigProvider、Spinner）。
- slots 有定義 `XxxSlots` 者必須以 `defineSlots<XxxSlots>()` 接上。
- 共享狀態一律使用 `InjectionKey<T>` + 專屬 `context.ts`（淘汰 `provide('addButton', ...)` 魔法字串）。
- 跨組件共用邏輯放 `src/composables/`（新建）與 `src/utils/`：`useComponentSize`、`resolveTypeVar`（type → CSS 變數）、`statusIconMap`（合併三份 `_icon-map.ts`）。
- import 規則：組件內部引用同資料夾檔案用相對路徑，跨資料夾一律 `@/` alias。
- 引號遵守 Prettier 設定（single quote），修正 Carousel/Radio/Checkbox/Pagination/Divider barrel 的雙引號。

### D7. 樣式與 Token

- **禁止 raw Tailwind 調色**（`bg-white`、`text-gray-*`、`ring-blue-*`…），一律語意 token；`dark:` variants 在深淺色機制上線前禁止使用（現有 9 檔為死碼）。
- 新增 token 類別（進 `themes/default.ts` 管線）：
  - `zIndex`：`dropdown: 1000, sticky: 1020, overlay: 1040, modal: 1050, popover: 1060, tooltip: 1070, notification: 1080`（參考 element-plus/bootstrap 階層；解決 Tooltip 在 Dialog 內被蓋住的 bug）
  - `shadow`：`sm / md / lg / focus`
  - `motion`：`duration.{fast: 150ms, normal: 250ms, slow: 400ms}`、`easing.{standard, enter, leave}`
  - `focus ring`：`--sh-focus-ring`（取代 14 處複製的 `box-shadow: 0 0 0 2px var(--sh-primary-fade)`）
- `<style>` 區塊統一 `lang="postcss"` + `scoped`（現況約 16 檔未 scoped、10 檔無 lang）。
- 色彩 utility 寫法統一 dot-notation（`bg-bg.primary`），淘汰混用的 `text-text-base`。
- 任意值 `[NNpx]` 原則上禁止，改用 spacing/componentSize token；例外需註解理由。
- 動畫 keyframes 集中定義（合併 Popover/Tooltip/ContextMenu 三份 slide 系列與 Dialog 的 fade）。
- `uno.config.ts` 改為直接 `import { presetShelterUI } from './src/preset'`，消滅與 preset.ts 的雙份維護（兩者已 drift）。

### D8. 深淺色模式

- 策略：`data-theme="light" | "dark"`（掛在 `:root` 或 ConfigProvider 容器），baseline.css 輸出兩組變數；現有調色盤即為 dark，新增 light palette 於 `themes/default.ts`。
- UnoCSS `darkMode` 設定對齊 `data-theme`，屆時才重新允許 `dark:` variants。

### D9. themePrefix

- **移除**。組件內 181 處寫死 `--sh-`、class 寫死 `sh-*`、UnoCSS 映射為建置期固定，真正支援前綴的成本遠高於效益，且現狀是「文件承諾但無效」的假功能。
- ConfigProvider 保留主題覆寫職責，並改為：作用於自身容器（scoped，支援巢狀多主題）、`watch` themeConfig（reactive）、覆寫範圍從 11 個色值擴大到全部 token 類別。

### D10. 文件與 Demo 慣例

- 全部遵守 `docs/WRITING_GUIDE.md`：繁體中文、必填 front matter `title:`、`## API` + `### Props / Events / Slots / Methods`（英文 heading）。
- demo 檔名統一 `XxxDemo.vue`（現況 79:70 多數派；文檔 `<BasicDemo />` 使用處語意較清楚）。
- 文檔範例一律用 `<Demo>` wrapper（修正 dialog.md / alert-dialog.md / spin.md）。
- 內建文字（按鈕文案、空狀態等）在 i18n 上線前：**一律英文**，並提供 prop 覆寫。

---

## 三、Phase 0 — 硬傷修復（non-breaking，最優先）

> 全部為修 bug 或移除死碼，不影響既有正確用法，完成後可直接發 patch 版。

### 匯出與發佈

- [x] [BUG] `src/index.ts`：`SHStatusTag` 加入全域註冊物件 `components`（目前 `app.use()` 後無法使用）
- [x] [BUG] `src/index.ts`：`SHUploadZone` 加入具名匯出區塊（目前 `import { SHUploadZone }` 失敗）
- [x] [DX] `src/index.ts` 重構為單一組件清單，同時產生註冊物件與（維持靜態的）具名匯出對照；新增 vitest 測試驗證「具名匯出 ⊆ 註冊清單」防再漂移
- [x] [BUG] 移除公開 API 的 `sayHello()`
- [x] [BUG] 版本號單一來源：`src/index.ts` 的 `version` 改由 `package.json` 匯入（vite `define` 或直接 import），移除寫死的 `'1.1.1'`
- [x] [BUG] 修復 `./preset` 子路徑：確認 `vite.config.ts` 產出 `dist/preset.js.js` + `dist/preset.d.ts` 與 package.json exports 一致，重新建置驗證
- [x] [BUG] `package.json` 新增 `prepublishOnly: "npm run lib:build"`，杜絕發佈過期 dist（現有 dist 缺 ChatInput、safelist utilities）
- [x] [DX] `vite-plugin-dts` include 範圍排除 `src/App.vue`、`src/main.ts`、`src/views/**`、`src/components/Notification/TestApp.vue`（目前 dev 腳手架 d.ts 洩漏進 dist）

### 資料同步

- [x] [BUG] `components-catalog.json`：`FileUpload` 更正為 `UploadZone`、`MentionableTextarea` 更正為 `MentionableTextArea`、`_meta.importBase` 改為 `@proladon/shelter-ui`、`_meta.version` 對齊 package.json
- [x] [BUG] `README.md`：`https://your-website.com` 佔位連結換成實際文檔網址（GitHub Pages `/shelter-ui/`）
- [x] [DX] `TODO.md`：勾掉已完成項（Pagination、Divider、PinInput、NumberInput、BaseContainer），或整份併入本計畫後刪除 — 採後者，已併入本文件 Phase 4 並刪除 `TODO.md`

### 死碼清理

- [x] 刪除 `src/components/Spinner/index_bit.vue`（零引用）
- [x] 刪除 `src/components/Notification/TestApp.vue`（開發測試頁）
- [x] 清除 `Spinner/index.vue` 內註解掉的死分支、`Splitter/index.vue:28`、`vite.config.ts` 的註解殘留
- [x] 刪除 docs 已發佈產物中的孤兒頁面來源確認（`border-container` / `editable-area` / `code-editor*`，重建 docs 即可消除） — 已確認原始碼中無此三頁，無需額外動作

### Phase 0 執行中發現的新問題（非計畫原列項目）

- [ ] [BUG] `pnpm exec vue-tsc -b` 目前因既有（與本次改動無關）問題而失敗，導致 `lib:build`／`prepublishOnly` 會擋下發佈：
  1. `Calendar/index.vue`、`DatePicker/index.vue` 與 reka-ui 之間 `@internationalized/date` 型別不相容（根目錄與 `reka-ui/node_modules` 下各存在一份，`pnpm.overrides` 未能完全 dedupe）
  2. `Splitter/SplitterPanel.vue` 的 `onResize` prop 型別與 reka-ui 期望的簽名（`prevSize: number | undefined`）不符
  - `vite build` 本身可正常完成（`vite-plugin-dts` 僅回報診斷、不中斷建置），但嚴格的 `vue-tsc -b` 會擋下 CI／發佈。已建立背景任務追蹤修復。

---

## 四、Phase 1 — 規範文件更新（規範先行）

> 一致性問題的根因是規範過期。先讓「權威文件」正確，之後人與 AI 都照著寫。

- [x] 重寫 `instructions/component.instructions.md`：
  - [x] v-model 範例改為 `defineModel<T>('value')`（目前仍教 `modelValue` + call-signature emits，是 straggler 的直接根因）
  - [x] 寫入 D1–D7 全部決策（size 值域、type 值域、事件規則、通用 props 矩陣、檔案結構、樣式規則）
  - [x] 範例組件完整示範：types.ts（named-tuple emits + Slots）、index.vue（defineModel + defineSlots）、index.ts barrel
- [x] 更新 `instructions/cmpExport.instructions.md`：加入「新組件必須同時進入註冊清單、具名匯出、型別匯出、components-catalog.json、docs」的 checklist
- [x] 更新 `SKILL.md` 與 `components-catalog.json` 產出流程說明（若 catalog 為手工維護，建立「從 types.ts 生成」的腳本列入 Phase 4 待辦）—— SKILL.md 已修正 Phase 0 catalog 改名遺留的過期敘述；「從 types.ts 生成」腳本已確認列於 Phase 4
- [x] `docs/WRITING_GUIDE.md` 補上 demo 命名（`XxxDemo.vue`）與 `<Demo>` wrapper 規則（D10）
- [x] 新增 `instructions/theming.instructions.md`：token 使用規則（禁 raw 色、禁任意 px、focus-ring/z-index/motion token 用法）

---

## 五、Phase 2 — Token 與主題系統補全（non-breaking）

> 在既有 `default.ts → theme-utils → baseline.css + preset` 管線上加類別，成本低、全庫受益。

- [x] `themes/default.ts` + `core/theme-utils.ts` 新增 token 類別：`zIndex`、`shadow`、`motion`（duration/easing）、`focusRing`（D7 值域）
- [x] 產出對應 CSS 變數（`--sh-z-*`、`--sh-shadow-*`、`--sh-duration-*`、`--sh-ease-*`、`--sh-focus-ring`）與 UnoCSS theme 映射
- [x] 以 `--sh-focus-ring` 取代 14 處複製的 focus box-shadow（Input、NumberInput、Select×2、Radio、Checkbox、InputGroup、MentionableTextArea、PinInput、Switch、Textarea、TimePicker、DatePicker）—— 實測 13 處，已全數取代
- [x] 以 `--sh-z-*` 取代所有硬編碼 z-index（Notification 9999、Select `z-[9999]`、Dialog z-99/z-50、Tooltip/Popover z-50、ContextMenu z-30、DatePicker z-30、MentionableTextArea 50），驗收：Dialog 內開 Tooltip/Popover/Select 均正確顯示於上層 —— 已於瀏覽器實測：Dialog z=1050 > Overlay z=1040，Popover/Select/DatePicker 皆設為 popover(1060)、Tooltip 為 tooltip(1070)、Notification 為 notification(1080)，皆高於 modal(1050)
- [x] 動畫 keyframes 抽成共用（uno preset 或共用 css），合併 Popover/Tooltip/ContextMenu/Dialog 的重複定義；duration/easing 改用 motion token —— 採共用 css（經 generateBaselineCss 輸出，UnoCSS preflights 在此 lib build 管線下不可靠，已改用更保險的路徑並雙重保留）；同時修正 ContextMenu 動畫實際上因缺少對應 keyframes 定義而從未生效的問題
- [x] 清除 54 處 raw Tailwind 色 → 語意 token（重災區：Checkbox、CheckboxGroup、Carousel、Radio、Switch、ScrollArea、Progress）；同步移除 9 檔死的 `dark:` variants
- [x] 清理 67 處 `[NNpx]` 任意值（重災區：ContextMenu ×12、NumberInput ×6、Progress ×5、MessageBox ×5）改用 token
- [x] `uno.config.ts` 改為 import `src/preset.ts`（消滅雙份維護與既有 drift：`text-[length:var()]` vs `text-[var()]`）—— 驗證發現移除隱含預設 preset 會讓全庫基礎 utility 消失，已改為明確帶入 `presetUno()` + `presetShelterUI()`
- [x] ConfigProvider 改造（D9）：scoped 容器變數注入、`watch` themeConfig、覆寫範圍擴至全部 token；`themePrefix` 標記 deprecated（實際移除在 Phase 3）
- [x] 深淺色模式（D8）：新增 light palette、`data-theme` 雙組變數輸出、UnoCSS darkMode 設定；docs 站加切換驗證 —— 已於瀏覽器實測：VitePress 深色切換鈕會同步 `data-theme`，`--sh-bg-primary`/`--sh-text-base`/`--sh-primary` 等變數即時切換（UnoCSS 本身無 darkMode 設定選項，改採「顏色一律走 CSS 變數」的方式達成，元件不需要 `dark:` variant）
- [x] 修正 1 處寫死 hex：`ChatInput/index.vue` 的 `color: #fff`
- [x] 修正 class 拼字 `sh-context-menu-sub-conent` → `sh-context-menu-sub-content`

### Phase 2 執行中發現的新問題（非計畫原列項目）

- [ ] `docs/.vitepress/config.ts` 先前缺少 `__SHELTER_UI_VERSION__` 的 vite `define`（Phase 0 的 version 單一來源改動未同步到這裡），導致整個 docs 站在 dev/build 時 `src/index.ts` 模組求值時丟出 `ReferenceError` 而整頁靜默無法掛載（無任何 console 錯誤，難以察覺）。已修正並在瀏覽器實測確認修復。
- [ ] `TimePicker/index.vue` 有兩個相同的 `.sh-time-picker__button--primary` selector，後者完全覆蓋前者，導致「清除」與「確認」兩顆按鈕原本會顯示成一模一樣的樣式。已將「清除」按鈕改回獨立的 `--secondary` 樣式。
- [ ] `Select/index.vue` 有一個孤立/疑似殘留的 `border-border-1` class（不對應任何 token），已移除。
- [ ] `Progress/index.vue` 有 `border-muted`，`muted` 並非本庫定義的 token，已改為 `border-border.base`。

---

## 六、Phase 3 — 組件全面對齊（BREAKING，v3.0.0）

> 依 Phase 1 規範機械式掃過 44 個組件。每改一個組件：套用規範 → 補行為測試 → 更新文檔與 catalog。建議按「表單類 → 回饋類 → 佈局類」順序分批 PR。

### 3a. API 對齊（全組件套用 D1–D5）

- [x] [BREAKING] size 統一 `small/medium/large`：改 Spin（確認 medium 已合規，型別與預設值皆無需改動）、PinInput、UploadZone（`sm/md/lg` →全名，型別別名保留）、Button/Pagination/NumberInput/Slider/Progress（`default` → `medium`）—— Slider 順手修正一個既存 bug（`--small` 尺寸從未設定 track 高度）
- [x] [BREAKING] 為缺 size 的表單組件補上：Input、Textarea、Select、Switch、DatePicker、TimePicker（Checkbox/Radio 已於 v-model 重構時提前補上）。額外依 D1 補上清單外漏列的 **Tag**（D1 決策本身有列，執行清單 3a 原文漏寫）。Input/Select/DatePicker/TimePicker 採 `--sh-component-size-*` token 三階；Switch/Tag 比照 Checkbox/Radio 前例採寫死 Tailwind 三階（Switch 另外算出 checked 狀態 thumb 位移的等比例縮放值）。順手清掉 `docs/.vitepress/theme/components/Demo.vue` 裡一段目標 class 早已不存在的死 CSS（`.sh-input--large/--small` 等）
- [x] [BREAKING] v-model 補完：Checkbox、Radio 改 `defineModel('value')`；Spin `show` → `value` —— 額外發現並解決 value 值域衝突（Checkbox/Radio 原有代表「選項本身值」的 `value` prop 改名為 `nativeValue`，比照 Vuetify 相同情境的解法），並補上 `readonly`
- [x] [BREAKING] 語意色統一（D2）：Notification `error`→`danger`（含 `useNotification().error()` 方法同步更名為 `.danger()`）、MessageBox `normal`→`default`、Slider `color`→`type`、Button union 移除 `'text'`、ScrollArea `type` 改名為 `visibility`
- [x] [BREAKING] Checkbox/Radio 的 `change` 改發值；移除 Dialog/Popover/Tooltip 的 `valueChange`（AlertDialog 已同步改聽 `update:value`，順手移除一併死掉的 `DialogProps.onValueChange`）
- [x] [BREAKING] 拼字修正：`borderd`→`bordered`（Button、Pagination）、`visable`→`visible`（Splitter）、slot `removeicon`→`remove-icon`（Chip）
- [x] [BREAKING] 通用 props 補齊與改名（D5）：AlertDialog `confirmLoading`→`loading`、ChatInput `submitLoading`→`loading`、ActiveButtonGroup `fullWidth`→`block`（原 prop 是從未接線的死碼，此次補上實作而非單純改名）、DatePicker/TimePicker 補 `clearable`（預設 `false`，屬於真正的行為破壞——兩者原本清除按鈕無條件顯示，升級後需明確加上 `clearable` 才會出現，須寫進 MIGRATION.md）、DatePicker `defaultPlaceholder`→`defaultPlaceholderDate`（僅 DatePicker 本身改名，`Calendar` 保持不動——Calendar 沒有文字 placeholder，不存在同名異義問題，改了只會徒增遷移成本）、readonly 補 Switch/Slider/PinInput（NumberInput 其實已透過 reka-ui 內建繼承而合規，執行清單原文誤植；PinInput 因 reka-ui 內部 passive v-model 架構，簡單 guard 無法真正攔截 backspace/delete/paste，改用 capture 階段攔截、已逐案實測驗證四種互動皆正確阻擋）、focus/blur 補 NumberInput/Slider/PinInput/Switch（Switch 是特例：原本靠 Vue attrs fallthrough 就能運作，宣告具名 emit 反而會讓 fallthrough 失效，須額外手動轉發，已實測確認未產生回歸）—— Chip 補 `disabled`、Button 新增 `block` 已於拼字修正/語意色批次提前完成。**跳過原計畫的 PinInput `placeholder`→`mask`**：調查後發現 `mask: boolean`（密碼樣式開關）早已存在且用途完全不同，`placeholder` 本身其實就是正常的空格提示字元，不是遮罩字元，原計畫描述的前提本身有誤，故不執行這項改名
- [x] [BREAKING] 移除 `themePrefix` prop（D9）—— 同步移除所有相關文件（getting-started.md、config-provider.md 含過期的 PrefixDemo.vue、SKILL.md），並修正 Phase 2 遺留的 bug：ConfigProvider 的 `ThemeVarsConfig` 改為巢狀 `{ colors: {...} }` 結構後，`ConfigProvider/demos/BasicDemo.vue` 仍用舊的扁平結構寫死顏色，型別已對不上，一併修正

### Phase 3a 執行中發現的新問題（非計畫原列項目）

- [ ] Slider 的 `SliderThumb` 一直都有套用 `sh-slider__thumb--${type}` class，但從未有對應的 CSS 規則（只有 range/fill 會變色，thumb 本身不會）。與本次改名無關的既存缺陷，已記錄待補。
- [ ] `DialogEmits`/`PopoverEmits`/`TooltipEmits` 仍使用已淘汰的 call-signature 語法（`(e: 'update:value', value: boolean): void`），應改為 D4 規定的 named-tuple 語法。發現於移除 `valueChange` 時，非本次範圍。
- [ ] Chip 的 barrel（`index.ts`）未 `export * from './types'`，導致根目錄 `src/index.ts` 從未匯出 `ChipSlots`；`index.vue` 也從未呼叫 `defineSlots<ChipSlots>()`。發現於 slot 改名時，屬於 D6 結構對齊範疇，留給 Phase 3b。
- [x] `components-catalog.json` 的 Spin `size` prop 型別寫成 `string | number`（應為 `'small' | 'medium' | 'large' | number`），與原始碼 `types.ts` 不符，屬於既存 catalog drift（Spin 不在本次 size 改動範圍內才被順手發現）。已修正。
- [x] Tag 的 `type` 值域不符 D2：程式碼原本沒有 `'default'`，但文件（`docs/components/tag.md`）與 `components-catalog.json` 卻寫著一個從未真正實作過的 `'secondary'`（4 處 demo 範例、API 表、catalog 皆有）。已依 D2 補上真正的 `'default'`（沿用 StatusTag 的 `bg.secondary` + `text.base` 中性配色），並將文件/範例的 `'secondary'` 全部改為 `'default'`；同時發現 `Tag/index.vue` 有兩處重複的 CSS 規則（`.sh-tag--primary` 本體與 `.sh-tag--bordered` 內的 `&.sh-tag--primary` 各自重複宣告一次），已刪除重複、改為 `.sh-tag--default` 規則。未變動 Tag 既有預設值（仍是 `'primary'`，非 `'default'`）——是否統一預設值是更大的行為決策，留待未來再議。
- [ ] `src/components/Select/index.vue` 的 `.sh-select-option`、`.sh-select-group-title` 各自重複宣告一次（近似 Tag 的重複 CSS 問題）。發現於補 size prop 時，屬於既存缺陷、非本次範圍，已 spawn_task 記錄（`task_754e93e0`）。
- [ ] `src/components/MentionableTextArea/index.vue` 複製了 Textarea 重構前的舊版 CSS（含同樣寫死的 `padding: 12px`），且沒有 `size` prop，與 Textarea 已分岔。發現於補 Textarea size 時，已 spawn_task 記錄（`task_5e514f07`）。
- [ ] `ActiveButtonGroup` 的 `showIndicator` prop 與 `fullWidth` 一樣是從未接線的死碼（`.sh-active-button-indicator` 目前無條件渲染，不受此 prop 控制）。發現於補 `block` 時，刻意不擴大範圍處理，留待未來。
- [ ] `src/components/Select/index.vue` 有一段抽取具名 emits interface（`SliderEmits` 型態的手法）會讓 `@vue/compiler-sfc` 丟出「Unresolvable type reference」並讓整個 docs 站（因 `src/index.ts` 全域註冊機制）掛掉的編譯器怪癖，已在 Slider 身上發現並改回 inline emits 解決；已 spawn_task 記錄（`task_551d6baf`），供 Phase 3b（D6 emits 具名化）小心處理，避免重蹈覆轍。
- [ ] Vite dev server 有一個過期轉換快取的怪癖：只修改 `types.ts` 而不順手重存對應的 `index.vue`，新增的 props/emits 有機率被靜默排除在編譯後的 `props`/`emits` 之外（無錯誤訊息）。已 spawn_task 記錄（`task_65e6d1c8`），供後續各批次注意。
- [ ] Slider 在完全不受控（未綁定 `:value`/`v-model:value`）情境下，reka-ui 的 `passive: true` 內部 ref 可能讓新增的 `readonly` guard 出現短暫視覺漂移（受控用法下已實測確認 airtight）。已 spawn_task 記錄（`task_46da2444`），非本次文件化的主要使用情境，暫不深究。

### 3b. 結構對齊（D6）

- [x] 為 10 個無 barrel 組件補 `index.ts`：Badge、BaseContainer、Button、Dialog、EditableContainer、FlexContainer、Input、Popover、Spin、Tooltip；`src/index.ts` 改為一律從 barrel 匯入
- [x] barrel 匯出名統一 SH 前綴（Radio、Splitter、Pagination、Divider；InputGroup 原本就已合規）—— Splitter 順便處理了 `SHSplitter`/`SHSplitterGroup` 重複問題（見下）
- [x] 根目錄補匯出遺漏型別：Carousel（含原本連 barrel 自己都漏掉的 `CarouselSlots`）、Radio、Checkbox 的 Props/Emits/Option 系列（這兩者原本根目錄完全沒有型別匯出，非僅部分缺漏）
- [x] 合併三份 `_icon-map.ts` → `src/utils/statusIcons.ts`（保留三者原本互不相同的 mapping，包括 AlertDialog 的 danger 圖示與 Notification/MessageBox 不同——已標記為待決策問題，未強行統一）；新增 `useComponentSize`、`resolveTypeVar` composables 並套用到 Button、StatusTag（色彩變數）與 Input、Textarea、Select、DatePicker、NumberInput、Switch、PinInput、Slider、Tag（尺寸 class）
- [x] provide/inject 改 `InjectionKey<T>` + `context.ts`——**執行時發現 ConfigProvider、DatePicker 目前根本沒有用 provide/inject**（ConfigProvider 在 D9 改版後改用 CSS 變數機制，DatePicker 純 props 組合），原計畫項目對這兩者已過時；實際只有 ActiveButtonGroup、NotificationProvider 兩者真的需要轉換，皆已完成
- [x] Spinner 轉正式內部組件：補 `types.ts`（`SpinnerProps`）、改 `withDefaults(defineProps<SpinnerProps>(), ...)`，barrel 補上型別匯出並讓 6 個消費者（ChatInput、StatusTag、Select、Spin、AlertDialog、Button）改從 barrel 匯入而非直接匯入 `.vue` 檔；維持純內部組件，不從套件根目錄匯出
- [x] 處理 `SHSplitter` 與 `SHSplitterGroup` 近重複：保留 Group/Panel/Handle 組合為權威，`SHSplitter` 標記 `@deprecated`（非移除）；順便修掉 `SHSplitter` 未用 `useForwardPropsEmits` 導致 `color` 等 prop 被靜默丟棄的既存 bug；7 個 demo 與 `splitter.md` 全部改用 `SHSplitterGroup`
- [x] props 定義風格修正：ChatMessage（Props 與 Emits 皆為未使用的第二份定義，屬於真實 drift 風險，已修正）、ConfigProvider（原本沒有 `ConfigProviderProps`，屬於新增而非修正 drift）改從 types.ts 匯入；15+ 個有 `XxxSlots` 未接線的組件補 `defineSlots`（含 UploadZone 原本用內嵌重複型別、Input 原本 `defineSlots` 沒對應 named type 兩個變體問題）；Chip 額外修正 barrel 未 `export * from './types'` 的既存缺陷（Phase 3a 就已發現，這裡一併處理）；順手修正 BlockArea/Chip 兩處 `XxxSlots` 型別與實際模板用法不符的問題（BlockArea 的 icon/text 應為可選、Chip 的 keydownCallback 應為 `KeyboardEvent`）
- [x] 統一 `<style lang="postcss" scoped>`：修正約 14 個檔案缺 `scoped`、5 個缺 `lang="postcss"`；AlertDialog、InputGroup 因程式碼內已有明確註解說明其 unscoped 是刻意設計（跨 Teleport／slot 邊界），僅補 `lang`、刻意不加 `scoped`；色彩 utility 統一 dot-notation（12 檔、13 處，另有 Chip demo 一處 `text-primary-contrast` 經查證不是任何 notation 下的合法 token，已保留不動並標記待釐清）；順手刪除 Spin 空的 `<style>` 區塊誤判（實際上非空，未刪除）
- [x] Emits 具名 tuple 化：實際涵蓋約 20 個組件（遠多於原計畫僅列的 Dialog/Popover/Tooltip 3 個），事後以 `grep "(e: '|(event: '" src/components/**/types.ts` 全庫複查確認零殘留

### Phase 3b 執行中的重大意外：org API 額度上限

執行本批次時，8 個平行 agent 中有 5 個因組織的 Anthropic API 月度額度上限被觸發而中途失敗（非工作內容本身的錯誤）。已完成的 3 個（新增 10 個 barrel、barrel 慣例遷移＋Splitter 整併、icon-map 合併）完全沒受影響；另外 5 個雖中途中斷，但事後逐一比對 `git diff`／重新執行 `pnpm test:run`＋`vue-tsc -b`（注意：`vue-tsc --noEmit -p tsconfig.json` 這個先前一直在用的驗證指令其實是 no-op，因為根目錄 tsconfig.json 只有 `references` 沒有 `files`，必須用 `-p tsconfig.app.json` 或 `-b` 才會真的檢查——這是本批次意外發現的既存驗證盲點，值得所有未來批次注意）＋乾淨 `vite build`後確認：實際程式碼異動大多已落地，只有 Chip 的 D6 修正完全沒開始、`ConfigProvider`/`StatusTag` 各有一項未完成收尾（`ConfigProviderProps` 型別已新增但 `index.vue` 未接上；`StatusTag` 未换成 `resolveTypeVar`）、`Progress` 的 `defineSlots` 觸發了一個原本就存在但沒人發現的型別缺漏（`text` slot 不在 `ProgressSlots` 裡）。以上缺口皆由我直接手動補完（未再另外派工 agent，以免又撞上額度上限），並重新跑過完整驗證（測試、`vue-tsc -b`、`vite build`、瀏覽器抽查）確認無誤。

### 3c. 測試（與 3a/3b 同批進行）

- [x] 每個組件至少一個行為測試（渲染 + v-model 往返 + disabled 阻擋），對齊既有範本 `DatePicker/__tests__/DatePicker.test.ts`——最終共 43 個測試檔、404 個測試全數通過，`vue-tsc -b` 全庫零錯誤
- [x] 高風險邏輯優先深測：Pagination 省略號演算法、Notification 佇列與 max 淘汰、UploadZone 檔案驗證（maxSize/maxCount）、Select 過濾與 multiple、Checkbox indeterminate/group、Input clearable/word-limit
- [ ] CI（GitHub Actions）：`vue-tsc + vitest run + vite build` 三關卡（留給 Phase 3d/Batch 6）

### Phase 3c 測試撰寫時發現並修復的既存 bug（非本次改名/結構調整範圍，但嚴重度足以現在修）

撰寫行為測試的過程中意外揪出一批「功能其實沒真的運作」的既存缺陷，其中幾個嚴重度高到值得現在直接修，而非只留 spawn_task：

- [x] **CheckboxGroup 完全無法正確顯示勾選狀態，取消勾選也無法從陣列移除**（嚴重）：`Checkbox.vue` 的 `isChecked` 與 `CheckboxGroup.vue` 的 `updateOption` 對「勾選狀態該用布林還是陣列表示」認知不一致，導致兩個方向都壞掉。修法：`CheckboxGroup.vue` 改用 `v-model:value` 直接綁定到每個子 `SHCheckbox`（比照 `RadioGroup.vue` 既有的正確寫法），移除死碼 `isOptionChecked`/`updateOption`。順便修了一個獨立的小問題：單獨使用、初始值為 `true` 的 `Checkbox`在首次掛載時未同步原生 `.checked`（`immediate: true` 的 watcher 搶在 template ref 綁定前執行），改用 `onMounted` 補一次初始同步。
- [x] **Radio 的 `readonly` 完全不會阻擋互動**（中高）：原生 `readonly` 屬性對 `<input type="radio">` 無效，且 Vue 的 `vModelRadio` 指令會獨立於元件自己的 `onChange` guard 之外直接同步 v-model。修法：在 `readonly`（或 `disabled`）時於 `@click` 呼叫 `event.preventDefault()`，在原生 `change`/v-model 同步發生前就攔截。
- [x] **ConfigProvider 掛載時傳入的靜態 `themeConfig` 完全不會套用**（中高，影響最常見用法）：`watch(..., { immediate: true })` 在 `containerRef` 綁定前就執行，`applyTheme` 因此 no-op；只有之後改變 `themeConfig` 才會生效。修法：拿掉 watcher 的 `immediate`，改在 `onMounted` 另外呼叫一次 `applyTheme`（已驗證 `flush: 'post'` 對「immediate 執行」本身沒有作用，Vue 的 immediate watcher 是同步執行，不受 flush 排程影響）。
- [x] **Popover 開啟後幾個 tick 內會自己關閉**（中高）：`PopoverContent` 缺少 `@open-auto-focus.prevent`（`DatePicker` 對同一個 reka-ui 元件早就有這個 guard，Popover 沒有）。已補上。
- [x] **TimePicker 的 `disabled`/`readonly` 完全不會阻擋下拉選單開啟**（中）：綁定 `SHPopover` 用的是不存在的 `open` prop（實際是 `value`/`update:value`），導致開合狀態完全不受控、也繞過了原本就沒寫的 disabled/readonly guard。修法：改綁 `value`/`update:value`，並比照 `DatePicker` 的 `handleOpenUpdate` 加上開啟前的 guard。
- [x] **Tooltip 的 `disabled` 只是裝飾用，不會真的阻擋 hover/focus 開啟**（中）：只設定在 `TooltipTrigger` 上的原生 HTML 屬性，從未接到 reka-ui `TooltipRoot` 真正的 `disabled` context。已補上 `:disabled` 到 `TooltipRoot`。
- [x] **ContextMenu 的 disabled 選項在 JS 層仍會觸發 `item-click`**（低中）：`handleItemClick` 從未檢查 `item.disabled`，只靠 CSS `pointer-events: none` 擋互動，程式化點擊可以繞過。已補上 guard。

以下屬於嚴重度較低或範圍模糊、決定留在 backlog（皆已 spawn_task 記錄，未在本批次修）：Progress 圓角進度條無視 `max`、Badge 的 0/undefined 顯示不對稱、SplitterPanel 的 `padding` prop 為死碼、MessageBox 的 `icon` prop 的 `string` 半邊型別被忽略。（Select 的 `filterMethod`/`noMatchText` 顯示邏輯已在 Phase 3d 文件同步時一併查出根因並修正，見下；`remove-tag` 死碼仍待查。）

### 3d. v3.0.0 發佈

- [x] 撰寫 `MIGRATION.md`（v2 → v3 對照表：所有改名 prop/事件/值域，含 Phase 3d 過程中新發現需要移除的死碼 prop `TimePicker.showSeconds`）
- [x] 同步更新：全部 docs 頁 API 表、components-catalog.json、SKILL.md——三批平行 Explore agent 對全部 ~49 個組件逐一比對原始碼/docs/catalog，共抓出 60+ 處落差（詳見下方「Phase 3d 文件同步發現的問題」），全數以 8 個平行 agent 修正
- [x] CI（GitHub Actions）：新增 `.github/workflows/ci.yml`，在 push（main/dev）與 PR 時跑 `yarn test:run` + `yarn build`（`vue-tsc -b && vite build`），與既有 `publish.yml`/`deploy.yml` 一致採用 yarn（本庫 `pnpm-lock.yaml`／`yarn.lock` 並存，但既有自動化都用 yarn，故不引入第三種慣例）
- [ ] 發佈 v3.0.0 — **保留給使用者明確確認，禁止自行執行**

### Phase 3d 文件同步發現的問題（非改名/結構調整範圍，依嚴重度挑選處理方式）

文件/catalog 稽核意外挖出大量「文件宣稱有效但實際上是假的」案例，嚴重度足以現在直接修（而非只留 backlog）的項目：

- [x] **Switch 完全沒有 default slot**：文件、catalog、甚至官方 BasicDemo 本身都示範了 `<SHSwitch>啟用</SHSwitch>` 這種寫法，但元件模板裡從來沒有 `<slot />`，範例裡的文字其實一直被靜默丟棄。已補上（比照 Checkbox/Radio 用 `<label>` 包住控制項+文字的寫法，順便讓點擊標籤文字也能觸發切換）。
- [x] **Popover 的 `close` slot 程式碼其實還在，只是被註解掉**：解除註解後直接可用，不需要重寫。
- [x] **Select 的 `focus`/`blur`/`toggleDropdown` 方法、`prefix`/`suffix` slot 都是文件與 SKILL.md 宣稱存在、實際上沒有 `defineExpose`/`<slot>` 的假功能**：已全部實作（比照 Input 現有的 focus/blur 慣例）。順便發現並修正一個附帶 bug：`SelectEmits` 宣告的 `focus`/`blur` 事件也從未真的發出過。
- [x] **Select 的 `filterMethod` 是死碼、`noMatchText` 顯示邏輯有 bug**：根因是 `v-model:search-term` 綁在 `ComboboxRoot` 上一個實際上不存在的 prop（reka-ui 沒有這個 prop），導致我們自己的 `searchTerm`/`filteredOptions` 從未真正跟著輸入更新，畫面上看到的篩選其實全部來自 reka-ui 內部另一套機制。修法：`v-model` 直接綁到 `ComboboxInput`，並在 `ComboboxRoot` 加上 `ignore-filter` 避免雙重過濾。
- [x] **ContextMenu 的 `triggerClass` prop 是死碼**：宣告了但從未套用到 trigger 元素上，已補上（與現有 hardcoded class 合併而非取代）。
- [x] **FlexContainer 的實際執行邏輯比自己對外匯出的型別支援更多值**（`align`/`justify` 額外支援 `flex-end`/`space-between`，`gap` 額外支援 `string`）：`index.vue` 原本自己另外宣告一份更寬鬆的 inline 型別，沒有從 `types.ts` 匯入，導致 TS 使用者對著公開型別寫 `align="flex-end"` 會被型別檔擋下，即使實際上完全能運作。已將 `types.ts` 的匯出型別放寬到與實際行為一致，並讓 `index.vue` 改為匯入它，一併修正了一個 D6「props 應從 types.ts 匯入」的既存違規。
- [x] **TimePicker 的 `minTime`/`maxTime`/`disabledTimes` 是文件宣稱有效的死碼**（從未真正過濾任何時間選項）：已從機器可讀的 catalog 完全移除（避免 AI agent 誤用），文件保留但加註「尚未實作」，並 spawn_task 記錄為 Phase 4 候選功能（比照 DatePicker 的 `minValue`/`maxValue`/`isDateUnavailable` 實作）。
- [x] **TimePicker 的 `showSeconds` 已 deprecated 且完全無效**（從未給預設值、元件邏輯也從未讀取）：直接移除此 prop（已寫入 MIGRATION.md）。
- [x] **Notification 的文件完全沒有 API 章節**（沒有 props/methods/types 表格），catalog 的 `useNotification()` 方法清單也少了 3 個方法（`create`/`destroy`/`destroyAll`）、回傳型別全部寫成 `void`（實際是 `string`）、還有一個憑空捏造、名稱不存在於原始碼的 `NotificationOptions` 型別（含錯誤的必填/選填欄位、不該出現的 `placement` 欄位）。已全部重寫。
- [x] **Carousel 的 catalog `subComponents` 是空的**：已補上 `CarouselItem`/`CarouselNavigation`/`CarouselIndicators`，並比照 `ActiveButtonGroup`/`InputGroup` 的慣例為三者各自新增獨立的 catalog 條目。
- [x] **Splitter 的 catalog 完全沒有 `SplitterGroup` 條目**（`SHSplitterGroup` 是新的推薦寫法，但 catalog 只有舊的 `Splitter`/`SplitterPanel`/`SplitterResizeHandle`）：已新增，並在 `Splitter` 條目補上 deprecated 說明。
- [x] **Divider 的 `color` 預設值在文件和 catalog 都寫錯**（寫死 `#e5e7eb`，實際是 `var(--sh-text-base)`，兩者在 light/dark theme 下解析出來的顏色完全不同——`#e5e7eb` 其實是另一個不相關 token `--sh-border-base` 的值，確認是複製貼上的錯誤）：已修正文件、catalog、demo 裡的過期註解。

以下是本次稽核發現、但決定不在此批次實作、僅留 backlog 記錄的假功能/死碼（皆已 spawn_task）：Select 的 `maxSelections`（需要真正的選擇數量限制邏輯與 UI 回饋）、Select 的 `readonly`（完全是死碼）、TimePicker 的 `prefix`/`suffix` slot（版面已經有圖示與清除按鈕，非小改動）、CarouselNavigation/CarouselIndicators 未渲染 Carousel 轉發下來的 slot 內容、SplitterGroup 的 `color` prop 是死碼、Dialog `trigger` slot 暴露的 `Dialog` scope prop 意圖不明（無任何 demo 使用）。

---

## 七、Phase 4 — 功能與生態補全（v3.x 逐步出貨）

### 生態整合 [DX]

- [ ] `GlobalComponents` 型別增強：產出 `declare module 'vue' { interface GlobalComponents { SHButton: ... } }`，全域註冊用法獲得模板型別提示
- [ ] 提供 `unplugin-vue-components` resolver（`SH` 前綴規律，實作簡單）並寫入 README
- [ ] components-catalog.json 改為腳本從 `types.ts` 自動生成，加入 CI 驗證同步

### 無障礙修補（依嚴重度排序）

- [ ] UploadZone：觸發區補 `role="button"` + `tabindex="0"` + Enter/Space keydown（目前鍵盤完全無法上傳）；移除鈕補 `aria-label`
- [ ] Pagination：`nav` 補 `aria-label`、當前頁補 `aria-current="page"`、icon-only 狀態補 accessible name
- [ ] TimePicker：改以 reka-ui Popover 重構（對齊 DatePicker 的 a11y 水準）或補齊 aria/keyboard
- [ ] Notification：容器補 `role="alert"` / `aria-live="polite"`
- [ ] ActiveButtonGroup：補 `role="tablist"/"tab"` + `aria-selected` + 方向鍵導航
- [ ] Carousel：補方向鍵導航與非當前 slide 的 `aria-hidden`
- [ ] MessageBox（inline alert）：danger/warning 補 `role="alert"`

### i18n

- [ ] 設計 locale 系統：ConfigProvider 增加 `locale` prop，內建 `en-US`、`zh-TW` 字典；涵蓋 Pagination 按鈕（目前寫死中文）、UploadZone 文案（目前寫死英文）、Select noData/noMatch 預設值、AlertDialog 確認/取消
- [ ] Carousel aria-label 系列納入字典

### 新組件（依依賴順序）

- [ ] **Form / FormItem**：validation（rules、async validator、狀態注入 Input/Select 等的 error 顯示）— 最大功能缺口，需先設計 `useFormItem` 注入協議
- [ ] **Table / DataTable**：基本欄位、排序、與 Pagination 整合（第一版不做虛擬捲動）
- [ ] 其餘 TODO 清單重新排序與納管（原 `TODO.md`，已併入本文件並刪除）：Drawer、Skeleton、Empty、Breadcrumb、TreeView、TextEditor、MarkdownEditor、ToggleGroup、ActionButton、OptionToggle、DayRangeFilters、DayTimeline、MarkdownViewer、Timer
- [ ] Chip 補「已勾選（checked）狀態」樣式（原 TODO.md 項目）

### 文件整頓

- [ ] `dialog.md` 簡體 → 繁體改寫
- [ ] `notification.md` 補完整 API 章節（Provider props、`useNotification()` 方法、NotificationConfig 選項表）
- [ ] 14 頁補 front matter；四種 heading 風格統一為 WRITING_GUIDE 規範
- [ ] demo 檔名統一 `XxxDemo.vue`；刪除 4 個孤兒 demo（`Progress/demos/Basic.vue`、`Spin/demos/*` 接回文檔或刪除、`StatusTag/demos/Pulse.vue`）
- [ ] docs 套件名範例統一 `@proladon/shelter-ui`（notification.md 等處誤用 `shelter-ui`）

---

## 八、驗收標準（Definition of Done）

| # | 標準 | 驗證方式 |
|---|---|---|
| 1 | 任一組件的 size / type / v-model / 事件簽名與規範一致 | 抽查 + catalog 生成腳本比對 |
| 2 | `import { SH* }`、`app.use()` 全域註冊、型別匯出三者對所有公開組件皆可用 | vitest 匯出一致性測試 |
| 3 | Dialog 內的 Tooltip / Popover / Select / Notification 疊層正確 | e2e 或 demo 頁人工驗證 |
| 4 | 元件庫在非 UnoCSS 專案中僅靠 `dist/index.css` 即完整樣式 | 建一個 plain Vite 消費者專案煙霧測試 |
| 5 | 深淺色切換下無 raw 色殘留造成的對比錯誤 | docs 站全組件頁雙主題巡檢 |
| 6 | 每個公開組件 ≥ 1 個行為測試，CI 綠燈 | vitest coverage 報告 |
| 7 | 鍵盤可完成：上傳、翻頁、tab 切換、輪播導航 | 手動 a11y 巡檢 |
| 8 | docs 全頁符合 WRITING_GUIDE（front matter、heading、繁中） | 文檔 lint 腳本（可選） |

---

## 九、v3.0 Breaking Changes 總表（供 MIGRATION.md 起草）

| 類別 | v2 | v3 |
|---|---|---|
| size 值 | `default` / `sm` `md` `lg` | `small` / `medium` / `large` |
| Notification type | `error` | `danger` |
| MessageBox type | `normal` | `default` |
| Slider 語意色 | `color` | `type` |
| Button 文字按鈕 | `type="text"` 或 `text` | 僅 `text` |
| Checkbox/Radio v-model | `v-model`（modelValue） | `v-model:value` |
| Spin 顯示 | `v-model:show` | `v-model:value` |
| Checkbox/Radio change | `(event: Event)` | `(value)` |
| Dialog/Popover/Tooltip | `valueChange` 事件 | 移除（用 `update:value`） |
| Button/Pagination | `borderd` | `bordered` |
| SplitterResizeHandle | `visable` | `visible` |
| Chip slot | `removeicon` | `remove-icon` |
| AlertDialog | `confirmLoading` | `loading` |
| ChatInput | `submitLoading` | `loading` |
| ActiveButtonGroup | `fullWidth` | `block` |
| PinInput | `placeholder`（遮罩字元） | `mask` |
| ConfigProvider | `themePrefix` | 移除 |
| ScrollArea | `type` | `visibility`（暫定） |
| Splitter | `SHSplitter` 包裝 | deprecated，改用 `SHSplitterGroup` 組合 |

---

## 附錄：稽核原始發現對照

- API 一致性細節（size 四套值分佈、v-model stragglers、事件差異的逐檔位置）：見各組件 `types.ts`；關鍵檔 `Checkbox/index.vue:49`、`Radio/index.vue:41`（無名 defineModel）、`Spin/types.ts:5`、`Button/types.ts:17`（borderd）、`Splitter/types.ts:18`（visable）
- 匯出漂移：`src/index.ts:67-121`（註冊物件，缺 StatusTag）vs `:308-363`（具名匯出，缺 UploadZone）；`:128`（sayHello）、`:294`（版本寫死）
- 主題：`src/themes/default.ts`（token 全集）、`src/core/theme-utils.ts`（衍生管線）、`src/preset.ts` vs `uno.config.ts`（雙份 drift 點：size 字級與 border 色 arbitrary value 寫法）
- z-index 現值：Notification 9999（`NotificationProvider.vue:108`）、Select `z-[9999]`、Dialog z-99/overlay z-50、Tooltip/Popover z-50、ContextMenu z-30 混 `z-[30]`、DatePicker z-30
- focus-ring 14 處複製：Input:193、NumberInput:73、Select:371/385、Radio:89、Checkbox:168、InputGroup:44、MentionableTextArea:277、PinInput:75、Switch:41、Textarea:184、TimePicker:756、DatePicker:293
- 文件：`docs/components/dialog.md`（簡體）、`docs/components/notification.md`（無 API 表、誤用套件名）、front matter 缺漏 14 頁清單見 WRITING_GUIDE 稽核
- 測試現況：僅 `src/components/DatePicker/__tests__/DatePicker.test.ts`（6 案例，品質良好，可作範本）
