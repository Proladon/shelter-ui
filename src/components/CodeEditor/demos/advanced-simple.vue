<template>
  <div class="demo-advanced">
    <h3>高級功能</h3>
    <p>展示代碼編輯器的高級功能和事件處理</p>

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
        @click="focusEditor"
        class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        聚焦編輯器
      </button>
    </div>

    <ClientOnly>
      <SHCodeEditor
        ref="editorRef"
        v-model="code"
        language="javascript"
        theme="vs-dark"
        height="400px"
        @ready="onEditorReady"
        @change="onCodeChange"
      />
    </ClientOnly>

    <div class="mt-4 bg-gray-100 dark:bg-gray-800 p-4 rounded">
      <h4 class="font-medium mb-2">編輯器狀態</h4>
      <ul class="text-sm space-y-1">
        <li>是否準備就緒: {{ isReady ? '是' : '否' }}</li>
        <li>代碼長度: {{ code.length }} 字符</li>
        <li>行數: {{ code.split('\n').length }} 行</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCodeEditor from '../index.vue'
import type { CodeEditorInstance } from '../types'

const editorRef = ref<CodeEditorInstance | null>(null)
const isReady = ref(false)

const code = ref(`// JavaScript 代碼示例
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

class Calculator {
  constructor() {
    this.history = [];
  }
  
  add(a, b) {
    const result = a + b;
    this.history.push({ operation: 'add', operands: [a, b], result });
    return result;
  }
  
  subtract(a, b) {
    const result = a - b;
    this.history.push({ operation: 'subtract', operands: [a, b], result });
    return result;
  }
  
  getHistory() {
    return this.history;
  }
}

// 使用示例
const calc = new Calculator();
console.log('5 + 3 =', calc.add(5, 3));
console.log('10 - 4 =', calc.subtract(10, 4));
console.log('計算歷史:', calc.getHistory());

// 斐波那契數列
for (let i = 0; i < 10; i++) {
  console.log('fibonacci(' + i + ') =', fibonacci(i));
}`)

const onEditorReady = (editor: any) => {
  isReady.value = true
  console.log('編輯器準備就緒:', editor)
}

const onCodeChange = (value: string) => {
  console.log('代碼已更改，長度:', value.length)
}

const formatCode = () => {
  if (editorRef.value) {
    editorRef.value.format()
  }
}

const clearCode = () => {
  code.value = ''
}

const focusEditor = () => {
  if (editorRef.value) {
    editorRef.value.focus()
  }
}
</script>
