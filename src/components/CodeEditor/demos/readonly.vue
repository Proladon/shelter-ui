<template>
  <div class="demo-readonly">
    <h3>只讀模式</h3>
    <p>設置為只讀模式的代碼編輯器，無法編輯但可以查看和複製代碼</p>

    <div class="mb-4 flex items-center space-x-4">
      <label class="flex items-center">
        <input v-model="isReadOnly" type="checkbox" class="mr-2" />
        只讀模式
      </label>

      <label class="flex items-center">
        <input v-model="showMinimap" type="checkbox" class="mr-2" />
        顯示小地圖
      </label>
    </div>

    <ClientOnly>
      <SHCodeEditor
        v-model="code"
        language="vue"
        theme="vs-dark"
        :read-only="isReadOnly"
        :minimap="showMinimap"
        height="450px"
      />
    </ClientOnly>

    <div class="mt-4">
      <h4>編輯器狀態:</h4>
      <ul
        class="list-disc list-inside text-sm text-gray-600 dark:text-gray-400"
      >
        <li>只讀模式: {{ isReadOnly ? '是' : '否' }}</li>
        <li>小地圖: {{ showMinimap ? '顯示' : '隱藏' }}</li>
        <li>代碼長度: {{ code.length }} 字符</li>
        <li>行數: {{ code.split('\n').length }} 行</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCodeEditor from '../index.vue'

const isReadOnly = ref(true)
const showMinimap = ref(true)

const content = `
import { ref } from 'vue'
import SHCodeEditor from '../index.vue'

const editorContent = ref('')
const selectedLanguage = ref('javascript')
const isDark = ref(false)
const currentLine = ref(1)
const currentColumn = ref(1)
`

const code = ref(content)
</script>
