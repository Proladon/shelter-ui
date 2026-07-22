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

- [ ] [BUG] `src/index.ts`：`SHStatusTag` 加入全域註冊物件 `components`（目前 `app.use()` 後無法使用）
- [ ] [BUG] `src/index.ts`：`SHUploadZone` 加入具名匯出區塊（目前 `import { SHUploadZone }` 失敗）
- [ ] [DX] `src/index.ts` 重構為單一組件清單，同時產生註冊物件與（維持靜態的）具名匯出對照；新增 vitest 測試驗證「具名匯出 ⊆ 註冊清單」防再漂移
- [ ] [BUG] 移除公開 API 的 `sayHello()`
- [ ] [BUG] 版本號單一來源：`src/index.ts` 的 `version` 改由 `package.json` 匯入（vite `define` 或直接 import），移除寫死的 `'1.1.1'`
- [ ] [BUG] 修復 `./preset` 子路徑：確認 `vite.config.ts` 產出 `dist/preset.js.js` + `dist/preset.d.ts` 與 package.json exports 一致，重新建置驗證
- [ ] [BUG] `package.json` 新增 `prepublishOnly: "npm run lib:build"`，杜絕發佈過期 dist（現有 dist 缺 ChatInput、safelist utilities）
- [ ] [DX] `vite-plugin-dts` include 範圍排除 `src/App.vue`、`src/main.ts`、`src/views/**`、`src/components/Notification/TestApp.vue`（目前 dev 腳手架 d.ts 洩漏進 dist）

### 資料同步

- [ ] [BUG] `components-catalog.json`：`FileUpload` 更正為 `UploadZone`、`MentionableTextarea` 更正為 `MentionableTextArea`、`_meta.importBase` 改為 `@proladon/shelter-ui`、`_meta.version` 對齊 package.json
- [ ] [BUG] `README.md`：`https://your-website.com` 佔位連結換成實際文檔網址（GitHub Pages `/shelter-ui/`）
- [ ] [DX] `TODO.md`：勾掉已完成項（Pagination、Divider、PinInput、NumberInput、BaseContainer），或整份併入本計畫後刪除

### 死碼清理

- [ ] 刪除 `src/components/Spinner/index_bit.vue`（零引用）
- [ ] 刪除 `src/components/Notification/TestApp.vue`（開發測試頁）
- [ ] 清除 `Spinner/index.vue` 內註解掉的死分支、`Splitter/index.vue:28`、`vite.config.ts` 的註解殘留
- [ ] 刪除 docs 已發佈產物中的孤兒頁面來源確認（`border-container` / `editable-area` / `code-editor*`，重建 docs 即可消除）

---

## 四、Phase 1 — 規範文件更新（規範先行）

> 一致性問題的根因是規範過期。先讓「權威文件」正確，之後人與 AI 都照著寫。

- [ ] 重寫 `instructions/component.instructions.md`：
  - [ ] v-model 範例改為 `defineModel<T>('value')`（目前仍教 `modelValue` + call-signature emits，是 straggler 的直接根因）
  - [ ] 寫入 D1–D7 全部決策（size 值域、type 值域、事件規則、通用 props 矩陣、檔案結構、樣式規則）
  - [ ] 範例組件完整示範：types.ts（named-tuple emits + Slots）、index.vue（defineModel + defineSlots）、index.ts barrel
- [ ] 更新 `instructions/cmpExport.instructions.md`：加入「新組件必須同時進入註冊清單、具名匯出、型別匯出、components-catalog.json、docs」的 checklist
- [ ] 更新 `SKILL.md` 與 `components-catalog.json` 產出流程說明（若 catalog 為手工維護，建立「從 types.ts 生成」的腳本列入 Phase 4 待辦）
- [ ] `docs/WRITING_GUIDE.md` 補上 demo 命名（`XxxDemo.vue`）與 `<Demo>` wrapper 規則（D10）
- [ ] 新增 `instructions/theming.instructions.md`：token 使用規則（禁 raw 色、禁任意 px、focus-ring/z-index/motion token 用法）

---

## 五、Phase 2 — Token 與主題系統補全（non-breaking）

> 在既有 `default.ts → theme-utils → baseline.css + preset` 管線上加類別，成本低、全庫受益。

- [ ] `themes/default.ts` + `core/theme-utils.ts` 新增 token 類別：`zIndex`、`shadow`、`motion`（duration/easing）、`focusRing`（D7 值域）
- [ ] 產出對應 CSS 變數（`--sh-z-*`、`--sh-shadow-*`、`--sh-duration-*`、`--sh-ease-*`、`--sh-focus-ring`）與 UnoCSS theme 映射
- [ ] 以 `--sh-focus-ring` 取代 14 處複製的 focus box-shadow（Input、NumberInput、Select×2、Radio、Checkbox、InputGroup、MentionableTextArea、PinInput、Switch、Textarea、TimePicker、DatePicker）
- [ ] 以 `--sh-z-*` 取代所有硬編碼 z-index（Notification 9999、Select `z-[9999]`、Dialog z-99/z-50、Tooltip/Popover z-50、ContextMenu z-30、DatePicker z-30、MentionableTextArea 50），驗收：Dialog 內開 Tooltip/Popover/Select 均正確顯示於上層
- [ ] 動畫 keyframes 抽成共用（uno preset 或共用 css），合併 Popover/Tooltip/ContextMenu/Dialog 的重複定義；duration/easing 改用 motion token
- [ ] 清除 54 處 raw Tailwind 色 → 語意 token（重災區：Checkbox、CheckboxGroup、Carousel、Radio、Switch、ScrollArea、Progress）；同步移除 9 檔死的 `dark:` variants
- [ ] 清理 67 處 `[NNpx]` 任意值（重災區：ContextMenu ×12、NumberInput ×6、Progress ×5、MessageBox ×5）改用 token
- [ ] `uno.config.ts` 改為 import `src/preset.ts`（消滅雙份維護與既有 drift：`text-[length:var()]` vs `text-[var()]`）
- [ ] ConfigProvider 改造（D9）：scoped 容器變數注入、`watch` themeConfig、覆寫範圍擴至全部 token；`themePrefix` 標記 deprecated（實際移除在 Phase 3）
- [ ] 深淺色模式（D8）：新增 light palette、`data-theme` 雙組變數輸出、UnoCSS darkMode 設定；docs 站加切換驗證
- [ ] 修正 1 處寫死 hex：`ChatInput/index.vue` 的 `color: #fff`
- [ ] 修正 class 拼字 `sh-context-menu-sub-conent` → `sh-context-menu-sub-content`

