## Goal

建立一個新的組件，名為 `Chip`

## What

Chip represents entities using icons, labels and images.

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://primevue.org/chip/
  why: 參考 primevue 的 chip 組件實作
- url: https://primevue.org/chip/#api
  why: 參考 primevue 的 chip 組件 api
```

### Data models and structure

```
interface ChipProps {
  label: string
  image: string
  icon: component
  removable: boolean
  removeIcon: component
}


ChipSlots:
  - default
  - icon

ChipEmits:
  - remove
  - removeicon
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Chip 組件相關檔案
CREATE: src/components/Chip/
    - CREATE: src/components/Chip/demos/
    - CREATE: src/components/Chip/index.vue
    - CREATE: src/components/Chip/types.ts

- Task2: 建立 Chip 組件相關 demo
UPDATE: src/components/Chip/demos/

- Task2: 建立 Chip 組件相關檔案
EXECUTE: Prps/UpdateComponentDocs.md
```

### Component Style

```
- Chip:
    - bg: `secondary.fade`
    - text: `bg.primary`
    - rounded: `full`

```

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
