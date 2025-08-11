# MessageBox 訊息盒

`MessageBox` 是一個帶有邊框與 icon 的訊息提示容器，支援 info、danger、success、normal 四種型態，icon 可自訂。

## 範例

<Demo>
<BasicDemo />
</Demo>

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/MessageBox/demos/BasicDemo.vue'
</script>

## 基本用法

```vue
<SHMessageBox type="info">這是一個 info 訊息</SHMessageBox>
<SHMessageBox type="danger">這是一個 danger 訊息</SHMessageBox>
<SHMessageBox type="success">這是一個 success 訊息</SHMessageBox>
<SHMessageBox type="normal">這是一個 normal 訊息</SHMessageBox>
```

## 自訂 icon

```vue
<SHMessageBox
  type="info"
  icon="<svg viewBox='0 0 20 20' fill='currentColor' width='20' height='20'><rect x='4' y='4' width='12' height='12' stroke='currentColor' stroke-width='2' fill='none'/></svg>"
>
  自訂 icon
</SHMessageBox>
```

## Props

| 名稱 | 類型                                  | 預設值 | 說明                      |
| ---- | ------------------------------------- | ------ | ------------------------- |
| type | 'info'\|'danger'\|'success'\|'normal' | 'info' | 訊息盒型態                |
| icon | string \| 組件                        | 無     | 自訂 icon (svg/html/組件) |

## Slot

- `default`：訊息內容
- `icon`：自訂 icon slot，會覆蓋 props.icon
