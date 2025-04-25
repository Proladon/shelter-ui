# Spin 加載中

加載中組件用於在頁面或區塊加載過程中顯示動畫效果，提示用戶等待。

## 基本用法

基本的加載中組件，有三種尺寸可選。

<Demo>
  <div class="flex items-center gap-8">
    <s-spin size="small" />
    <s-spin />
    <s-spin size="large" />
  </div>
  
  <template #code>

```vue
<template>
  <div class="flex items-center gap-8">
    <s-spin size="small" />
    <s-spin />
    <s-spin size="large" />
  </div>
</template>
```

  </template>
</Demo>

## 帶有描述文字

使用 `description` 屬性可以添加描述文字。

<Demo>
  <div class="flex items-center gap-8">
    <s-spin description="加載中..." />
    <s-spin size="large" description="正在處理..." />
  </div>
  
  <template #code>

```vue
<template>
  <div class="flex items-center gap-8">
    <s-spin description="加載中..." />
    <s-spin size="large" description="正在處理..." />
  </div>
</template>
```

  </template>
</Demo>

## 自定義顏色

使用 `stroke` 屬性可以自定義加載圖標的顏色。

<Demo>
  <div class="flex items-center gap-8">
    <s-spin stroke="#1890ff" />
    <s-spin stroke="#52c41a" />
    <s-spin stroke="#faad14" />
    <s-spin stroke="#f5222d" />
  </div>
  
  <template #code>

```vue
<template>
  <div class="flex items-center gap-8">
    <s-spin stroke="#1890ff" />
    <s-spin stroke="#52c41a" />
    <s-spin stroke="#faad14" />
    <s-spin stroke="#f5222d" />
  </div>
</template>
```

  </template>
</Demo>

## 包裹內容

可以將 Spin 組件作為容器包裹其他元素，當 `show` 屬性為 true 時，顯示加載動畫並遮罩內容。

<Demo>
  <div>
    <s-spin :show="spinning">
      <div class="p-4 border border-gray-200 rounded">
        <p>這是一個包含內容的 Spin 組件示例</p>
        <p>當 Spin 處於活動狀態時，內容將被遮罩</p>
      </div>
    </s-spin>
    <div class="mt-4">
      <s-button @click="toggleSpin">{{ spinning ? '停止加載' : '開始加載' }}</s-button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <s-spin :show="spinning">
      <div class="p-4 border border-gray-200 rounded">
        <p>這是一個包含內容的 Spin 組件示例</p>
        <p>當 Spin 處於活動狀態時，內容將被遮罩</p>
      </div>
    </s-spin>
    <div class="mt-4">
      <s-button @click="toggleSpin">{{ spinning ? '停止加載' : '開始加載' }}</s-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const spinning = ref(true)
const toggleSpin = () => {
  spinning.value = !spinning.value
}
</script>
```

  </template>
</Demo>

<script setup lang="ts">
import { ref } from 'vue'

// For "包裹內容" demo
const spinning = ref(true)
const toggleSpin = () => {
  spinning.value = !spinning.value
}

// For "延遲顯示" demo
const delayedSpinning = ref(true)
const toggleDelayedSpin = () => {
  delayedSpinning.value = !delayedSpinning.value
}
</script>

## 延遲顯示

使用 `delay` 屬性可以設置延遲顯示加載效果的時間（毫秒），適用於防止閃爍。

<Demo>
  <div>
    <s-spin :show="delayedSpinning" :delay="500">
      <div class="p-4 border border-gray-200 rounded">
        <p>這個示例設置了 500ms 的延遲</p>
        <p>短時間的加載過程不會顯示加載動畫，避免閃爍</p>
      </div>
    </s-spin>
    <div class="mt-4">
      <s-button @click="toggleDelayedSpin">{{ delayedSpinning ? '停止加載' : '開始加載' }}</s-button>
    </div>
  </div>
  
  <template #code>

```vue
<template>
  <div>
    <s-spin :show="spinning" :delay="500">
      <div class="p-4 border border-gray-200 rounded">
        <p>這個示例設置了 500ms 的延遲</p>
        <p>短時間的加載過程不會顯示加載動畫，避免閃爍</p>
      </div>
    </s-spin>
    <div class="mt-4">
      <s-button @click="toggleSpin">{{ spinning ? '停止加載' : '開始加載' }}</s-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const spinning = ref(true)
const toggleSpin = () => {
  spinning.value = !spinning.value
}
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名 | 說明 | 類型 | 默認值 |
| --- | --- | --- | --- |
| size | 組件大小，可選值為 `small`、`medium`、`large` 或數字 | string \| number | `medium` |
| description | 描述文字 | string | - |
| rotate | 是否旋轉動畫 | boolean | `true` |
| show | 是否顯示加載中組件 | boolean | `true` |
| stroke | 加載圖標的顏色 | string | - |
| strokeWidth | 加載圖標的線條寬度 | number | `2` |
| delay | 延遲顯示加載效果的時間（毫秒） | number | `0` |

### 事件

| 事件名 | 說明 | 回調參數 |
| --- | --- | --- |
| update:show | 當 `show` 屬性變化時觸發 | (value: boolean) |

### 插槽

| 插槽名 | 說明 |
| --- | --- |
| default | 自定義內容，當有默認插槽時，Spin 將作為包裹容器 |
| icon | 自定義加載圖標 |
| description | 自定義描述文字 |