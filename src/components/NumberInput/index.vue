<template>
  <NumberFieldRoot
    v-bind="rootProps"
    class="sh-number-input"
    :class="[
      `sh-number-input--${size}`,
      {
        'is-disabled': disabled,
        'is-invalid': invalid,
      },
    ]"
  >
    <NumberFieldDecrement
      class="sh-number-input__step sh-number-input__step--decrement"
    >
      <slot name="decrement">−</slot>
    </NumberFieldDecrement>

    <NumberFieldInput class="sh-number-input__input" />

    <NumberFieldIncrement
      class="sh-number-input__step sh-number-input__step--increment"
    >
      <slot name="increment">+</slot>
    </NumberFieldIncrement>
  </NumberFieldRoot>
</template>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core'
import {
  NumberFieldRoot,
  NumberFieldInput,
  NumberFieldIncrement,
  NumberFieldDecrement,
  useForwardPropsEmits,
} from 'reka-ui'
import type { NumberInputProps, NumberInputEmits } from './types'

defineOptions({
  name: 'SHNumberInput',
})

const props = withDefaults(defineProps<NumberInputProps>(), {
  size: 'default',
  step: 1,
  focusOnChange: true,
  stepSnapping: true,
  disabled: false,
  readonly: false,
  invalid: false,
})

const emits = defineEmits<NumberInputEmits>()

const delegatedProps = reactiveOmit(props, 'size', 'invalid')
const rootProps = useForwardPropsEmits(delegatedProps, emits)
</script>

<style lang="postcss">
.sh-number-input {
  @apply inline-flex items-center w-full rounded-md;
  @apply border border-solid border-border.base;
  @apply bg-bg.primary text-text.base;
  @apply transition-colors duration-200;

  &:not(.is-disabled):hover {
    @apply border-border.primary;
  }

  &:focus-within {
    @apply border-border.primary;
    box-shadow: 0 0 0 2px rgba(var(--sh-primary-fade), 0.2);
  }
}

.sh-number-input__input {
  @apply flex-1 bg-transparent outline-none text-text.base text-center;
  @apply px-3 py-0;
}

.sh-number-input__step {
  @apply inline-flex items-center justify-center shrink-0;
  @apply bg-bg.secondary text-text.base;
  @apply border-0 cursor-pointer select-none;
  @apply transition-colors duration-200;

  &:hover {
    @apply bg-bg.secondary.lighten;
  }

  &[data-disabled] {
    @apply cursor-not-allowed;
  }
}

.sh-number-input__step--decrement {
  @apply border-r border-r-solid border-r-border.base;
}

.sh-number-input__step--increment {
  @apply border-l border-l-solid border-l-border.base;
}

.sh-number-input--small {
  .sh-number-input__input {
    @apply h-[30px] text-sm;
  }

  .sh-number-input__step {
    @apply w-[30px] h-[30px] text-sm;
  }
}

.sh-number-input--default {
  .sh-number-input__input {
    @apply h-[36px] text-sm;
  }

  .sh-number-input__step {
    @apply w-[36px] h-[36px] text-base;
  }
}

.sh-number-input--large {
  .sh-number-input__input {
    @apply h-[42px] text-base;
  }

  .sh-number-input__step {
    @apply w-[42px] h-[42px] text-lg;
  }
}

.sh-number-input.is-disabled {
  @apply opacity-60;
}

.sh-number-input.is-invalid {
  @apply border-status.danger;

  &:focus-within {
    @apply border-status.danger;
    box-shadow: 0 0 0 2px rgba(var(--sh-status-danger-fade), 0.2);
  }
}
</style>
