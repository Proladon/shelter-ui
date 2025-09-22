<template>
  <div
    ref="containerRef"
    class="sh-code-editor"
    :class="containerClasses"
    :style="containerStyles"
  >
    <Spin
      class="h-full"
      :show="isLoading"
      :description="loading || '載入中...'"
    >
      <template #loading>
        <slot name="loading" />
      </template>
      <!-- Monaco Editor Container -->
      <div ref="editorRef" class="sh-code-editor__editor" />
    </Spin>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  shallowRef,
} from 'vue'
import Spin from '@/components/Spin/index.vue'
import type {
  CodeEditorProps,
  CodeEditorEmits,
  CodeEditorInstance,
} from './types'

defineOptions({
  name: 'SHCodeEditor',
})

const props = withDefaults(defineProps<CodeEditorProps>(), {
  modelValue: '',
  language: 'javascript',
  theme: 'vs',
  width: '100%',
  height: '300px',
  readOnly: false,
  loading: '',
  minimap: true,
  lineNumbers: 'on',
  wordWrap: 'off',
  fontSize: 14,
  tabSize: 2,
  insertSpaces: true,
  automaticLayout: true,
})

const emit = defineEmits<CodeEditorEmits>()

// Monaco editor type (will be loaded dynamically)
type Monaco = typeof import('monaco-editor')
type IStandaloneCodeEditor =
  import('monaco-editor').editor.IStandaloneCodeEditor

// Refs
const containerRef = ref<HTMLElement>()
const editorRef = ref<HTMLElement>()
const editor = shallowRef<IStandaloneCodeEditor | null>(null)
const monaco = shallowRef<Monaco | null>(null)
const isLoading = ref(true)
const isReady = ref(false)

// Computed
const containerClasses = computed(() => {
  return [
    'sh-code-editor',
    {
      'sh-code-editor--readonly': props.readOnly,
      'sh-code-editor--loading': isLoading.value,
    },
  ]
})

const containerStyles = computed(() => {
  const styles: Record<string, string> = {}

  if (typeof props.width === 'number') {
    styles.width = `${props.width}px`
  } else {
    styles.width = props.width
  }

  if (typeof props.height === 'number') {
    styles.height = `${props.height}px`
  } else {
    styles.height = props.height
  }

  return styles
})

const editorOptions = computed(() => {
  return {
    value: props.modelValue,
    language: props.language,
    theme: props.theme,
    readOnly: props.readOnly,
    minimap: { enabled: props.minimap },
    lineNumbers: props.lineNumbers,
    wordWrap: props.wordWrap,
    fontSize: props.fontSize,
    tabSize: props.tabSize,
    insertSpaces: props.insertSpaces,
    automaticLayout: props.automaticLayout,
    scrollBeyondLastLine: false,
    ...props.options,
  }
})

// Load Monaco Editor dynamically
const loadMonaco = async (): Promise<Monaco> => {
  if (monaco.value) return monaco.value

  try {
    const monacoModule = await import('monaco-editor')
    monaco.value = monacoModule
    return monacoModule
  } catch (error) {
    console.error('Failed to load Monaco Editor:', error)
    throw error
  }
}

// Methods
const initEditor = async () => {
  if (!editorRef.value) return

  try {
    // Load Monaco Editor
    const monacoModule = await loadMonaco()

    // 創建編輯器
    editor.value = monacoModule.editor.create(
      editorRef.value,
      editorOptions.value,
    )

    // 監聽內容變化
    editor.value.onDidChangeModelContent((event: any) => {
      const value = editor.value?.getValue() || ''
      emit('update:modelValue', value)
      emit('change', value, event)
    })

    // 監聽焦點事件
    editor.value.onDidFocusEditorText((event: any) => {
      emit('focus', event)
    })

    editor.value.onDidBlurEditorText((event: any) => {
      emit('blur', event)
    })

    // 監聽鍵盤事件
    editor.value.onKeyDown((event: any) => {
      emit('keydown', event)
    })

    editor.value.onKeyUp((event: any) => {
      emit('keyup', event)
    })

    // 監聽滑鼠事件
    editor.value.onMouseDown((event: any) => {
      emit('mousedown', event)
    })

    editor.value.onMouseUp((event: any) => {
      emit('mouseup', event)
    })

    editor.value.onContextMenu((event: any) => {
      emit('contextmenu', event)
    })

    isReady.value = true
    isLoading.value = false
    emit('ready', editor.value)
  } catch (error) {
    console.error('Failed to initialize Monaco Editor:', error)
    isLoading.value = false
  }
}

const disposeEditor = () => {
  if (editor.value) {
    editor.value.dispose()
    editor.value = null
  }
  isReady.value = false
}

const updateEditorValue = (value: string) => {
  if (editor.value && editor.value.getValue() !== value) {
    editor.value.setValue(value)
  }
}

const updateEditorLanguage = (language: string) => {
  if (editor.value && monaco.value) {
    const model = editor.value.getModel()
    if (model) {
      monaco.value.editor.setModelLanguage(model, language)
    }
  }
}

const updateEditorTheme = (theme: string) => {
  if (monaco.value) {
    monaco.value.editor.setTheme(theme)
  }
}

const updateEditorOptions = (options: any) => {
  if (editor.value) {
    editor.value.updateOptions(options)
  }
}

// Expose methods
const getValue = (): string => {
  return editor.value?.getValue() || ''
}

const setValue = (value: string): void => {
  updateEditorValue(value)
}

const focus = (): void => {
  editor.value?.focus()
}

const format = (): void => {
  if (editor.value) {
    editor.value.getAction('editor.action.formatDocument')?.run()
  }
}

const layout = (): void => {
  editor.value?.layout()
}

// Watch props changes
watch(
  () => props.modelValue,
  (newValue) => {
    updateEditorValue(newValue)
  },
)

watch(
  () => props.language,
  (newLanguage) => {
    updateEditorLanguage(newLanguage)
  },
)

watch(
  () => props.theme,
  (newTheme) => {
    updateEditorTheme(newTheme)
  },
)

watch(
  () => [
    props.readOnly,
    props.minimap,
    props.lineNumbers,
    props.wordWrap,
    props.fontSize,
    props.tabSize,
    props.insertSpaces,
    props.automaticLayout,
    props.options,
  ],
  () => {
    updateEditorOptions(editorOptions.value)
  },
  { deep: true },
)

// Lifecycle
onMounted(async () => {
  // Only initialize in browser environment
  if (typeof window !== 'undefined') {
    await nextTick()
    initEditor()
  }
})

onBeforeUnmount(() => {
  disposeEditor()
})

// Expose instance
defineExpose<CodeEditorInstance>({
  get editor() {
    return editor.value
  },
  getValue,
  setValue,
  focus,
  format,
  layout,
})
</script>

<style scoped lang="postcss">
.sh-code-editor {
  @apply flex flex-col;
  @apply border border-solid border-border.base;
  @apply dark:(rounded-md overflow-hidden transition-colors duration-200);
  @apply bg-bg.primary;

  /* &:focus-within {
    @apply ring-2 ring-primary ring-offset-2;
  } */

  &--readonly {
    /* @apply ; */
  }

  &--loading {
    @apply opacity-50;
  }

  &__editor {
    @apply w-full transition-opacity duration-200;
    @apply min-w-[200px] flex-1;
  }

  /* Size variants */
  &--small {
    min-height: 200px;
  }

  &--medium {
    min-height: 300px;
  }

  &--large {
    min-height: 500px;
  }

  &--full {
    @apply h-full;
  }
}

.sh-code-editor__editor {
  @apply h-full;
}
</style>
