<template>
  <div class="sh-upload-zone" :class="{ 'is-disabled': disabled }">
    <!-- Drop Zone / Trigger -->
    <div
      class="sh-upload-zone-dropzone"
      :class="[
        sizeClass,
        {
          'is-dragover': isDragOver,
          'is-disabled': disabled,
          'is-filled': hasFiles,
        },
      ]"
      @click="openFilePicker"
      @dragenter.prevent="handleDragEnter"
      @dragover.prevent="handleDragOver"
      @dragleave.prevent="handleDragLeave"
      @drop.prevent="handleDrop"
    >
      <input
        ref="inputRef"
        type="file"
        class="sh-upload-zone-input"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="handleFileInputChange"
      />

      <slot name="trigger">
        <div class="sh-upload-zone-content">
          <!-- Upload icon -->
          <svg
            class="sh-upload-zone-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p class="sh-upload-zone-label">
            {{ isDragOver ? 'Drop files here' : 'Click or drag files here' }}
          </p>
          <p v-if="hintText" class="sh-upload-zone-hint">{{ hintText }}</p>
        </div>
      </slot>
    </div>

    <!-- File List -->
    <ul v-if="fileList.length" class="sh-upload-zone-list">
      <li
        v-for="file in fileList"
        :key="file.id"
        class="sh-upload-zone-item"
        :class="`is-${file.status}`"
      >
        <!-- File icon / preview thumbnail -->
        <div class="sh-upload-zone-item-icon">
          <img
            v-if="file.previewUrl"
            :src="file.previewUrl"
            class="sh-upload-zone-thumbnail"
            :alt="file.name"
          />
          <svg
            v-else
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
        </div>

        <!-- File info -->
        <div class="sh-upload-zone-item-body">
          <span class="sh-upload-zone-item-name" :title="file.name">{{
            file.name
          }}</span>
          <span class="sh-upload-zone-item-size">{{
            formatSize(file.size)
          }}</span>

          <!-- Progress bar -->
          <div
            v-if="file.status === 'uploading'"
            class="sh-upload-zone-progress"
          >
            <div
              class="sh-upload-zone-progress-bar"
              :style="{ width: `${file.progress}%` }"
            />
          </div>

          <!-- Error message -->
          <span v-if="file.status === 'error'" class="sh-upload-zone-error">
            {{ file.error ?? 'Upload failed' }}
          </span>
        </div>

        <!-- Status icon -->
        <div class="sh-upload-zone-item-status">
          <!-- Success checkmark -->
          <svg
            v-if="file.status === 'success'"
            class="sh-upload-zone-status-icon is-success"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
          <!-- Error x -->
          <svg
            v-else-if="file.status === 'error'"
            class="sh-upload-zone-status-icon is-error"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <!-- Remove button -->
        <button
          v-if="!disabled"
          class="sh-upload-zone-remove"
          type="button"
          @click.stop="removeFile(file)"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </li>
    </ul>

    <!-- Extra tip slot -->
    <div v-if="$slots.tip" class="sh-upload-zone-tip">
      <slot name="tip" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UploadZoneProps, UploadZoneEmits, UploadZoneFile } from './types'

defineOptions({ name: 'SHUploadZone' })

const props = withDefaults(defineProps<UploadZoneProps>(), {
  modelValue: () => [],
  accept: undefined,
  multiple: false,
  disabled: false,
  maxCount: 0,
  maxSize: 0,
  size: 'md',
})

const emit = defineEmits<UploadZoneEmits>()

defineSlots<{
  trigger?: () => unknown
  tip?: () => unknown
}>()

// ─── Internal state ────────────────────────────────────────────────

const inputRef = ref<HTMLInputElement | null>(null)
const isDragOver = ref(false)

const fileList = computed(() => props.modelValue ?? [])
const hasFiles = computed(() => fileList.value.length > 0)

// ─── Computed helpers ──────────────────────────────────────────────

const sizeClass = computed(() => {
  const map: Record<string, string> = {
    sm: 'sh-upload-zone-dropzone--sm',
    md: 'sh-upload-zone-dropzone--md',
    lg: 'sh-upload-zone-dropzone--lg',
  }
  return map[props.size] ?? 'sh-upload-zone-dropzone--md'
})

