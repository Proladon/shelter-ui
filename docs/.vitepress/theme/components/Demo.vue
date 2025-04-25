<template>
  <div class="shelter-demo">
    <div class="shelter-demo-preview">
      <div class="shelter-demo-content s-component-container">
        <slot></slot>
      </div>
    </div>
    <div class="shelter-demo-code" v-if="showCode">
      <slot name="code"></slot>
    </div>
    <div class="shelter-demo-footer" @click="toggleCode">
      <span class="shelter-demo-toggle">
        {{ showCode ? '隱藏代碼' : '顯示代碼' }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showCode = ref(false)

const toggleCode = () => {
  showCode.value = !showCode.value
}
</script>

<style>
.shelter-demo {
  @apply border border-gray-200 rounded-lg mb-6 overflow-hidden;
}

.shelter-demo-preview {
  @apply p-6;
}

.shelter-demo-content {
  @apply flex justify-center items-center;
}

.s-component-container :deep(.s-button) {
  @apply px-4 py-2 rounded-lg font-medium transition-colors duration-300 cursor-pointer;
}

.s-component-container :deep(.s-button--primary) {
  @apply bg-primary text-white hover:bg-primary-dark;
}

.s-component-container :deep(.s-button--success) {
  @apply bg-secondary text-white hover:bg-secondary-dark;
}

.s-component-container :deep(.s-button--warning) {
  @apply bg-yellow-500 text-white hover:bg-yellow-600;
}

.s-component-container :deep(.s-button--danger) {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.s-component-container :deep(.s-button--info) {
  @apply bg-gray-500 text-white hover:bg-gray-600;
}

.s-component-container :deep(.s-button--default) {
  @apply bg-white text-gray-700 border border-gray-300 hover:bg-gray-100;
}

.s-component-container :deep(.s-button--large) {
  @apply text-lg px-6 py-3;
}

.s-component-container :deep(.s-button--small) {
  @apply text-sm px-3 py-1;
}

.s-component-container :deep(.s-button.is-disabled) {
  @apply opacity-60 cursor-not-allowed;
}

/* Input 组件样式 */
.s-component-container :deep(.s-input-wrapper) {
  @apply inline-block w-full;
}

.s-component-container :deep(.s-input-container) {
  @apply relative flex items-center w-full;
}

.s-component-container :deep(.s-input) {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300;
}

.s-component-container :deep(.s-input--with-prefix) {
  @apply pl-10;
}

.s-component-container :deep(.s-input--with-suffix) {
  @apply pr-10;
}

.s-component-container :deep(.s-input--large) {
  @apply text-lg px-5 py-3;
}

.s-component-container :deep(.s-input--small) {
  @apply text-sm px-3 py-1;
}

.s-component-container :deep(.s-input-prefix) {
  @apply absolute left-3 flex items-center justify-center text-gray-500;
}

.s-component-container :deep(.s-input-suffix) {
  @apply absolute right-3 flex items-center justify-center text-gray-500;
}

.s-component-container :deep(.s-input-clear) {
  @apply absolute right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer;
}

.s-component-container :deep(.s-input-clear-icon) {
  @apply text-lg font-light;
}

.s-component-container :deep(.s-input-wrapper.is-disabled .s-input) {
  @apply bg-gray-100 text-gray-400 cursor-not-allowed;
}

.s-component-container :deep(.s-input-wrapper.is-disabled .s-input-prefix),
.s-component-container :deep(.s-input-wrapper.is-disabled .s-input-suffix),
.s-component-container :deep(.s-input-wrapper.is-disabled .s-input-clear) {
  @apply text-gray-300 cursor-not-allowed;
}

.shelter-demo-code {
  @apply border-t border-gray-200 p-4 ;
}

.shelter-demo-footer {
  @apply border-t border-gray-200 p-2 text-center text-sm text-gray-500 cursor-pointer hover:bg-gray-50;
}

.shelter-demo-toggle {
  @apply inline-flex items-center;
}
</style>