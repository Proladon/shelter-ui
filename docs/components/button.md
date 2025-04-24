# Button 按鈕

按鈕用於觸發一個操作，如提交表單。

## 基本用法

使用 `type` 屬性設置不同的按鈕類型。

<Demo>
  <div class="flex gap-2">
    <s-button>默認按鈕</s-button>
    <s-button type="primary">主要按鈕</s-button>
    <s-button type="success">成功按鈕</s-button>
    <s-button type="warning">警告按鈕</s-button>
    <s-button type="danger">危險按鈕</s-button>
    <s-button type="info">信息按鈕</s-button>
  </div>
  
  <template #code>

```vue
<template>
  <div class="flex gap-2">
    <s-button>默認按鈕</s-button>
    <s-button type="primary">主要按鈕</s-button>
    <s-button type="success">成功按鈕</s-button>
    <s-button type="warning">警告按鈕</s-button>
    <s-button type="danger">危險按鈕</s-button>
    <s-button type="info">信息按鈕</s-button>
  </div>
</template>
```

  </template>
</Demo>

## 禁用狀態

使用 `disabled` 屬性禁用按鈕。

<Demo>
  <div class="flex gap-2">
    <s-button disabled>禁用按鈕</s-button>
    <s-button type="primary" disabled>禁用主要按鈕</s-button>
  </div>
  
  <template #code>

```vue
<template>
  <div class="flex gap-2">
    <s-button disabled>禁用按鈕</s-button>
    <s-button type="primary" disabled>禁用主要按鈕</s-button>
  </div>
</template>
```

  </template>
</Demo>

## 不同尺寸

使用 `size` 屬性設置不同的按鈕尺寸。

<Demo>
  <div class="flex items-center gap-2">
    <s-button size="small">小按鈕</s-button>
    <s-button>默認按鈕</s-button>
    <s-button size="large">大按鈕</s-button>
  </div>
  
  <template #code>

```vue
<template>
  <div class="flex items-center gap-2">
    <s-button size="small">小按鈕</s-button>
    <s-button>默認按鈕</s-button>
    <s-button size="large">大按鈕</s-button>
  </div>
</template>
```

  </template>
</Demo>

## 點擊事件

使用 `@click` 監聽按鈕的點擊事件。

<Demo>
  <s-button type="primary" @click="handleClick">點擊我</s-button>
  
  <template #code>

```vue
<template>
  <s-button type="primary" @click="handleClick">點擊我</s-button>
</template>

<script setup lang="ts">
const handleClick = () => {
  alert('按鈕被點擊了！')
}
</script>
```

  </template>
</Demo>

<script setup>
  const handleClick = () => {
  alert('按鈕被點擊了！')
}
</script>

## API

### 屬性

| 屬性名 | 說明 | 類型 | 默認值 |
| --- | --- | --- | --- |
| type | 按鈕類型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| size | 按鈕尺寸 | `'large' \| 'default' \| 'small'` | `'default'` |
| disabled | 是否禁用 | `boolean` | `false` |

### 事件

| 事件名 | 說明 | 回調參數 |
| --- | --- | --- |
| click | 點擊按鈕時觸發 | `(event: MouseEvent) => void` |

### 插槽

| 插槽名 | 說明 |
| --- | --- |
| default | 按鈕的內容 |