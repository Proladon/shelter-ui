<template>
  <div class="max-w-md">
    <SHInputGroup>
      <!-- Header: context chips -->
      <SHInputGroupAddon align="block-start">
        <button class="context-chip">
          <IconAt :size="13" />
          <span>Add context</span>
        </button>
      </SHInputGroupAddon>

      <!-- Main textarea -->
      <SHTextarea
        v-model:value="message"
        placeholder="Ask, search, or make anything…"
        :rows="3"
        resize="none"
      />

      <!-- Footer toolbar -->
      <SHInputGroupAddon align="block-end">
        <button class="toolbar-icon-btn" title="Attach file">
          <IconPaperclip :size="15" />
        </button>
        <button class="toolbar-pill">
          Auto
          <IconChevronDown :size="11" />
        </button>
        <button class="toolbar-pill">
          <IconWorld :size="11" />
          All Sources
        </button>
        <button
          class="send-btn"
          style="margin-left: auto"
          :disabled="!message.trim()"
        >
          <IconArrowUp :size="15" />
        </button>
      </SHInputGroupAddon>
    </SHInputGroup>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  IconAt,
  IconPaperclip,
  IconChevronDown,
  IconWorld,
  IconArrowUp,
} from '@tabler/icons-vue'
import SHInputGroup from '../index.vue'
import SHInputGroupAddon from '../InputGroupAddon.vue'
import SHTextarea from '@/components/Textarea/index.vue'

const message = ref('')
</script>

<style scoped>
.context-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: var(--sh-radius-sm);
  background: var(--sh-bg-secondary);
  border: 1px solid var(--sh-border-base);
  color: var(--sh-text-secondary);
  font-size: var(--sh-font-size-sm);
  cursor: pointer;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.context-chip:hover {
  background: var(--sh-bg-tertiary);
  border-color: var(--sh-primary);
  color: var(--sh-primary);
}

.toolbar-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: var(--sh-radius-sm);
  background: transparent;
  border: none;
  color: var(--sh-text-secondary);
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
}

.toolbar-icon-btn:hover {
  background: var(--sh-bg-secondary);
  color: var(--sh-text-primary);
}

.toolbar-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: var(--sh-radius-sm);
  background: var(--sh-bg-secondary);
  border: 1px solid var(--sh-border-base);
  color: var(--sh-text-secondary);
  font-size: var(--sh-font-size-sm);
  cursor: pointer;
  transition: background 0.2s;
}

.toolbar-pill:hover {
  background: var(--sh-bg-tertiary);
}

.send-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--sh-primary);
  border: none;
  color: #fff;
  cursor: pointer;
  transition:
    background 0.2s,
    opacity 0.2s;
}

.send-btn:disabled {
  background: var(--sh-bg-secondary);
  color: var(--sh-text-disabled);
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  opacity: 0.85;
}
</style>
