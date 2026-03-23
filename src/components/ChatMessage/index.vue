<template>
  <div class="sh-chat-message" :class="[`sh-chat-message--${position}`]">
    <!-- Avatar -->
    <div class="sh-chat-message__avatar">
      <slot name="avatar">
        <div v-if="avatar" class="sh-chat-message__avatar-img-wrapper">
          <img
            :src="avatar"
            :alt="username || avatarFallback || ''"
            class="sh-chat-message__avatar-img"
          />
        </div>
        <div v-else class="sh-chat-message__avatar-fallback">
          {{ computedFallback }}
        </div>
      </slot>
    </div>

    <!-- Body -->
    <div class="sh-chat-message__body">
      <!-- Header: username + time -->
      <div class="sh-chat-message__header">
        <slot name="username">
          <span v-if="username" class="sh-chat-message__username">
            {{ username }}
          </span>
        </slot>
        <slot name="time">
          <span v-if="time" class="sh-chat-message__time">{{ time }}</span>
        </slot>
      </div>

      <!-- Bubble -->
      <div
        class="sh-chat-message__bubble"
        :class="[`sh-chat-message__bubble--${position}`, statusClass]"
      >
        <slot name="content">
          <span class="sh-chat-message__content">{{ content }}</span>
        </slot>
      </div>

      <!-- Status indicator (for right/self messages) -->
      <div
        v-if="position === 'right' && status"
        class="sh-chat-message__status"
      >
        <span
          v-if="status === 'sending'"
          class="sh-chat-message__status-text sh-chat-message__status-text--sending"
        >
          傳送中…
        </span>
        <span
          v-else-if="status === 'failed'"
          class="sh-chat-message__status-text sh-chat-message__status-text--failed"
        >
          傳送失敗
        </span>
        <span
          v-else-if="status === 'sent'"
          class="sh-chat-message__status-text sh-chat-message__status-text--sent"
        >
          已傳送
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ChatMessageProps, ChatMessageSlots } from './types'

defineOptions({ name: 'SHChatMessage' })

const props = withDefaults(defineProps<ChatMessageProps>(), {
  position: 'left',
})

defineSlots<ChatMessageSlots>()

const computedFallback = computed(() => {
  if (props.avatarFallback) return props.avatarFallback
  if (props.username) return props.username.charAt(0).toUpperCase()
  return '?'
})

const statusClass = computed(() => {
  if (props.status === 'sending') return 'sh-chat-message__bubble--sending'
  if (props.status === 'failed') return 'sh-chat-message__bubble--failed'
  return ''
})
</script>

<style lang="postcss" scoped>
.sh-chat-message {
  @apply flex items-start gap-3 w-full;
}

/* ---- Right (self) layout: reverse direction ---- */
.sh-chat-message--right {
  @apply flex-row-reverse;
}

/* ---- Avatar ---- */
.sh-chat-message__avatar {
  @apply flex-shrink-0;
}

.sh-chat-message__avatar-img-wrapper {
  @apply w-10 h-10 rounded-full overflow-hidden;
}

.sh-chat-message__avatar-img {
  @apply w-full h-full object-cover;
}

.sh-chat-message__avatar-fallback {
  @apply w-10 h-10 rounded-full flex items-center justify-center;
  @apply bg-primary.fade text-primary font-semibold text-sm select-none;
}

/* ---- Body ---- */
.sh-chat-message__body {
  @apply flex flex-col gap-1 max-w-[70%];
}

/* Right-aligned body text alignment */
.sh-chat-message--right .sh-chat-message__body {
  @apply items-end;
}

/* ---- Header ---- */
.sh-chat-message__header {
  @apply flex items-baseline gap-2;
}

.sh-chat-message--right .sh-chat-message__header {
  @apply flex-row-reverse;
}

.sh-chat-message__username {
  @apply text-text.base font-semibold;
  font-size: var(--sh-font-size-sm);
}

.sh-chat-message__time {
  @apply text-text.primary;
  font-size: var(--sh-font-size-xs);
}

/* ---- Bubble ---- */
.sh-chat-message__bubble {
  @apply px-4 py-2 rounded-[var(--sh-radius-lg)] text-text.base break-words;
  font-size: var(--sh-font-size-sm);
  line-height: 1.6;
}

/* Incoming bubble (left) */
.sh-chat-message__bubble--left {
  @apply bg-bg.secondary border border-solid border-border.base;
  border-top-left-radius: var(--sh-radius-sm);
}

/* Outgoing bubble (right) */
.sh-chat-message__bubble--right {
  @apply bg-primary.fade text-primary;
  border-top-right-radius: var(--sh-radius-sm);
}

/* Sending state: slightly dimmed */
.sh-chat-message__bubble--sending {
  @apply opacity-60;
}

/* Failed state: error border */
.sh-chat-message__bubble--failed {
  @apply border border-solid border-status.danger;
}

/* ---- Status ---- */
.sh-chat-message__status {
  @apply mt-0.5;
}

.sh-chat-message__status-text {
  font-size: var(--sh-font-size-xs);
}

.sh-chat-message__status-text--sending {
  @apply text-text.primary;
}

.sh-chat-message__status-text--sent {
  @apply text-text.primary;
}

.sh-chat-message__status-text--failed {
  @apply text-status.danger;
}
</style>
