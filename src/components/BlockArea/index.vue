<template>
  <div class="s-block-area" :class="{ disabled: !active }">
    <!-- 原始內容 -->
    <div class="s-block-area__content">
      <slot></slot>
    </div>

    <!-- 遮罩層 -->
    <template v-if="!active">
      <div class="s-block-area__mask" />

      <div class="s-block-area__overlay">
        <!-- 圖示或文字顯示區域 -->
        <div
          v-if="icon || text || $slots.icon || $slots.text"
          class="s-block-area__indicator"
        >
          <slot name="icon">
            <component v-if="icon" :is="icon" class="s-block-area__icon" />
          </slot>
          <slot name="text">
            <span v-if="text" class="s-block-area__text">{{ text }}</span>
          </slot>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { BlockAreaProps } from './types'

defineOptions({
  name: 'SHBlockArea',
})

withDefaults(defineProps<BlockAreaProps>(), {
  active: true,
})
</script>

<style lang="postcss">
.s-block-area {
  @apply relative;

  &.disabled {
    .s-block-area__content {
      @apply pointer-events-none select-none;
    }
  }
}

.s-block-area__content {
  @apply relative z-1;
}

.s-block-area__mask {
  @apply absolute inset-0 z-2;
  @apply backdrop-blur-sm;
  background-color: rgba(0, 0, 0, 0.55);
}

.s-block-area__overlay {
  @apply absolute inset-0 z-3 flex items-center justify-center;
}

.s-block-area__indicator {
  @apply flex flex-col items-center gap-2;
}

.s-block-area__icon {
  @apply w-6 h-6;
}

.s-block-area__text {
  @apply text-sm font-medium text-white;
}
</style>
