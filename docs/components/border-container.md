---
title: BorderContainer 邊框容器
---

# BorderContainer 邊框容器

BorderContainer 提供一個具有可自定義邊框的容器元素，可用於包裝其他內容。

## 基本用法

基本的邊框容器，支持多種類型。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <div class="flex flex-col gap-4">
    <s-border-container>
      <p>This is a basic border container with default styling.</p>
    </s-border-container>

    <s-border-container type="primary">
      <p>This is a border container with primary color.</p>
    </s-border-container>

    <s-border-container type="success">
      <p>This is a border container with success color.</p>
    </s-border-container>
  </div>
</template>
```

  </template>
</Demo>

## 邊框寬度

BorderContainer 允許您設置不同的邊框寬度。

<Demo>
  <StyleDemo />
  
  <template #code>

```vue
<template>
  <div class="flex flex-col gap-4">
    <h4>Border Widths</h4>
    <div class="grid grid-cols-2 gap-4">
      <s-border-container :borderWidth="1">
        <p>1px border width</p>
      </s-border-container>
      
      <s-border-container :borderWidth="2">
        <p>2px border width</p>
      </s-border-container>
      
      <s-border-container :borderWidth="3">
        <p>3px border width</p>
      </s-border-container>
      
      <s-border-container :borderWidth="4">
        <p>4px border width</p>
      </s-border-container>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 禁用狀態

使用 `disabled` 屬性來禁用邊框容器。

<Demo>
  <DisabledDemo />
  
  <template #code>

```vue
<template>
  <div class="flex flex-col gap-4">
    <h4>Disabled State</h4>
    <div class="grid grid-cols-2 gap-4">
      <s-border-container 
        disabled
      >
        <p>Disabled border container with default styling</p>
      </s-border-container>
      
      <s-border-container 
        type="primary"
        disabled
      >
        <p>Disabled border container with primary color</p>
      </s-border-container>
      
      <s-border-container 
        type="success"
        shadow
        disabled
      >
        <p>Disabled border container with shadow</p>
      </s-border-container>
      
      <s-border-container 
        type="warning"
        transparent
        disabled
      >
        <p>Disabled border container with transparent background</p>
      </s-border-container>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## 高級定制

BorderContainer 支持多種自定義選項，包括陰影、透明背景、自定義邊框半徑和邊框寬度等。

<Demo>
  <CustomizationDemo />
  
  <template #code>

```vue
<template>
  <div class="flex flex-col gap-4">
    <h4>Advanced Customization</h4>
    <div class="grid grid-cols-2 gap-4">
      <s-border-container 
        type="primary"
        shadow
      >
        <p>Border container with shadow effect</p>
      </s-border-container>
      
      <s-border-container 
        type="success"
        transparent
      >
        <p>Border container with transparent background</p>
      </s-border-container>
      
      <s-border-container 
        type="warning"
        :borderRadius="12"
      >
        <p>Border container with custom border radius</p>
      </s-border-container>
      
      <s-border-container 
        type="info"
        :borderWidth="3"
        :padding="8"
      >
        <p>Border container with custom border width and padding</p>
      </s-border-container>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名 | 說明 | 類型 | 默認值 |
| --- | --- | --- | --- |
| type | 邊框容器類型 | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'default'` | `'default'` |
| width | 容器寬度 | `string \| number` | `'auto'` |
| height | 容器高度 | `string \| number` | `'auto'` |
| borderWidth | 邊框寬度 | `string \| number` | `1` |
| borderRadius | 邊框圓角 | `string \| number` | `4` |
| padding | 內邊距 | `string \| number` | `16` |
| shadow | 是否顯示陰影 | `boolean` | `false` |
| transparent | 是否透明背景 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |

### 事件

| 事件名 | 說明 | 回調參數 |
| --- | --- | --- |
| click | 點擊容器時觸發 | `(event: MouseEvent) => void` |

### 插槽

| 插槽名 | 說明 |
| --- | --- |
| default | 容器內容 |

<script setup>
import { SConfigProvider } from '@/index'
import BasicDemo from '@/components/BorderContainer/demos/BasicDemo.vue'
import StyleDemo from '@/components/BorderContainer/demos/StyleDemo.vue'
import DisabledDemo from '@/components/BorderContainer/demos/DisabledDemo.vue'
import CustomizationDemo from '@/components/BorderContainer/demos/CustomizationDemo.vue'
</script>