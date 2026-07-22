<template>
  <NumberFieldRoot
    :model-value="value"
    v-bind="delegatedProps"
    @update:model-value="(v: number) => emits('update:value', v)"
    class="sh-number-input"
    :class="[
      sizeClass,
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

    <NumberFieldInput
      class="sh-number-input__input"
      @focus="emits('focus', $event)"
      @blur="emits('blur', $event)"
    />

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
} from 'reka-ui'
import { useComponentSize } from '@/composables/useComponentSize'
import type {
  NumberInputProps,
  NumberInputEmits,
  NumberInputSlots,
} from './types'

defineOptions({
  name: 'SHNumberInput',
})

const props = withDefaults(defineProps<NumberInputProps>(), {
  size: 'medium',
  step: 1,
  focusOnChange: true,
  stepSnapping: true,
  disabled: false,
  readonly: false,
  invalid: false,
})

defineSlots<NumberInputSlots>()

const emits = defineEmits<NumberInputEmits>()

const sizeClass = useComponentSize('sh-number-input', () => props.size)

const delegatedProps = reactiveOmit(props, 'size', 'invalid', 'value')
</script>

<style lang="postcss" scoped>
.sh-number-input {
  @apply inline-flex items-center w-full rounded-md;
  @apply border border-solid border-border.base;
  @apply bg-bg.primary text-text.base;
  @apply transition-colors duration-200;

  &:not(.is-disabled):hover {
    @apply border-primary;
  }

  &:focus-within {
    @apply border-primary outline-none;
    box-shadow: var(--sh-focus-ring);
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
    @apply h-[var(--sh-component-size-sm)] text-sm;
  }

  .sh-number-input__step {
    @apply w-[var(--sh-component-size-sm)] h-[var(--sh-component-size-sm)] text-sm;
  }
}

.sh-number-input--medium {
  .sh-number-input__input {
    @apply h-[var(--sh-component-size-md)] text-sm;
  }

  .sh-number-input__step {
    @apply w-[var(--sh-component-size-md)] h-[var(--sh-component-size-md)] text-base;
  }
}

.sh-number-input--large {
  .sh-number-input__input {
    @apply h-[var(--sh-component-size-lg)] text-base;
  }

  .sh-number-input__step {
    @apply w-[var(--sh-component-size-lg)] h-[var(--sh-component-size-lg)] text-lg;
  }
}

.sh-number-input.is-disabled {
  @apply opacity-60;
}

.sh-number-input.is-invalid {
  @apply border-status.danger;

  &:focus-within {
    @apply border-status.danger outline-none;
    box-shadow: 0 0 0 2px var(--sh-status-danger-fade);
  }
}
</style>
