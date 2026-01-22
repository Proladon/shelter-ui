<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxLabel,
  ComboboxPortal,
  ComboboxRoot,
  ComboboxSeparator,
  ComboboxTrigger,
  ComboboxViewport,
} from 'reka-ui'
import { IconChevronDown, IconCheck, IconX } from '@tabler/icons-vue'
import type { SelectProps, SelectEmits, SelectOption } from './types'
import Spinner from '@/components/Spinner/index.vue'

defineOptions({
  name: 'SHSelect',
})

const props = withDefaults(defineProps<SelectProps>(), {
  value: undefined,
  options: () => [],
  disabled: false,
  clearable: false,
  placeholder: '請選擇',
  readonly: false,
  multiple: false,
  filterable: false,
  loading: false,
  noDataText: '暫無數據',
  noMatchText: '無匹配數據',
  width: '100%',
  maxHeight: '200px',
})

const emit = defineEmits<SelectEmits>()

const searchTerm = ref('')
const isOpen = ref(false)

// Use a separate local reactive value for the current selection to ensure immediate UI updates
const internalValue = ref<any>(props.value)
watch(
  () => props.value,
  (newVal) => {
    internalValue.value = newVal
  },
  { deep: true },
)

const modelValue = computed({
  get: () => {
    const val = internalValue.value
    if (props.multiple) {
      return Array.isArray(val) ? val.map(String) : []
    }
    return val !== undefined && val !== null ? String(val) : undefined
  },
  set: (val: string | string[] | undefined) => {
    if (val === undefined) {
      internalValue.value = undefined
      emit('update:value', undefined)
      emit('change', undefined)
      return
    }

    if (Array.isArray(val)) {
      const originalValues = val.map((v) => {
        const opt = props.options.find((o) => String(o.value) === v)
        return opt ? opt.value : v
      })
      internalValue.value = originalValues
      emit('update:value', originalValues)
      emit('change', originalValues)
      return
    }

    const originalOption = props.options.find(
      (opt) => String(opt.value) === val,
    )
    if (originalOption) {
      internalValue.value = originalOption.value
      emit('update:value', originalOption.value)
      emit('change', originalOption.value)
    }
  },
})

// Robust display function for labels
const getDisplayLabel = (val: any) => {
  if (val === undefined || val === null || val === '') return ''

  const findLabel = (v: any) => {
    const option = props.options.find((opt) => String(opt.value) === String(v))
    return option ? option.label : String(v)
  }

  if (Array.isArray(val)) {
    if (val.length === 0) return ''
    return val
      .map(findLabel)
      .filter((l) => l !== undefined && l !== '')
      .join(', ')
  }

  return findLabel(val)
}

const handleClear = (e: Event) => {
  e.stopPropagation()
  modelValue.value = props.multiple ? [] : undefined
  searchTerm.value = ''
  emit('clear')
}

const filteredOptions = computed(() => {
  if (!props.filterable || !searchTerm.value) return props.options
  const search = searchTerm.value.toLowerCase()
  return props.options.filter(
    (opt) =>
      opt.label.toLowerCase().includes(search) ||
      String(opt.value).toLowerCase().includes(search),
  )
})

const hasGroups = computed(() => {
  return props.options.some((option) => option.group)
})

const groupedFilteredOptions = computed(() => {
  if (!hasGroups.value) return []
  const groups: Record<string, SelectOption[]> = {}
  filteredOptions.value.forEach((option) => {
    const groupName = option.group || 'Other'
    if (!groups[groupName]) {
      groups[groupName] = []
    }
    groups[groupName].push(option)
  })
  return Object.entries(groups).map(([group, options]) => ({
    group,
    options,
  }))
})

const wrapperStyle = computed(() => {
  if (!props.width) return {}
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width,
  }
})
</script>

