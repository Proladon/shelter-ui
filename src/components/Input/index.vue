<template>
  <div class="sh-input-wrapper" :class="{ 'is-disabled': disabled }">
    <div
      class="sh-input"
      :class="{
        'is-focused': focused,
        'is-clearable': clearable && !disabled && !isEmpty,
      }"
    >
      <div v-if="$slots.prefix" class="sh-input-prefix">
        <slot name="prefix"></slot>
      </div>

      <input
        ref="inputRef"
        :value="modelValue"
        :type="type"
        :disabled="disabled"
        :readonly="readonly"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        class="sh-input-inner"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <div v-if="showSuffix" class="sh-input-suffix">
        <slot name="suffix"></slot>

        <span v-if="isWordLimitVisible" class="sh-input-count">
          <span class="sh-input-count-inner"
            >{{ valueLength }}/{{ maxlength }}</span
          >
        </span>

        <span
          v-if="clearable && !disabled && !isEmpty"
          class="sh-input-clear"
          @click="handleClear"
        >
          <svg viewBox="0 0 1024 1024" width="12" height="12">
            <path
              d="M512 421.490332 331.092324 240.582656c-25.037934-25.037934-65.590616-25.037934-90.62855 0-25.037934 25.037934-25.037934 65.590616 0 90.62855L421.37145 512 240.463774 692.907676c-25.037934 25.037934-25.037934 65.590616 0 90.62855 25.037934 25.037934 65.590616 25.037934 90.62855 0L512 602.62855l180.907676 180.907676c25.037934 25.037934 65.590616 25.037934 90.62855 0 25.037934-25.037934 25.037934-65.590616 0-90.62855L602.62855 512l180.907676-180.907676c25.037934-25.037934 25.037934-65.590616 0-90.62855-25.037934-25.037934-65.590616-25.037934-90.62855 0L512 421.490332z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import type { InputProps, InputEmits } from './types'

defineOptions({
  name: 'SInput',
})

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  disabled: false,
  clearable: false,
  placeholder: '',
  type: 'text',
  readonly: false,
  autocomplete: 'off',
  maxlength: undefined,
  showWordLimit: false,
})

const emit = defineEmits<InputEmits>()

const inputRef = ref<HTMLInputElement | null>(null)
const focused = ref(false)

const isEmpty = computed(() => {
  return (
    props.modelValue === '' ||
    props.modelValue === undefined ||
    props.modelValue === null
  )
})

const showSuffix = computed(() => {
  return (
    props.clearable ||
    props.showWordLimit ||
    !!props.maxlength ||
    !!slots.suffix
  )
})

const isWordLimitVisible = computed(() => {
  return (
    props.showWordLimit &&
    props.maxlength !== undefined &&
    !props.disabled &&
    !props.readonly &&
    !props.type.includes('hidden')
  )
})

const valueLength = computed(() => {
  if (typeof props.modelValue === 'string') {
    return props.modelValue.length
  } else if (typeof props.modelValue === 'number') {
    return props.modelValue.toString().length
  }
  return 0
})

const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const select = () => {
  inputRef.value?.select()
}

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
  emit('input', value)
}

const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('change', value)
}

const handleFocus = (event: FocusEvent) => {
  focused.value = true
  emit('focus', event)
}

const handleBlur = (event: FocusEvent) => {
  focused.value = false
  emit('blur', event)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')

  // Focus back to input after clearing
  nextTick(() => {
    focus()
  })
}

// Expose methods to parent
defineExpose({
  focus,
  blur,
  select,
  input: inputRef,
})

const slots = defineSlots<{
  prefix?: () => any
  suffix?: () => any
}>()
</script>

<style lang="scss" scoped>
.sh-input-wrapper {
  @apply w-full inline-flex flex-col relative;

  &:not(.is-disabled) {
    .sh-input:hover {
      @apply border-primary;
    }
  }
}

.sh-input {
  @apply inline-flex items-center w-full  bg-bg.primary;
  @apply rounded-md overflow-hidden;
  @apply transition duration-300 ease-in-out;
  @apply border-[1px] border-solid border-border.base;

  @apply h-[36px];
  padding: 0 12px;

  &.is-focused {
    @apply border-primary outline-none;
    box-shadow: 0 0 0 2px rgba(var(--sh-primary-fade), 0.2);
  }
}

.sh-input-inner {
  @apply flex-1 w-full h-full outline-none bg-transparent text-text.base;
  @apply placeholder:text-gray-500;
}

.sh-input-prefix {
  @apply flex items-center mr-2;
}

.sh-input-suffix {
  @apply flex items-center ml-2;
}

.sh-input-clear {
  @apply inline-flex items-center justify-center cursor-pointer;
  @apply text-gray-400 hover:text-text.base transition-colors;
  @apply ml-1;
  width: 16px;
  height: 16px;
}

.sh-input-count {
  @apply ml-1 text-xs text-gray-400;
}

/* Updated disabled style to use opacity instead of color changes */
.is-disabled {
  @apply opacity-60;

  .sh-input {
    @apply cursor-not-allowed;
  }

  .sh-input-inner {
    @apply cursor-not-allowed;
  }
}
</style>
