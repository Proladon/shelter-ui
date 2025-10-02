# Shelter UI 文檔撰寫格式指南

本指南提供了 Shelter UI 專案中文檔撰寫的統一格式標準，幫助維護者和貢獻者創建一致、高質量的文檔。

## 📁 文檔結構

### 目錄結構

```
docs/
├── index.md                  # 首頁
├── guide/                    # 指南目錄
│   ├── index.md             # 介紹頁面
│   └── getting-started.md   # 快速開始
└── components/              # 組件文檔目錄
    ├── index.md            # 組件索引頁
    └── [component-name].md # 各組件文檔
```

### 文件命名規範

- 使用 kebab-case 命名（小寫字母，單詞間用連字符分隔）
- 組件文檔檔名應與組件名稱對應
- 範例：`active-button-group.md`、`date-picker.md`

## 📝 文檔格式規範

### 1. Front Matter（文檔頭）

每個組件文檔都應該包含 Front Matter：

```yaml
---
title: ComponentName 中文名稱
---
```

**範例：**

```yaml
---
title: Button 按鈕
---
```

### 2. 主標題格式

```markdown
# ComponentName 中文名稱

組件的簡短描述，說明組件的主要功能和用途。
```

**範例：**

```markdown
# Button 按鈕

按鈕用於觸發一個操作，如提交表單。
```

### 3. 章節結構

組件文檔應遵循以下章節順序：

```markdown
# ComponentName 中文名稱

簡短描述

## 基本用法

基本用法的說明和示例

## [其他功能章節]

各種功能特性的展示

## API

### Props

### Events

### Slots

### Methods（如果適用）
```

### 4. 示例代碼格式

使用 `<Demo>` 組件包裝示例，並引用對應的 Demo 組件：

````markdown
<Demo>
  <BasicDemo />  <!-- 引用 src/components/[ComponentName]/demos/BasicDemo.vue -->
  
  <template #code>

```vue
<template>
  <!-- Vue 模板代碼 -->
</template>

<script setup>
// JavaScript 代碼
</script>

<style scoped>
/* CSS 樣式（如需要） */
</style>
```
````

  </template>
</Demo>
```

**重要說明：**

- `<BasicDemo />` 對應 `src/components/[ComponentName]/demos/BasicDemo.vue` 文件
- Demo 組件需要在文檔文件底部手動 import
- `<template #code>` 中的代碼應與 Demo 組件的實現保持一致

**Demo 組件導入方式：**
在文檔文件的最底部添加 `<script setup>` 區塊來導入所有使用的 Demo 組件：

```vue
<script setup>
import BasicDemo from '@/components/Button/demos/BasicDemo.vue'
import SizeDemo from '@/components/Button/demos/SizeDemo.vue'
import TypeDemo from '@/components/Button/demos/TypeDemo.vue'
// ...以此類推
</script>
```

#### 示例代碼編寫原則

1. **完整性**：示例代碼應該是完整可運行的
2. **簡潔性**：去除不必要的代碼，專注於展示功能
3. **可讀性**：使用清晰的變數名和適當的註釋
4. **一致性**：使用統一的代碼風格

#### Vue 代碼規範

```vue
<template>
  <!-- 使用組件前綴 SH -->
  <SHButton type="primary" @click="handleClick"> 按鈕文字 </SHButton>
</template>

<script setup>
import { ref } from 'vue'
import { SHButton } from '@proladon/shelter-ui'

// 使用 ref 定義響應式變數
const value = ref('初始值')

// 定義方法
const handleClick = () => {
  console.log('按鈕被點擊')
}
</script>
```

#### Demo 組件引用規範

在文檔中引用 demo 組件時，組件名稱應與 `src/components/[ComponentName]/demos/` 目錄下的文件名對應：

```markdown
<Demo>
  <BasicDemo />  <!-- 對應 BasicDemo.vue -->
  
  <template #code>
  <!-- 代碼展示 -->
  </template>
</Demo>
```

**Demo 組件命名規則：**

- 使用 PascalCase 命名法
- 文件名應描述功能特性，如：`BasicDemo.vue`、`SizeDemo.vue`、`ColorDemo.vue`
- 常用的 demo 命名模式：
  - `BasicDemo.vue` - 基本用法
  - `SizeDemo.vue` - 尺寸變化
  - `TypeDemo.vue` - 類型展示
  - `ColorDemo.vue` - 顏色主題
  - `DisabledDemo.vue` - 禁用狀態
  - `EventDemo.vue` - 事件處理

**Demo 組件結構：**

```vue
<template>
  <!-- Demo 展示內容 -->
</template>

<script setup lang="ts">
// Demo 相關邏輯
// 保持簡潔，專注於展示功能
</script>

<style scoped>
/* 必要的樣式（如果需要） */
</style>
```

### 5. 章節標題規範

- 使用二級標題（##）作為主要功能章節
- 使用三級標題（###）作為子功能或 API 分類
- 章節名稱使用中文，簡潔明確

**常用章節名稱：**

