## Goal

建立一個新的組件，名為 `Tag`

## What

Tag 組件用於分類內容，提供簡潔的標籤顯示功能，支援不同的樣式變化和圖示。

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://primevue.org/tag/
  why: 參考 primevue 的 tag 組件實作
- url: https://primevue.org/tag/#api
  why: 參考 primevue 的 tag 組件 api
```

### Data models and structure

```
interface TagProps {
  value: string
  type: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger'
  rounded: boolean
  bordered: boolean
  icon: component
}

TagSlots:
  - default
  - icon

TagEmits:
  // Tag 組件通常不需要發出事件，主要用於顯示
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Tag 組件相關檔案
CREATE: src/components/Tag/
    - CREATE: src/components/Tag/demos/
    - CREATE: src/components/Tag/index.vue
    - CREATE: src/components/Tag/types.ts

- Task2: 建立 Tag 組件相關 demo
UPDATE: src/components/Tag/demos/

- Task3:
EXECUTE: file:Prps/UpdateComponentDocs.md

- Task4:
EXECUTE: file:Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax

```
- Tag:
    - 基本樣式:
      - bg: 根據 type 變化
      - text: 根據 type 變化
      - padding: `px-2 py-1`
      - font-size: `text-sm`
      - border-radius: `rounded` (normal) 或 `rounded-full` (when rounded=true)
      - border: `border-none` (normal) 或 `border border-current` (when bordered=true)

    - Type 變化:
      - primary: `bg-primary.fade text-primary`
      - secondary: `bg-secondary.fade text-secondary`
      - success: `bg-status.success.fade text-status.success`
      - info: `bg-status.info.fade text-status.info`
      - warning: `bg-status.warning.fade text-status.warning`
      - danger: `bg-status.danger.fade text-status.danger`

    - Bordered 變化:
      - 當 bordered=true 時，背景變為透明，只顯示邊框和文字顏色
      - primary: `bg-transparent text-primary border-primary`
      - secondary: `bg-transparent text-secondary border-secondary`
      - success: `bg-transparent text-status.success border-status.success`
      - info: `bg-transparent text-status.info border-status.info`
      - warning: `bg-transparent text-status.warning border-status.warning`
      - danger: `bg-transparent text-status.danger border-status.danger`
```

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
