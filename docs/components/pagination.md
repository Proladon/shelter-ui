---
title: Pagination 分頁
---

# Pagination 分頁

分頁組件用於將大量數據分頁顯示，並提供頁面導航功能。

## 基本用法

基本的分頁組件用法，設置總項目數和每頁項目數。

<Demo>
  <BasicPaginationDemo />
  
  <template #code>

```vue
<template>
  <SHPagination v-model="currentPage" :total="100" :page-size="10" />
</template>

<script setup>
import { ref } from "vue"

const currentPage = ref(1)
</script>
```

  </template>
</Demo>

## 自定義設定

可以通過 `sibling-count` 屬性控制當前頁面附近顯示的頁碼數量，通過 `show-edges` 控制是否顯示首末頁按鈕。

<Demo>
  <CustomPaginationDemo />
  
  <template #code>

```vue
<template>
  <SHPagination
    v-model="currentPage"
    :total="500"
    :page-size="20"
    :sibling-count="1"
    :show-edges="false"
  />
</template>

<script setup>
import { ref } from "vue"

const currentPage = ref(5)
</script>
```

  </template>
</Demo>

## 帶資訊顯示

使用 `info` 插槽可以顯示當前分頁的詳細資訊。

<Demo>
  <InfoPaginationDemo />
  
  <template #code>

```vue
<template>
  <SHPagination v-model="currentPage" :total="1000" :page-size="25">
    <template #info="{ current, pageSize, totalItems }">
      <span class="text-sm text-gray-600">
        第 {{ (current - 1) * pageSize + 1 }}-{{
          Math.min(current * pageSize, totalItems)
        }}
        項，共 {{ totalItems }} 項
      </span>
    </template>
  </SHPagination>
</template>

<script setup>
import { ref } from "vue"

const currentPage = ref(3)
</script>
```

  </template>
</Demo>

## 按鈕尺寸

通過 `size` 屬性可以設置分頁按鈕的尺寸大小，支援 `small`、`default`、`large` 三種尺寸。

<Demo>
  <SizePaginationDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-6">
    <!-- 小尺寸 -->
    <SHPagination
      v-model="smallPage"
      :total="100"
      :page-size="10"
      size="small"
    />

    <!-- 默認尺寸 -->
    <SHPagination
      v-model="defaultPage"
      :total="100"
      :page-size="10"
      size="default"
    />

    <!-- 大尺寸 -->
    <SHPagination
      v-model="largePage"
      :total="100"
      :page-size="10"
      size="large"
    />
  </div>
</template>

<script setup>
import { ref } from "vue"

const smallPage = ref(1)
const defaultPage = ref(1)
const largePage = ref(1)
</script>
```

  </template>
</Demo>

## 按鈕樣式變體

可以通過 `text`、`ghost`、`outline`、`borderd` 等屬性設置分頁按鈕的樣式變體。

<Demo>
  <TypePaginationDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <!-- 文字按鈕 -->
    <SHPagination v-model="currentPage" :total="100" :page-size="10" text />

    <!-- 外框按鈕 -->
    <SHPagination v-model="currentPage" :total="100" :page-size="10" outline />

    <!-- 幽靈按鈕 -->
    <SHPagination v-model="currentPage" :total="100" :page-size="10" ghost />

    <!-- 組合樣式 -->
    <SHPagination
      v-model="currentPage"
      :total="100"
      :page-size="10"
      text
      outline
    />
  </div>
</template>

<script setup>
import { ref } from "vue"

const currentPage = ref(3)
</script>
```

  </template>
</Demo>

## 禁用狀態

設置 `disabled` 屬性可以禁用分頁組件。

<Demo>
  <DisabledPaginationDemo />
  
  <template #code>

```vue
<template>
  <SHPagination v-model="currentPage" :total="100" :page-size="10" disabled />
</template>

<script setup>
import { ref } from "vue"

const currentPage = ref(2)
</script>
```

  </template>
</Demo>

## API

### Props

| 屬性名       | 類型                              | 預設值      | 說明                       |
| ------------ | --------------------------------- | ----------- | -------------------------- |
| modelValue   | `number`                          | `1`         | 當前頁數，支持 v-model     |
| total        | `number`                          | —           | 總項目數量                 |
| pageSize     | `number`                          | `10`        | 每頁項目數量               |
| siblingCount | `number`                          | `2`         | 當前頁面附近顯示的頁碼數量 |
| showEdges    | `boolean`                         | `true`      | 是否顯示首頁和末頁按鈕     |
| showPrevNext | `boolean`                         | `true`      | 是否顯示上一頁下一頁按鈕   |
| disabled     | `boolean`                         | `false`     | 是否禁用                   |
| class        | `string`                          | —           | 自定義類名                 |
| text         | `boolean`                         | `false`     | 文字按鈕樣式               |
| ghost        | `boolean`                         | `false`     | 幽靈按鈕樣式               |
| outline      | `boolean`                         | `false`     | 外框按鈕樣式               |
| borderd      | `boolean`                         | `false`     | 帶邊框按鈕樣式             |
| size         | `'large' \| 'default' \| 'small'` | `'default'` | 按鈕尺寸大小               |

### Events

| 事件名            | 參數             | 說明           |
| ----------------- | ---------------- | -------------- |
| update:modelValue | `(page: number)` | 頁數變更時觸發 |
| change            | `(page: number)` | 頁數變更時觸發 |

### Slots

| 插槽名 | 參數                                                                       | 說明               |
| ------ | -------------------------------------------------------------------------- | ------------------ |
| info   | `{ current: number, total: number, pageSize: number, totalItems: number }` | 自定義資訊顯示區域 |

## 響應式設計

組件在小螢幕設備上會自動隱藏首末頁按鈕和按鈕文字，只保留圖示以節省空間。

## 樣式自定義

組件提供了豐富的 CSS 類名供樣式自定義：

- `.sh-pagination` - 分頁容器
- `.sh-pagination__list` - 分頁按鈕列表
- `.sh-pagination__button` - 分頁按鈕
- `.sh-pagination__button--active` - 活動狀態按鈕
- `.sh-pagination__ellipsis` - 省略號
- `.sh-pagination__info` - 資訊顯示區域

<script setup>
    import BasicPaginationDemo from '@/components/Pagination/demos/Basic.vue'
    import CustomPaginationDemo from '@/components/Pagination/demos/Custom.vue'
    import InfoPaginationDemo from '@/components/Pagination/demos/Info.vue'
    import SizePaginationDemo from '@/components/Pagination/demos/Size.vue'
    import TypePaginationDemo from '@/components/Pagination/demos/TypeDemo.vue'
    import DisabledPaginationDemo from '@/components/Pagination/demos/Disabled.vue'
</script>
