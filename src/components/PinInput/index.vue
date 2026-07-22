<template>
  <PinInputRoot
    v-bind="rootProps"
    class="sh-pin-input"
    :class="[
      `sh-pin-input--${size}`,
      {
        'sh-pin-input--disabled': disabled,
        'sh-pin-input--readonly': readonly,
      },
    ]"
    @update:model-value="handleUpdate"
    @complete="handleComplete"
    @keydown.capture="handleReadonlyKeydownCapture"
    @paste.capture="handleReadonlyPasteCapture"
  >
    <PinInputInput
      v-for="(_, index) in length"
      :key="index"
      :index="index"
      :readonly="readonly"
      class="sh-pin-input__cell"
      :class="{
        'sh-pin-input__cell--disabled': disabled,
        'sh-pin-input__cell--readonly': readonly,
      }"
      @focus="emit('focus', $event)"
      @blur="emit('blur', $event)"
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
  readonly: false,
  size: 'medium',
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

/**
 * reka-ui's PinInputInput drives Backspace / Delete / paste through its own
 * keydown/paste listeners bound directly on each cell's native <input>. Those
 * handlers call preventDefault() and mutate reka-ui's internal (passive)
 * v-model state directly — independent of the native `readonly` HTML
 * attribute, which only blocks direct typing/IME/autofill/drag-drop. Native
 * `readonly` alone is therefore not enough to make PinInput read-only.
 *
 * To block the remaining cases without forking reka-ui, intercept during the
 * CAPTURE phase on PinInputRoot's wrapping element (an ancestor of every
 * cell). Capture-phase listeners run before the event reaches the target
 * cell, so calling stopPropagation() here prevents reka-ui's own bubble-phase
 * handlers on the cell from ever seeing the event — this fully prevents the
 * mutation rather than reverting it after the fact.
 */
const READONLY_BLOCKED_KEYS = new Set(['Backspace', 'Delete'])

const handleReadonlyKeydownCapture = (e: KeyboardEvent) => {
  if (!props.readonly) return
  if (!READONLY_BLOCKED_KEYS.has(e.key)) return
  e.preventDefault()
  e.stopPropagation()
}

const handleReadonlyPasteCapture = (e: ClipboardEvent) => {
  if (!props.readonly) return
  e.preventDefault()
  e.stopPropagation()
}
</script>

<style scoped lang="postcss">
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
  box-shadow: var(--sh-focus-ring);
}

.sh-pin-input:not(.sh-pin-input--disabled):not(.sh-pin-input--readonly)
  .sh-pin-input__cell:hover:not(:focus) {
  @apply border-primary;
}

/* Size variants */
.sh-pin-input--small .sh-pin-input__cell {
  width: var(--sh-component-size-sm);
  height: var(--sh-component-size-sm);
  font-size: var(--sh-font-size-sm);
}

.sh-pin-input--medium .sh-pin-input__cell {
  width: var(--sh-component-size-md);
  height: var(--sh-component-size-md);
  font-size: var(--sh-font-size-md);
}

.sh-pin-input--large .sh-pin-input__cell {
  width: var(--sh-component-size-lg);
  height: var(--sh-component-size-lg);
  font-size: var(--sh-font-size-lg);
}

/* Disabled state */
.sh-pin-input--disabled .sh-pin-input__cell {
  @apply bg-bg.secondary opacity-60 cursor-not-allowed;
}

/* Readonly state */
.sh-pin-input--readonly .sh-pin-input__cell {
  @apply bg-bg.secondary cursor-default;
}
</style>
