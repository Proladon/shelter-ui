<template>
  <div
    class="mentionable-textarea sh-textarea-wrapper"
    :class="{ 'is-disabled': disabled }"
  >
    <ComboboxRoot
      v-model:open="open"
      ignore-filter
      :reset-search-term-on-blur="false"
      class="sh-mentionable-root"
    >
      <Label v-if="label" :for="textareaId" class="sh-mentionable-label">
        {{ label }}
      </Label>

      <div
        class="sh-textarea"
        :class="{
          'is-focused': focused,
        }"
      >
        <ComboboxInput
          :id="textareaId"
          ref="textareaRef"
          v-model="internalValue"
          as="textarea"
          class="sh-textarea-inner"
          :rows="rows"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          @input="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
          @pointerdown="open = false"
          @keydown.enter="handleEnterKey"
          @keydown.left.right="open = false"
        />
      </div>
      <ComboboxAnchor :reference="reference" />

      <ComboboxPortal>
        <ComboboxContent
          v-if="list.length"
          position="popper"
          side="bottom"
          align="start"
          class="sh-mentionable-dropdown"
        >
          <ComboboxItem
            v-for="item in list"
            :key="item"
            :value="item"
            class="sh-mentionable-item"
            @select="handleSelect"
          >
            <span class="sh-mentionable-item-text">{{ item }}</span>
          </ComboboxItem>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
  </div>
</template>

<script setup lang="ts">
import type { ReferenceElement } from 'reka-ui'
import { computedWithControl } from '@vueuse/core'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxPortal,
  ComboboxRoot,
  Label,
  useFilter,
} from 'reka-ui'
import { computed, ref, watch, watchEffect } from 'vue'
import type {
  MentionableTextAreaEmits,
  MentionableTextAreaProps,
} from './types'
import {
  getList,
  getValue,
  getAnchorRect,
  getSearchValue,
  getTrigger,
  getTriggerOffset,
  replaceValue,
  defaultTriggers,
} from './utils'

defineOptions({
  name: 'SHMentionableTextArea',
})

const props = withDefaults(defineProps<MentionableTextAreaProps>(), {
  rows: 5,
  triggers: () => defaultTriggers,
  placeholder: '輸入 @, # 或 : 來提及',
  label: '',
  class: '',
})

const emit = defineEmits<MentionableTextAreaEmits>()

const { contains } = useFilter({ sensitivity: 'base' })

// Internal state
const internalValue = ref(props.value || '')
const trigger = ref<string | null>(null)
const caretOffset = ref<number | null>(null)
const open = ref(false)
const searchValue = ref('')
const focused = ref(false)

// Generate unique ID for textarea
const textareaId = `mentionable-textarea-${Math.random()
  .toString(36)
  .substr(2, 9)}`

const textareaRef = ref<InstanceType<typeof ComboboxInput>>()

// Watch for external model changes
watch(
  () => props.value,
  (newValue) => {
    if (newValue !== internalValue.value) {
      internalValue.value = newValue || ''
    }
  },
)

// Reference for popup positioning
const reference = computedWithControl(
  () => [searchValue.value, open.value],
  () =>
    ({
      getBoundingClientRect: () => {
        if (textareaRef.value?.$el) {
          const { x, y, height } = getAnchorRect(
            textareaRef.value?.$el,
            props.triggers,
          )
          return { x, y, height, top: y, left: x, width: 0 }
        } else {
          return null
        }
      },
    }) as ReferenceElement,
)

// Compute filtered list based on search
const list = computed(() => {
  const customLists = {
    userList: props.userList,
    issueList: props.issueList,
    emojiList: props.emojiList,
  }
  const _list = getList(trigger.value, customLists)
  return _list.filter((item) => contains(item, searchValue.value))
})

// Auto-close when no items
watch(
  () => list.value.length,
  () => {
    open.value = !!list.value.length
  },
)

