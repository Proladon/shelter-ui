<template>
  <button
    class="sh-button"
    :class="[variantClass, sizeClass, { 'sh-disabled': disabled || loading }]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <Spinner
      v-if="loading"
      :color="spinnerColor"
      :size="size === 'default' ? 20 : size"
    />
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ButtonProps, ButtonEmits } from './types'
import Spinner from '@/components/Spinner/index.vue'

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'default',
  disabled: false,
  loading: false,
  text: false,
  ghost: false,
  dashed: false,
  outline: false,
  borderd: false,
})

const emit = defineEmits<ButtonEmits>()

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', event)
}

const variantClass = computed(() => {
  if (props.ghost) return `sh-ghost-${props.type}`
  if (props.text) return `sh-text-${props.type}`
  if (props.outline) return `sh-outline-${props.type}`
  if (props.dashed) return `sh-dashed-${props.type}`
  if (props.borderd) return `sh-bordered-${props.type}`
  return `sh-fill-${props.type}`
})

const sizeMap: Record<string, string> = {
  large: 'sh-size-lg',
  default: 'sh-size-md',
  small: 'sh-size-sm',
}

const sizeClass = computed(() => sizeMap[props.size] ?? 'sh-size-md')

const spinnerColor = computed(() => {
  if (props.type === 'default') return 'var(--sh-text-base)'
  if (['success', 'warning', 'danger', 'info'].includes(props.type)) {
    return `var(--sh-status-${props.type})`
  }
  return `var(--sh-${props.type})`
})
</script>

<style scoped lang="postcss">
.sh-button {
  @apply relative font-medium flex items-center justify-center border border-solid sh-rounded-md sh-interactive;
}

.sh-button :deep(.loader) {
  margin-right: 0.25rem; /* mr-1 */
}
</style>
