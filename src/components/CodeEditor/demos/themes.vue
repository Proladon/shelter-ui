<template>
  <div class="demo-themes">
    <h3>主題切換</h3>
    <p>支援亮色和暗色主題</p>

    <div class="mb-4">
      <label class="block text-sm font-medium mb-2">選擇主題:</label>
      <select
        v-model="selectedTheme"
        class="border rounded px-3 py-2 bg-white dark:bg-gray-800"
      >
        <option value="vs">Visual Studio Light</option>
        <option value="vs-dark">Visual Studio Dark</option>
        <option value="hc-black">High Contrast Black</option>
        <option value="hc-light">High Contrast Light</option>
      </select>
    </div>

    <SHCodeEditor
      v-model="code"
      language="typescript"
      :theme="selectedTheme"
      width="400px"
      height="400px"
      :options="editorOptions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHCodeEditor from '../index.vue'

const selectedTheme = ref<'vs' | 'vs-dark' | 'hc-black' | 'hc-light'>('vs')

const code = ref(`interface CodeEditorProps {
  modelValue?: string
  language?: string
  theme?: 'vs' | 'vs-dark' | 'hc-black' | 'hc-light'
  readOnly?: boolean
  minimap?: boolean
  fontSize?: number
}

class CodeEditor {
  private editor: monaco.editor.IStandaloneCodeEditor | null = null
  
  constructor(private container: HTMLElement, private options: CodeEditorProps) {
    this.initialize()
  }
  
  private initialize(): void {
    this.editor = monaco.editor.create(this.container, {
      value: this.options.modelValue || '',
      language: this.options.language || 'javascript',
      theme: this.options.theme || 'vs',
      readOnly: this.options.readOnly || false,
      minimap: { enabled: this.options.minimap !== false },
      fontSize: this.options.fontSize || 14
    })
  }
  
  public getValue(): string {
    return this.editor?.getValue() || ''
  }
  
  public setValue(value: string): void {
    this.editor?.setValue(value)
  }
  
  public dispose(): void {
    this.editor?.dispose()
    this.editor = null
  }
}

export { CodeEditor, type CodeEditorProps }`)

const editorOptions = {
  minimap: { enabled: true },
  fontSize: 14,
  tabSize: 2,
  wordWrap: 'on' as const,
  lineNumbers: 'on' as const,
}
</script>