- 基本用法
- 不同尺寸 / 尺寸
- 不同類型 / 類型
- 不同顏色 / 顏色
- 禁用狀態
- 加載狀態
- 事件處理
- 自定義樣式
- API

### 6. API 文檔格式

#### Props 表格

```markdown
### Props

| 屬性名   | 類型      | 默認值      | 說明                                                            |
| -------- | --------- | ----------- | --------------------------------------------------------------- |
| type     | `string`  | `'default'` | 按鈕類型，可選值：`primary` `success` `warning` `danger` `info` |
| size     | `string`  | `'default'` | 按鈕尺寸，可選值：`small` `default` `large`                     |
| disabled | `boolean` | `false`     | 是否禁用                                                        |
```

#### Events 表格

```markdown
### Events

| 事件名 | 說明           | 回調參數              |
| ------ | -------------- | --------------------- |
| click  | 點擊按鈕時觸發 | `(event: MouseEvent)` |
| focus  | 獲得焦點時觸發 | `(event: FocusEvent)` |
```

#### Slots 表格

```markdown
### Slots

| 插槽名  | 說明     |
| ------- | -------- |
| default | 按鈕內容 |
| icon    | 按鈕圖標 |
```

## 🎨 撰寫風格指南

### 語言使用

1. **主要語言**：使用繁體中文
2. **技術術語**：保留英文原文，如 Props、Events、Slots
3. **代碼註釋**：可使用中文或英文

### 描述撰寫

1. **簡潔明確**：每個描述都應該簡潔明確，避免冗長
2. **用戶導向**：從使用者角度描述功能和用途
3. **實用性**：提供實際的使用場景和建議

### 示例選擇

1. **典型場景**：選擇最常見、最有代表性的使用場景
2. **漸進式**：從簡單到複雜，循序漸進
3. **完整性**：確保涵蓋組件的主要功能特性

## 📋 文檔檢查清單

在提交文檔前，請確認以下項目：

### 基本要求

- [ ] Front Matter 正確設置
- [ ] 主標題格式正確
- [ ] 組件描述簡潔明確
- [ ] 章節結構完整

### 示例代碼

- [ ] 代碼可以正常運行
- [ ] 使用正確的組件前綴（SH）
- [ ] 導入語句正確
- [ ] 代碼風格一致
- [ ] Demo 組件命名規範正確
- [ ] Demo 組件與文檔代碼保持一致
- [ ] 文檔底部正確導入所有使用的 Demo 組件

### API 文檔

- [ ] Props 表格完整
- [ ] Events 表格完整（如適用）
- [ ] Slots 表格完整（如適用）
- [ ] 類型定義準確

### 內容質量

- [ ] 文字無錯別字
- [ ] 描述準確清晰
- [ ] 示例有代表性
- [ ] 功能覆蓋完整

## 📖 參考範例

### 完整組件文檔範例

````markdown
---
title: Button 按鈕
---

# Button 按鈕

按鈕用於觸發一個操作，如提交表單。

## 基本用法

基本按鈕用法，支持多種類型。

<Demo>
  <BasicDemo />  <!-- 對應 src/components/Button/demos/BasicDemo.vue -->
  
  <template #code>

```vue
<template>
  <div class="flex gap-2">
    <SHButton>Default</SHButton>
    <SHButton type="primary">Primary</SHButton>
    <SHButton type="success">Success</SHButton>
  </div>
</template>
```
````

  </template>
</Demo>

## 不同尺寸

按鈕提供三種尺寸：小、中、大。

<Demo>
  <SizeDemo />  <!-- 對應 src/components/Button/demos/SizeDemo.vue -->
  
  <template #code>

```vue
<template>
  <div class="flex gap-2">
    <SHButton size="small">Small</SHButton>
    <SHButton>Default</SHButton>
    <SHButton size="large">Large</SHButton>
  </div>
</template>
```

  </template>
</Demo>

## API

### Props

| 屬性名 | 類型     | 默認值      | 說明     |
| ------ | -------- | ----------- | -------- |
| type   | `string` | `'default'` | 按鈕類型 |
| size   | `string` | `'default'` | 按鈕尺寸 |

### Events

| 事件名 | 說明       | 回調參數              |
| ------ | ---------- | --------------------- |
| click  | 點擊時觸發 | `(event: MouseEvent)` |

<script setup>
import BasicDemo from '@/components/Button/demos/BasicDemo.vue'
import SizeDemo from '@/components/Button/demos/SizeDemo.vue'
</script>

```

## 🔧 工具和資源

### 推薦工具

1. **Markdown 編輯器**：VS Code + Markdown 擴展
2. **預覽工具**：本地運行文檔站點進行預覽
3. **語法檢查**：使用拼字檢查工具

### 有用資源

- [Markdown 語法指南](https://markdown.tw/)
- [Vue 3 文檔](https://v3.vuejs.org/)
- [TypeScript 手冊](https://www.typescriptlang.org/docs/)

---

*這份指南會持續更新，以反映最佳實踐和項目需求的變化。如有建議或問題，歡迎提出 Issue 或 PR。*
```
