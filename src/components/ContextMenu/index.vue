<template>
  <ContextMenuRoot>
    <ContextMenuTrigger
      as-child
      :class="
        triggerClass ||
        'block border-2 border-stone-700 dark:border-white border-dashed text-stone-700 dark:text-white rounded-xl text-sm select-none py-[45px] w-[300px] text-center'
      "
    >
      <slot>
        <span>{{ triggerContent || 'Right click here.' }}</span>
      </slot>
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent
        class="min-w-[220px] z-30 bg-white outline-none rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        :side-offset="5"
      >
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
              class="text-xs leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
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
const CheckIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      width: '12',
      height: '12',
      fill: 'currentColor',
    },
    [h('path', { d: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' })],
  )

const ChevronRightIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      width: '12',
      height: '12',
      fill: 'currentColor',
    },
    [h('path', { d: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' })],
  )

const DotIcon = () =>
  h(
    'svg',
    {
      viewBox: '0 0 24 24',
      width: '12',
      height: '12',
      fill: 'currentColor',
    },
    [h('circle', { cx: '12', cy: '12', r: '3' })],
  )

// Recursive component rendering for menu items
const renderMenuItem = (item: ContextMenuItemOption): VNode => {
  const baseClass =
    'text-xs leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1'
  const groupClass = 'group ' + baseClass

  switch (item.type) {
    case 'separator':
      return h(ContextMenuSeparator, { class: 'h-[1px] bg-green6 m-[5px]' })

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
                class:
                  'ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8',
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
            class:
              'group w-full text-xs leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[state=open]:bg-green4 data-[state=open]:text-grass11 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1 data-[highlighted]:data-[state=open]:bg-green9 data-[highlighted]:data-[state=open]:text-green1',
          },
          (): (string | VNode)[] => [
            item.label || '',
            h(
              'div',
              {
                class:
                  'ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8',
              },
              () => ChevronRightIcon(),
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
                class:
                  'min-w-[220px] z-30 outline-none bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade',
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
                class:
                  'ml-auto pl-[20px] text-mauve11 group-data-[highlighted]:text-white group-data-[disabled]:text-mauve8',
              },
              item.shortcut,
            ),
        ],
      )
  }
}
</script>

<style scoped lang="postcss"></style>