<template>
  <div class="sh-select-wrapper" :style="wrapperStyle">
    <ComboboxRoot
      v-model="modelValue"
      v-model:search-term="searchTerm"
      :open="disabled ? false : isOpen"
      @update:open="(val) => (isOpen = disabled ? false : val)"
      :disabled="disabled"
      :multiple="multiple"
      class="shadow-lg"
    >
      <ComboboxAnchor
        class="sh-select"
        :class="{
          'is-disabled': disabled,
          'is-open': isOpen,
          'is-clearable':
            clearable &&
            (Array.isArray(modelValue) ? modelValue.length > 0 : modelValue),
        }"
      >
        <template v-if="!filterable">
          <ComboboxTrigger as-child :disabled="disabled">
            <div class="flex-1 flex items-center h-full w-full overflow-hidden">
              <div
                class="sh-select-input truncate"
                :class="{
                  'text-text.secondary opacity-50':
                    !internalValue ||
                    (Array.isArray(internalValue) &&
                      internalValue.length === 0),
                }"
              >
                {{ getDisplayLabel(internalValue) || placeholder }}
              </div>
              <ComboboxInput class="sr-only" readonly />
              <div class="sh-select-icons">
                <div
                  v-if="
                    clearable &&
                    (Array.isArray(internalValue)
                      ? internalValue.length > 0
                      : internalValue) &&
                    !disabled
                  "
                  class="sh-select-clear"
                  @pointerdown.stop
                  @click.stop="handleClear"
                >
                  <IconX size="14" />
                </div>
                <div class="sh-select-trigger-icon">
                  <IconChevronDown size="16" />
                </div>
              </div>
            </div>
          </ComboboxTrigger>
        </template>

        <template v-else>
          <div class="flex-1 flex items-center h-full w-full overflow-hidden">
            <div
              v-if="
                multiple &&
                Array.isArray(internalValue) &&
                internalValue.length > 0 &&
                !searchTerm
              "
              class="flex-none max-w-[80%] truncate text-text.base opacity-60 mr-1"
            >
              {{ getDisplayLabel(internalValue) }}
            </div>
            <ComboboxInput
              class="sh-select-input"
              :display-value="getDisplayLabel"
              :placeholder="
                multiple &&
                Array.isArray(internalValue) &&
                internalValue.length > 0
                  ? ''
                  : placeholder
              "
              @click.stop
            />
          </div>

          <div class="sh-select-icons">
            <div
              v-if="
                clearable &&
                (Array.isArray(internalValue)
                  ? internalValue.length > 0
                  : internalValue) &&
                !disabled
              "
              class="sh-select-clear"
              @pointerdown.stop
              @click.stop="handleClear"
            >
              <IconX size="14" />
            </div>
            <ComboboxTrigger
              class="sh-select-trigger-icon"
              :disabled="disabled"
            >
              <IconChevronDown size="16" />
            </ComboboxTrigger>
          </div>
        </template>
      </ComboboxAnchor>

      <ComboboxPortal>
        <ComboboxContent
          class="sh-select-dropdown"
          position="popper"
          :side-offset="4"
          :style="{
            minWidth: 'var(--reka-combobox-trigger-width)',
          }"
        >
          <ComboboxViewport
            class="sh-select-viewport"
            :style="{ maxHeight: maxHeight }"
          >
            <div v-if="loading" class="sh-select-loading">
              <Spinner :size="20" />
              <span>載入中...</span>
            </div>

            <ComboboxEmpty
              class="sh-select-empty"
              v-show="
                !loading &&
                (props.options.length === 0 || filteredOptions.length === 0)
              "
            >
              {{
                props.options.length === 0
                  ? noDataText
                  : filteredOptions.length === 0
                    ? noMatchText
                    : ''
              }}
            </ComboboxEmpty>

            <template v-if="!loading && props.options.length > 0">
              <template v-if="hasGroups">
                <ComboboxGroup
                  v-for="group in groupedFilteredOptions"
                  :key="group.group"
                >
                  <ComboboxLabel class="sh-select-group-title">{{
                    group.group
                  }}</ComboboxLabel>
                  <ComboboxItem
                    v-for="option in group.options"
                    :key="option.value"
                    :value="String(option.value)"
                    :disabled="option.disabled"
                    class="sh-select-option"
                  >
                    <ComboboxItemIndicator class="sh-select-option-check">
                      <IconCheck size="14" />
                    </ComboboxItemIndicator>
                    <span>{{ option.label }}</span>
                  </ComboboxItem>
                  <ComboboxSeparator class="sh-select-separator" />
                </ComboboxGroup>
              </template>
              <template v-else>
                <ComboboxItem
                  v-for="option in filteredOptions"
                  :key="option.value"
                  :value="String(option.value)"
                  :disabled="option.disabled"
                  class="sh-select-option"
                >
                  <ComboboxItemIndicator class="sh-select-option-check">
                    <IconCheck size="14" />
                  </ComboboxItemIndicator>
                  <span>{{ option.label }}</span>
                </ComboboxItem>
              </template>
            </template>
          </ComboboxViewport>
        </ComboboxContent>
      </ComboboxPortal>
    </ComboboxRoot>
  </div>
