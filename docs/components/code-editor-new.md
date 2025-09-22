---
title: CodeEditor 代碼編輯器
---

## Description

CodeEditor 組件是一個基於 Microsoft Monaco Editor 的程式碼編輯器，支援多種程式語言語法高亮、智能提示、代碼格式化等功能。

## 基本用法

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <SHCodeEditor
    v-model="code"
    language="javascript"
    theme="vs-dark"
    height="300px"
    @ready="onEditorReady"
    @change="onCodeChange"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const code = ref(`function hello() {
    console.log('Hello World!');
    return 'Hello from Monaco Editor!';
}`)

const onEditorReady = (editor) => {
  console.log('編輯器準備就緒:', editor)
}

const onCodeChange = (value) => {
  console.log('代碼已更改:', value.length, '字符')
}
</script>
```

</template>
</Demo>

## 多語言支援

<Demo>
  <LanguagesDemo />

<template #code>

```vue
<template>
  <div>
    <select v-model="selectedLanguage" class="mb-4">
      <option value="javascript">JavaScript</option>
      <option value="typescript">TypeScript</option>
      <option value="python">Python</option>
      <option value="java">Java</option>
    </select>

    <SHCodeEditor v-model="code" :language="selectedLanguage" height="400px" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedLanguage = ref('javascript')
const code = ref('console.log("Hello World!");')
</script>
```

</template>

</Demo>

## 主題切換

<Demo>
  <ThemesDemo />

<template #code>

```vue
<template>
  <div>
    <select v-model="currentTheme" class="mb-4">
      <option value="vs">Light</option>
      <option value="vs-dark">Dark</option>
      <option value="hc-black">High Contrast Black</option>
      <option value="hc-light">High Contrast Light</option>
    </select>

    <SHCodeEditor
      v-model="code"
      language="typescript"
      :theme="currentTheme"
      height="300px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const currentTheme = ref('vs')
const code = ref(`interface User {
  id: number;
  name: string;
  email: string;
}`)
</script>
```

  </template>

</Demo>

## 只讀模式

<Demo>
  <ReadonlyDemo />

<template #code>

```vue
<template>
  <div>
    <label class="flex items-center mb-4">
      <input v-model="isReadOnly" type="checkbox" class="mr-2" />
      只讀模式
    </label>

    <SHCodeEditor
      v-model="code"
      language="vue"
      theme="vs-dark"
      :read-only="isReadOnly"
      height="300px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isReadOnly = ref(true)
const code = ref(`<template>
  <div>Hello Vue!</div>
</template>`)
</script>
```

</template>

</Demo>

## API

### 屬性

| 屬性名          | 說明                 | 類型                                                 | 默認值         |
| --------------- | -------------------- | ---------------------------------------------------- | -------------- |
| modelValue      | 綁定的代碼值         | `string`                                             | `''`           |
| language        | 程式語言             | `string`                                             | `'javascript'` |
| theme           | 編輯器主題           | `'vs' \| 'vs-dark' \| 'hc-black' \| 'hc-light'`      | `'vs'`         |
| width           | 編輯器寬度           | `string \| number`                                   | `'100%'`       |
| height          | 編輯器高度           | `string \| number`                                   | `'300px'`      |
| readOnly        | 是否只讀             | `boolean`                                            | `false`        |
| loading         | 載入中文字           | `string`                                             | `''`           |
| minimap         | 是否顯示小地圖       | `boolean`                                            | `true`         |
| lineNumbers     | 行號顯示模式         | `'on' \| 'off' \| 'relative' \| 'interval'`          | `'on'`         |
| wordWrap        | 文字換行模式         | `'off' \| 'on' \| 'wordWrapColumn' \| 'bounded'`     | `'off'`        |
| fontSize        | 字體大小             | `number`                                             | `14`           |
| tabSize         | Tab 大小             | `number`                                             | `2`            |
| insertSpaces    | 是否使用空格代替 Tab | `boolean`                                            | `true`         |
| automaticLayout | 是否自動佈局         | `boolean`                                            | `true`         |
| options         | Monaco Editor 選項   | `monaco.editor.IStandaloneEditorConstructionOptions` | `{}`           |

### 事件 Events

| 事件名            | 說明               | 回調參數                                                          |
| ----------------- | ------------------ | ----------------------------------------------------------------- |
| update:modelValue | 值更新事件         | `(value: string)`                                                 |
| change            | 內容變化事件       | `(value: string, event: monaco.editor.IModelContentChangedEvent)` |
| ready             | 編輯器準備就緒事件 | `(editor: monaco.editor.IStandaloneCodeEditor)`                   |
| focus             | 聚焦事件           | `(event: any)`                                                    |
| blur              | 失焦事件           | `(event: any)`                                                    |
| keydown           | 按鍵事件           | `(event: monaco.IKeyboardEvent)`                                  |
| keyup             | 按鍵釋放事件       | `(event: monaco.IKeyboardEvent)`                                  |
| mousedown         | 滑鼠按下事件       | `(event: monaco.editor.IEditorMouseEvent)`                        |
| mouseup           | 滑鼠釋放事件       | `(event: monaco.editor.IEditorMouseEvent)`                        |
| contextmenu       | 右鍵選單事件       | `(event: monaco.editor.IEditorMouseEvent)`                        |

### 插槽 Slots

| 插槽名  | 說明                 |
| ------- | -------------------- |
| loading | 載入狀態插槽         |
| default | 預設插槽（載入狀態） |

### 方法 Methods

可以通過 ref 獲取組件實例並調用以下方法：

| 方法名   | 說明         | 參數            | 返回值   |
| -------- | ------------ | --------------- | -------- |
| getValue | 獲取編輯器值 | -               | `string` |
| setValue | 設置編輯器值 | `value: string` | `void`   |
| focus    | 聚焦編輯器   | -               | `void`   |
| format   | 格式化代碼   | -               | `void`   |
| layout   | 重新佈局     | -               | `void`   |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/CodeEditor/demos/basic.vue'
import LanguagesDemo from '@/components/CodeEditor/demos/languages.vue'
import ThemesDemo from '@/components/CodeEditor/demos/themes.vue'
import ReadonlyDemo from '@/components/CodeEditor/demos/readonly.vue'
</script>
