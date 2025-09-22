<template>
  <div class="demo-advanced">
    <h3>高級功能</h3>
    <p>展示代碼編輯器的高級功能，包括自定義選項和事件處理</p>

    <div class="mb-4 flex items-center space-x-4">
      <button
        @click="formatCode"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        格式化代碼
      </button>

      <button
        @click="clearCode"
        class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        清空代碼
      </button>

      <button
        @click="insertTemplate"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        插入模板
      </button>

      <button
        @click="focusEditor"
        class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        聚焦編輯器
      </button>
    </div>

    <SHCodeEditor
      ref="editorRef"
      v-model="code"
      language="vue"
      theme="vs-dark"
      height="500px"
      :options="editorOptions"
      @ready="onEditorReady"
      @change="onCodeChange"
      @focus="onEditorFocus"
      @blur="onEditorBlur"
    />

    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <h4 class="font-medium mb-2">編輯器狀態</h4>
        <ul class="text-sm space-y-1">
          <li>是否準備就緒: {{ isReady ? '是' : '否' }}</li>
          <li>是否聚焦: {{ isFocused ? '是' : '否' }}</li>
          <li>代碼長度: {{ code.length }} 字符</li>
          <li>行數: {{ lineCount }} 行</li>
          <li>
            游標位置: 第 {{ cursorPosition.line }} 行，第
            {{ cursorPosition.column }} 列
          </li>
        </ul>
      </div>

      <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
        <h4 class="font-medium mb-2">事件日誌</h4>
        <div class="text-sm max-h-32 overflow-y-auto space-y-1">
          <div
            v-for="(log, index) in eventLogs"
            :key="index"
            class="text-gray-600 dark:text-gray-400"
          >
            [{{ log.time }}] {{ log.message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, type Ref } from 'vue'
import SHCodeEditor from '../index.vue'
import type { CodeEditorInstance } from '../types'
import { sampleCode, sampleInsertCode } from './demo-content'

const editorRef: Ref<CodeEditorInstance | null> = ref(null)
const code = ref(sampleCode)

const isReady = ref(false)
const isFocused = ref(false)
const cursorPosition = ref({ line: 1, column: 1 })
const eventLogs = ref<Array<{ time: string; message: string }>>([])

const lineCount = computed(() => code.value.split('\n').length)

const editorOptions = {
  fontSize: 14,
  tabSize: 2,
  wordWrap: 'on' as const,
  lineNumbers: 'on' as const,
  minimap: { enabled: true },
  automaticLayout: true,
  scrollBeyondLastLine: false,
  folding: true,
  renderWhitespace: 'selection' as const,
}

const addLog = (message: string) => {
  const time = new Date().toLocaleTimeString()
  eventLogs.value.unshift({ time, message })

  // 保持最多 10 條日誌
  if (eventLogs.value.length > 10) {
    eventLogs.value.pop()
  }
}

const onEditorReady = (editor: any) => {
  isReady.value = true
  addLog('編輯器準備就緒')

  // 監聽游標位置變化
  editor.onDidChangeCursorPosition((e: any) => {
    cursorPosition.value = {
      line: e.position.lineNumber,
      column: e.position.column,
    }
  })
}

const onCodeChange = (value: string) => {
  addLog(`代碼已更改 (${value.length} 字符)`)
}

const onEditorFocus = () => {
  isFocused.value = true
  addLog('編輯器獲得焦點')
}

const onEditorBlur = () => {
  isFocused.value = false
  addLog('編輯器失去焦點')
}

const formatCode = () => {
  if (editorRef.value) {
    editorRef.value.format()
    addLog('代碼已格式化')
  }
}

const clearCode = () => {
  code.value = ''
  addLog('代碼已清空')
}

const insertTemplate = () => {
  code.value = sampleInsertCode
  addLog('模板已插入')
}

const focusEditor = () => {
  if (editorRef.value) {
    editorRef.value.focus()
    addLog('編輯器已聚焦')
  }
}
</script>
