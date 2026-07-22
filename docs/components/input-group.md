---
title: InputGroup 輸入框組合
---

# InputGroup 輸入框組合

InputGroup 將輸入框與前置 / 後置附加元素（文字、按鈕、圖示）組合成一個整體，邊框自動合并，末端圓角自動修正。

## 基本用法

搭配 `SHInputGroupAddon` 在輸入框前後附加靜態文字。

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <div class="flex flex-col gap-4 max-w-md">
    <!-- 前綴附加 -->
    <SHInputGroup>
      <SHInputGroupAddon>https://</SHInputGroupAddon>
      <SHInput v-model:value="url" placeholder="example.com" />
    </SHInputGroup>

    <!-- 後綴附加 -->
    <SHInputGroup>
      <SHInput v-model:value="email" placeholder="username" />
      <SHInputGroupAddon>@example.com</SHInputGroupAddon>
    </SHInputGroup>

    <!-- 前後雙附加 -->
    <SHInputGroup>
      <SHInputGroupAddon>$</SHInputGroupAddon>
      <SHInput v-model:value="price" placeholder="0.00" />
      <SHInputGroupAddon>USD</SHInputGroupAddon>
    </SHInputGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const url = ref('')
const email = ref('')
const price = ref('')
</script>
```

  </template>
</Demo>

## 搭配按鈕

在組合內直接放入 `SHButton`，適合搜尋欄或操作觸發場景。

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <div class="flex flex-col gap-4 max-w-md">
    <!-- 輸入框 + 按鈕 -->
    <SHInputGroup>
      <SHInput v-model:value="search" placeholder="Search..." />
      <SHButton type="primary">Search</SHButton>
    </SHInputGroup>

    <!-- 按鈕 + 輸入框 -->
    <SHInputGroup>
      <SHButton type="default">Browse</SHButton>
      <SHInput v-model:value="path" placeholder="/path/to/file" />
    </SHInputGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const search = ref('')
const path = ref('')
</script>
```

  </template>
</Demo>

## 圖示附加

在 `SHInputGroupAddon` 內放置 SVG 圖示，搭配搜尋欄使用。

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <SHInputGroup class="max-w-md">
    <SHInputGroupAddon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
    </SHInputGroupAddon>
    <SHInput v-model:value="keyword" placeholder="Search by keyword..." />
  </SHInputGroup>
</template>

<script setup>
import { ref } from 'vue'

const keyword = ref('')
</script>
```

  </template>
</Demo>

## AI Chat 輸入框

同時使用 `block-start` 與 `block-end` 兩個附加列，打造帶有頂部情境標籤列與底部工具列的 AI 聊天輸入框。

<Demo>
  <ChatInputDemo />

<template #code>

```vue
<template>
  <div class="max-w-md">
    <SHInputGroup>
      <!-- Header: context chips -->
      <SHInputGroupAddon align="block-start">
        <button class="context-chip">
          <IconAt :size="13" />
          <span>Add context</span>
        </button>
      </SHInputGroupAddon>

      <!-- Main textarea -->
      <SHTextarea
        v-model:value="message"
        placeholder="Ask, search, or make anything…"
        :rows="3"
        resize="none"
      />

      <!-- Footer toolbar -->
      <SHInputGroupAddon align="block-end">
        <button class="toolbar-icon-btn" title="Attach file">
          <IconPaperclip :size="15" />
        </button>
        <button class="toolbar-pill">
          Auto
          <IconChevronDown :size="11" />
        </button>
        <button class="toolbar-pill">
          <IconWorld :size="11" />
          All Sources
        </button>
        <button
          class="send-btn"
          style="margin-left: auto"
          :disabled="!message.trim()"
        >
          <IconArrowUp :size="15" />
        </button>
      </SHInputGroupAddon>
    </SHInputGroup>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  IconAt,
  IconPaperclip,
  IconChevronDown,
  IconWorld,
  IconArrowUp,
} from '@tabler/icons-vue'

const message = ref('')
</script>
```

  </template>
</Demo>

## API

### InputGroup

#### 屬性

InputGroup 本身為純容器，目前無額外 props。

| 屬性名 | 類型 | 默認值 | 說明                     |
| ------ | ---- | ------ | ------------------------ |
| —      | —    | —      | 暫無，由 slot 組合子元素 |

#### 插槽

| 插槽名  | 說明                                                     |
| ------- | -------------------------------------------------------- |
| default | 放置 `SHInput`、`SHInputGroupAddon`、`SHButton` 等子元素 |

---

### InputGroupAddon

附加區塊，放置在輸入框前方或後方，顯示說明文字或圖示。

#### 屬性

| 屬性名  | 類型                                       | 默認值     | 說明                                             |
| ------- | ------------------------------------------ | ---------- | ------------------------------------------------ |
| `align` | `'inline' \| 'block-start' \| 'block-end'` | `'inline'` | 附加列的擺放位置：左右行內、頂部整列、或底部整列 |

#### 插槽

| 插槽名  | 說明                               |
| ------- | ---------------------------------- |
| default | 附加內容，可為文字、SVG 圖示或按鈕 |

<script setup>
import BasicDemo from '@/components/InputGroup/demos/Basic.vue'
import ChatInputDemo from '@/components/InputGroup/demos/ChatInput.vue'
</script>
