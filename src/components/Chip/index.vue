<template>
  <div
    v-if="visible"
    class="sh-chip"
    :class="{ 'sh-chip--disabled': disabled }"
    :tabindex="removable && !disabled ? 0 : undefined"
    @keydown="onKeyDown"
  >
    <!-- 圖片 -->
    <img v-if="image" :src="image" class="sh-chip__image" alt="" />

    <!-- 圖示插槽或圖示組件 -->
    <slot name="icon">
      <component v-if="icon" :is="icon" class="sh-chip__icon" />
    </slot>

    <!-- 標籤文字或預設插槽 -->
    <slot name="default">
      <span v-if="label" class="sh-chip__label">{{ label }}</span>
    </slot>

    <!-- 移除圖示 -->
    <slot
      v-if="removable"
      name="remove-icon"
      :remove-callback="remove"
      :keydown-callback="onKeyDown"
    >
      <component
        :is="removeIcon || XIcon"
        class="sh-chip__remove-icon"
        @click="remove"
        @keydown="onKeyDown"
      />
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconX } from '@tabler/icons-vue'
import type { ChipProps, ChipEmits } from './types'

defineOptions({
  name: 'SHChip',
})

const props = withDefaults(defineProps<ChipProps>(), {
  label: '',
  image: '',
  removable: false,
  disabled: false,
})

const emit = defineEmits<ChipEmits>()

const visible = ref(true)
const XIcon = IconX

const remove = (event: Event) => {
  if (props.disabled) return
  visible.value = false
  emit('remove', event)
  emit('removeicon', event)
}

const onKeyDown = (event: KeyboardEvent) => {
  if (props.removable && (event.key === 'Backspace' || event.key === 'Enter')) {
    remove(event)
  }
}
</script>

<style lang="postcss" scoped>
.sh-chip {
  @apply inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200;
  @apply bg-bg.primary text-text.base;
  @apply border-none shadow-sm;
}

.sh-chip:hover {
  @apply opacity-80;
}

.sh-chip:focus {
  @apply outline-none;
}

.sh-chip--disabled {
  @apply opacity-50 pointer-events-none cursor-not-allowed;
}

.sh-chip__image {
  @apply w-6 h-6 rounded-full object-cover;
}

.sh-chip__icon {
  @apply w-4 h-4;
}

.sh-chip__label {
  @apply flex-1;
}

.sh-chip__remove-icon {
  @apply w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity;
}
</style>