const hintText = computed(() => {
  const parts: string[] = []
  if (props.accept) parts.push(`Accepted: ${props.accept}`)
  if (props.maxSize) parts.push(`Max size: ${formatSize(props.maxSize)}`)
  if (props.multiple && props.maxCount)
    parts.push(`Max ${props.maxCount} files`)
  return parts.join(' · ')
})

// ─── File picker ───────────────────────────────────────────────────

const openFilePicker = () => {
  if (props.disabled) return
  inputRef.value?.click()
}

const handleFileInputChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files) return
  addFiles(Array.from(input.files))
  // Reset so the same file can be re-selected
  input.value = ''
}

// ─── Drag & drop ───────────────────────────────────────────────────

const handleDragEnter = () => {
  if (!props.disabled) isDragOver.value = true
}

const handleDragOver = () => {
  if (!props.disabled) isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  if (props.disabled) return
  const files = event.dataTransfer?.files
  if (files) addFiles(Array.from(files))
}

// ─── Core logic ────────────────────────────────────────────────────

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function addFiles(rawFiles: File[]) {
  // maxCount guard
  if (props.multiple && props.maxCount > 0) {
    const remaining = props.maxCount - fileList.value.length
    const excess = rawFiles.slice(remaining)
    if (excess.length) {
      emit('exceed-count', excess)
      rawFiles = rawFiles.slice(0, remaining)
    }
  }

  if (!props.multiple) {
    rawFiles = rawFiles.slice(0, 1)
  }

  const newFiles: UploadZoneFile[] = []

  for (const raw of rawFiles) {
    // maxSize guard
    if (props.maxSize > 0 && raw.size > props.maxSize) {
      emit('exceed-size', raw)
      continue
    }

    const file: UploadZoneFile = {
      id: generateId(),
      raw,
      name: raw.name,
      size: raw.size,
      type: raw.type,
      status: 'idle',
      progress: 0,
    }

    // Generate preview for images
    if (raw.type.startsWith('image/')) {
      file.previewUrl = URL.createObjectURL(raw)
    }

    newFiles.push(file)
  }

  if (!newFiles.length) return

  const updated = props.multiple ? [...fileList.value, ...newFiles] : newFiles

  emit('update:modelValue', updated)
  emit('change', updated)
}

function removeFile(target: UploadZoneFile) {
  // Revoke object URL if it was created
  if (target.previewUrl) URL.revokeObjectURL(target.previewUrl)

  const updated = fileList.value.filter((f) => f.id !== target.id)
  emit('update:modelValue', updated)
  emit('remove', target)
}

defineExpose({ openFilePicker })
</script>

<style scoped>
/* ── Wrapper ── */
.sh-upload-zone {
  @apply w-full flex flex-col gap-[var(--sh-spacing-sm)];
}

/* ── Drop zone ── */
.sh-upload-zone-dropzone {
  @apply relative flex flex-col items-center justify-center;
  @apply rounded-[length:var(--sh-radius-lg)];
  @apply border-2 border-dashed border-border.base;
  @apply bg-bg.primary;
  @apply cursor-pointer sh-interactive;
  @apply select-none;
}

.sh-upload-zone-dropzone:not(.is-disabled):hover,
.sh-upload-zone-dropzone.is-dragover {
  @apply border-primary bg-primary.fade;
}

.sh-upload-zone-dropzone.is-disabled {
  @apply sh-disabled border-border.base;
}

/* Sizes */
.sh-upload-zone-dropzone--sm {
  @apply px-[var(--sh-spacing-md)] py-[var(--sh-spacing-lg)];
}

.sh-upload-zone-dropzone--md {
  @apply px-[var(--sh-spacing-lg)] py-[var(--sh-spacing-xl)];
}

.sh-upload-zone-dropzone--lg {
  @apply px-[var(--sh-spacing-xl)] py-[var(--sh-spacing-2xl)];
}

/* Hidden native input */
.sh-upload-zone-input {
  @apply absolute inset-0 opacity-0 w-0 h-0 pointer-events-none;
}

