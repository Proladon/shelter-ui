---
title: Collapsible 折疊面板
---

## 說明

一個可展開/收合面板的互動組件。

## 基本用法

<Demo>
  <BasicDemo />
  <template #code>
  
    ```vue
    <template>
      <div class="demo-container">
        <h3>Collapsible 基本示例</h3>
        
        <div class="demo-section">
          <h4>基本折疊面板</h4>
          <Collapsible v-model:open="basicOpen">
            <template #trigger>
              <span>點擊展開/收合內容</span>
            </template>
            <div class="demo-content">
              <p>這是一段可以展開和收合的內容。</p>
              <p>你可以在這裡放置任何內容，比如表單、列表或其他組件。</p>
            </div>
          </Collapsible>
        </div>

        <div class="demo-section">
          <h4>不同變體</h4>
          <div class="space-y-4">
            <div>
              <h5 class="mb-2">默認變體</h5>
              <Collapsible variant="default" v-model:open="defaultOpen">
                <template #trigger>
                  <span>默認樣式折疊面板</span>
                </template>
                <div class="demo-content">
                  <p>這是默認樣式的折疊面板內容。</p>
                </div>
              </Collapsible>
            </div>

            <div>
              <h5 class="mb-2">卡片變體</h5>
              <Collapsible variant="card" v-model:open="cardOpen">
                <template #trigger>
                  <span>卡片樣式折疊面板</span>
                </template>
                <div class="demo-content">
                  <p>這是卡片樣式的折疊面板內容。</p>
                </div>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue'
    import { SHCollapsible as Collapsible } from '@proladon/shelter-ui'

    const basicOpen = ref(false)
    const defaultOpen = ref(false)
    const cardOpen = ref(false)
    </script>
    ```

  </template>
</Demo>

## API

### 屬性

| 屬性名          | 說明               | 類型                              | 默認值      |
| --------------- | ------------------ | --------------------------------- | ----------- |
| open            | 是否展開           | `boolean`                         | -           |
| defaultOpen     | 預設展開狀態       | `boolean`                         | `false`     |
| variant         | 面板變體           | `'default' \| 'card' \| 'ghost'`  | `'default'` |
| size            | 面板尺寸           | `'small' \| 'default' \| 'large'` | `'default'` |
| disabled        | 是否禁用           | `boolean`                         | `false`     |
| unmountOnHide   | 收合時是否卸載內容 | `boolean`                         | `true`      |
| headerClass     | 頭部樣式類名       | `string`                          | -           |
| contentClass    | 內容樣式類名       | `string`                          | -           |
| triggerPosition | 觸發器位置         | `'left' \| 'right'`               | `'left'`    |

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
import BasicDemo from '@/components/Collapsible/demos/Basic.vue'
</script>
