# Collapsible 折疊面板

一個可展開/收合面板的互動組件。

## 基本用法

<Demo>

  <DemoBasic />
  <template #code>

```vue
<template>
  <div>
    <Collapsible v-model:open="basicOpen">
      <template #trigger>
        <span>點擊展開/收合內容</span>
      </template>
      <div>
        <p>這是一段可以展開和收合的內容。</p>
      </div>
    </Collapsible>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHCollapsible as Collapsible } from '@proladon/shelter-ui'

const basicOpen = ref(false)
</script>
```

  </template>
</Demo>

<!-- Variants demo removed (variant prop deprecated) -->

<!-- Sizes demo removed (size prop deprecated) -->

## 自定義觸發器

<Demo>

  <DemoCustomTrigger />
  <template #code>

```vue
<template>
  <Collapsible v-model:open="customOpen">
    <template #trigger>
      <div>
        <IconInfoCircle />
        <span>查看詳細信息</span>
      </div>
    </template>
    <div>詳細信息內容</div>
  </Collapsible>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHCollapsible as Collapsible } from '@proladon/shelter-ui'
import { IconInfoCircle } from '@tabler/icons-vue'

const customOpen = ref(false)
</script>
```

  </template>
</Demo>

## 嵌套折疊面板

<Demo>

  <DemoNested />
  <template #code>

```vue
<template>
  <Collapsible v-model:open="outerOpen">
    <template #trigger><span>第一層</span></template>
    <div>
      <Collapsible v-model:open="innerOpen">
        <template #trigger><span>第二層</span></template>
        <div>內部內容</div>
      </Collapsible>
    </div>
  </Collapsible>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SHCollapsible as Collapsible } from '@proladon/shelter-ui'

const outerOpen = ref(false)
const innerOpen = ref(false)
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名          | 說明               | 類型                | 默認值   |
| --------------- | ------------------ | ------------------- | -------- |
| open            | 是否展開           | `boolean`           | -        |
| defaultOpen     | 預設展開狀態       | `boolean`           | `false`  |
| disabled        | 是否禁用           | `boolean`           | `false`  |
| unmountOnHide   | 收合時是否卸載內容 | `boolean`           | `true`   |
| headerClass     | 頭部樣式類名       | `string`            | -        |
| contentClass    | 內容樣式類名       | `string`            | -        |
| triggerPosition | 觸發器位置         | `'left' \| 'right'` | `'left'` |

### 事件 Events

| 事件名      | 說明               | 回調參數           |
| ----------- | ------------------ | ------------------ |
| update:open | 展開狀態變化時觸發 | `(value: boolean)` |

### 插槽 Slots

| 插槽名  | 說明         |
| ------- | ------------ |
| default | 面板內容     |
| trigger | 自定義觸發器 |
| header  | 自定義頭部   |

<script setup>
import { SHConfigProvider } from '@/index'
import DemoBasic from '@/components/Collapsible/demos/DemoBasic.vue'
import DemoCustomTrigger from '@/components/Collapsible/demos/DemoCustomTrigger.vue'
import DemoNested from '@/components/Collapsible/demos/DemoNested.vue'
</script>
