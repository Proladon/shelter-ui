---
applyTo: 'src/components/**/*'
description: 'src/components 中組件的定義與結構規範'
---

# 組件定義與結構指南

此文件定義了 `src/components` 中組件的標準結構與組成。

## 資料夾結構

每個組件應位於 `src/components/` 下的獨立目錄中。目錄名稱應使用 **PascalCase** (大駝峰式命名)。

```
src/components/
  └── ComponentName/
      ├── index.vue          # 組件主要實作檔案
      ├── types.ts           # 類型定義 (Props, Emits 等)
      ├── index.ts           # (可選) 用於複雜組件的導出文件
      └── demos/             # 文檔範例目錄
          ├── basic.vue
          └── ...
```

## 檔案職責

### `index.vue`

- 組件的主要入口點。
- 必須使用 `<script setup lang="ts">`。
- 應從 `types.ts` 導入 Props 和 Emits 定義。
- 應使用 `defineOptions({ name: 'SHComponentName' })` 定義組件名稱 (以 `SH` 為前綴)。

### `types.ts`

- 包含組件的 TypeScript 介面與類型定義。
- 必須導出 `ComponentNameProps` 介面。
- 必須導出 `ComponentNameEmits` 介面 (若組件有事件)。
- 可導出其他輔助類型。

### `index.ts` (可選)

- 當組件資料夾包含多個組件 (例如 `Radio` 和 `RadioGroup`) 或需要導出特定類型時使用。
- 應重新導出組件。

### `demos/`

- 包含展示組件用法的 Vue 檔案。
- 這些檔案將用於文檔中。

## 命名規範

- **組件資料夾**: PascalCase (例如 `Button`, `ActiveButtonGroup`)。
- **組件檔案**: `index.vue` (推薦) 或 `ComponentName.vue`。
- **組件名稱**: 以 `SH` 為前綴 (例如 `SHButton`)。
- **Props 介面**: `ComponentNameProps` (例如 `ButtonProps`)。
- **Emits 介面**: `ComponentNameEmits` (例如 `ButtonEmits`)。

## 範例

### `src/components/Example/types.ts`

```typescript
export interface ExampleProps {
  modelValue?: string
  disabled?: boolean
}

export interface ExampleEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}
```

### `src/components/Example/index.vue`

```vue
<script setup lang="ts">
import { computed } from 'vue'
import type { ExampleProps, ExampleEmits } from './types'

defineOptions({
  name: 'SHExample',
})

const props = withDefaults(defineProps<ExampleProps>(), {
  disabled: false,
})

const emit = defineEmits<ExampleEmits>()

// ... 實作
</script>

<template>
  <div class="sh-example">
    <!-- ... -->
  </div>
</template>
```
