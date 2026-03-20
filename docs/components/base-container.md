---
title: BaseContainer 基礎容器
---

# BaseContainer 基礎容器

BaseContainer 提供一個符合 Design System 規範的基礎容器元素，具有統一的背景色、邊框色與圓角，用於包裝其他內容。

## 基本用法

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <SHBaseContainer>
    <p>This is a basic base container with default styling.</p>
  </SHBaseContainer>
</template>
```

  </template>
</Demo>

## 尺寸設定

可以設置不同的寬度與高度。

<Demo>
  <StyleDemo />
  
  <template #code>

```vue
<template>
  <SHBaseContainer width="200px" height="120px">
    <p>200px × 120px</p>
  </SHBaseContainer>
</template>
```

  </template>
</Demo>

## 陰影效果

<Demo>
  <CustomizationDemo />
  
  <template #code>

```vue
<template>
  <SHBaseContainer shadow>
    <p>Base container with shadow effect</p>
  </SHBaseContainer>
</template>
```

  </template>
</Demo>

## 禁用狀態

<Demo>
  <DisabledDemo />
  
  <template #code>

```vue
<template>
  <SHBaseContainer disabled>
    <p>Disabled base container</p>
  </SHBaseContainer>
</template>
```

  </template>
</Demo>

## API

### Props

| 屬性     | 說明         | 類型               | 默認值   |
| -------- | ------------ | ------------------ | -------- |
| width    | 容器寬度     | `string \| number` | `'auto'` |
| height   | 容器高度     | `string \| number` | `'auto'` |
| shadow   | 是否顯示陰影 | `boolean`          | `false`  |
| disabled | 是否禁用     | `boolean`          | `false`  |

### Events

| 事件名 | 說明                               | 回調參數              |
| ------ | ---------------------------------- | --------------------- |
| click  | 點擊容器時觸發（禁用狀態下不觸發） | `(event: MouseEvent)` |

### Slots

| 插槽名  | 說明     |
| ------- | -------- |
| default | 容器內容 |

<script setup>
import BasicDemo from '@/components/BaseContainer/demos/BasicDemo.vue'
import StyleDemo from '@/components/BaseContainer/demos/StyleDemo.vue'
import CustomizationDemo from '@/components/BaseContainer/demos/CustomizationDemo.vue'
import DisabledDemo from '@/components/BaseContainer/demos/DisabledDemo.vue'
</script>
