---
title: Textarea 多行文字輸入框
---

# Textarea 多行文字輸入框

多行文字輸入框用於輸入較長的文字內容，支援自動調整高度、字元計數等功能。

## 基本用法

基本的多行文字輸入框用法。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <h3>基本用法</h3>
    <Textarea v-model:value="text" placeholder="請輸入內容..." :rows="4" />

    <div class="mt-4">
      <strong>輸入的內容：</strong>
      <p class="mt-2 p-2 bg-gray-100 rounded">{{ text || '尚未輸入內容' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const text = ref('')
</script>
```

  </template>
</Demo>

## 調整大小

可以設定 textarea 的調整大小行為。

<Demo>
  <ResizeDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>垂直調整（預設）</h4>
      <Textarea
        v-model:value="text1"
        placeholder="可以垂直調整大小..."
        resize="vertical"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>水平調整</h4>
      <Textarea
        v-model:value="text2"
        placeholder="可以水平調整大小..."
        resize="horizontal"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>雙向調整</h4>
      <Textarea
        v-model:value="text3"
        placeholder="可以雙向調整大小..."
        resize="both"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>禁止調整</h4>
      <Textarea
        v-model:value="text4"
        placeholder="無法調整大小..."
        resize="none"
        :rows="3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const text1 = ref('')
const text2 = ref('')
const text3 = ref('')
const text4 = ref('')
</script>
```

  </template>
</Demo>

## 自動調整高度

textarea 可以根據內容自動調整高度。

<Demo>
  <AutosizeDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>自動調整高度（最小 3 行）</h4>
      <Textarea
        v-model:value="autoText"
        placeholder="輸入多行內容試試看自動調整高度的效果..."
        :autosize="true"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>固定高度（對比）</h4>
      <Textarea
        v-model:value="fixedText"
        placeholder="這是固定高度的 textarea..."
        :autosize="false"
        :rows="3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const autoText = ref('')
const fixedText = ref('')
</script>
```

  </template>
</Demo>

## 字元計數

可以顯示字元計數，並限制最大輸入字元數。

<Demo>
  <WordLimitDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>顯示字元計數（最大 100 字元）</h4>
      <Textarea
        v-model:value="limitedText"
        placeholder="最多可輸入 100 個字元..."
        :maxlength="100"
        :show-word-limit="true"
        :rows="4"
      />
    </div>

    <div class="demo-section">
      <h4>限制字元數但不顯示計數</h4>
      <Textarea
        v-model:value="hiddenLimitText"
        placeholder="最多可輸入 50 個字元，但不顯示計數..."
        :maxlength="50"
        :show-word-limit="false"
        :rows="3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const limitedText = ref('')
const hiddenLimitText = ref('')
</script>
```

  </template>
</Demo>

## 不同狀態

textarea 支援禁用和唯讀狀態。

<Demo>
  <StatesDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <div class="demo-section">
      <h4>正常狀態</h4>
      <Textarea
        v-model:value="normalText"
        placeholder="正常的 textarea..."
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>禁用狀態</h4>
      <Textarea
        v-model:value="disabledText"
        placeholder="這是禁用的 textarea..."
        :disabled="true"
        :rows="3"
      />
    </div>

    <div class="demo-section">
      <h4>唯讀狀態</h4>
      <Textarea
        v-model:value="readonlyText"
        placeholder="這是唯讀的 textarea..."
        :readonly="true"
        :rows="3"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Textarea from '../index.vue'

const normalText = ref('')
const disabledText = ref('這是禁用狀態的預設內容')
const readonlyText = ref('這是唯讀狀態的內容，無法編輯')
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名        | 說明             | 類型                                           | 默認值     |
| ------------- | ---------------- | ---------------------------------------------- | ---------- |
| value         | 綁定值           | string                                         | ''         |
| placeholder   | 占位符文字       | string                                         | —          |
| rows          | 預設顯示的行數   | number                                         | 3          |
| resize        | 調整大小的方式   | 'none' \| 'both' \| 'horizontal' \| 'vertical' | 'vertical' |
| disabled      | 是否禁用         | boolean                                        | false      |
| readonly      | 是否唯讀         | boolean                                        | false      |
| maxlength     | 最大字元長度     | number                                         | —          |
| showWordLimit | 是否顯示字元計數 | boolean                                        | false      |
| autosize      | 是否自動調整高度 | boolean                                        | false      |

### 事件 Events

| 事件名       | 說明                   | 回調參數                    |
| ------------ | ---------------------- | --------------------------- |
| update:value | 值改變時觸發           | (value: string) => void     |
| input        | 輸入時觸發             | (value: string) => void     |
| change       | 值改變且失去焦點時觸發 | (value: string) => void     |
| focus        | 獲得焦點時觸發         | (event: FocusEvent) => void |
| blur         | 失去焦點時觸發         | (event: FocusEvent) => void |

### 方法 Methods

| 方法名 | 說明               | 參數 |
| ------ | ------------------ | ---- |
| focus  | 使輸入框獲得焦點   | —    |
| blur   | 使輸入框失去焦點   | —    |
| select | 選中輸入框中的文字 | —    |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Textarea/demos/BasicDemo.vue'
import ResizeDemo from '@/components/Textarea/demos/ResizeDemo.vue'
import AutosizeDemo from '@/components/Textarea/demos/AutosizeDemo.vue'
import WordLimitDemo from '@/components/Textarea/demos/WordLimitDemo.vue'
import StatesDemo from '@/components/Textarea/demos/StatesDemo.vue'
</script>
