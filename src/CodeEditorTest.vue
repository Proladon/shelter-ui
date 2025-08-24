<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">CodeEditor 組件測試</h1>
    
    <!-- 基本使用 -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-4">基本使用</h2>
      <SHCodeEditor
        v-model="basicCode"
        language="javascript"
        height="300px"
        @ready="onEditorReady"
        @change="onCodeChange"
      />
    </div>
    
    <!-- 主題切換 -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-4">主題切換</h2>
      <div class="mb-4">
        <label class="mr-2">主題:</label>
        <select v-model="currentTheme" class="border rounded px-2 py-1">
          <option value="vs">Light</option>
          <option value="vs-dark">Dark</option>
        </select>
      </div>
      <SHCodeEditor
        v-model="themeCode"
        language="typescript"
        :theme="currentTheme"
        height="250px"
      />
    </div>
    
    <!-- 只讀模式 -->
    <div class="mb-8">
      <h2 class="text-lg font-semibold mb-4">只讀模式</h2>
      <SHCodeEditor
        v-model="readonlyCode"
        language="vue"
        theme="vs-dark"
        :read-only="true"
        height="200px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCodeEditor from './components/CodeEditor/index.vue'

const basicCode = ref(`function hello() {
  console.log('Hello Monaco Editor!');
  return 'Success';
}`)

const currentTheme = ref<'vs' | 'vs-dark'>('vs')

const themeCode = ref(`interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(name: string, email: string): User {
  return {
    id: Math.random(),
    name,
    email
  };
}`)

const readonlyCode = ref(`<template>
  <div>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
const title = ref('Hello World')
const description = ref('This is readonly')
</script>`)

const onEditorReady = (editor: any) => {
  console.log('Editor ready:', editor)
}

const onCodeChange = (value: string) => {
  console.log('Code changed:', value.length, 'characters')
}
</script>
