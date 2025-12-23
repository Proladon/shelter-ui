<template>
  <div class="sh-select-wrapper" :class="{ 'is-disabled': disabled }">
    <div
      ref="trigger"
      class="sh-select"
      :class="{
        'is-focused': visible,
        'is-clearable': showControl.btn.clear,
        'is-multiple': multiple,
      }"
      @click="handleTriggerClick"
      @keydown="handleKeydown"
      tabindex="0"
    >
      <div v-if="$slots.prefix" class="sh-select-prefix">
        <slot name="prefix"></slot>
      </div>

      <!-- Single selection display -->
      <div
        v-if="!multiple"
        v-show="!hideSelectionDisplay"
        class="sh-select-selection"
      >
        <span v-if="selectedOption" class="sh-select-selected-value">
          {{ selectedOption.label }}
        </span>
        <span v-else class="sh-select-placeholder">
          {{ placeholder }}
        </span>
      </div>

      <!-- Multiple selection display -->
      <div
        v-else-if="!hideSelectionDisplay"
        class="sh-select-selection sh-select-selection-multiple"
      >
        <div v-if="selectedOptions.length > 0" class="sh-select-tags">
          <span
            v-for="option in selectedOptions"
            :key="option.value"
            class="sh-select-tag"
          >
            <span class="sh-select-tag-text">{{ option.label }}</span>
            <span
              v-if="!disabled"
              class="sh-select-tag-close"
              @click.stop="removeTag(option.value)"
            >
              <svg viewBox="0 0 1024 1024" width="12" height="12">
                <path
                  d="M512 421.490332 331.092324 240.582656c-25.037934-25.037934-65.590616-25.037934-90.62855 0-25.037934 25.037934-25.037934 65.590616 0 90.62855L421.37145 512 240.463774 692.907676c-25.037934 25.037934-25.037934 65.590616 0 90.62855 25.037934 25.037934 65.590616 25.037934 90.62855 0L512 602.62855l180.907676 180.907676c25.037934 25.037934 65.590616 25.037934 90.62855 0 25.037934-25.037934 25.037934-65.590616 0-90.62855L602.62855 512l180.907676-180.907676c25.037934-25.037934 25.037934-65.590616 0-90.62855-25.037934-25.037934-65.590616-25.037934-90.62855 0L512 421.490332z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </span>
        </div>
        <span v-if="selectedOptions.length === 0" class="sh-select-placeholder">
          {{ placeholder }}
        </span>
      </div>

      <!-- Search input for filterable -->
      <input
        v-if="filterable && visible"
        ref="searchInput"
        v-model="searchQuery"
        class="sh-select-search-input"
        :placeholder="searchPlaceholder"
        @input="handleSearch"
        @keydown.stop
        @click.stop
      />

      <div class="sh-select-suffix">
        <span
          v-if="showControl.btn.clear"
          class="sh-select-clear"
          @click.stop="handleClear"
        >
          <IconX />
        </span>

        <slot name="suffix">
          <span
            v-if="showControl.btn.suffix"
            class="sh-select-arrow"
            :class="{ 'is-reverse': visible }"
          >
            <IconChevronDown />
          </span>
        </slot>
      </div>
    </div>

    <!-- Dropdown -->
    <Teleport to="body">
      <Transition
        name="sh-select-dropdown"
        @after-enter="onDropdownEnter"
        @after-leave="onDropdownLeave"
      >
        <div
          v-if="visible"
          ref="dropdown"
          class="sh-select-dropdown"
          :style="dropdownStyle"
        >
          <div v-if="loading" class="sh-select-loading">
            <Spinner :size="20" />
            <span>載入中...</span>
          </div>
          <div v-else-if="filteredOptions.length === 0" class="sh-select-empty">
            {{ searchQuery ? noMatchText : noDataText }}
          </div>
          <div v-else class="sh-select-options">
            <!-- Grouped options -->
            <template v-if="hasGroups">
              <div
                v-for="group in groupedOptions"
                :key="group.group"
                class="sh-select-group"
              >
                <div v-if="group.group" class="sh-select-group-title">
                  {{ group.group }}
                </div>
                <div
                  v-for="option in group.options"
                  :key="option.value"
                  class="sh-select-option"
                  :class="{
                    'is-selected': isSelected(option.value),
                    'is-disabled': option.disabled,
                    'is-highlighted':
                      highlightedIndex === getOptionIndex(option),
                  }"
                  @click="handleOptionClick(option)"
                  @mouseenter="highlightedIndex = getOptionIndex(option)"
                >
                  <span class="sh-select-option-text">{{ option.label }}</span>
                  <span
                    v-if="isSelected(option.value)"
                    class="sh-select-option-check"
                  >
                    <svg viewBox="0 0 1024 1024" width="12" height="12">
                      <path
                        d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                </div>
              </div>
            </template>

            <!-- Ungrouped options -->
            <template v-else>
              <div
                v-for="(option, index) in filteredOptions"
                :key="option.value"
                class="sh-select-option"
                :class="{
                  'is-selected': isSelected(option.value),
                  'is-disabled': option.disabled,
                  'is-highlighted': highlightedIndex === index,
                }"
                @click="handleOptionClick(option)"
                @mouseenter="highlightedIndex = index"
              >
                <span class="sh-select-option-text">{{ option.label }}</span>
                <span
                  v-if="isSelected(option.value)"
                  class="sh-select-option-check"
                >
                  <svg viewBox="0 0 1024 1024" width="12" height="12">
                    <path
                      d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 0 0-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
              </div>
            </template>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  watch,
  useTemplateRef,
} from 'vue'
import { onClickOutside, useVModel } from '@vueuse/core'
import type { SelectProps, SelectEmits, SelectOption } from './types'
import { IconChevronDown, IconX } from '@tabler/icons-vue'
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
  maxSelections: undefined,
  filterable: false,
  filterMethod: undefined,
  loading: false,
  noDataText: '暫無數據',
  noMatchText: '無匹配數據',
  placement: 'auto',
  dropdownWidth: undefined,
  maxHeight: '200px',
})

