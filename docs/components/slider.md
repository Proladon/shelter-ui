---
title: Slider 滑桿
---

## 說明

讓使用者在給定範圍內選擇數值的輸入組件。

## 基本用法

<Demo>
  <BasicDemo />
  <template #code>
  
    ```vue
    <template>
      <div class="demo-container">
        <h3>Slider 基本示例</h3>
        
        <div class="demo-section">
          <h4>基本滑桿</h4>
          <div class="mb-4">
            <span class="demo-label">值：{{ basicValue[0] }}</span>
            <Slider 
              v-model="basicValue"
              :min="0"
              :max="100"
              :step="1"
              class="mt-2"
            />
          </div>
        </div>

        <div class="demo-section">
          <h4>範圍滑桿</h4>
          <div class="mb-4">
            <span class="demo-label">值：{{ rangeValue[0] }} - {{ rangeValue[1] }}</span>
            <Slider
              v-model="rangeValue"
              :min="0"
              :max="100"
              :step="1"
              class="mt-2"
            />
          </div>
        </div>

        <div class="demo-section">
          <h4>不同尺寸</h4>
          <div class="space-y-4">
            <div>
              <span class="demo-label">小：</span>
              <Slider
                v-model="sizeValue"
                size="small"
                :min="0"
                :max="100"
              />
            </div>
            <div>
              <span class="demo-label">默認：</span>
              <Slider
                v-model="sizeValue"
                size="default"
                :min="0"
                :max="100"
              />
            </div>
            <div>
              <span class="demo-label">大：</span>
              <Slider
                v-model="sizeValue"
                size="large"
                :min="0"
                :max="100"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue'
    import { SHSlider as Slider } from '@proladon/shelter-ui'

    const basicValue = ref([50])
    const rangeValue = ref([25, 75])
    const sizeValue = ref([60])
    </script>
    ```

  </template>
</Demo>

## API

### 屬性

| 屬性名                | 說明             | 類型                                                        | 默認值         |
| --------------------- | ---------------- | ----------------------------------------------------------- | -------------- |
| modelValue            | 當前滑桿值       | `number[]`                                                  | -              |
| min                   | 最小值           | `number`                                                    | `0`            |
| max                   | 最大值           | `number`                                                    | `100`          |
| step                  | 步進間隔         | `number`                                                    | `1`            |
| size                  | 滑桿尺寸         | `'small' \| 'default' \| 'large'`                           | `'default'`    |
| color                 | 滑桿顏色         | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'`    |
| orientation           | 滑桿方向         | `'horizontal' \| 'vertical'`                                | `'horizontal'` |
| disabled              | 是否禁用         | `boolean`                                                   | `false`        |
| showTooltip           | 是否顯示提示框   | `boolean`                                                   | `false`        |
| formatTooltip         | 自定義提示框格式 | `(value: number) => string`                                 | -              |
| showMarks             | 是否顯示標記     | `boolean`                                                   | `false`        |
| marks                 | 標記配置         | `Record<number, string>`                                    | -              |
| minStepsBetweenThumbs | 滑塊間最小步數   | `number`                                                    | `0`            |

### 事件 Events

| 事件名            | 說明             | 回調參數            |
| ----------------- | ---------------- | ------------------- |
| update:modelValue | 滑桿值變化時觸發 | `(value: number[])` |
| valueCommit       | 滑桿值確定時觸發 | `(value: number[])` |

### 插槽 Slots

| 插槽名  | 說明             | 參數                               |
| ------- | ---------------- | ---------------------------------- |
| default | 自定義內容       | -                                  |
| tooltip | 自定義提示框內容 | `{ value: number, index: number }` |
| mark    | 自定義標記內容   | `{ value: number, label: string }` |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Slider/demos/Basic.vue'
</script>
