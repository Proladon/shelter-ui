## Goal

建立一個新的組件，名為 `Splitter`

## What

A component that divides your layout into resizable sections.

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://reka-ui.com/docs/components/splitter
  why: 參考 reka-ui 的 splitter 組件實作
```

### Component Anatomy

```
<script setup>
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'
</script>

<template>
  <SplitterGroup>
    <SplitterPanel />
    <SplitterResizeHandle />
  </SplitterGroup>
</template>
```

### Example Usage

```
<script setup lang="ts">
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from 'reka-ui'
</script>

<template>
  <div class="w-full h-64 px-8 md:px-16 text-green9 font-semibold text-sm">
    <SplitterGroup
      id="splitter-group-1"
      direction="horizontal"
    >
      <SplitterPanel
        id="splitter-group-1-panel-1"
        :min-size="20"
        class="bg-white border rounded-xl flex items-center justify-center"
      >
        Panel A
      </SplitterPanel>
      <SplitterResizeHandle
        id="splitter-group-1-resize-handle-1"
        class="w-2"
      />
      <SplitterPanel
        id="splitter-group-1-panel-2"
        :min-size="20"
      >
        <SplitterGroup
          id="splitter-group-2"
          direction="vertical"
        >
          <SplitterPanel
            id="splitter-group-2-panel-1"
            :min-size="20"
            class="bg-white border rounded-xl flex items-center justify-center"
          >
            Panel B
          </SplitterPanel>
          <SplitterResizeHandle
            id="splitter-group-2-resize-handle-1"
            class="h-2"
          />
          <SplitterPanel
            id="splitter-group-2-panel-2"
            :min-size="20"
            class="bg-white border rounded-xl flex items-center justify-center"
          >
            Panel C
          </SplitterPanel>
        </SplitterGroup>
      </SplitterPanel>
    </SplitterGroup>
  </div>
</template>
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 Splitter 組件相關檔案
CREATE: src/components/Splitter/
    - CREATE: src/components/Splitter/demos/
    - CREATE: src/components/Splitter/index.vue
    - CREATE: src/components/Splitter/types.ts

- Task2: 建立 Splitter 組件相關 demo
UPDATE: src/components/Splitter/demos/

- Task3:
EXECUTE: Prps/UpdateComponentDocs.md

- Task4:
EXECUTE: Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax
- class names should be starting with `sh`, e.g. `sh-splitter`, `sh-splitter-panel`, etc.

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
