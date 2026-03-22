---
title: AlertDialog 警告對話框
---

# AlertDialog 警告對話框

警告對話框用於需要用戶明確確認的危險或重要操作，例如刪除資料、重置設定、離開頁面等場景。與 Dialog 不同，AlertDialog 刻意阻止用戶透過點擊遮罩關閉，確保用戶主動做出選擇。

## 基本用法

四種類型（`danger`、`warning`、`info`、`success`）對應不同的操作語義，確認按鈕顏色與圖示會自動跟隨 `type` 變化。

<SHConfigProvider>
  <BasicDemo />
</SHConfigProvider>

## API

### 屬性

| 屬性名         | 說明                               | 類型                                           | 默認值     |
| -------------- | ---------------------------------- | ---------------------------------------------- | ---------- |
| open           | 控制對話框是否顯示（v-model）      | `boolean`                                      | —          |
| type           | 對話框類型，影響圖示與確認按鈕顏色 | `'danger' \| 'warning' \| 'info' \| 'success'` | `'danger'` |
| title          | 標題文字（也可透過 slot 設定）     | `string`                                       | —          |
| description    | 描述文字（也可透過 slot 設定）     | `string`                                       | —          |
| confirmText    | 確認按鈕文字                       | `string`                                       | `'確認'`   |
| cancelText     | 取消按鈕文字                       | `string`                                       | `'取消'`   |
| confirmLoading | 確認按鈕載入狀態                   | `boolean`                                      | `false`    |
| modal          | 是否為 modal 模式                  | `boolean`                                      | `true`     |

### 事件

| 事件名      | 說明                     | 回調參數                   |
| ----------- | ------------------------ | -------------------------- |
| update:open | 對話框開關狀態變化時觸發 | `(value: boolean) => void` |
| confirm     | 使用者點擊確認按鈕時觸發 | —                          |
| cancel      | 使用者點擊取消按鈕時觸發 | —                          |

### 插槽

| 插槽名      | 說明                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| trigger     | 觸發對話框的元素，需搭配 `AlertDialogTrigger`（從 `reka-ui` 引入）使用 |
| title       | 自訂標題內容（優先級高於 `title` prop）                                |
| description | 自訂描述內容（優先級高於 `description` prop）                          |
| footer      | 完全自訂底部按鈕區域，預設提供確認 / 取消按鈕                          |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/AlertDialog/demos/BasicDemo.vue'
</script>
