<template>
  <ContextMenuRoot class="sh-context-menu-root">
    <ContextMenuTrigger
      as-child
      class="block border-2 border-stone-700 dark:border-white border-dashed dark:text-white rounded-xl text-sm select-none py-[45px] w-[300px] text-center"
    >
      <slot>
        <span>{{ triggerContent || 'Right click here.' }}</span>
      </slot>
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent class="sh-context-menu-content" :side-offset="5">
        <template v-if="radioGroup">
          <ContextMenuRadioGroup
            :model-value="radioValue?.toString()"
            @update:model-value="handleRadioChange"
          >
            <ContextMenuRadioItem
              v-for="item in radioItems"
              :key="item.value"
              :value="item.value?.toString() || ''"
              :disabled="item.disabled"
              class="sh-context-menu-radio-item"
            >
              <ContextMenuItemIndicator
                class="absolute left-0 w-[25px] inline-flex items-center justify-center"
              >
                <component :is="DotIcon" />
              </ContextMenuItemIndicator>
              {{ item.label }}
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </template>
        <template v-else>
          <component
            :is="renderMenuItem(item)"
            v-for="(item, index) in items"
            :key="`item-${index}`"
          />
        </template>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>

<script setup lang="ts">
import {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemIndicator,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRoot,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from 'reka-ui'
import { computed, h, ref, type VNode } from 'vue'
import type {
  ContextMenuEmits,
  ContextMenuItemOption,
  ContextMenuProps,
} from './types'
import { IconCheck, IconChevronRight, IconPointFilled } from '@tabler/icons-vue'

const props = withDefaults(defineProps<ContextMenuProps>(), {
  items: () => [],
  triggerContent: 'Right click here.',
})

const emit = defineEmits<ContextMenuEmits>()

// Internal reactive state for checkbox items
const checkboxStates = ref<Record<string, boolean>>({})

// Computed properties
const radioItems = computed(
  () => props.items?.filter((item) => item.type === 'radio') || [],
)

// Initialize checkbox states
const initializeCheckboxStates = (): void => {
  const traverse = (items: ContextMenuItemOption[]): void => {
    items.forEach((item) => {
      if (item.type === 'checkbox' && item.value !== undefined) {
        checkboxStates.value[item.value.toString()] = item.checked || false
      }
      if (item.children) {
        traverse(item.children)
      }
    })
  }
  if (props.items) {
    traverse(props.items)
  }
}

// Initialize on mount
initializeCheckboxStates()

// Event handlers
const handleRadioChange = (value: string): void => {
  const numValue = Number(value)
  const finalValue = isNaN(numValue) ? value : numValue
  emit('radio-change', finalValue)
  emit('update:radioValue', finalValue)
}

const handleItemClick = (item: ContextMenuItemOption): void => {
  if (item.onClick) {
    item.onClick(item)
  }
  emit('item-click', item)
}

const handleCheckboxChange = (
  item: ContextMenuItemOption,
  checked: boolean,
): void => {
  if (item.value !== undefined) {
    checkboxStates.value[item.value.toString()] = checked
  }
  emit('checkbox-change', item, checked)
}

// Icon components
const CheckIcon = () => h(IconCheck, { size: '14', color: 'var(--sh-primary)' })

const DotIcon = () =>
  h(IconPointFilled, { size: '14', color: 'var(--sh-primary)' })

const shortcutClass =
  'ml-auto pl-[20px] text-text.base group-data-[highlighted]:text-secondary group-data-[disabled]:text-text.base.fade'

// Recursive component rendering for menu items
const renderMenuItem = (item: ContextMenuItemOption): VNode => {
  const baseClass = 'sh-context-menu-item'
  const groupClass = 'group ' + baseClass

  switch (item.type) {
    case 'separator':
      return h(ContextMenuSeparator, { class: 'sh-context-menu-separator' })

    case 'label':
      return h(
        ContextMenuLabel,
        { class: 'pl-[25px] text-xs leading-[25px] text-mauve11' },
        () => item.label,
      )

    case 'checkbox':
      return h(
        ContextMenuCheckboxItem,
        {
          modelValue:
            item.value !== undefined
              ? checkboxStates.value[item.value.toString()]
              : false,
          'onUpdate:modelValue': (checked: boolean) =>
            handleCheckboxChange(item, checked),
          disabled: item.disabled,
          class: groupClass,
        },
        () => [
          h(
            ContextMenuItemIndicator,
            {
              class:
                'absolute left-0 w-[25px] inline-flex items-center justify-center',
            },
            () => CheckIcon(),
          ),
          item.label,
          item.shortcut &&
            h(
              'div',
              {
                class: shortcutClass,
              },
              item.shortcut,
            ),
        ],
      )

    case 'sub':
      return h(ContextMenuSub, {}, (): VNode[] => [
        h(
          ContextMenuSubTrigger,
          {
            value: item.value,
            disabled: item.disabled,
            class: 'sh-context-menu-sub-trigger',
          },
          (): (string | VNode)[] => [
            h('div', { class: 'flex-1' }, item.label || ''),
            h(
              'div',
              {
                class:
                  'text-text.base group-data-[highlighted]:text-white group-data-[disabled]:text-text.base.fade',
              },
              h(IconChevronRight, {
                size: '14',
              }),
            ),
          ],
        ),
        h(
          ContextMenuPortal,
          {},
          (): VNode =>
            h(
              ContextMenuSubContent,
              {
                class: 'sh-context-menu-sub-conent',
                sideOffset: 2,
                alignOffset: -5,
              },
              (): VNode[] =>
                item.children?.map(
                  (child: ContextMenuItemOption): VNode =>
                    renderMenuItem(child),
                ) || [],
            ),
        ),
      ])

    default:
      // Regular menu item
      return h(
        ContextMenuItem,
        {
          value: item.value,
          disabled: item.disabled,
          class: groupClass,
          onClick: () => handleItemClick(item),
        },
        () => [
          item.icon && h('span', { class: 'mr-2 flex-shrink-0' }, item.icon),
          item.label,
          item.shortcut &&
            h(
              'div',
              {
                class: shortcutClass,
              },
              item.shortcut,
            ),
        ],
      )
  }
}
</script>

<style scoped lang="postcss">
:deep(.sh-context-menu-content) {
  @apply min-w-[220px] z-[30] bg-bg.primary shadow-lg outline-none rounded-md p-[5px];
  @apply will-change-[opacity,transform];
  @apply data-[side=top]:animate-slideDownAndFade;
  @apply data-[side=right]:animate-slideLeftAndFade;
  @apply data-[side=bottom]:animate-slideUpAndFade;
  @apply data-[side=left]:animate-slideRightAndFade;
}

:deep(.sh-context-menu-item) {
  @apply text-xs leading-none text-text.base;
  @apply select-none outline-none;
  @apply h-[25px] px-[5px] relative pl-[25px];
  @apply flex items-center;
  @apply rounded-[3px];
  @apply data-[disabled]:text-text.base.fade;
  @apply data-[state=checked]:text-primary;
  @apply data-[disabled]:pointer-events-none;
  @apply data-[highlighted]:(bg-primary.fade text-secondary);
}

:deep(.sh-context-menu-separator) {
  @apply h-[1px] bg-border.base m-[5px];
}

:deep(.sh-context-menu-sub-conent) {
  @apply min-w-[220px] z-30 outline-none bg-bg.primary rounded-md p-[5px];
  @apply shadow-lg;
  @apply will-change-[opacity,transform];
  @apply data-[side=top]:animate-slideDownAndFade;
  @apply data-[side=right]:animate-slideLeftAndFade;
  @apply data-[side=bottom]:animate-slideUpAndFade;
  @apply data-[side=left]:animate-slideRightAndFade;
}

:deep(.sh-context-menu-sub-trigger) {
  @apply group w-full rounded-[3px] h-[25px] px-[5px] relative pl-[25px] select-none outline-none;
  @apply text-xs leading-none text-text.base;
  @apply flex items-center;
  @apply data-[state=open]:bg-primary.fade data-[state=open]:text-secondary;
  @apply data-[disabled]:text-text.base.fade data-[disabled]:pointer-events-none;
  @apply data-[highlighted]:bg-primary.fade data-[highlighted]:text-secondary;
  @apply data-[highlighted]:data-[state=open]:bg-primary.fade data-[highlighted]:data-[state=open]:text-secondary;
}

:deep(.sh-context-menu-radio-item) {
  @apply text-xs leading-none text-text.base rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none
  @apply  data-[disabled]:text-text.base.fade;
  @apply data-[disabled]:pointer-events-none;
  @apply data-[highlighted]:bg-bg.primary.fade;
  @apply data-[highlighted]:text-secondary;
  @apply data-[state=checked]:text-primary;
}
</style>
