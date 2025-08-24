````markdown
## Goal

建立一個新的組件，名為 `Carousel`

## What

Carousel 組件用於展示一系列內容項目的滑動展示器，支援自動播放、導航控制和指示器。

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://primevue.org/carousel/
  why: 參考 primevue 的 carousel 組件實作
- url: https://primevue.org/carousel/#api
  why: 參考 primevue 的 carousel 組件 api
```

### Data models and structure

```
interface CarouselProps {
  value: any[]
  page: number
  numVisible: number
  numScroll: number
  responsiveOptions: CarouselResponsiveOption[]
  orientation: 'horizontal' | 'vertical'
  verticalViewPortHeight: string
  containerClass: string
  contentClass: string
  indicatorsContentClass: string
  circular: boolean
  autoplayInterval: number
  showNavigators: boolean
  showIndicators: boolean
}

interface CarouselResponsiveOption {
  breakpoint: string
  numVisible: number
  numScroll: number
}

interface CarouselSlots {
  item: (data: { data: any, index: number }) => any
  header: () => any
  footer: () => any
  previousIcon: () => any
  nextIcon: () => any
  indicators: (data: { indicators: number[], activeIndex: number }) => any
}

CarouselEmits:
  - update:page
  - page-change
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Carousel 組件相關檔案
CREATE: src/components/Carousel/
    - CREATE: src/components/Carousel/demos/
    - CREATE: src/components/Carousel/index.vue
    - CREATE: src/components/Carousel/CarouselItem.vue
    - CREATE: src/components/Carousel/CarouselIndicators.vue
    - CREATE: src/components/Carousel/CarouselNavigation.vue
    - CREATE: src/components/Carousel/types.ts

- Task2: 建立 Carousel 組件相關 demo
UPDATE: src/components/Carousel/demos/

- Task3:
file: Prps/UpdateComponentDocs.md

- Task4:
file: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax

```
- Carousel:
    - 容器樣式:
      - container: `relative overflow-hidden`
      - viewport: `overflow-hidden`
      - content: `flex transition-transform duration-300 ease-in-out`

    - 導航按鈕:
      - position: `absolute top-1/2 -translate-y-1/2 z-10`
      - style: `bg-white/80 hover:bg-white shadow-md rounded-full`
      - size: `w-10 h-10 flex items-center justify-center`
      - prev: `left-2`
      - next: `right-2`
      - disabled: `opacity-50 cursor-not-allowed`

    - 指示器:
      - container: `flex justify-center gap-2 mt-4`
      - dot: `w-2 h-2 rounded-full bg-gray-300 cursor-pointer transition-colors`
      - active: `bg-primary`
      - hover: `bg-gray-400`

    - 項目:
      - item: `flex-shrink-0`
      - spacing: `px-2`

    - 響應式:
      - 根據 numVisible 和 responsiveOptions 調整項目寬度
      - 支援 breakpoint 斷點設計
```

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'

  - prev: IconChevronLeft
  - next: IconChevronRight

- Carousel 必須支援觸控滑動 (Touch/Swipe)

- 應包含無障礙功能 (ARIA labels, roles)

- 支援鍵盤導航 (Arrow keys, Tab)

- 支援自動播放功能

- 支援響應式設計
````
