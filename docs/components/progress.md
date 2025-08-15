---
title: Progress 進度條
---

## 說明

顯示任務完成進度的指示器，通常以進度條的形式展示。

## 基本用法

<Demo>
  <BasicDemo />
  <template #code>
  
```vue
<template>
    <div class="demo-container">
    <h3>Progress 基本示例</h3>
    
    <div class="demo-section">
        <h4>基本進度條</h4>
        <Progress 
        v-model="basicProgress"
        :show-text="true"
        class="mb-4"
        />
        <button @click="increaseBasic" class="demo-button">增加進度</button>
    </div>

    <div class="demo-section">
        <h4>不同尺寸</h4>
        <div class="space-y-4">
        <div>
            <span class="demo-label">小尺寸：</span>
            <Progress
            v-model="sizeProgress"
            size="small"
            :show-text="true"
            />
        </div>
        <div>
            <span class="demo-label">默認尺寸：</span>
            <Progress
            v-model="sizeProgress"
            size="default"
            :show-text="true"
            />
        </div>
        <div>
            <span class="demo-label">大尺寸：</span>
            <Progress
            v-model="sizeProgress"
            size="large"
            :show-text="true"
            />
        </div>
        </div>
    </div>

    <div class="demo-section">
        <h4>不同變體</h4>
        <div class="space-y-4">
        <div>
            <span class="demo-label">默認：</span>
            <Progress
            v-model="variantProgress"
            variant="default"
            :show-text="true"
            />
        </div>
        <div>
            <span class="demo-label">條紋：</span>
            <Progress
            v-model="variantProgress"
            variant="striped"
            :show-text="true"
            />
        </div>
        <div>
            <span class="demo-label">動畫：</span>
            <Progress
            v-model="variantProgress"
            variant="animated"
            :show-text="true"
            />
        </div>
        </div>
    </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { SHProgress as Progress } from '@proladon/shelter-ui'

const basicProgress = ref(30)
const sizeProgress = ref(60)
const variantProgress = ref(75)

let timer: number | null = null

onMounted(() => {
    timer = setInterval(() => {
    sizeProgress.value = (sizeProgress.value + 5) % 100
    variantProgress.value = (variantProgress.value + 3) % 100
    }, 1000)
})

onBeforeUnmount(() => {
    if (timer) {
    clearInterval(timer)
    }
})

const increaseBasic = () => {
    basicProgress.value = Math.min(basicProgress.value + 10, 100)
}
</script>

```
  </template>
</Demo>

## API

### 屬性

| 屬性名      | 說明                   | 類型                                        | 默認值      |
| ----------- | ---------------------- | ------------------------------------------- | ----------- |
| modelValue  | 當前進度值             | `number \| null`                            | -           |
| max         | 最大進度值             | `number`                                    | `100`       |
| size        | 進度條尺寸             | `'small' \| 'default' \| 'large'`          | `'default'` |
| variant     | 進度條變體             | `'default' \| 'striped' \| 'animated'`     | `'default'` |
| showText    | 是否顯示進度文字       | `boolean`                                   | `false`     |
| formatText  | 自定義進度文字格式     | `(value: number \| null, max: number) => string` | -           |

### 事件 Events

| 事件名               | 說明                 | 回調參數                     |
| -------------------- | -------------------- | ---------------------------- |
| update:modelValue    | 進度值變化時觸發     | `(value: number \| null)`    |
| update:max           | 最大值變化時觸發     | `(value: number)`            |

### 插槽 Slots

| 插槽名  | 說明           |
| ------- | -------------- |
| default | 自定義內容     |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Progress/demos/Basic.vue'
</script>
```
