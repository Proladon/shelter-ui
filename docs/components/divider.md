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
  <div>
    <p>第一段內容</p>
    <SHDivider />
    <p>第二段內容</p>
  </div>
</template>
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
  <div>
    <p>這是一些內容</p>
    <SHDivider>或</SHDivider>
    <p>這是另一些內容</p>
    <SHDivider>重要分隔</SHDivider>
    <p>更多內容在這裡</p>
  </div>
</template>
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
  <div class="flex items-center space-x-4">
    <div>Blog</div>
    <SHDivider orientation="vertical" />
    <div>Docs</div>
    <SHDivider orientation="vertical" />
    <div>Source</div>
  </div>
</template>
```

  </template>
</Demo>

## 不同樣式

分隔線支持實線、虛線和點線三種樣式。

<Demo>
  <VariantDividerDemo />
  
  <template #code>

```vue
<template>
  <div>
    <!-- 實線 -->
    <SHDivider variant="solid" />

    <!-- 虛線 -->
    <SHDivider variant="dashed" />

    <!-- 點線 -->
    <SHDivider variant="dotted" />
  </div>
</template>
```

  </template>
</Demo>

## 不同粗細

可以通過 `thickness` 屬性設置分隔線的粗細。

<Demo>
  <ThicknessDividerDemo />
  
  <template #code>

```vue
<template>
  <div>
    <!-- 細線 -->
    <SHDivider thickness="thin" />

    <!-- 中等粗細 -->
    <SHDivider thickness="medium" />

    <!-- 粗線 -->
    <SHDivider thickness="thick" />
  </div>
</template>
```

  </template>
</Demo>

## 組合使用

結合不同樣式和粗細來創建豐富的內容分割效果。

<Demo>
  <CombinedDividerDemo />
  
  <template #code>

```vue
<template>
  <div class="p-4 border rounded">
    <h4 class="font-semibold">產品介紹</h4>
    <p class="text-sm text-gray-600">這是一個很棒的產品</p>

    <SHDivider variant="dashed" thickness="medium">特色功能</SHDivider>

    <ul class="list-disc list-inside space-y-1 text-sm">
      <li>功能一</li>
      <li>功能二</li>
      <li>功能三</li>
    </ul>

    <SHDivider variant="dotted">價格資訊</SHDivider>

    <div class="flex items-center justify-between">
      <span>基礎版</span>
      <span class="font-semibold">$29/月</span>
    </div>
  </div>
</template>
```

  </template>
</Demo>

## API

### Props

| 屬性名      | 類型                              | 預設值         | 說明       |
| ----------- | --------------------------------- | -------------- | ---------- |
| orientation | `'horizontal' \| 'vertical'`      | `'horizontal'` | 分隔線方向 |
| variant     | `'solid' \| 'dashed' \| 'dotted'` | `'solid'`      | 分隔線樣式 |
| thickness   | `'thin' \| 'medium' \| 'thick'`   | `'thin'`       | 分隔線粗細 |
| class       | `string`                          | —              | 自定義類名 |

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

組件提供了豐富的 CSS 類名供樣式自定義：

- `.sh-divider` - 分隔線容器
- `.sh-divider--horizontal` - 水平分隔線
- `.sh-divider--vertical` - 垂直分隔線
- `.sh-divider--solid` - 實線樣式
- `.sh-divider--dashed` - 虛線樣式
- `.sh-divider--dotted` - 點線樣式
- `.sh-divider--thin` - 細線
- `.sh-divider--medium` - 中等粗細
- `.sh-divider--thick` - 粗線

<script setup>
    import BasicDividerDemo from '@/components/Divider/demos/Basic.vue'
    import TextDividerDemo from '@/components/Divider/demos/Text.vue'
    import VerticalDividerDemo from '@/components/Divider/demos/Vertical.vue'
    import VariantDividerDemo from '@/components/Divider/demos/Variant.vue'
    import ThicknessDividerDemo from '@/components/Divider/demos/Thickness.vue'
    import CombinedDividerDemo from '@/components/Divider/demos/Combined.vue'
</script>
