---
title: Chip 標籤
---

# Chip 標籤

Chip 標籤用於顯示實體資訊，支持圖示、標籤文字和圖片。

## 基本用法

基本的 Chip 標籤，可以設定標籤文字和移除功能。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <div class="flex gap-3">
    <SHChip label="動作" />
    <SHChip label="喜劇" />
    <SHChip label="懸疑" />
    <SHChip label="驚悚" removable />
  </div>
</template>
```

  </template>
</Demo>

## 圖示 Chip

可以在標籤文字旁邊顯示圖示。

<Demo>
  <IconDemo />
  
  <template #code>

```vue
<template>
  <div class="flex gap-3">
    <SHChip label="Apple" :icon="IconApple" />
    <SHChip label="Brand Facebook" :icon="IconBrandFacebook" />
    <SHChip label="Brand Google" :icon="IconBrandGoogle" />
    <SHChip label="Brand Windows" :icon="IconBrandWindows" removable />
    <SHChip label="Brand GitHub" :icon="IconBrandGithub" removable>
      <template #removeicon="{ removeCallback, keydownCallback }">
        <icon-minus
          @click="removeCallback"
          @keydown="keydownCallback"
          class="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity"
        />
      </template>
    </SHChip>
  </div>
</template>

<script setup lang="ts">
import {
  IconApple,
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandWindows,
  IconBrandGithub,
  IconMinus,
} from '@tabler/icons-vue'
</script>
```

  </template>
</Demo>

## 圖片 Chip

使用 `image` 屬性顯示頭像等圖片。

<Demo>
  <ImageDemo />
  
  <template #code>

```vue
<template>
  <div class="flex gap-3">
    <SHChip
      label="Amy Elsner"
      image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
    />
    <SHChip
      label="Asiya Javayant"
      image="https://primefaces.org/cdn/primevue/images/avatar/asiyajavayant.png"
    />
    <SHChip
      label="Onyama Limba"
      image="https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png"
    />
    <SHChip
      label="Xuxue Feng"
      image="https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png"
      removable
    />
  </div>
</template>
```

  </template>
</Demo>

## 自定義模板

使用預設插槽可以自定義 Chip 內容。

<Demo>
  <TemplateDemo />
  
  <template #code>

```vue
<template>
  <div class="flex gap-3">
    <SHChip class="py-0 pl-0 pr-4">
      <span
        class="bg-primary text-primary-contrast rounded-full w-8 h-8 flex items-center justify-center"
        >P</span
      >
      <span class="ml-2 font-medium">PRIME</span>
    </SHChip>

    <SHChip class="py-0 pl-0 pr-4">
      <span
        class="bg-status-success text-white rounded-full w-8 h-8 flex items-center justify-center"
        >S</span
      >
      <span class="ml-2 font-medium">SHELTER</span>
    </SHChip>

    <SHChip removable>
      <template #icon>
        <icon-heart class="w-4 h-4 text-red-500" />
      </template>
      <span class="font-medium">最愛</span>
    </SHChip>
  </div>
</template>

<script setup lang="ts">
import { IconHeart } from '@tabler/icons-vue'
</script>
```

  </template>
</Demo>

## 屬性

| 屬性名     | 說明         | 類型      | 默認值 |
| ---------- | ------------ | --------- | ------ |
| label      | 標籤文字     | string    | ''     |
| image      | 圖片網址     | string    | ''     |
| icon       | 圖示組件     | Component | -      |
| removable  | 是否可移除   | boolean   | false  |
| removeIcon | 移除圖示組件 | Component | IconX  |

## 事件

| 事件名     | 說明             | 回調參數     |
| ---------- | ---------------- | ------------ |
| remove     | 移除事件         | event: Event |
| removeicon | 移除圖示點擊事件 | event: Event |

## 插槽

| 插槽名     | 說明         | 插槽屬性                                                                              |
| ---------- | ------------ | ------------------------------------------------------------------------------------- |
| default    | 預設內容     | -                                                                                     |
| icon       | 圖示內容     | -                                                                                     |
| removeicon | 移除圖示內容 | `{ removeCallback: (event: Event) => void, keydownCallback: (event: Event) => void }` |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Chip/demos/BasicDemo.vue'
import IconDemo from '@/components/Chip/demos/IconDemo.vue'
import ImageDemo from '@/components/Chip/demos/ImageDemo.vue'
import TemplateDemo from '@/components/Chip/demos/TemplateDemo.vue'
</script>