---

## 六、Phase 3 — 組件全面對齊（BREAKING，v3.0.0）

> 依 Phase 1 規範機械式掃過 44 個組件。每改一個組件：套用規範 → 補行為測試 → 更新文檔與 catalog。建議按「表單類 → 回饋類 → 佈局類」順序分批 PR。

### 3a. API 對齊（全組件套用 D1–D5）

- [ ] [BREAKING] size 統一 `small/medium/large`：改 Spin（medium 已合規但補 default 值確認）、PinInput、UploadZone（`sm/md/lg` →全名）、Button/Pagination/NumberInput/Slider/Progress（`default` → `medium`）
- [ ] [BREAKING] 為 8 個缺 size 的表單組件補上：Input、Textarea、Select、Switch、Checkbox、Radio、DatePicker、TimePicker（Input 已有現成 `.sh-input--large/--small` CSS 未接線）
- [ ] [BREAKING] v-model 補完：Checkbox、Radio 改 `defineModel('value')`；Spin `show` → `value`
- [ ] [BREAKING] 語意色統一（D2）：Notification `error`→`danger`、MessageBox `normal`→`default`、Slider `color`→`type`、Button union 移除 `'text'`、ScrollArea `type` 改名
- [ ] [BREAKING] Checkbox/Radio 的 `change` 改發值；移除 Dialog/Popover/Tooltip 的 `valueChange`
- [ ] [BREAKING] 拼字修正：`borderd`→`bordered`（Button、Pagination）、`visable`→`visible`（Splitter）、slot `removeicon`→`remove-icon`（Chip）
- [ ] [BREAKING] 通用 props 補齊與改名（D5）：`confirmLoading`/`submitLoading`→`loading`、`fullWidth`→`block`、PinInput `placeholder`→`mask`、DatePicker/TimePicker 補 `clearable`、readonly 補 6 組件、focus/blur 補 4 組件、Chip 補 `disabled`
- [ ] [BREAKING] 移除 `themePrefix` prop（D9）

### 3b. 結構對齊（D6）

- [ ] 為 10 個無 barrel 組件補 `index.ts`：Badge、BaseContainer、Button、Dialog、EditableContainer、FlexContainer、Input、Popover、Spin、Tooltip；`src/index.ts` 改為一律從 barrel 匯入
- [ ] barrel 匯出名統一 SH 前綴（Radio、Splitter、Pagination、Divider、InputGroup）
- [ ] 根目錄補匯出遺漏型別：Carousel、Radio、Checkbox 的 Props/Emits/Option 系列
- [ ] 合併三份 `_icon-map.ts` → `src/utils/statusIcons.ts`；抽 `useComponentSize`、`resolveTypeVar` composables
- [ ] provide/inject 改 `InjectionKey<T>` + `context.ts`（ActiveButtonGroup、ConfigProvider、DatePicker、NotificationProvider）
- [ ] Spinner 轉正式內部組件：補 types.ts、改 `defineProps<T>()`，或評估併入 Spin
- [ ] 處理 `SHSplitter` 與 `SHSplitterGroup` 近重複：擇一為權威（建議保留 Group/Panel/Handle 組合，`SHSplitter` 標記 deprecated）
- [ ] props 定義風格修正：ChatMessage、ConfigProvider 改從 types.ts 匯入；15 個有 `XxxSlots` 未接線的組件補 `defineSlots`
- [ ] 統一 `<style lang="postcss" scoped>`（16 檔補 scoped、10 檔補 lang）；色彩 utility 統一 dot-notation

### 3c. 測試（與 3a/3b 同批進行）

- [ ] 每個組件至少一個行為測試（渲染 + v-model 往返 + disabled 阻擋），對齊既有範本 `DatePicker/__tests__/DatePicker.test.ts`
- [ ] 高風險邏輯優先深測：Pagination 省略號演算法、Notification 佇列與 max 淘汰、UploadZone 檔案驗證（maxSize/maxCount）、Select 過濾與 multiple、Checkbox indeterminate/group、Input clearable/word-limit
- [ ] CI（GitHub Actions）：`vue-tsc + vitest run + vite build` 三關卡

### 3d. v3.0.0 發佈

- [ ] 撰寫 `MIGRATION.md`（v2 → v3 對照表：所有改名 prop/事件/值域）
- [ ] 同步更新：全部 docs 頁 API 表、components-catalog.json、SKILL.md
- [ ] 發佈 v3.0.0

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
- [ ] 其餘 TODO 清單重新排序：Drawer、Skeleton、Empty、Breadcrumb、TreeView

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
