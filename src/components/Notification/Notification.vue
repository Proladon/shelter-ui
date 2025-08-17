<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0 scale-95"
    enter-to-class="translate-x-0 opacity-100 scale-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-x-0 opacity-100 scale-100"
    leave-to-class="translate-x-full opacity-0 scale-95"
  >
    <div
      v-if="visible"
      ref="notificationRef"
      class="sh-notification"
      :class="[
        `sh-notification--${config.type}`,
        {
          'sh-notification--closable': config.closable,
        },
      ]"
      @click="handleClick"
    >
      <!-- 圖標區域 -->
      <div class="sh-notification__icon">
        <slot name="icon">
          <component
            :is="config.icon || iconComponent"
            class="sh-notification__icon-component"
            :color="config.iconColor || iconColor"
          />
        </slot>
      </div>

      <!-- 內容區域 -->
      <div class="sh-notification__content">
        <!-- 標題 -->
        <div v-if="config.title" class="sh-notification__title">
          <slot name="title">{{ config.title }}</slot>
        </div>

        <!-- 訊息內容 -->
        <div class="sh-notification__message">
          <slot>{{ config.message }}</slot>
        </div>

        <!-- 操作區域 -->
        <div v-if="$slots.actions" class="sh-notification__actions">
          <slot name="actions" />
        </div>
      </div>

      <!-- 關閉按鈕 -->
      <button
        v-if="config.closable"
        class="sh-notification__close"
        @click.stop="handleClose"
        :aria-label="'關閉通知'"
      >
        <IconX :size="16" color="var(--sh-status-info)" />
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch, onUnmounted } from 'vue'
import { IconX } from '@tabler/icons-vue'
import type { NotificationProps, NotificationEmits } from './types'
import { notificationIconMap } from './_icon-map'
import { useMouseInElement } from '@vueuse/core'
import { useTemplateRef } from 'vue'
import { getCssVar } from '@/utils/style'

defineOptions({
  name: 'SHNotification',
})

const props = withDefaults(defineProps<NotificationProps>(), {
  onClose: undefined,
})

const emit = defineEmits<NotificationEmits>()

const visible = ref(false)
const notificationEl = useTemplateRef<HTMLDivElement>('notificationRef')
const { isOutside } = useMouseInElement(notificationEl)

let timer: number | null = null

const iconComponent = computed(() => {
  return notificationIconMap[props.config.type || 'info']
})

const iconColor = computed(() => {
  const statusMap = {
    info: 'info',
    success: 'success',
    warning: 'warning',
    error: 'danger',
  }

  return getCssVar(`sh-status-${statusMap[props.config.type || 'info']}`)
})

const handleClick = () => {
  if (props.config.onClick) {
    props.config.onClick()
  }
  emit('click')
}

const handleClose = () => {
  visible.value = false

  // 延遲發送關閉事件，等待動畫完成
  setTimeout(() => {
    if (props.onClose) {
      props.onClose(props.config.key)
    }
    emit('close', props.config.key)

    if (props.config.onClose) {
      props.config.onClose()
    }
  }, 200)
}

const startAutoCloseTimer = () => {
  if (props.config.duration && props.config.duration > 0) {
    timer = window.setTimeout(() => {
      handleClose()
    }, props.config.duration)
  }
}

const clearAutoCloseTimer = () => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
}

onMounted(() => {
  visible.value = true
  startAutoCloseTimer()
})

// 監聽 isOutside，滑鼠進入通知元件時暫停自動關閉；滑鼠離開時恢復
watch(isOutside, (outside) => {
  if (outside === false) {
    // mouse is inside element
    clearAutoCloseTimer()
  } else if (outside === true) {
    // mouse left element
    startAutoCloseTimer()
  }
})

onUnmounted(() => {
  clearAutoCloseTimer()
})
</script>

<style lang="scss" scoped>
.sh-notification {
  @apply relative flex items-start gap-3 p-4 rounded-lg shadow-lg;
  @apply backdrop-blur-md;
  @apply bg-bg.primary border border-solid border-border.base;
  @apply min-w-[320px] max-w-[400px];
  @apply cursor-pointer select-none;
  @apply transition-all duration-200;

  &:hover {
    @apply shadow-xl;
    @apply -translate-y-0.5;
  }

  &--info {
    @apply border-primary bg-primary.fade;

    .sh-notification__icon-component {
      @apply text-primary;
    }
  }

  &--success {
    @apply border-status.success bg-status.success.fade;

    .sh-notification__icon-component {
      @apply text-status.success;
    }
  }

  &--warning {
    @apply border-status.warning bg-status.warning.fade;

    .sh-notification__icon-component {
      @apply text-status.warning;
    }
  }

  &--error {
    @apply border-status.danger bg-status.danger.fade;

    .sh-notification__icon-component {
      @apply text-status.danger;
    }
  }

  &--closable {
    @apply pr-10;
  }

  &__icon {
    @apply flex-shrink-0 flex items-center justify-center w-6 h-6 mt-0.5;
  }

  &__icon-component {
    @apply w-5 h-5;
  }

  &__content {
    @apply flex-1 min-w-0;
  }

  &__title {
    @apply font-semibold text-gray-300 mb-1;
    @apply text-sm leading-5;
  }

  &__message {
    @apply text-gray-400 text-sm leading-5;
  }

  &__actions {
    @apply mt-3 flex gap-2;
  }

  &__close {
    @apply absolute top-3 right-3;
    @apply w-5 h-5 flex items-center justify-center;
    @apply text-text.base hover:text-text.base;
    @apply rounded transition-colors;
    @apply outline-none;

    &:hover {
      @apply text-text.base.lighten;
    }
  }
}
</style>
