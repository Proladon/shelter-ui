````markdown
## Goal

建立一個新的組件，名為 `ScrollArea`

## What

可客製化樣式的滾動區塊元件，擴充瀏覽器原生捲動行為以便做一致的跨瀏覽器捲動樣式與控制（包含自定義捲軸、程式控制滾動位置等）。

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://reka-ui.com/docs/components/scroll-area#custom-scroll
  why: 參考 reka-ui 的 ScrollArea 組件實作與 "Custom Scroll" 範例
```

### Component Anatomy

```vue
<script setup>
import {
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  ScrollAreaCorner,
} from 'reka-ui'
</script>

<template>
  <ScrollAreaRoot>
    <ScrollAreaViewport />
    <ScrollAreaScrollbar orientation="horizontal">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="vertical">
      <ScrollAreaThumb />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
```

### Example Usage（Custom Scroll 範例）

以下示範如何透過組件 ref 取得 viewport，並於外部控制滾動位置（範例改寫自 reka-ui 的 Custom Scroll 範例）：

```vue
<script setup lang="ts">
import { ref } from 'vue'
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaCorner,
} from 'reka-ui'

const scrollArea = ref<InstanceType<typeof ScrollAreaRoot> | null>(null)

function scrollToBottom() {
  const viewportEl = scrollArea.value?.viewport
  if (viewportEl) {
    const top =
      (scrollArea.value as any)?.$el?.scrollHeight ?? viewportEl.scrollHeight
    viewportEl.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<template>
  <div class="sh-scroll-demo">
    <button @click="scrollToBottom">滾動到底部</button>

    <ScrollAreaRoot ref="scrollArea" class="sh-scroll-root">
      <ScrollAreaViewport class="sh-scroll-viewport">
        <!-- 長內容 -->
      </ScrollAreaViewport>

      <ScrollAreaScrollbar orientation="horizontal" class="sh-scrollbar">
        <ScrollAreaThumb class="sh-scroll-thumb" />
      </ScrollAreaScrollbar>

      <ScrollAreaScrollbar orientation="vertical" class="sh-scrollbar">
        <ScrollAreaThumb class="sh-scroll-thumb" />
      </ScrollAreaScrollbar>

      <ScrollAreaCorner class="sh-scroll-corner" />
    </ScrollAreaRoot>
  </div>
</template>
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 ScrollArea 組件相關檔案
CREATE: src/components/ScrollArea/
    - CREATE: src/components/ScrollArea/demos/
    - CREATE: src/components/ScrollArea/index.vue
    - CREATE: src/components/ScrollArea/types.ts

- Task2: 建立 ScrollArea 組件相關 demo
UPDATE: src/components/ScrollArea/demos/

- Task3: 更新組件文件
EXECUTE: Prps/UpdateComponentDocs.md

- Task4: 匯出組件
EXECUTE: Prps/ExportComponent.md
```

### Component Style

- 使用 `<style lang="postcss">` 並以 `@apply` 撰寫樣式
- 所有 class 命名以 `sh-` 為前綴，例如 `sh-scroll-root`、`sh-scroll-viewport`、`sh-scrollbar`、`sh-scroll-thumb` 等
- 提供預設的可客製化變數或 CSS 類別，方便在主題中覆寫

### Contract（小型規格書）

- Inputs: 內容節點 (slot)、props（如 type、orientation、scrollHideDelay、asChild）
- Outputs: 可控制的 viewport 參考（expose viewport）、scroll 相關方法（scrollTop、scrollBottom 等）
- Error modes: 當 ref 未綁定時，程式控制滾動應為 no-op
- Success: 支援程式呼叫滾動方法與正常顯示自訂捲軸

### Edge Cases

- 空內容（無 overflow）時，type='auto' 應隱藏捲軸
- 同時有水平與垂直滾動時，顯示 corner
- RTL（right-to-left）排版支援
- 使用鍵盤或輔助技術時仍保有原生滾動可及無障礙支援

## API Reference（摘要）

### Root

包含整個 ScrollArea 的所有部件；重要 props（節錄）:

- `as` / `asChild`：覆寫渲染元素
- `dir`：讀取方向（ltr / rtl）
- `scrollHideDelay`：在 type 為 hover/scroll 時，停止互動後隱藏捲軸的延遲（ms）
- `type`：捲軸顯示策略，選項包括 `auto` / `always` / `scroll` / `hover`
- 重要方法：`scrollTop`、`scrollTopLeft`、`scrollToElement`（或相似方法）可由組件暴露

### Viewport

滾動內容的視口區域。可透過 ref (`viewport`) 取得原生 DOM 元素以使用標準 scroll API。

### Scrollbar

捲軸條（可垂直或水平），支援 `orientation` prop。可搭配動畫或 presence 控制 mount。

### Thumb

代表可拖曳的滑塊（thumb）。會暴露 data-state 屬性（visible/hidden）以便樣式處理。

### Corner

當同時有水平與垂直捲軸時，顯示交接角落元素。

## Examples

- Custom Scroll（參考上方範例）：透過 `ref` 直接存取 viewport 並呼叫 scrollTo。
- 基本用法：組合 `Root`、`Viewport`、`Scrollbar`、`Thumb`、`Corner` 即可完成常見場景。

## Accessibility

建議盡量依賴原生滾動行為，並僅透過 CSS 或最小 JS 增強可視與互動樣式。元件設計保留原生鍵盤捲動與語意，使輔助技術（如螢幕閱讀器）仍能正常運作。

### Keyboard Interactions

因使用原生滾動，鍵盤滾動（PageUp / PageDown / Arrow keys / Home / End）由平台提供；不同平台行為會略有差異，元件不應覆寫這些預設行為。

## Implementation Notes

- 在組件內部應暴露 `viewport` 的 ref，方便外層程式控制。範例中以 `scrollArea.value?.viewport` 取得。
- 預設樣式應將捲軸置於內容之上（不佔用布局空間），並於必要時提供陰影或 hover 樣式。

## Important

- 全程使用繁體中文（Chinese Traditional）撰寫
- 所有 icons 若需使用，請採 `@tabler/icons-vue`
````
