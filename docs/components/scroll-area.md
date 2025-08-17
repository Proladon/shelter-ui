# ScrollArea 滾動區域

可客製化樣式的滾動區塊元件，擴充瀏覽器原生捲動行為以便做一致的跨瀏覽器捲動樣式與控制。

## 基本使用

<Demo>
  <Basic />
  <template #code>

```vue
<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">基本使用</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        基本的滾動區域，包含垂直和水平滾動
      </p>
    </div>
    
    <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <ScrollArea class="h-48 w-full border border-gray-300 dark:border-gray-600 rounded">
        <div class="p-4 w-[600px]">
          <h4 class="mb-4 text-sm font-medium leading-none">標籤</h4>
          <div v-for="tag in tags" :key="tag" class="text-sm mb-2 last:mb-0">
            {{ tag }}
          </div>
        </div>
      </ScrollArea>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '../index'

const tags = Array.from({ length: 50 }, (_, i) => `v1.2.0-beta.${i + 1}`)
</script>
```

  </template>
</Demo>

## 自定義滾動控制

透過組件 ref 取得滾動控制方法，可程式化控制滾動位置。

<Demo>
  <CustomScroll />
  <template #code>

```vue
<template>
  <div class="space-y-6">
    <div class="space-y-2">
      <h3 class="text-lg font-semibold">自定義滾動控制</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        透過組件方法控制滾動位置，支援滾動到頂部、底部等功能
      </p>
    </div>
    
    <div class="space-y-4">
      <!-- 控制按鈕 -->
      <div class="flex flex-wrap gap-2">
        <button
          @click="scrollToTop"
          class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          滾動到頂部
        </button>
        <button
          @click="scrollToBottom"
          class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          滾動到底部
        </button>
        <button
          @click="scrollToMiddle"
          class="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          滾動到中間
        </button>
      </div>
      
      <!-- 滾動區域 -->
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <ScrollArea
          ref="scrollArea"
          class="h-64 w-full border border-gray-300 dark:border-gray-600 rounded"
          type="scroll"
        >
          <div class="p-4 w-[800px] h-[600px] relative">
            <!-- 內容區塊 -->
            <div class="relative z-10 space-y-4">
              <div class="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <h4 class="font-semibold mb-2">頂部區域</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  這是滾動區域的頂部內容
                </p>
              </div>
              
              <div 
                v-for="item in items" 
                :key="item.id" 
                class="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
              >
                <h5 class="font-medium mb-1">{{ item.title }}</h5>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ScrollArea } from '../index'

const scrollArea = ref()
const items = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  title: `項目 ${i + 1}`,
  description: `項目 ${i + 1} 的描述內容`,
}))

const scrollToTop = () => scrollArea.value?.scrollTop()
const scrollToBottom = () => scrollArea.value?.scrollBottom()
const scrollToMiddle = () => {
  const viewport = scrollArea.value?.getViewport()
  if (viewport) {
    const maxScrollTop = viewport.scrollHeight - viewport.clientHeight
    scrollArea.value?.scrollTo({
      top: maxScrollTop / 2,
      behavior: 'smooth'
    })
  }
}
</script>
```

  </template>
</Demo>

## 捲軸顯示類型

支援四種不同的捲軸顯示策略。

<Demo>
  <Types />
  <template #code>

```vue
<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Auto 類型 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">Auto（預設）</h4>
          <p class="text-xs text-gray-500">內容溢出時顯示捲軸</p>
        </div>
        <ScrollArea 
          type="auto"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 space-y-2">
            <div v-for="i in 10" :key="`auto-${i}`" class="text-sm">
              Auto 類型項目 {{ i }}
            </div>
          </div>
        </ScrollArea>
      </div>
      
      <!-- Always 類型 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">Always</h4>
          <p class="text-xs text-gray-500">總是顯示捲軸</p>
        </div>
        <ScrollArea 
          type="always"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 space-y-2">
            <div v-for="i in 8" :key="`always-${i}`" class="text-sm">
              Always 類型項目 {{ i }}
            </div>
          </div>
        </ScrollArea>
      </div>
      
      <!-- Scroll 類型 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">Scroll</h4>
          <p class="text-xs text-gray-500">滾動時顯示捲軸</p>
        </div>
        <ScrollArea 
          type="scroll"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 space-y-2">
            <div v-for="i in 12" :key="`scroll-${i}`" class="text-sm">
              Scroll 類型項目 {{ i }}
            </div>
          </div>
        </ScrollArea>
      </div>
      
      <!-- Hover 類型 -->
      <div class="space-y-3">
        <div>
          <h4 class="font-medium">Hover</h4>
          <p class="text-xs text-gray-500">hover 或滾動時顯示捲軸</p>
        </div>
        <ScrollArea 
          type="hover"
          class="h-32 w-full border border-gray-300 dark:border-gray-600 rounded"
        >
          <div class="p-3 space-y-2">
            <div v-for="i in 12" :key="`hover-${i}`" class="text-sm">
              Hover 類型項目 {{ i }}
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScrollArea } from '../index'
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性              | 類型                                        | 預設值    | 說明                                 |
| ----------------- | ------------------------------------------- | --------- | ------------------------------------ |
| `type`            | `'auto' \| 'always' \| 'scroll' \| 'hover'` | `'hover'` | 捲軸顯示策略                         |
| `scrollHideDelay` | `number`                                    | `600`     | 停止互動後隱藏捲軸的延遲時間（毫秒） |
| `dir`             | `'ltr' \| 'rtl'`                            | `'ltr'`   | 讀取方向                             |
| `class`           | `string`                                    | -         | 自定義根元素的 class                 |
| `style`           | `string \| object`                          | -         | 自定義根元素的 style                 |

### 方法 Methods

透過 ref 取得組件實例後可呼叫以下方法：

| 方法                | 說明               |
| ------------------- | ------------------ |
| `scrollTop()`       | 滾動到頂部         |
| `scrollTopLeft()`   | 滾動到左上角       |
| `scrollBottom()`    | 滾動到底部         |
| `scrollTo(options)` | 滾動到指定位置     |
| `getViewport()`     | 取得 viewport 元素 |

### 插槽 Slots

| 插槽      | 說明           |
| --------- | -------------- |
| `default` | 滾動區域的內容 |

## 樣式客製化

組件提供 CSS 變數供客製化樣式：

```css
.sh-scroll-area {
  --scroll-thumb-color: theme('colors.gray.400');
  --scroll-thumb-hover-color: theme('colors.gray.500');
  --scroll-thumb-active-color: theme('colors.gray.600');
  --scroll-track-color: theme('colors.gray.100');
}
```

## 無障礙

- 保留原生滾動行為以維持鍵盤導航支援
- 支援螢幕閱讀器等輔助技術
- 支援 RTL（right-to-left）布局
- 鍵盤滾動由平台原生提供（PageUp/PageDown/方向鍵等）

## 注意事項

- 滾動條置於內容之上，不佔用布局空間
- 使用原生滾動確保最佳效能與相容性
- 在 `type="scroll"` 或 `type="hover"` 模式下，可調整 `scrollHideDelay` 控制隱藏延遲
- 支援同時水平與垂直滾動

<script setup>
import { SHConfigProvider } from '@/index'
import Basic from '@/components/ScrollArea/demos/Basic.vue'
import CustomScroll from '@/components/ScrollArea/demos/CustomScroll.vue'
import Types from '@/components/ScrollArea/demos/Types.vue'
</script>
