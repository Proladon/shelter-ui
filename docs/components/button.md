<script setup>
  import BasicDemo from '@/components/Button/demos/BasicDemo.vue'
  import TypeDemo from '@/components/Button/demos/TypeDemo.vue'
  import LoadingDemo from '@/components/Button/demos/LoadingDemo.vue'
</script>

# Button 按鈕

按鈕用於觸發一個操作，如提交表單。

## 基本用法

<SConfigProvider>
<BasicDemo />
</SConfigProvider>

## 樣式

<SConfigProvider>
<TypeDemo />
</SConfigProvider>

## 加載

<SConfigProvider>
  <LoadingDemo />
</SConfigProvider>

## API

### 屬性

| 屬性名   | 說明             | 類型                                                                                                      | 默認值      |
| -------- | ---------------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| type     | 按鈕類型         | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default' \| 'plain' \| 'text' \| 'dashed'` | `'default'` |
| size     | 按鈕尺寸         | `'large' \| 'default' \| 'small'`                                                                         | `'default'` |
| disabled | 是否禁用         | `boolean`                                                                                                 | `false`     |
| loading  | 是否顯示加載狀態 | `boolean`                                                                                                 | `false`     |

### 事件

| 事件名 | 說明           | 回調參數                      |
| ------ | -------------- | ----------------------------- |
| click  | 點擊按鈕時觸發 | `(event: MouseEvent) => void` |

### 插槽

| 插槽名  | 說明       |
| ------- | ---------- |
| default | 按鈕的內容 |
