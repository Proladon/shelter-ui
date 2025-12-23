---
applyTo: 'src/index.ts'
description: 'src/index.ts 維護指南，包含組件導出與類型定義規範'
---

# src/index.ts 維護指南

此文件是 Shelter UI 庫的主要入口點。它負責匯總所有組件、類型和工具函數，並提供 Vue 插件安裝方法。

## 文件結構

1.  **組件導入 (Imports)**: 從各個組件目錄導入 `.vue` 文件或 `index.ts`。
2.  **組件列表 (Components List)**: `components` 對象包含了所有註冊為全局組件的 Vue 組件。
3.  **工具函數 (Utils)**: 如 `sayHello` 等全局工具函數。
4.  **類型導出 (Type Exports)**: 導出各個組件的 Props、Emits 和其他相關類型。
5.  **安裝函數 (Install Function)**: `install` 函數用於遍歷 `components` 對象並將其註冊到 Vue 應用實例中。
6.  **默認導出 (Default Export)**: 導出包含 `install` 方法的 Vue 插件對象。
7.  **命名導出 (Named Exports)**: 單獨導出每個組件，以便支持 Tree-shaking。

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

在文件底部的 `export { ... }` 區域添加組件，以支持按需導入：

```typescript
export {
  // ... 其他組件
  SHNewComponent,
}
```

## 命名規範

- **組件名稱**: 所有導出的組件應使用 `SH` 前綴 (例如 `SHButton`, `SHInput`)。
- **類型名稱**: 類型應保持清晰，通常不需要 `SH` 前綴，除非為了避免衝突。

## 注意事項

- 確保導入路徑正確。
- 保持導入和導出的順序整潔（通常按功能或字母順序排列）。