const emit = defineEmits<SelectEmits>()

const syncValue = useVModel(props, 'value', emit)

const triggerRef = useTemplateRef<HTMLElement>('trigger')
const dropdownRef = useTemplateRef<HTMLElement>('dropdown')
const searchInputRef = useTemplateRef<HTMLInputElement>('searchInput')
const visible = ref(false)
const searchQuery = ref('')
const highlightedIndex = ref(-1)

const isEmpty = computed(() => {
  if (props.multiple) {
    return !Array.isArray(syncValue.value) || syncValue.value.length === 0
  }
  return (
    syncValue.value === '' ||
    syncValue.value === undefined ||
    syncValue.value === null
  )
})

const hideSelectionDisplay = computed(() => props.filterable && visible.value)

const showControl = computed(() => {
  const controls = {
    btn: {
      clear: props.clearable && !props.disabled && !isEmpty.value,
      suffix: true,
    },
  }

  if (controls.btn.clear) {
    controls.btn.suffix = false
  }

  return controls
})

const selectedOption = computed(() => {
  if (props.multiple || isEmpty.value) return null
  return props.options.find((option) => option.value === syncValue.value)
})

const selectedOptions = computed(() => {
  if (!props.multiple || isEmpty.value) return []
  const values = Array.isArray(syncValue.value) ? syncValue.value : []
  return props.options.filter((option) => values.includes(option.value))
})

const searchPlaceholder = computed(() => {
  if (props.multiple && selectedOptions.value.length > 0) {
    return ''
  }
  return props.placeholder
})

const filteredOptions = computed(() => {
  if (!props.filterable || !searchQuery.value) {
    return props.options
  }

  if (props.filterMethod) {
    return props.options.filter((option) =>
      props.filterMethod!(searchQuery.value, option),
    )
  }

  return props.options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.value.toLowerCase()),
  )
})

const hasGroups = computed(() => {
  return filteredOptions.value.some((option) => option.group)
})

