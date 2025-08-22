---
title: Carousel 輪播
---

## Description

Carousel 組件用於展示一系列內容項目的滑動展示器，支援自動播放、導航控制和指示器。

## 基本用法

<Demo>
  <BasicDemo />

  <template #code>
    ```vue
    <template>
      <div class="demo">
        <h3>Basic Carousel</h3>
        <div class="demo__content">
          <SHCarousel
            v-model="currentSlide"
            :items="basicItems"
            height="300px"
            :autoplay="false"
          />
          <p class="mt-4">Current slide: {{ currentSlide + 1 }}</p>
        </div>
      </div>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue'
    import SHCarousel from '../index.vue'
    import type { CarouselItem } from '../types'

    const currentSlide = ref(0)

    const basicItems: CarouselItem[] = [
      {
        id: 1,
        title: 'First Slide',
        description: 'This is the first slide content',
        image: 'https://picsum.photos/800/300?random=1',
      },
      {
        id: 2,
        title: 'Second Slide',
        description: 'This is the second slide content',
        image: 'https://picsum.photos/800/300?random=2',
      },
      {
        id: 3,
        title: 'Third Slide',
        description: 'This is the third slide content',
        image: 'https://picsum.photos/800/300?random=3',
      },
    ]
    </script>
    ```
  </template>
</Demo>

## 自動播放

<Demo>
  <AutoplayDemo />

  <template #code>
    ```vue
    <template>
      <div class="demo">
        <h3>Autoplay Carousel</h3>
        <div class="demo__content">
          <SHCarousel
            v-model="currentSlide"
            :items="autoplayItems"
            height="350px"
            :autoplay="true"
            :interval="2000"
            :pause-on-hover="true"
          />
          <div class="controls mt-4">
            <button @click="toggleAutoplay" class="btn">
              {{ isAutoplay ? 'Stop' : 'Start' }} Autoplay
            </button>
            <span class="ml-4">Current: {{ currentSlide + 1 }} / {{ autoplayItems.length }}</span>
          </div>
        </div>
      </div>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue'
    import SHCarousel from '../index.vue'
    import type { CarouselItem } from '../types'

    const currentSlide = ref(0)
    const isAutoplay = ref(true)

    const autoplayItems: CarouselItem[] = [
      {
        id: 1,
        title: 'Slide 1',
        description: 'Auto-advancing slide with timer',
        image: 'https://picsum.photos/800/350?random=4',
      },
      {
        id: 2,
        title: 'Slide 2',
        description: 'Hover to pause autoplay',
        image: 'https://picsum.photos/800/350?random=5',
      },
      {
        id: 3,
        title: 'Slide 3',
        description: 'Continues automatically',
        image: 'https://picsum.photos/800/350?random=6',
      },
      {
        id: 4,
        title: 'Slide 4',
        description: 'Last slide loops back',
        image: 'https://picsum.photos/800/350?random=7',
      },
    ]

    const toggleAutoplay = () => {
      isAutoplay.value = !isAutoplay.value
    }
    </script>
    ```
  </template>
</Demo>

## 自定義內容

<Demo>
  <CustomContentDemo />

  <template #code>
    ```vue
    <template>
      <div class="demo">
        <h3>Carousel with Custom Content</h3>
        <div class="demo__content">
          <SHCarousel
            v-model="currentSlide"
            :items="customItems"
            height="250px"
            :show-indicators="false"
            effect="fade"
          >
            <template #item="{ item, active }">
              <div class="custom-item" :class="{ active }">
                <div class="custom-content">
                  <h2>{{ item.title }}</h2>
                  <p>{{ item.description }}</p>
                  <div class="custom-actions">
                    <button class="action-btn">Learn More</button>
                    <button class="action-btn secondary">Contact</button>
                  </div>
                </div>
              </div>
            </template>
          </SHCarousel>
        </div>
      </div>
    </template>

    <script setup lang="ts">
    import { ref } from 'vue'
    import SHCarousel from '../index.vue'
    import type { CarouselItem } from '../types'

    const currentSlide = ref(0)

    const customItems: CarouselItem[] = [
      {
        id: 1,
        title: 'Welcome to Our Service',
        description: 'Discover amazing features that will transform your workflow and boost productivity.',
      },
      {
        id: 2,
        title: 'Easy Integration',
        description: 'Seamlessly integrate with your existing tools and platforms in just a few clicks.',
      },
      {
        id: 3,
        title: 'Expert Support',
        description: '24/7 customer support from our team of experts ready to help you succeed.',
      },
    ]
    </script>
    ```
  </template>
