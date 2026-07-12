<template>
  <PinInputRoot
    v-bind="rootProps"
    class="sh-pin-input"
    :class="[`sh-pin-input--${size}`, { 'sh-pin-input--disabled': disabled }]"
    @update:model-value="handleUpdate"
    @complete="handleComplete"
  >
    <PinInputInput
      v-for="(_, index) in length"
      :key="index"
      :index="index"
      class="sh-pin-input__cell"
      :class="{ 'sh-pin-input__cell--disabled': disabled }"
    />
  </PinInputRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PinInputRoot, PinInputInput } from 'reka-ui'
import type { PinInputProps, PinInputEmits } from './types'

defineOptions({
  name: 'SHPinInput',
})

const props = withDefaults(defineProps<PinInputProps>(), {
  value: undefined,
  length: 6,
  placeholder: '○',
  type: 'text',
  mask: false,
  disabled: false,
  size: 'md',
  otp: false,
})

const emit = defineEmits<PinInputEmits>()

const rootProps = computed(() => ({
  modelValue: props.value,
  placeholder: props.placeholder,
  type: props.type,
  mask: props.mask,
  disabled: props.disabled,
  otp: props.otp,
}))

const handleUpdate = (value: string[]) => {
  emit('update:value', value)
  emit('change', value)
}

const handleComplete = (value: string[]) => {
  emit('complete', value)
}
</script>

<style scoped>
.sh-pin-input {
  @apply inline-flex items-center gap-[var(--sh-spacing-sm)];
}

.sh-pin-input__cell {
  @apply flex items-center justify-center text-center outline-none;
  @apply bg-bg.primary border border-solid border-border.base rounded-md;
  @apply text-text.base;
  @apply transition duration-300 ease-in-out;
  @apply caret-primary;
}

.sh-pin-input__cell:focus {
  @apply border-primary outline-none;
  box-shadow: 0 0 0 2px var(--sh-primary-fade);
}

.sh-pin-input:not(.sh-pin-input--disabled)
  .sh-pin-input__cell:hover:not(:focus) {
  @apply border-primary;
}

/* Size variants */
.sh-pin-input--sm .sh-pin-input__cell {
  width: var(--sh-component-size-sm);
  height: var(--sh-component-size-sm);
  font-size: var(--sh-font-size-sm);
}

.sh-pin-input--md .sh-pin-input__cell {
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-md);
  font-size: var(--sh-font-size-md);
}

.sh-pin-input--lg .sh-pin-input__cell {
  width: var(--sh-component-size-lg);
  height: var(--sh-component-size-lg);
  font-size: var(--sh-font-size-lg);
}

/* Disabled state */
.sh-pin-input--disabled .sh-pin-input__cell {
  @apply bg-bg.secondary opacity-60 cursor-not-allowed;
}
</style>
