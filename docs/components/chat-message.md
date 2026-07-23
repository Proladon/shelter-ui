---
title: ChatMessage 對話訊息
---

# ChatMessage 對話訊息

ChatMessage 用於顯示社交軟體風格的對話訊息，包含頭像、使用者名稱、訊息時間與訊息本體，支援左側（收到）與右側（自己發送）兩種對齊方向。

## 基本用法

左對齊為收到的訊息，右對齊為自己發送的訊息。

<Demo>
  <BasicDemo />

<template #code>

```vue
<template>
  <div
    style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;"
  >
    <!-- 收到的訊息 -->
    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=1"
      username="Alice"
      time="10:30"
      content="嗨！最近怎麼樣？"
    />

    <!-- 自己發送的訊息 -->
    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=5"
      username="Me"
      time="10:32"
      content="好啊！我五分鐘後出發。"
      position="right"
      status="sent"
    />
  </div>
</template>
```

  </template>
</Demo>

## 頭像 Fallback

當 `avatar` 未提供時，組件會顯示 `avatarFallback` 的文字，或自動取 `username` 的首字大寫。

<Demo>
  <FallbackDemo />

<template #code>

```vue
<template>
  <!-- 使用 avatarFallback 指定顯示文字 -->
  <SHChatMessage
    avatar-fallback="B"
    username="Bob"
    time="10:31"
    content="今天天氣真好，要不要一起去散步？"
  />

  <!-- 無任何頭像設定，自動取 username 首字 -->
  <SHChatMessage
    username="Charlie"
    time="10:35"
    content="沒有頭像時顯示使用者名稱首字。"
  />
</template>
```

  </template>
</Demo>

## 訊息狀態

透過 `status` prop 顯示自己發送訊息的傳送狀態，支援 `sending`、`sent`、`failed` 三種狀態，僅在 `position="right"` 時生效。

<Demo>
  <StatusDemo />

<template #code>

```vue
<template>
  <SHChatMessage
    username="Me"
    time="10:33"
    content="傳送中的訊息…"
    position="right"
    status="sending"
  />

  <SHChatMessage
    username="Me"
    time="10:34"
    content="已傳送的訊息"
    position="right"
    status="sent"
  />

  <SHChatMessage
    username="Me"
    time="10:35"
    content="傳送失敗的訊息"
    position="right"
    status="failed"
  />
</template>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名         | 說明                                            | 類型                              | 默認值   |
| -------------- | ----------------------------------------------- | --------------------------------- | -------- |
| avatar         | 頭像圖片 URL                                    | `string`                          | `-`      |
| avatarFallback | 無圖時顯示的文字，未提供時自動取 username 首字  | `string`                          | `-`      |
| username       | 使用者名稱                                      | `string`                          | `-`      |
| time           | 訊息時間                                        | `string`                          | `-`      |
| content        | 訊息本體文字                                    | `string`                          | `-`      |
| position       | 訊息對齊方向，`left` 為收到，`right` 為自己發送 | `'left' \| 'right'`               | `'left'` |
| status         | 訊息傳送狀態，僅 `position="right"` 時顯示      | `'sending' \| 'sent' \| 'failed'` | `-`      |
| showCopyButton | 是否顯示複製按鈕（hover 時出現）                | `boolean`                         | `true`   |
| showTime       | 是否顯示時間                                    | `boolean`                         | `true`   |
| showUsername   | 是否顯示使用者名稱                              | `boolean`                         | `true`   |

### 事件

| 事件名 | 說明                                  | 回調參數            |
| ------ | ------------------------------------- | ------------------- |
| copy   | 點擊複製按鈕時觸發，回傳當前訊息內容  | `(content: string)` |

### 插槽

| 插槽名   | 說明           |
| -------- | -------------- |
| avatar   | 自訂頭像區塊   |
| username | 自訂使用者名稱 |
| time     | 自訂時間顯示   |
| content  | 自訂訊息本體   |

<script setup>
import BasicDemo from '@/components/ChatMessage/demos/BasicDemo.vue'
import FallbackDemo from '@/components/ChatMessage/demos/BasicDemo.vue'
import StatusDemo from '@/components/ChatMessage/demos/BasicDemo.vue'
</script>