// Handle caret positioning
watchEffect(() => {
  const textarea = textareaRef.value?.$el as HTMLTextAreaElement | undefined
  if (caretOffset.value !== null && textarea) {
    textarea.setSelectionRange(caretOffset.value, caretOffset.value)
  }
})

// Event handlers
function handleChange(ev: InputEvent) {
  const target = ev.target as HTMLTextAreaElement
  const _trigger = getTrigger(target, props.triggers)
  const _searchValue = getSearchValue(target, props.triggers)

  if (_trigger) {
    trigger.value = _trigger
    open.value = true
    emit('mention', _trigger, _searchValue)
  } else if (!_searchValue) {
    trigger.value = null
    open.value = false
  }

  internalValue.value = target.value
  searchValue.value = _searchValue

  if (!_trigger) open.value = false

  emit('update:value', target.value)
  emit('change', target.value)
}

function handleSelect(ev: CustomEvent) {
  const textarea = textareaRef.value?.$el
  if (!textarea) return

  const offset = getTriggerOffset(textarea, props.triggers)
  const customLists = {
    userList: props.userList,
    issueList: props.issueList,
    emojiList: props.emojiList,
  }
  const displayValue = getValue(ev.detail.value, trigger.value, customLists)
  if (!displayValue) return

  // Prevent setting ComboboxInput
  ev.preventDefault()

  trigger.value = null
  const newValue = replaceValue(
    internalValue.value,
    offset,
    searchValue.value,
    displayValue,
  )
  internalValue.value = newValue
  const nextCaretOffset = offset + displayValue.length + 1
  caretOffset.value = nextCaretOffset

  emit('update:value', newValue)
  emit('change', newValue)
}

function handleEnterKey(ev: KeyboardEvent) {
  if (open.value) ev.preventDefault()
}

function handleFocus(ev: FocusEvent) {
  focused.value = true
  emit('focus', ev)
}

function handleBlur(ev: FocusEvent) {
  focused.value = false
  emit('blur', ev)
}
</script>

<style lang="postcss" scoped>
.sh-mentionable-root {
  @apply flex flex-col;
  color: var(--sh-text-base);
}

.sh-mentionable-label {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.sh-textarea-wrapper {
  @apply w-full inline-flex flex-col relative;
}

.sh-textarea {
  @apply inline-flex w-full bg-bg.primary relative;
  @apply rounded-md overflow-hidden;
  @apply transition duration-300 ease-in-out;
  @apply border border-solid border-border.base;

  padding: 12px;

  &.is-focused {
    @apply border-primary outline-none;
    box-shadow: var(--sh-focus-ring);
  }
}

.sh-textarea-inner {
  @apply flex-1 w-full outline-none bg-transparent text-text.base;
  @apply placeholder:text-text.primary;
  @apply resize-none;
  min-height: 0;
}

/* 禁用狀態 */
.is-disabled {
  @apply opacity-60;

  .sh-textarea {
    @apply cursor-not-allowed;
  }

  .sh-textarea-inner {
    @apply cursor-not-allowed;
  }
}
</style>

<!-- Unscoped: targets portal-teleported ComboboxContent/ComboboxItem outside component DOM -->
<style lang="postcss">
.sh-mentionable-dropdown {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 12rem; /* max-h-48 */
  max-width: 20rem; /* max-w-80 */
  background-color: var(--sh-bg-primary);
  border-width: 1px;
  border-style: solid;
  border-color: var(--sh-border-base);
  padding: 0.375rem; /* p-1.5 */
  border-radius: 0.375rem;
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  z-index: var(--sh-z-popover);
}

.sh-mentionable-item {
  display: flex;
  align-items: center;
  color: var(--sh-text-base);
  padding: 0.25rem 0.5rem; /* py-1 px-2 */
  border-radius: 0.25rem;
  cursor: default;

  &[data-highlighted] {
    background-color: var(--sh-primary-fade);
    color: var(--sh-primary);
  }
}

.sh-mentionable-item-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
