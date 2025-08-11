---
title: ActiveButtonGroup 活動按鈕組
---

# ActiveButtonGroup 活動按鈕組

ActiveButtonGroup 是一個提供類似標籤頁切換的按鈕組件，特點是當切換時有平滑的過渡動畫。

## 基本用法

最基本的活動按鈕組使用方式，類似於切換標籤頁。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <div>
    <SHActiveButtonGroup v-model="activeTab" class="mb-5">
      <SHActiveButtonItem value="all">All</SHActiveButtonItem>
      <SHActiveButtonItem value="active">Active</SHActiveButtonItem>
      <SHActiveButtonItem value="completed">Completed</SHActiveButtonItem>
    </SHActiveButtonGroup>

    <div class="content-area">
      <div v-if="activeTab === 'all'">
        <h3>All Tasks</h3>
        <p>Showing all tasks in your list.</p>
      </div>
      <div v-if="activeTab === 'active'">
        <h3>Active Tasks</h3>
        <p>Showing only active tasks.</p>
      </div>
      <div v-if="activeTab === 'completed'">
        <h3>Completed Tasks</h3>
        <p>Showing only completed tasks.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('all')
</script>

<style scoped>
.mb-5 {
  margin-bottom: 20px;
}

.content-area {
  background-color: var(--sh-bg-subtle);
  padding: 20px;
  border-radius: 6px;
}

h3 {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 18px;
}

p {
  margin: 0;
}
</style>
```

  </template>
</Demo>

## 更多示例

ActiveButtonGroup 的其他使用示例，包括禁用按鈕等。

<Demo>
  <VariantsDemo />
  
  <template #code>

```vue
<template>
  <div class="demo-container">
    <div class="variant-section">
      <h4>Disabled Button Example</h4>
      <SHActiveButtonGroup v-model="disabled" class="mb-4">
        <SHActiveButtonItem value="tab1">Normal</SHActiveButtonItem>
        <SHActiveButtonItem value="tab2" disabled>Disabled</SHActiveButtonItem>
        <SHActiveButtonItem value="tab3">Button</SHActiveButtonItem>
      </SHActiveButtonGroup>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const disabled = ref('tab1')
const options = ref('option1')
</script>

<style scoped>
.demo-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.variant-section {
  margin-bottom: 10px;
}

h4 {
  margin-top: 0;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 500;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
```

  </template>
</Demo>

## API

### ActiveButtonGroup Props

| 屬性名       | 說明                                      | 類型     | 默認值 |
| ------------ | ----------------------------------------- | -------- | ------ |
| modelValue   | 當前選中按鈕的值（支持 v-model 雙向綁定） | `string` | —      |
| defaultValue | 默認選中按鈕的值                          | `string` | —      |

### ActiveButtonGroup Events

| 事件名            | 說明                               | 回調參數                  |
| ----------------- | ---------------------------------- | ------------------------- |
| update:modelValue | 當選中按鈕變化時觸發，用於 v-model | `(value: string) => void` |
| change            | 當選中按鈕變化時觸發               | `(value: string) => void` |

### ActiveButtonItem Props

| 屬性名   | 說明             | 類型      | 默認值  |
| -------- | ---------------- | --------- | ------- |
| value    | 按鈕的值（必須） | `string`  | —       |
| disabled | 是否禁用此按鈕   | `boolean` | `false` |

### ActiveButtonItem Slots

| 插槽名  | 說明       |
| ------- | ---------- |
| default | 按鈕的內容 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/ActiveButtonGroup/demos/BasicDemo.vue'
import VariantsDemo from '@/components/ActiveButtonGroup/demos/VariantsDemo.vue'
</script>