</template>

<style lang="postcss">
.sh-select-wrapper {
  @apply w-full inline-flex flex-col relative;
  @apply border border-solid border-border-1 border-border.base rounded-md;
}

.sh-select {
  @apply inline-flex items-center justify-between w-full bg-bg.primary;
  @apply rounded-md cursor-pointer overflow-hidden;
  @apply transition duration-300 ease-in-out;
  @apply border border-border.base;
  @apply h-[36px] px-3;
  @apply text-text.base text-sm;

  &:hover:not(.is-disabled) {
    @apply border-primary;
  }

  &[data-state='open'],
  &.is-open {
    @apply border-primary ring-2 ring-primary.fade;

    .sh-select-trigger-icon {
      @apply text-secondary;
    }
  }

  &.is-disabled {
    @apply opacity-60 cursor-not-allowed bg-bg.secondary;
  }

  /* Focus within works for input */
  &:focus-within {
    @apply outline-none border-primary ring-2 ring-primary.fade;
  }
}

.sh-select-input {
  @apply flex-1 truncate text-left bg-transparent border-none outline-none;
  @apply text-text.base placeholder-text.secondary;
  @apply min-w-0;

  &:read-only {
    @apply cursor-pointer;
  }
}

.sh-select-icons {
  @apply flex items-center gap-1 ml-2 flex-shrink-0;
}

.sh-select-trigger-icon {
  @apply flex items-center justify-center p-0 bg-transparent border-none cursor-pointer;
}

.sh-select-clear {
  @apply text-text.secondary cursor-pointer flex items-center;
}

.sh-select-dropdown {
  @apply bg-bg.primary border border-solid border-border.base rounded-md shadow-lg;
  @apply overflow-hidden z-[9999];
  @apply animate-in fade-in zoom-in-95 duration-200;
}

.sh-select-viewport {
  @apply p-1 overflow-y-auto;
}

.sh-select-group-title {
  @apply px-2 py-1.5 text-xs font-semibold text-text.secondary;
}

.sh-select-option {
  @apply relative flex items-center px-2 py-1.5 text-sm rounded-sm;
  @apply text-text.base cursor-pointer select-none outline-none;
  @apply transition-colors;
  @apply pr-8;

  &[data-highlighted] {
    @apply bg-primary.fade text-secondary;
  }

  &[data-disabled] {
    @apply opacity-50 cursor-not-allowed;
  }
  &[data-state='checked'] {
    @apply bg-primary.fade text-secondary;
  }
}

.sh-select-option-check {
  @apply absolute right-2 flex items-center text-primary;
}

/* Fix option check position - if padding-left is used, indicator should be absolute left? 
   Original code had right-2. 
   Usually in select/combobox, check is on left or right. 
   Reka-ui ComboboxItemIndicator default is sometimes left.
   But my CSS applies `absolute right-2` to `.sh-select-option-check`.
   So the text should NOT have `pl-8` unless I want space on left for something else.
   Standard select has text left aligned, check on right.
   I should switch `pl-8` to `pr-8` if the check is on the right.
   I'll update the style to `pr-8` in the `sh-select-option`.
*/
.sh-select-option {
  @apply relative flex items-center px-2 py-1.5 text-sm rounded-sm;
  @apply text-text.base cursor-pointer select-none outline-none;
  @apply transition-colors;
  @apply pr-8; /* Space for the check */

  &[data-highlighted] {
    @apply bg-primary.fade text-secondary;
  }

  &[data-disabled] {
    @apply opacity-50 cursor-not-allowed;
  }
}

.sh-select-separator {
  @apply h-[1px] bg-border.base my-1;
}

.sh-select-loading,
.sh-select-empty {
  @apply p-4 text-center text-text.secondary text-sm flex items-center justify-center gap-2;
}

.sh-select-clear,
.sh-select-trigger-icon {
  @apply transition-all duration-300 hover:(text-secondary);
}

.sh-select-group-title {
  @apply text-secondary;
}
</style>
