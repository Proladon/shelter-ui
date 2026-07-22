---
applyTo: 'src/index.ts'
description: 'src/index.ts 維護指南，包含組件導出與類型定義規範'
---

# src/index.ts 維護指南

此文件是 Shelter UI 庫的主要入口點。它負責匯總所有組件、類型和工具函數，並提供 Vue 插件安裝方法。

## 文件結構

1.  **組件導入 (Imports)**: 從各個組件目錄導入 `.vue` 文件或 `index.ts`。
2.  **組件列表 (Components List)**: `components` 對象包含了所有註冊為全局組件的 Vue 組件。
3.  **命名導出 (Named Exports)**: 緊接在 `components` 之後，單獨導出每個組件以支持 Tree-shaking。兩份清單內容必須一致（由 `src/__tests__/index.test.ts` 驗證：具名匯出 ⊆ 註冊清單，且反之亦然）。
4.  **類型導出 (Type Exports)**: 導出各個組件的 Props、Emits 和其他相關類型。
5.  **安裝函數 (Install Function)**: `install` 函數用於遍歷 `components` 對象並將其註冊到 Vue 應用實例中。
6.  **默認導出 (Default Export)**: 導出包含 `install` 方法的 Vue 插件對象。

## 新增組件流程

當需要新增一個組件 (例如 `NewComponent`) 時，請遵循以下步驟修改 `src/index.ts`：

### 1. 導入組件

在文件頂部的導入區域添加組件導入：

```typescript
import SHNewComponent from './components/NewComponent/index.vue'
```

### 2. 添加到組件列表

將組件添加到 `components` 常量中，這將確保它被包含在 `app.use(ShelterUI)` 中：

```typescript
const components = {
  // ... 其他組件
  SHNewComponent,
}
```

### 3. 導出類型

如果組件有定義 Props 或 Emits 類型，請在類型聲明區域導出：

```typescript
export type {
  NewComponentProps,
  NewComponentEmits,
} from './components/NewComponent/types'
```

### 4. 單獨導出組件

緊接在 `components` 常量之後的 `export { ... }` 區域添加組件，以支持按需導入：

```typescript
export {
  // ... 其他組件
  SHNewComponent,
}
```

### 5. 更新 components-catalog.json

`components-catalog.json` 目前是**手工維護**（尚無從 `types.ts` 自動生成的腳本，該腳本已列入 `IMPROVEMENT_PLAN.md` Phase 4 待辦）。在 `components` 陣列中新增一筆物件，`name` 不含 `SH` 前綴，並填齊 `props`/`events`/`slots`/`methods`（對照 `types.ts` 手動同步，不要用猜的）。

### 6. 新增文檔頁

依照 `docs/WRITING_GUIDE.md` 建立 `docs/components/new-component.md`，並在 `docs/.vitepress/config.ts` 的 sidebar 加入對應項目。

## 新組件檢查清單

新增或修改一個公開組件時，以下五處必須同步，缺一即為未完成：

- [ ] `src/index.ts`：進入 `components` 註冊清單
- [ ] `src/index.ts`：進入具名匯出區塊
- [ ] `src/index.ts`：進入型別匯出（`export type { ... }`）
- [ ] `components-catalog.json`：新增/更新對應物件
- [ ] `docs/components/*.md`：新增/更新文檔頁 + sidebar 連結

## 命名規範

- **組件名稱**: 所有導出的組件應使用 `SH` 前綴 (例如 `SHButton`, `SHInput`)。
- **類型名稱**: 類型應保持清晰，通常不需要 `SH` 前綴，除非為了避免衝突。

## 注意事項

- 確保導入路徑正確。
- 保持導入和導出的順序整潔（通常按功能或字母順序排列）。
