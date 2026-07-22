<template>
  <SHConfigProvider>
    <SHNotificationProvider>
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
          <SButton class="w-full" text type="success">
            {{ showCode ? '隱藏代碼' : '顯示代碼' }}
          </SButton>
        </div>
      </div>
    </SHNotificationProvider>
  </SHConfigProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SButton from '@/components/Button/index.vue'

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

.s-component-container :deep(.sh-button) {
  @apply px-4 py-2 rounded-lg font-medium transition-colors duration-300 cursor-pointer;
}

.s-component-container :deep(.sh-button--primary) {
  @apply bg-primary text-white hover:bg-primary-dark;
}

.s-component-container :deep(.sh-button--success) {
  @apply bg-secondary text-white hover:bg-secondary-dark;
}

.s-component-container :deep(.sh-button--warning) {
  @apply bg-yellow-500 text-white hover:bg-yellow-600;
}

.s-component-container :deep(.sh-button--danger) {
  @apply bg-red-500 text-white hover:bg-red-600;
}

.s-component-container :deep(.sh-button--info) {
  @apply bg-gray-500 text-white hover:bg-gray-600;
}

.s-component-container :deep(.sh-button--default) {
  @apply bg-white text-gray-700 border border-gray-300 hover:bg-gray-100;
}

.s-component-container :deep(.sh-button--large) {
  @apply text-lg px-6 py-3;
}

.s-component-container :deep(.sh-button--small) {
  @apply text-sm px-3 py-1;
}

.s-component-container :deep(.sh-button.is-disabled) {
  @apply opacity-60 cursor-not-allowed;
}

.shelter-demo-code {
  @apply border-t border-gray-200 p-4;
}

/* Reset VitePress .vp-doc table styles inside demo preview.
   Uses two-class prefix (.shelter-demo .shelter-demo-preview) to get
   specificity (0,2,1) which beats .vp-doc table (0,1,1) and
   .vp-doc table td (0,1,2) regardless of stylesheet load order. */
.shelter-demo .shelter-demo-preview table {
  border-spacing: 0;
  border: none;
  background: none;
  margin: 0;
  width: auto;
  display: table;
}

.shelter-demo .shelter-demo-preview tr {
  background: none;
  border: none;
}

.shelter-demo .shelter-demo-preview th,
.shelter-demo .shelter-demo-preview td {
  border: none;
  padding: 0;
  background: none;
}
</style>
