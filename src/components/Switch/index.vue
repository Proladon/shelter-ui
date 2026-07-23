<template>
  <label
    class="shelter-switch-wrapper"
    :class="{ 'shelter-switch-wrapper--disabled': disabled }"
  >
    <SwitchRoot
      class="shelter-switch-root"
      :class="sizeClass"
      :model-value="value"
      :disabled="disabled"
      @update:model-value="handleUpdate"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
    >
      <SwitchThumb class="shelter-switch-thumb" />
    </SwitchRoot>
    <span v-if="$slots.default" class="shelter-switch-label">
      <slot />
    </span>
  </label>
</template>

<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { useComponentSize } from '@/composables/useComponentSize'
import type { SwitchProps, SwitchEmits } from './types'

defineOptions({ name: 'SHSwitch' })

const props = withDefaults(defineProps<SwitchProps>(), {
  value: false,
  disabled: false,
  size: 'medium',
  readonly: false,
})

const emit = defineEmits<SwitchEmits>()

const sizeClass = useComponentSize('sh-switch', () => props.size)

const handleUpdate = (value: boolean) => {
  if (props.disabled || props.readonly) return
  emit('update:value', value)
  emit('change', value)
}
</script>

<style scoped lang="postcss">
.shelter-switch-wrapper {
  @apply inline-flex items-center gap-2 cursor-pointer;
}

.shelter-switch-wrapper--disabled {
  @apply cursor-not-allowed;
}

.shelter-switch-label {
  @apply text-sm text-text.base select-none;
}

.shelter-switch-root {
  @apply border-border.base border-1 border-solid;
  /* fixed track dimensions: switch's intrinsic control size, not on the general component-size scale */
  @apply w-[32px] h-[20px] shadow-sm flex rounded-full relative transition-[background] border;
  @apply data-[state=unchecked]:(bg-bg.secondary) data-[state=checked]:(bg-primary);
  @apply border-bg.secondary data-[state=checked]:(border-border.base);
  @apply focus-within:outline-none;
  @apply data-[disabled]:(opacity-60 cursor-not-allowed);
  &:focus-within {
    box-shadow: var(--sh-focus-ring);
  }
}

.shelter-switch-thumb {
  @apply w-3.5 h-3.5 my-auto bg-text.base text-xs flex items-center justify-center shadow-xl rounded-full transition-transform translate-x-0.5 will-change-transform;
  @apply data-[state=checked]:(translate-x-full bg-bg.secondary);
}

/*
 * Size variants. Medium (above) is the unchanged default baseline.
 * The checked-state translate-x is solved per size so the thumb keeps the
 * same inset from the track edge in both resting and checked positions
 * (resting inset == translate-x-0.5 == 2px, constant across sizes; border
 * stays border-1 == 1px, also constant):
 *   translateX = trackWidth - (2 * borderWidth) - thumbWidth - inset
 *   medium: 32 - 2 - 14 - 2 = 14px (== translate-x-full, unchanged baseline)
 *   small:  24 - 2 - 10 - 2 = 10px (== translate-x-2.5)
 *   large:  40 - 2 - 18 - 2 = 18px (== translate-x-[18px])
 */
.sh-switch--small.shelter-switch-root {
  @apply w-6 h-3.5;
}
.sh-switch--small .shelter-switch-thumb {
  @apply w-2.5 h-2.5;
  @apply data-[state=checked]:(translate-x-2.5);
}

.sh-switch--large.shelter-switch-root {
  @apply w-10 h-6;
}
.sh-switch--large .shelter-switch-thumb {
  @apply w-[18px] h-[18px];
  @apply data-[state=checked]:(translate-x-[18px]);
}
</style>
