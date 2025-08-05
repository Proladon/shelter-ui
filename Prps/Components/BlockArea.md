## Goal

建立一個新的組件，名為 `BlockArea`，並更新組件文檔

## What

BlockArea 組件可以將包覆的區塊 disabled，讓使用者無法執行選取、點擊等操作。
BlockArea 包覆的區塊會覆蓋一層具有透明度的底色表示該區域是 disabled 的狀態，且 BlockArea 可以透過 props 來設定是否要在區塊中顯示文字或是 icon

## All Needed Context

### Data models and structure

```
interface BlockAreaProps {
  active: boolean
  icon: component
}


BlockAreaSlots:
  - default
  - icon
  - text
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 BlockArea 組件相關檔案
CREATE: src/components/BlockArea/
    - CREATE: src/components/BlockArea/demos/
    - CREATE: src/components/BlockArea/index.vue
    - CREATE: src/components/BlockArea/types.ts

- Task2: 建立 BlockArea 組件相關 demo
UPDATE: src/components/BlockArea/demos/

- Task3:
EXECUTE: Prps/UpdateComponentDocs.md

- Task4:
EXECUTE: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax

```
- BlockArea:
    - bg: `bg.primary.fade`
    - text: `bg.primary`
```

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
