<template>
  <div class="demo-basic">
    <h3>基本使用</h3>
    <p>最基本的代碼編輯器使用方式</p>

    <ClientOnly>
      <SHCodeEditor
        v-model="code"
        language="javascript"
        width="400px"
        height="400px"
        @ready="onEditorReady"
        @change="onCodeChange"
      />
    </ClientOnly>

    <div class="mt-4">
      <h4>當前代碼值:</h4>
      <pre class="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm">{{
        code
      }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCodeEditor from '../index.vue'

const code = ref(`function hello() {
  console.log('Hello World!');
  return 'Hello from Monaco Editor!';
}

// 調用函數
hello();`)

const onEditorReady = (editor: any) => {
  console.log('編輯器準備就緒:', editor)
}

const onCodeChange = (value: string) => {
  console.log('代碼已更改:', value.length, '字符')
}
</script>
