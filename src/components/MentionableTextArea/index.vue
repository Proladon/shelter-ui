<template>
  <div class="mentionable-textarea">
    <ComboboxRoot
      v-model:open="open"
      ignore-filter
      :reset-search-term-on-blur="false"
      class="text-foreground flex flex-col"
    >
      <Label v-if="label" :for="textareaId" class="text-sm font-semibold mb-2">
        {{ label }}
      </Label>

      <ComboboxInput
        :id="textareaId"
        ref="textareaRef"
        v-model="internalValue"
        as="textarea"
        :class="textareaClasses"
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
      <ComboboxAnchor :reference="reference" />

      <ComboboxPortal>
        <ComboboxContent
          v-if="list.length"
          position="popper"
          side="bottom"
          align="start"
          class="overflow-y-auto overflow-x-hidden max-h-48 max-w-80 bg-card border border-muted-foreground/30 p-1.5 rounded-md shadow-lg z-50"
        >
          <ComboboxItem
            v-for="item in list"
            :key="item"
            :value="item"
            class="px-2 py-1 data-[highlighted]:bg-muted rounded flex cursor-default hover:bg-muted/50 transition-colors"
            @select="handleSelect"
          >
            <span class="truncate">{{ item }}</span>
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
const internalValue = ref(props.modelValue || '')
const trigger = ref<string | null>(null)
const caretOffset = ref<number | null>(null)
const open = ref(false)
const searchValue = ref('')

// Generate unique ID for textarea
const textareaId = `mentionable-textarea-${Math.random()
  .toString(36)
  .substr(2, 9)}`

const textareaRef = ref<InstanceType<typeof ComboboxInput>>()

// Watch for external model changes
watch(
  () => props.modelValue,
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
    } as ReferenceElement),
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

// Computed classes for textarea
const textareaClasses = computed(() => {
  const baseClasses =
    'border rounded-md border-muted p-2 transition-colors focus:border-primary focus:outline-none resize-none'
  const disabledClasses = props.disabled
    ? 'bg-muted cursor-not-allowed opacity-50'
    : ''
  const readonlyClasses = props.readonly ? 'bg-muted/50' : ''

  return [baseClasses, disabledClasses, readonlyClasses, props.class]
    .filter(Boolean)
    .join(' ')
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

  emit('update:modelValue', target.value)
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

  emit('update:modelValue', newValue)
  emit('change', newValue)
}

function handleEnterKey(ev: KeyboardEvent) {
  if (open.value) ev.preventDefault()
}

function handleFocus(ev: FocusEvent) {
  emit('focus', ev)
}

function handleBlur(ev: FocusEvent) {
  emit('blur', ev)
}
</script>

<style lang="postcss">
.mentionable-textarea {
  @apply relative;
}
</style>