const groupedOptions = computed(() => {
  if (!hasGroups.value) return []

  const groups: Record<string, SelectOption[]> = {}
  filteredOptions.value.forEach((option) => {
    const groupName = option.group || ''
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

const dropdownStyle = ref<Record<string, string>>({})

const isSelected = (value: string | number) => {
  if (props.multiple) {
    return Array.isArray(syncValue.value) && syncValue.value.includes(value)
  }
  return syncValue.value === value
}

const getOptionIndex = (option: SelectOption) => {
  return filteredOptions.value.findIndex((opt) => opt.value === option.value)
}

const handleTriggerClick = () => {
  if (props.disabled || props.readonly) return
  toggleDropdown()
}

const toggleDropdown = () => {
  visible.value = !visible.value
  emit('visible-change', visible.value)

  if (visible.value) {
    nextTick(() => {
      updateDropdownPosition()
      if (props.filterable && searchInputRef.value) {
        searchInputRef.value.focus()
      }
    })
  }
}

const handleOptionClick = (option: SelectOption) => {
  console.log('Option clicked:', option)
  if (option.disabled) return

  if (props.multiple) {
    const values = Array.isArray(syncValue.value) ? [...syncValue.value] : []
    const index = values.indexOf(option.value)

    if (index > -1) {
      values.splice(index, 1)
    } else {
      if (props.maxSelections && values.length >= props.maxSelections) {
        return
      }
      values.push(option.value)
    }

    syncValue.value = values
    emit('change', values)
  } else {
    syncValue.value = option.value
    emit('change', option.value)
    visible.value = false
    emit('visible-change', false)
  }
}

const removeTag = (value: string | number) => {
  if (!props.multiple) return

  const values = Array.isArray(syncValue.value) ? [...syncValue.value] : []
  const index = values.indexOf(value)

  if (index > -1) {
    values.splice(index, 1)
    syncValue.value = values
    emit('change', values)
    emit('remove-tag', value)
  }
}

const handleClear = () => {
  const emptyValue = props.multiple ? [] : ''
  syncValue.value = emptyValue
  emit('clear')
  visible.value = false
  emit('visible-change', false)
}

const handleSearch = () => {
  highlightedIndex.value = -1
}

const handleKeydown = (event: KeyboardEvent) => {
  if (props.disabled || props.readonly) return

  switch (event.key) {
    case 'Enter':
    case ' ':
      if (!visible.value) {
        toggleDropdown()
      } else if (highlightedIndex.value >= 0) {
        const option = filteredOptions.value[highlightedIndex.value]
        if (option && !option.disabled) {
          handleOptionClick(option)
        }
      }
      event.preventDefault()
      break
    case 'Escape':
      if (visible.value) {
        visible.value = false
        emit('visible-change', false)
      }
      break
    case 'ArrowDown':
      if (!visible.value) {
        toggleDropdown()
      } else {
        highlightedIndex.value = Math.min(
          highlightedIndex.value + 1,
          filteredOptions.value.length - 1,
        )
      }
      event.preventDefault()
      break
    case 'ArrowUp':
      if (visible.value) {
        highlightedIndex.value = Math.max(highlightedIndex.value - 1, 0)
      }
      event.preventDefault()
      break
  }
}

const updateDropdownPosition = () => {
  if (!triggerRef.value || !dropdownRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const dropdownHeight = dropdownRef.value.offsetHeight
  const viewportHeight = window.innerHeight

  let top = triggerRect.bottom + window.scrollY

  // Auto placement logic
  if (props.placement === 'auto') {
    const spaceBelow = viewportHeight - triggerRect.bottom
    const spaceAbove = triggerRect.top

    if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
      top = triggerRect.top + window.scrollY - dropdownHeight
    }
  } else if (props.placement === 'top') {
    top = triggerRect.top + window.scrollY - dropdownHeight
  }

  const style: Record<string, string> = {
    position: 'absolute',
    left: `${triggerRect.left + window.scrollX}px`,
    top: `${top}px`,
    minWidth: `${triggerRect.width}px`,
    zIndex: '9999',
  }

  if (props.dropdownWidth) {
    style.width =
      typeof props.dropdownWidth === 'number'
        ? `${props.dropdownWidth}px`
        : props.dropdownWidth
  }

  if (props.maxHeight) {
    style.maxHeight =
      typeof props.maxHeight === 'number'
        ? `${props.maxHeight}px`
        : props.maxHeight
  }

  dropdownStyle.value = style
}

const onDropdownEnter = () => {
  updateDropdownPosition()
}

const onDropdownLeave = () => {
  searchQuery.value = ''
  highlightedIndex.value = -1
}

// Watch for changes to reposition dropdown
watch(visible, (newVal) => {
  if (newVal) {
    nextTick(updateDropdownPosition)
  }
})

onClickOutside(triggerRef, (event: Event) => {
  if (
    !triggerRef.value?.contains(event.target as Node) &&
    !dropdownRef.value?.contains(event.target as Node)
  ) {
    visible.value = false
    emit('visible-change', false)
  }
})

onMounted(() => {
  window.addEventListener('resize', updateDropdownPosition)
  window.addEventListener('scroll', updateDropdownPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDropdownPosition)
  window.removeEventListener('scroll', updateDropdownPosition)
})

// Expose methods to parent
defineExpose({
  focus: () => triggerRef.value?.focus(),
  blur: () => triggerRef.value?.blur(),
  toggleDropdown,
})

const slots = defineSlots<{
  prefix?: () => any
  suffix?: () => any
}>()
</script>

<style lang="scss" scoped>
.sh-select-wrapper {
  @apply w-full inline-flex flex-col relative;

  &:not(.is-disabled) {
    .sh-select:hover {
      @apply border-primary;
    }
  }
}

.sh-select {
  @apply inline-flex items-center w-full bg-bg.primary;
  @apply rounded-md overflow-hidden cursor-pointer;
  @apply transition duration-300 ease-in-out;
  @apply border-[1px] border-solid border-border.base;

  @apply h-[36px];
  padding: 0 12px;

  &.is-focused {
    @apply border-primary outline-none;
    box-shadow: 0 0 0 2px rgba(var(--sh-primary-fade), 0.2);
  }

  &.is-multiple {
    @apply h-auto min-h-[36px];
    padding: 4px 12px;
  }
}

.sh-select-prefix {
  @apply flex items-center mr-2;
}

.sh-select-selection {
  @apply flex-1 flex items-center min-w-0;

  &.sh-select-selection-multiple {
    @apply flex-wrap gap-1;
  }
}

.sh-select-selected-value {
  @apply text-text.primary truncate;
}

.sh-select-placeholder {
  @apply text-text.base;
}

.sh-select-tags {
  @apply flex flex-wrap gap-1;
}

.sh-select-tag {
  @apply inline-flex items-center bg-bg.primary text-text.primary px-2 py-1 rounded text-sm;
  @apply border border-solid border-border.primary.fade;
}

.sh-select-tag-text {
  @apply max-w-[120px] truncate;
}

.sh-select-tag-close {
  @apply ml-1 cursor-pointer text-gray-400 hover:text-text.primary;
  @apply flex items-center justify-center;
}

.sh-select-search-input {
  @apply flex-1 outline-none bg-transparent text-text.primary;
  @apply placeholder:text-text.base;
  min-width: 60px;
}

.sh-select-suffix {
  @apply flex items-center ml-2 gap-1;
}

.sh-select-clear {
  @apply inline-flex items-center justify-center cursor-pointer;
  @apply text-gray-400 hover:text-text.primary transition-colors;
  width: 16px;
  height: 16px;
}

.sh-select-arrow {
  @apply inline-flex items-center justify-center text-gray-400;
  @apply transition-transform duration-200;
  width: 16px;
  height: 16px;

  &.is-reverse {
    @apply rotate-180;
  }
}

.sh-select-dropdown {
  @apply bg-bg.primary border border-border.base rounded-md shadow-lg;
  @apply overflow-hidden;
}

.sh-select-loading {
  @apply p-4 text-text.base;
  @apply flex items-center justify-center gap-[8px];
}

.sh-select-empty {
  @apply p-4 text-center text-text.base;
}

.sh-select-options {
  @apply max-h-[200px] overflow-y-auto;
}

.sh-select-group-title {
  @apply p-3 text-normal font-medium text-status.info.fade bg-bg.secondary;
  @apply border-b border-border.base;
}

.sh-select-option {
  @apply flex items-center justify-between px-3 py-2 cursor-pointer;
  @apply hover:bg-primary.fade transition-colors;
  @apply text-text.base;

  &.is-selected {
    @apply bg-primary.fade text-text.primary;
  }

  &.is-highlighted {
    @apply bg-primary.fade text-text.primary;
  }

  &.is-disabled {
    @apply opacity-50 cursor-not-allowed hover:bg-transparent;
  }
}

.sh-select-option-text {
  @apply flex-1 truncate;
}

.sh-select-option-check {
  @apply text-primary ml-2;
  width: 16px;
  height: 16px;
}

/* Updated disabled style to use opacity instead of color changes */
.is-disabled {
  @apply opacity-60;

  .sh-select {
    @apply cursor-not-allowed;
  }
}

/* Dropdown animation */
.sh-select-dropdown-enter-active,
.sh-select-dropdown-leave-active {
  transition: all 0.2s ease;
}

.sh-select-dropdown-enter-from,
.sh-select-dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
