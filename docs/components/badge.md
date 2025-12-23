---
title: Badge 徽章
---

# Badge 徽章

Badge 徽章組件用於在圖標或文本旁邊顯示計數或狀態信息。

## 基本用法

基本的徽章展示，可以包含數字或文字。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <SHBadge value="5">
      <div class="demo-item"></div>
    </SHBadge>

    <SHBadge value="New">
      <div class="demo-item"></div>
    </SHBadge>

    <SHBadge :value="12">
      <div class="demo-item"></div>
    </SHBadge>

    <SHBadge is-dot>
      <div class="demo-item"></div>
    </SHBadge>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 24px;
}

.demo-item {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: #f1f1f1;
}
</style>
```

  </template>
</Demo>

## 自定義顏色

Badge 徽章組件支持自定義背景顏色和文本顏色。

<Demo>
  <ColorDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <SHBadge value="8" color="#4CAF50" textColor="#ffffff">
      <div class="demo-item"></div>
    </SHBadge>

    <SHBadge value="7" color="#2196F3" textColor="#ffffff">
      <div class="demo-item"></div>
    </SHBadge>

    <SHBadge value="9" color="#FF9800" textColor="#ffffff">
      <div class="demo-item"></div>
    </SHBadge>

    <SHBadge is-dot color="#9C27B0">
      <div class="demo-item"></div>
    </SHBadge>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 24px;
}

.demo-item {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: #f1f1f1;
}
</style>
```

  </template>
</Demo>

## 顯示位置

可以通過 `position` 屬性調整徽章的顯示位置。

<Demo>
  <PositionDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <SHBadge value="10" position="left">
      <div class="demo-item">Left</div>
    </SHBadge>

    <SHBadge value="10" position="center">
      <div class="demo-item">Center</div>
    </SHBadge>

    <SHBadge value="10" position="right">
      <div class="demo-item">Right</div>
    </SHBadge>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 32px;
  padding: 20px 0;
  justify-content: center;
}

.demo-item {
  width: 60px;
  height: 42px;
  border-radius: 4px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
}
</style>
```

  </template>
</Demo>

## 顯示與隱藏

可以通過 `show` 屬性控制徽章的顯示和隱藏。

<Demo>
  <VisibilityDemo />
  
  <template #code>

```vue
<template>
  <div>
    <div class="control-section">
      <SHButton @click="visible = !visible"> Toggle Badge Visibility </SHButton>
      <div>Current state: {{ visible ? 'Visible' : 'Hidden' }}</div>
    </div>

    <div class="badges-section">
      <SHBadge :value="8" :show="visible">
        <div class="demo-item"></div>
      </SHBadge>

      <SHBadge is-dot :show="visible">
        <div class="demo-item"></div>
      </SHBadge>

      <SHBadge value="New" :show="visible">
        <div class="demo-item"></div>
      </SHBadge>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(true)
</script>

<style scoped>
.control-section {
  margin-bottom: 20px;
  text-align: center;
}

.badges-section {
  display: flex;
  gap: 24px;
  justify-content: center;
}

.demo-item {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: #f1f1f1;
}
</style>
```

  </template>
</Demo>

## 自定義內容

可以通過 content 插槽自定義徽章的內容。

<Demo>
  <SlotDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <SHBadge>
      <div class="demo-item"></div>
      <template #content>
        <div class="custom-content">
          <span class="custom-icon">!</span>
        </div>
      </template>
    </SHBadge>

    <SHBadge>
      <div class="demo-item"></div>
      <template #content>
        <span style="font-size: 10px;">NEW</span>
      </template>
    </SHBadge>

    <SHBadge color="#8E44AD">
      <div class="demo-item"></div>
      <template #content>
        <span class="custom-emoji">🔥</span>
      </template>
    </SHBadge>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 24px;
}

.demo-item {
  width: 42px;
  height: 42px;
  border-radius: 4px;
  background-color: #f1f1f1;
}

.custom-icon {
  font-weight: bold;
}

.custom-emoji {
  font-size: 10px;
}
</style>
```

  </template>
</Demo>

## 位置偏移

可以通過 `offset` 相關屬性微調徽章的位置。

<Demo>
  <OffsetDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <SHBadge value="10" :offsetRight="10" :offsetTop="10">
      <div class="demo-item">Offset</div>
    </SHBadge>

    <SHBadge value="10" position="left" :offsetLeft="-5" :offsetTop="-5">
      <div class="demo-item">Offset</div>
    </SHBadge>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 32px;
  padding: 20px 0;
  justify-content: center;
}

.demo-item {
  width: 60px;
  height: 42px;
  border-radius: 4px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
}
</style>
```

  </template>
</Demo>

## 尺寸

可以通過 `size` 屬性調整徽章的大小。

<Demo>
  <SizeDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <SHBadge value="10" :size="10">
      <div class="demo-item">10px</div>
    </SHBadge>

    <SHBadge value="10" :size="12">
      <div class="demo-item">12px</div>
    </SHBadge>

    <SHBadge value="10" :size="14">
      <div class="demo-item">14px</div>
    </SHBadge>
  </div>
</template>

<style scoped>
.demo-container {
  display: flex;
  gap: 32px;
  padding: 20px 0;
  justify-content: center;
}

.demo-item {
  width: 60px;
  height: 42px;
  border-radius: 4px;
  background-color: #f1f1f1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #666;
}
</style>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名       | 說明                              | 類型                            | 默認值                                 |
| ------------ | --------------------------------- | ------------------------------- | -------------------------------------- |
| value        | 徽章顯示的內容                    | `string \| number`              | `''`                                   |
| color        | 徽章背景顏色                      | `string`                        | `''` (默認使用 status.danger 主題顏色) |
| textColor    | 徽章文本顏色                      | `string`                        | `''` (默認為白色)                      |
| isDot        | 是否顯示為小圓點                  | `boolean`                       | `false`                                |
| max          | 最大值，超過最大值會顯示 '{max}+' | `number`                        | `Infinity`                             |
| show         | 是否顯示徽章                      | `boolean`                       | `true`                                 |
| position     | 徽章顯示位置                      | `'left' \| 'center' \| 'right'` | `'right'`                              |
| offsetLeft   | 距離左側的偏移量                  | `string \| number`              | `-`                                    |
| offsetRight  | 距離右側的偏移量                  | `string \| number`              | `-`                                    |
| offsetTop    | 距離頂部的偏移量                  | `string \| number`              | `-`                                    |
| offsetBottom | 距離底部的偏移量                  | `string \| number`              | `-`                                    |
| size         | 徽章字體大小 (px)                 | `number`                        | `12`                                   |

### 事件

| 事件名 | 說明           | 回調參數                      |
| ------ | -------------- | ----------------------------- |
| click  | 點擊徽章時觸發 | `(event: MouseEvent) => void` |

### 插槽

| 插槽名  | 說明           |
| ------- | -------------- |
| default | 徽章依附的內容 |
| content | 自定義徽章內容 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Badge/demos/BasicDemo.vue'
import ColorDemo from '@/components/Badge/demos/ColorDemo.vue'
import OffsetDemo from '@/components/Badge/demos/OffsetDemo.vue'
import PositionDemo from '@/components/Badge/demos/PositionDemo.vue'
import SizeDemo from '@/components/Badge/demos/SizeDemo.vue'
import SlotDemo from '@/components/Badge/demos/SlotDemo.vue'
import VisibilityDemo from '@/components/Badge/demos/VisibilityDemo.vue'
</script>
