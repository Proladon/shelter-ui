---
title: Divider 分隔線
---

# Divider 分隔線

分隔線組件用於分隔內容區塊，提供視覺上的內容劃分。

## 基本用法

最基本的分隔線用法，用於分隔不同的內容區塊。

<Demo>
  <BasicDividerDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <div class="p-4 border rounded">
      <p>第一段內容</p>
      <Divider />
      <p>第二段內容</p>
    </div>
  </div>
</template>

<script setup>
import Divider from '../index.vue'
</script>
```

  </template>
</Demo>

## 帶文字的分隔線

分隔線中間可以加入文字說明。

<Demo>
  <TextDividerDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <div class="p-4 border rounded">
      <p>這是一些內容</p>
      <Divider>或</Divider>
      <p>這是另一些內容</p>
      <Divider>重要分隔</Divider>
      <p>更多內容在這裡</p>
    </div>
  </div>
</template>

<script setup>
import Divider from '../index.vue'
</script>
```

  </template>
</Demo>

## 垂直分隔線

設置 `orientation="vertical"` 可以創建垂直分隔線。

<Demo>
  <VerticalDividerDemo />
  
  <template #code>

```vue
<template>
  <div class="flex items-center h-20 space-x-4">
    <div class="text-center">
      <p class="font-semibold">Blog</p>
      <p class="text-sm text-gray-500">部落格</p>
    </div>
    <Divider orientation="vertical" />
    <div class="text-center">
      <p class="font-semibold">Docs</p>
      <p class="text-sm text-gray-500">文檔</p>
    </div>
    <Divider orientation="vertical" />
    <div class="text-center">
      <p class="font-semibold">Source</p>
      <p class="text-sm text-gray-500">原始碼</p>
    </div>
  </div>
</template>

<script setup>
import Divider from '../index.vue'
</script>
```

  </template>
</Demo>

## 自定義顏色

可以通過 `color` 屬性自定義分隔線的顏色。

<Demo>
  <ColorDividerDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-sm font-medium text-gray-700 mb-3">不同顏色的分隔線</h3>
      <div class="space-y-4">
        <!-- 預設顏色 -->
        <div>
          <p class="text-sm text-gray-500 mb-2">預設顏色 (#e5e7eb)</p>
          <Divider />
        </div>

        <!-- 紅色 -->
        <div>
          <p class="text-sm text-gray-500 mb-2">紅色 (#ef4444)</p>
          <Divider color="#ef4444" />
        </div>

        <!-- 藍色 -->
        <div>
          <p class="text-sm text-gray-500 mb-2">藍色 (#3b82f6)</p>
          <Divider color="#3b82f6" />
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-sm font-medium text-gray-700 mb-3">帶文字的彩色分隔線</h3>
      <div class="space-y-4">
        <Divider color="#ef4444">紅色分隔線</Divider>
        <Divider color="#3b82f6">藍色分隔線</Divider>
        <Divider color="#10b981">綠色分隔線</Divider>
      </div>
    </div>
  </div>
</template>

<script setup>
import Divider from '../index.vue'
</script>
```

  </template>
</Demo>

## 組合使用

結合不同顏色和文字來創建豐富的內容分割效果。

<Demo>
  <CombinedDividerDemo />
  
  <template #code>

```vue
<template>
  <div class="p-4 border rounded">
    <h4 class="font-semibold">產品介紹</h4>
    <p class="text-sm text-gray-600">這是一個很棒的產品</p>

    <Divider color="#6366f1">特色功能</Divider>

    <ul class="list-disc list-inside space-y-1 text-sm">
      <li>功能一</li>
      <li>功能二</li>
      <li>功能三</li>
    </ul>

    <Divider color="#10b981">價格資訊</Divider>

    <div class="flex items-center justify-between">
      <span>基礎版</span>
      <span class="font-semibold">$29/月</span>
    </div>
  </div>
</template>

<script setup>
import Divider from '../index.vue'
</script>
```

  </template>
</Demo>

## API

### Props

| 屬性名      | 類型                         | 預設值         | 說明       |
| ----------- | ---------------------------- | -------------- | ---------- |
| orientation | `'horizontal' \| 'vertical'` | `'horizontal'` | 分隔線方向 |
| color       | `string`                     | `'#e5e7eb'`    | 分隔線顏色 |
| class       | `string`                     | —              | 自定義類名 |

### Slots

| 插槽名  | 說明                 |
| ------- | -------------------- |
| default | 分隔線中間的文字內容 |

## 使用場景

- **內容分隔**：將不同主題的內容進行視覺分隔
- **導航分隔**：在導航欄中分隔不同的導航項目
- **表單分組**：在長表單中分隔不同的輸入區塊
- **列表分隔**：在列表項目之間添加分隔線

## 樣式自定義

組件提供了 CSS 類名和 CSS 變數供樣式自定義：

### CSS 類名

- `.sh-divider` - 分隔線容器
- `.sh-divider[data-orientation='horizontal']` - 水平分隔線
- `.sh-divider[data-orientation='vertical']` - 垂直分隔線

### CSS 變數

- `--sh-divider-color` - 分隔線顏色，可透過 `color` 屬性或 CSS 變數覆蓋

<script setup>
    import BasicDividerDemo from '@/components/Divider/demos/Basic.vue'
    import TextDividerDemo from '@/components/Divider/demos/Text.vue'
    import VerticalDividerDemo from '@/components/Divider/demos/Vertical.vue'
    import ColorDividerDemo from '@/components/Divider/demos/Color.vue'
    import CombinedDividerDemo from '@/components/Divider/demos/Combined.vue'
</script>