</Demo>

## API

### Carousel 屬性

| 屬性名            | 說明                       | 類型                          | 默認值     |
| ----------------- | -------------------------- | ----------------------------- | ---------- |
| modelValue        | 當前活動項目的索引         | `number`                      | `0`        |
| items             | 輪播項目陣列               | `CarouselItem[]`              | `[]`       |
| autoplay          | 是否自動播放               | `boolean`                     | `false`    |
| interval          | 自動播放間隔時間（毫秒）   | `number`                      | `3000`     |
| showIndicators    | 是否顯示指示器             | `boolean`                     | `true`     |
| showNavigation    | 是否顯示導航箭頭           | `boolean`                     | `true`     |
| loop              | 是否循環播放               | `boolean`                     | `true`     |
| pauseOnHover      | 是否暫停自動播放在懸停時   | `boolean`                     | `true`     |
| duration          | 動畫持續時間（毫秒）       | `number`                      | `300`      |
| effect            | 動畫效果類型               | `'slide' \| 'fade'`           | `'slide'`  |
| height            | 輪播容器高度               | `string \| number`            | `'400px'`  |
| disabled          | 是否禁用                   | `boolean`                     | `false`    |
| style             | 自定義樣式                 | `StyleValue`                  | -          |
| class             | 自定義類名                 | `string`                      | -          |

### CarouselItem 類型

| 屬性名      | 說明           | 類型                    | 必填 |
| ----------- | -------------- | ----------------------- | ---- |
| id          | 項目唯一標識   | `string \| number`      | 否   |
| content     | 項目內容       | `string`                | 否   |
| image       | 圖片 URL       | `string`                | 否   |
| alt         | 圖片替代文字   | `string`                | 否   |
| title       | 標題           | `string`                | 否   |
| description | 描述           | `string`                | 否   |
| href        | 鏈接           | `string`                | 否   |
| target      | 是否在新視窗打開 | `'_blank' \| '_self'` | 否   |
| data        | 自定義數據     | `Record<string, any>`   | 否   |

### 事件 Events

| 事件名             | 說明               | 回調參數                                        |
| ------------------ | ------------------ | ----------------------------------------------- |
| update:modelValue  | 更新模型值         | `(value: number) => void`                       |
| change             | 項目變更事件       | `(current: number, previous: number) => void`   |
| item-click         | 項目點擊事件       | `(item: CarouselItem, index: number) => void`   |
| autoplay-start     | 自動播放開始事件   | `() => void`                                    |
| autoplay-stop      | 自動播放停止事件   | `() => void`                                    |

### 插槽 Slots

| 插槽名      | 說明         | 參數                                                      |
| ----------- | ------------ | --------------------------------------------------------- |
| default     | 預設插槽     | -                                                         |
| item        | 項目插槽     | `{ item: CarouselItem, index: number, active: boolean }` |
| indicator   | 指示器插槽   | `{ index: number, active: boolean }`                     |
| prev-button | 前一個按鈕插槽 | -                                                       |
| next-button | 下一個按鈕插槽 | -                                                       |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/Carousel/demos/Basic.vue'
import AutoplayDemo from '@/components/Carousel/demos/Autoplay.vue'
import CustomContentDemo from '@/components/Carousel/demos/CustomContent.vue'
</script>