/* Zone content */
.sh-upload-zone-content {
  @apply flex flex-col items-center gap-[var(--sh-spacing-xs)];
}

.sh-upload-zone-icon {
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-md);
  @apply text-text.primary;
}

.sh-upload-zone-dropzone:not(.is-disabled):hover .sh-upload-zone-icon,
.sh-upload-zone-dropzone.is-dragover .sh-upload-zone-icon {
  @apply text-primary;
}

.sh-upload-zone-label {
  @apply text-[length:var(--sh-font-size-sm)] text-text.primary m-0;
}

.sh-upload-zone-dropzone:not(.is-disabled):hover .sh-upload-zone-label,
.sh-upload-zone-dropzone.is-dragover .sh-upload-zone-label {
  @apply text-primary;
}

.sh-upload-zone-hint {
  @apply text-[length:var(--sh-font-size-xs)] text-text.primary m-0 opacity-70;
}

/* ── File list ── */
.sh-upload-zone-list {
  @apply list-none m-0 p-0 flex flex-col gap-[var(--sh-spacing-xs)];
}

.sh-upload-zone-item {
  @apply flex items-center gap-[var(--sh-spacing-sm)] overflow-hidden;
  @apply bg-bg.primary rounded-[length:var(--sh-radius-md)];
  @apply border border-solid border-border.base;
  @apply px-[var(--sh-spacing-md)] py-[var(--sh-spacing-xs)];
  @apply transition-all duration-300 ease-in-out;
}

.sh-upload-zone-item.is-error {
  @apply border-status.danger;
}

.sh-upload-zone-item.is-success {
  @apply border-border.base;
}

/* Icon / thumbnail */
.sh-upload-zone-item-icon {
  width: var(--sh-component-size-sm);
  height: var(--sh-component-size-sm);
  @apply flex items-center justify-center flex-shrink-0 text-text.primary;
}

.sh-upload-zone-item-icon svg {
  width: var(--sh-font-size-lg);
  height: var(--sh-font-size-lg);
}

.sh-upload-zone-thumbnail {
  @apply w-full h-full object-cover rounded-[length:var(--sh-radius-sm)];
}

/* Body */
.sh-upload-zone-item-body {
  @apply flex-1 flex flex-col gap-[2px] min-w-0 overflow-hidden;
}

.sh-upload-zone-item-name {
  @apply text-[length:var(--sh-font-size-sm)] text-text.base truncate;
  max-width: 100%;
}

.sh-upload-zone-item-size {
  @apply text-[length:var(--sh-font-size-xs)] text-text.primary;
}

/* Progress */
.sh-upload-zone-progress {
  @apply w-full h-[3px] bg-bg.secondary rounded-[length:var(--sh-radius-full)] overflow-hidden;
}

.sh-upload-zone-progress-bar {
  @apply h-full bg-primary transition-all duration-300 ease-in-out;
  background-color: var(--sh-primary);
}

/* Error */
.sh-upload-zone-error {
  @apply text-[length:var(--sh-font-size-xs)] text-status.danger;
}

/* Status icon */
.sh-upload-zone-status-icon {
  width: var(--sh-font-size-md);
  height: var(--sh-font-size-md);
}

.sh-upload-zone-status-icon.is-success {
  @apply text-status.success;
}

.sh-upload-zone-status-icon.is-error {
  @apply text-status.danger;
}

/* Remove button */
.sh-upload-zone-remove {
  @apply flex items-center justify-center;
  @apply text-text.primary sh-interactive cursor-pointer;
  @apply bg-transparent border-none outline-none p-[var(--sh-spacing-xs)];
  @apply rounded-[length:var(--sh-radius-sm)];
}

.sh-upload-zone-remove:hover {
  @apply text-status.danger bg-status.danger.fade;
}

.sh-upload-zone-remove svg {
  width: var(--sh-font-size-sm);
  height: var(--sh-font-size-sm);
}

/* ── Tip slot ── */
.sh-upload-zone-tip {
  @apply text-[length:var(--sh-font-size-xs)] text-text.primary;
}
</style>
