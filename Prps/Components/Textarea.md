## Goal

建立一個新的組件，名為 `Textarea`，並更新組件文檔

## What

Textarea 組件是一個可調整大小的多行文字輸入框，允許用戶輸入和編輯長文本內容。它可以自動調整高度以適應內容的變化，並提供基本的樣式和功能。

## All Needed Context

### Data models and structure

```
interface TextareaProps {
    value: string
    placeholder?: string
    rows?: number
    resize?: 'none' | 'both' | 'horizontal' | 'vertical'
}
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Textarea 組件相關檔案
CREATE: src/components/Textarea/
    - CREATE: src/components/Textarea/demos/
    - CREATE: src/components/Textarea/index.vue
    - CREATE: src/components/Textarea/types.ts

- Task2: 建立 Textarea 組件相關 demo
UPDATE: src/components/Textarea/demos/

- Task3:
EXECUTE: Prps/UpdateComponentDocs.md

- Task4:
EXECUTE: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax
- same as `src\components\Input\index.vue` style

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
