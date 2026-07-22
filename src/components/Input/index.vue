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
        :value="value"
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
  name: 'SHInput',
})

const props = withDefaults(defineProps<InputProps>(), {
  value: '',
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
    props.value === '' ||
    props.value === undefined ||
    props.value === null
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
  if (typeof props.value === 'string') {
    return props.value.length
  } else if (typeof props.value === 'number') {
    return props.value.toString().length
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
  emit('update:value', value)
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
  emit('update:value', '')
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

<style scoped>
.sh-input-wrapper {
  @apply w-full inline-flex flex-col relative;
}

.sh-input-wrapper:not(.is-disabled) .sh-input:hover {
  @apply border-primary;
}

.sh-input {
  @apply inline-flex items-center w-full bg-bg.primary;
  @apply rounded-md overflow-hidden;
  @apply transition duration-300 ease-in-out;
  @apply border border-solid border-border.base;
  @apply h-[var(--sh-component-size-md)] px-[var(--sh-spacing-md)];
}

.sh-input.is-focused {
  @apply border-primary outline-none;
  box-shadow: 0 0 0 2px var(--sh-primary-fade);
}

.sh-input-inner {
  @apply flex-1 w-full h-full outline-none bg-transparent text-text.base;
  @apply placeholder:text-text.primary;
}

.sh-input-prefix {
  @apply flex items-center mr-[var(--sh-spacing-sm)];
}

.sh-input-suffix {
  @apply flex items-center ml-[var(--sh-spacing-sm)];
}

.sh-input-clear {
  @apply inline-flex items-center justify-center cursor-pointer w-4 h-4;
  @apply text-text.primary hover:text-text.base transition-colors;
  @apply ml-1;
}

.sh-input-count {
  @apply ml-1 text-xs text-text.primary;
}

.is-disabled {
  @apply opacity-60;
}

.is-disabled .sh-input,
.is-disabled .sh-input-inner {
  @apply cursor-not-allowed;
}
</style>
