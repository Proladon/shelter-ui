````markdown
## Goal

建立一個新的組件，名為 `CodeEditor`

## What

CodeEditor 組件是一個基於 Microsoft Monaco Editor 的程式碼編輯器，支援多種程式語言語法高亮、智能提示、代碼格式化等功能。

### How to use

```vue
<template>
  <SHCodeEditor
    v-model="code"
    language="javascript"
    theme="vs-dark"
    :options="editorOptions"
    @ready="onEditorReady"
    @change="onCodeChange"
  />

  <SHCodeEditor
    v-model="htmlCode"
    language="html"
    :read-only="true"
    :minimap="false"
  />
</template>

<script setup lang="ts">
const code = ref(`function hello() {
  console.log('Hello World!');
}`)

const htmlCode = ref(`<div class="container">
  <h1>Hello World</h1>
</div>`)

const editorOptions = {
  fontSize: 14,
  tabSize: 2,
  wordWrap: 'on',
  lineNumbers: 'on',
}

const onEditorReady = (editor) => {
  console.log('Editor is ready:', editor)
}

const onCodeChange = (value) => {
  console.log('Code changed:', value)
}
</script>
```

## All Needed Context

### Documentation & References

```
# MUST READ - Include these in your context window
- url: https://microsoft.github.io/monaco-editor/
  why: Monaco Editor 官方文檔，了解基本使用方法和 API
- url: https://microsoft.github.io/monaco-editor/api/index.html
  why: Monaco Editor API 參考文檔
- url: https://github.com/microsoft/monaco-editor/tree/main/samples
  why: Monaco Editor 範例代碼參考
- url: https://github.com/imguolao/monaco-vue
  why: 參考 Vue 的 Monaco Editor 封裝實作
```

### Data models and structure

```
interface CodeEditorProps {
  modelValue: string
  language: string
  theme: 'vs' | 'vs-dark' | 'hc-black' | 'hc-light'
  options: monaco.editor.IStandaloneEditorConstructionOptions
  width: string | number
  height: string | number
  readOnly: boolean
  loading: string
  minimap: boolean
  lineNumbers: 'on' | 'off' | 'relative' | 'interval'
  wordWrap: 'off' | 'on' | 'wordWrapColumn' | 'bounded'
  fontSize: number
  tabSize: number
  insertSpaces: boolean
  automaticLayout: boolean
}

CodeEditorSlots:
  - default (loading state)
  - loading

CodeEditorEmits:
  - update:modelValue
  - change
  - ready
  - focus
  - blur
  - keydown
  - keyup
  - mousedown
  - mouseup
  - contextmenu
```

## Implementation Blueprint

### List of tasks to be completed

```
- Task1: 建立 CodeEditor 組件相關檔案
CREATE: src/components/CodeEditor/
    - CREATE: src/components/CodeEditor/demos/
    - CREATE: src/components/CodeEditor/index.vue
    - CREATE: src/components/CodeEditor/types.ts
    - CREATE: src/components/CodeEditor/index.ts

- Task2: 建立 CodeEditor 組件相關 demo
UPDATE: src/components/CodeEditor/demos/

- Task3: 更新組件文檔
implement: #file:Prps/UpdateComponentDocs.md

- Task4: 更新組件導出
implement: #file:Prps/ExportComponent.md
```

### Component Style

- use `<style lang="postcss">` and `@apply` css syntax

```
- CodeEditor:
    - Container:
      - border: `border border-gray-300 dark:border-gray-600`
      - border-radius: `rounded-md`
      - overflow: `overflow-hidden`
      - background: `bg-white dark:bg-gray-900`
      - transition: `transition-colors duration-200`

    - 狀態變化:
      - focus: `ring-2 ring-primary ring-offset-2`
      - disabled: `opacity-50 cursor-not-allowed`
      - readonly: `bg-gray-50 dark:bg-gray-800`

    - Loading State:
      - container: `flex items-center justify-center h-full`
      - spinner: `animate-spin w-6 h-6 text-primary`
      - text: `text-sm text-gray-500 dark:text-gray-400 ml-2`

    - Size variants:
      - small: `min-h-[200px]`
      - medium: `min-h-[300px]`
      - large: `min-h-[500px]`
      - full: `h-full`
```

## Important

- use Chinese Traditional all the time

- 必須正確引入和初始化 Monaco Editor

- 支援動態語言切換

- 支援主題切換 (亮色/暗色模式)

- 提供 loading 狀態處理

- 支援 v-model 雙向綁定

- 編輯器應該支援自動佈局調整

- 提供豐富的事件監聽 (ready, change, focus, blur 等)

- 支援所有 Monaco Editor 的原生選項配置

- 處理組件銷毀時的 editor dispose

- 支援 TypeScript 類型定義
````
