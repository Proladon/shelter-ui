# ContextMenu 組件

一個可重用的右鍵選單組件，支持多種類型的選單項目。

## 基本用法

<Demo>
    <BasicDemo />
</Demo>

```vue
<template>
  <ContextMenu :items="menuItems" trigger-content="右鍵點擊這裡" />
</template>

<script setup>
import { SHContextMenu as ContextMenu } from '@proladon/shelter-ui'
import { ref } from 'vue'

const menuItems = [
  {
    type: 'item',
    label: '新增標籤',
    shortcut: '⌘+T',
    onClick: (item) => console.log('點擊了:', item.label),
  },
  {
    type: 'separator',
  },
  {
    type: 'item',
    label: '設定',
    onClick: (item) => console.log('點擊了:', item.label),
  },
]
</script>
```

## Props

| 屬性名           | 類型                      | 預設值                | 說明                |
| ---------------- | ------------------------- | --------------------- | ------------------- |
| `items`          | `ContextMenuItemOption[]` | `[]`                  | 選單項目配置        |
| `triggerContent` | `string`                  | `'Right click here.'` | 觸發元素的內容      |
| `triggerClass`   | `string`                  | -                     | 觸發元素的 CSS 類別 |
| `radioValue`     | `string \| number`        | -                     | 單選組的當前值      |
| `radioGroup`     | `string`                  | -                     | 單選組名稱          |

## 選單項目類型

### 普通選單項目 (item)

```javascript
{
  type: 'item',
  label: '選單項目',
  icon: SomeIconComponent, // 可選的圖示組件
  shortcut: '⌘+T', // 可選的快捷鍵顯示
  disabled: false, // 是否禁用
  onClick: (item) => {} // 點擊處理函數
}
```

### 分隔線 (separator)

```javascript
{
  type: 'separator'
}
```

### 標籤 (label)

```javascript
{
  type: 'label',
  label: '分組標題'
}
```

### 複選框 (checkbox)

```javascript
{
  type: 'checkbox',
  label: '顯示書籤',
  value: 'bookmarks',
  checked: false, // 初始選中狀態
  shortcut: '⌘+B'
}
```

### 單選框 (radio)

```javascript
{
  type: 'radio',
  label: 'Pedro Duarte',
  value: 'pedro'
}
```

### 子選單 (sub)

```javascript
{
  type: 'sub',
  label: '更多工具',
  children: [
    {
      type: 'item',
      label: '另存新檔…',
      shortcut: '⌘+S'
    },
    // 更多子項目...
  ]
}
```

## 事件

| 事件名              | 參數                                            | 說明                        |
| ------------------- | ----------------------------------------------- | --------------------------- |
| `item-click`        | `item: ContextMenuItemOption`                   | 選單項目被點擊時觸發        |
| `checkbox-change`   | `item: ContextMenuItemOption, checked: boolean` | 複選框狀態改變時觸發        |
| `radio-change`      | `value: string \| number`                       | 單選框選擇改變時觸發        |
| `update:radioValue` | `value: string \| number`                       | 用於 v-model 雙向綁定單選值 |

## 插槽

| 插槽名    | 說明                                              |
| --------- | ------------------------------------------------- |
| `default` | 觸發元素的內容，如果提供則會覆蓋 `triggerContent` |

## 複雜範例

```vue
<template>
  <div class="space-y-4">
    <!-- 基本選單 -->
    <ContextMenu :items="basicItems" trigger-content="基本選單" />

    <!-- 帶複選框的選單 -->
    <ContextMenu
      :items="checkboxItems"
      @checkbox-change="handleCheckboxChange"
      trigger-content="複選框選單"
    />

    <!-- 單選組選單 -->
    <ContextMenu
      :items="radioItems"
      radio-group="people"
      v-model:radio-value="selectedPerson"
      trigger-content="單選組選單"
    />

    <!-- 自定義觸發器 -->
    <ContextMenu :items="basicItems">
      <button class="px-4 py-2 bg-blue-500 text-white rounded">
        自定義按鈕
      </button>
    </ContextMenu>
  </div>
</template>

<script setup>
import { SHContextMenu as ContextMenu } from '@proladon/shelter-ui'
import { ref } from 'vue'

const selectedPerson = ref('pedro')

const basicItems = [
  {
    type: 'item',
    label: '新增標籤',
    shortcut: '⌘+T',
    onClick: () => alert('新增標籤'),
  },
  {
    type: 'sub',
    label: '更多工具',
    children: [
      {
        type: 'item',
        label: '另存新檔…',
        shortcut: '⌘+S',
      },
      {
        type: 'separator',
      },
      {
        type: 'item',
        label: '開發者工具',
      },
    ],
  },
]

const checkboxItems = [
  {
    type: 'checkbox',
    label: '顯示書籤',
    value: 'bookmarks',
    shortcut: '⌘+B',
  },
  {
    type: 'checkbox',
    label: '顯示完整網址',
    value: 'urls',
  },
]

const radioItems = [
  {
    type: 'label',
    label: '人員',
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

const handleCheckboxChange = (item, checked) => {
  console.log(`${item.label} 被${checked ? '選中' : '取消選中'}`)
}
</script>
```

## 樣式自定義

組件使用 Tailwind CSS 類別進行樣式設計。你可以通過 `triggerClass` 屬性自定義觸發器的樣式：

```vue
<ContextMenu
  :items="items"
  trigger-class="w-48 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
  trigger-content="自定義樣式觸發器"
/>
```

## 類型定義

```typescript
interface ContextMenuItemOption {
  type?: 'item' | 'separator' | 'checkbox' | 'radio' | 'sub' | 'label'
  label?: string
  value?: string | number
  icon?: string | any
  shortcut?: string
  disabled?: boolean
  checked?: boolean
  children?: ContextMenuItemOption[]
  onClick?: (item: ContextMenuItemOption) => void
}

interface ContextMenuProps {
  items?: ContextMenuItemOption[]
  triggerContent?: string
  triggerClass?: string
  radioValue?: string | number
  radioGroup?: string
}
```

<script setup>
import BasicDemo from '@/components/ContextMenu/demos/BasicDemo.vue'
</script>
