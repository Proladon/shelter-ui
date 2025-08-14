<template>
  <div class="sh-textarea-wrapper" :class="{ 'is-disabled': disabled }">
    <div
      class="sh-textarea"
      :class="{
        'is-focused': focused,
      }"
    >
      <textarea
        ref="textareaRef"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :maxlength="maxlength"
        :rows="rows"
        :style="textareaStyle"
        class="sh-textarea-inner"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <div v-if="isWordLimitVisible" class="sh-textarea-count">
        <span class="sh-textarea-count-inner">
          {{ valueLength }}/{{ maxlength }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch } from 'vue'
import type { TextareaProps, TextareaEmits } from './types'

defineOptions({
  name: 'SHTextarea',
})

const props = withDefaults(defineProps<TextareaProps>(), {
  value: '',
  disabled: false,
  placeholder: '',
  rows: 3,
  resize: 'vertical',
  readonly: false,
  maxlength: undefined,
  showWordLimit: false,
  autosize: false,
})

const emit = defineEmits<TextareaEmits>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const focused = ref(false)
const textareaHeight = ref<string>()

const textareaStyle = computed(() => {
  const style: Record<string, string> = {
    resize: props.resize,
  }

  if (props.autosize && textareaHeight.value) {
    style.height = textareaHeight.value
  }

  return style
})

const isWordLimitVisible = computed(() => {
  return (
    props.showWordLimit &&
    props.maxlength !== undefined &&
    !props.disabled &&
    !props.readonly
  )
})

const valueLength = computed(() => {
  if (typeof props.value === 'string') {
    return props.value.length
  }
  return 0
})

const calculateHeight = () => {
  if (!props.autosize || !textareaRef.value) return

  const textarea = textareaRef.value

  // 重置高度以獲得正確的 scrollHeight
  textarea.style.height = 'auto'

  // 計算新的高度
  const scrollHeight = textarea.scrollHeight
  const minHeight =
    parseInt(getComputedStyle(textarea).lineHeight) * (props.rows || 3)

  const newHeight = Math.max(scrollHeight, minHeight)
  textareaHeight.value = `${newHeight}px`
}

const focus = () => {
  textareaRef.value?.focus()
}

const blur = () => {
  textareaRef.value?.blur()
}

const select = () => {
  textareaRef.value?.select()
}

const handleInput = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value
  emit('update:value', value)
  emit('input', value)

  if (props.autosize) {
    nextTick(() => {
      calculateHeight()
    })
  }
}

const handleChange = (event: Event) => {
  const value = (event.target as HTMLTextAreaElement).value
  emit('change', value)
}

const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  focused.value = false
  emit('blur', event)
}

// 監聽 value 變化以自動調整高度
watch(
  () => props.value,
  () => {
    if (props.autosize) {
      nextTick(() => {
        calculateHeight()
      })
    }
  },
  { immediate: true },
)

// 暴露方法給父組件
defineExpose({
  focus,
  blur,
  select,
  textarea: textareaRef,
})
</script>

<style lang="postcss" scoped>
.sh-textarea-wrapper {
  @apply w-full inline-flex flex-col relative;

  &:not(.is-disabled) {
    .sh-textarea:hover {
      @apply border-primary;
    }
  }
}

.sh-textarea {
  @apply inline-flex w-full bg-bg.primary relative;
  @apply rounded-md overflow-hidden;
  @apply transition duration-300 ease-in-out;
  @apply border-[1px] border-solid border-border.base;

  padding: 12px;

  &.is-focused {
    @apply border-primary outline-none;
    box-shadow: 0 0 0 2px rgba(var(--sh-primary-fade), 0.2);
  }
}

.sh-textarea-inner {
  @apply flex-1 w-full outline-none bg-transparent text-text.primary;
  @apply placeholder:text-gray-500;
  @apply resize-none;
  min-height: 0;
}

.sh-textarea-count {
  @apply absolute bottom-2 right-2 text-xs text-gray-400;
  @apply bg-bg.primary px-1;
}

.sh-textarea-count-inner {
  @apply block;
}

/* 禁用狀態 */
.is-disabled {
  @apply opacity-60;

  .sh-textarea {
    @apply cursor-not-allowed;
  }

  .sh-textarea-inner {
    @apply cursor-not-allowed;
  }
}
</style>
