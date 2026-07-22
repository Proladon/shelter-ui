<template>
  <div class="sh-chat-input">
    <SHInputGroup>
      <!-- Optional block-start slot (e.g. context chips) -->
      <SHInputGroupAddon v-if="$slots['block-start']" align="block-start">
        <slot name="block-start" />
      </SHInputGroupAddon>

      <!-- Main textarea -->
      <SHTextarea
        :value="value"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :maxlength="maxlength"
        :show-word-limit="showWordLimit"
        resize="none"
        @update:value="emit('update:value', $event)"
        @keydown.enter.exact.prevent="handleEnterSubmit"
      />

      <!-- Block-end toolbar: file upload, image upload, (middle slot), send -->
      <SHInputGroupAddon align="block-end">
        <!-- File upload -->
        <template v-if="!hideFileUpload">
          <button
            class="sh-chat-input__tool-btn sh-interactive"
            :class="{ 'sh-disabled': disabled }"
            :disabled="disabled"
            title="上傳檔案"
            type="button"
            @click="triggerFileInput"
          >
            <IconPaperclip :size="16" />
          </button>
          <input
            ref="fileInputRef"
            type="file"
            class="sh-chat-input__file-input"
            :accept="fileAccept"
            multiple
            @change="handleFileChange"
          />
        </template>

        <!-- Image upload -->
        <template v-if="!hideImageUpload">
          <button
            class="sh-chat-input__tool-btn sh-interactive"
            :class="{ 'sh-disabled': disabled }"
            :disabled="disabled"
            title="上傳圖片"
            type="button"
            @click="triggerImageInput"
          >
            <IconPhoto :size="16" />
          </button>
          <input
            ref="imageInputRef"
            type="file"
            class="sh-chat-input__file-input"
            :accept="imageAccept || 'image/*'"
            multiple
            @change="handleImageChange"
          />
        </template>

        <!-- Middle slot (e.g. custom toolbar items) -->
        <slot name="toolbar" />

        <!-- Send button -->
        <button
          class="sh-chat-input__send-btn sh-interactive"
          :class="{
            'sh-disabled': disabled || loading || !value?.trim(),
          }"
          :disabled="disabled || loading || !value?.trim()"
          title="送出"
          type="button"
          style="margin-left: auto"
          @click="handleSubmit"
        >
          <Spinner v-if="loading" :size="14" />
          <IconSend v-else :size="16" />
        </button>
      </SHInputGroupAddon>
    </SHInputGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconPaperclip, IconPhoto, IconSend } from '@tabler/icons-vue'
import SHInputGroup from '@/components/InputGroup/index.vue'
import SHInputGroupAddon from '@/components/InputGroup/InputGroupAddon.vue'
import SHTextarea from '@/components/Textarea/index.vue'
import Spinner from '@/components/Spinner'
import type { ChatInputProps, ChatInputEmits } from './types'

defineOptions({ name: 'SHChatInput' })

const props = withDefaults(defineProps<ChatInputProps>(), {
  value: '',
  placeholder: '輸入訊息…',
  rows: 3,
  disabled: false,
  showWordLimit: false,
  maxlength: undefined,
  loading: false,
  fileAccept: undefined,
  imageAccept: 'image/*',
  hideFileUpload: false,
  hideImageUpload: false,
})

const emit = defineEmits<ChatInputEmits>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const imageInputRef = ref<HTMLInputElement | null>(null)

function triggerFileInput() {
  fileInputRef.value?.click()
}

function triggerImageInput() {
  imageInputRef.value?.click()
}

function handleFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    emit('fileSelect', input.files)
  }
  // Reset so the same file can be re-selected
  input.value = ''
}

function handleImageChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    emit('imageSelect', input.files)
  }
  input.value = ''
}

function handleSubmit() {
  if (!props.value?.trim() || props.disabled || props.loading) return
  emit('submit', props.value)
}

function handleEnterSubmit(event: KeyboardEvent) {
  emit('pressEnter', event)
  handleSubmit()
}
</script>

<style scoped>
.sh-chat-input {
  width: 100%;
}

/* Icon toolbar buttons */
.sh-chat-input__tool-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--sh-radius-sm);
  border: none;
  background: transparent;
  color: var(--sh-text-primary);
  cursor: pointer;
  flex-shrink: 0;
}

.sh-chat-input__tool-btn:hover {
  background: var(--sh-bg-secondary);
  color: var(--sh-primary);
}

/* Send button */
.sh-chat-input__send-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--sh-radius-sm);
  border: none;
  background: var(--sh-primary);
  color: white; /* contrast text on solid primary background */
  cursor: pointer;
  flex-shrink: 0;
}

.sh-chat-input__send-btn:not(:disabled):hover {
  opacity: 0.85;
}

.sh-chat-input__send-btn:disabled,
.sh-chat-input__send-btn.sh-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Hidden file inputs */
.sh-chat-input__file-input {
  display: none;
}
</style>
