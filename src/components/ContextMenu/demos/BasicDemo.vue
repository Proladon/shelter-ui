<template>
  <div class="space-y-8 p-8">
    <h2 class="text-2xl font-bold">ContextMenu Demo</h2>

    <!-- Basic Menu -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Basic Menu</h3>
      <ContextMenu
        :items="basicMenuItems"
        trigger-content="Right click for basic menu"
      />
    </div>

    <!-- Complex Menu with Sub-items -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Complex Menu</h3>
      <ContextMenu
        :items="complexMenuItems"
        trigger-content="Right click for complex menu"
      />
    </div>

    <!-- Radio Group Menu -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Radio Group Menu</h3>
      <ContextMenu
        :items="radioMenuItems"
        radio-group="people"
        :radio-value="selectedPerson"
        @radio-change="handlePersonChange"
        trigger-content="Right click for radio menu"
      />
      <p class="text-sm text-gray-600">Selected: {{ selectedPerson }}</p>
    </div>

    <!-- Checkbox Menu -->
    <div class="space-y-4">
      <h3 class="text-lg font-semibold">Checkbox Menu</h3>
      <ContextMenu
        :items="checkboxMenuItems"
        @checkbox-change="handleCheckboxChange"
        trigger-content="Right click for checkbox menu"
      />
      <div class="text-sm text-gray-600">
        <p>Show Bookmarks: {{ checkboxStates.bookmarks }}</p>
        <p>Show URLs: {{ checkboxStates.urls }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContextMenu from '../index.vue'
import type { ContextMenuItemOption } from '../types'

// Basic menu items
const basicMenuItems: ContextMenuItemOption[] = [
  {
    type: 'item',
    label: 'New Tab',
    shortcut: '⌘+T',
    onClick: (item) => alert(`Clicked: ${item.label}`),
  },
  {
    type: 'item',
    label: 'New Window',
    shortcut: '⌘+N',
    onClick: (item) => alert(`Clicked: ${item.label}`),
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    label: 'Settings',
    onClick: (item) => alert(`Clicked: ${item.label}`),
  },
]

// Complex menu with sub-items
const complexMenuItems: ContextMenuItemOption[] = [
  {
    type: 'item',
    label: 'New Tab',
    shortcut: '⌘+T',
    onClick: (item) => alert(`Clicked: ${item.label}`),
  },
  {
    type: 'sub',
    label: 'More Tools',
    children: [
      {
        type: 'item',
        label: 'Save Page As…',
        shortcut: '⌘+S',
        onClick: (item) => alert(`Clicked: ${item.label}`),
      },
      {
        type: 'item',
        label: 'Create Shortcut…',
        onClick: (item) => alert(`Clicked: ${item.label}`),
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        label: 'Developer Tools',
        onClick: (item) => alert(`Clicked: ${item.label}`),
      },
    ],
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    label: 'New Private Window',
    shortcut: '⇧+⌘+N',
    disabled: true,
    onClick: (item) => alert(`Clicked: ${item.label}`),
  },
]

// Radio group menu
const selectedPerson = ref('pedro')
const radioMenuItems: ContextMenuItemOption[] = [
  {
    type: 'label',
    label: 'People',
  },
  {
    type: 'radio',
    label: 'Pedro Duarte',
    value: 'pedro',
  },
  {
    type: 'radio',
    label: 'Colm Tuite',
    value: 'colm',
  },
]

// Checkbox menu
const checkboxStates = ref({
  bookmarks: false,
  urls: false,
})

const checkboxMenuItems: ContextMenuItemOption[] = [
  {
    type: 'checkbox',
    label: 'Show Bookmarks',
    value: 'bookmarks',
    shortcut: '⌘+B',
    checked: false,
  },
  {
    type: 'checkbox',
    label: 'Show Full URLs',
    value: 'urls',
    checked: false,
  },
]

// Event handlers
const handlePersonChange = (value: string | number) => {
  selectedPerson.value = value.toString()
}

const handleCheckboxChange = (
  item: ContextMenuItemOption,
  checked: boolean,
) => {
  if (item.value) {
    checkboxStates.value[
      item.value.toString() as keyof typeof checkboxStates.value
    ] = checked
  }
}
</script>
