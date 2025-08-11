---
title: BlockArea 禁用區域
---

# BlockArea 禁用區域

BlockArea 組件可以將包覆的區塊禁用，讓使用者無法執行選取、點擊等操作。被包覆的區塊會覆蓋一層具有透明度的底色表示該區域是禁用的狀態，且 BlockArea 可以透過 props 來設定是否要在區塊中顯示文字或是圖示。

## 基本用法

基本的禁用區域用法，可以控制區域的啟用和禁用狀態。

<Demo>
  <BasicDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <!-- 基本禁用狀態 -->
    <BlockArea :active="false">
      <div class="p-4 bg-gray-100 rounded border">
        <p>這是一個被禁用的區域</p>
        <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
          點擊我
        </button>
      </div>
    </BlockArea>

    <!-- 正常狀態 -->
    <BlockArea :active="true">
      <div class="p-4 bg-gray-100 rounded border">
        <p>這是一個正常的區域</p>
        <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
          點擊我
        </button>
      </div>
    </BlockArea>

    <!-- 切換狀態 -->
    <label class="flex items-center gap-2 mb-2">
      <input v-model="isActive" type="checkbox" class="rounded" />
      <span>啟用區域</span>
    </label>
    <BlockArea :active="isActive">
      <div class="p-4 bg-gray-100 rounded border">
        <p>這個區域的狀態可以切換</p>
        <button class="mt-2 px-3 py-1 bg-blue-500 text-white rounded">
          點擊我
        </button>
      </div>
    </BlockArea>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const isActive = ref(false)
</script>
```

  </template>
</Demo>

## 圖示提示

可以在禁用狀態下顯示圖示，提供視覺化的狀態提示。

<Demo>
  <IconDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <!-- 使用 icon prop -->
    <BlockArea :active="false" :icon="IconLock">
      <div class="p-4 bg-gray-100  border">
        <p>這個區域被鎖定了</p>
        <button class="mt-2 px-3 py-1 bg-blue-500 text-white ">操作按鈕</button>
      </div>
    </BlockArea>

    <!-- 使用圖示插槽 -->
    <BlockArea :active="false">
      <template #icon>
        <IconExclamationCircle class="w-8 h-8 text-orange-500" />
      </template>
      <div class="p-4 bg-gray-100  border">
        <p>這個區域有警告</p>
        <button class="mt-2 px-3 py-1 bg-blue-500 text-white ">操作按鈕</button>
      </div>
    </BlockArea>
  </div>
</template>

<script setup>
import { IconLock, IconExclamationCircle } from '@tabler/icons-vue'
</script>
```

  </template>
</Demo>

## 文字提示

可以在禁用狀態下顯示文字說明，或結合圖示和文字一起使用。

<Demo>
  <TextDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <!-- 純文字 -->
    <BlockArea :disabled="true" text="此區域已禁用">
      <div class="p-4 bg-gray-100  border">
        <p>這是一個表單區域</p>
        <input
          type="text"
          placeholder="輸入文字"
          class="mt-2 p-2 border  w-full"
        />
        <button class="mt-2 px-3 py-1 bg-blue-500 text-white ">提交</button>
      </div>
    </BlockArea>

    <!-- 圖示 + 文字 -->
    <BlockArea :disabled="true" :icon="IconLock" text="需要權限才能編輯">
      <div class="p-4 bg-gray-100  border">
        <p>敏感資料編輯區</p>
        <input
          type="password"
          placeholder="輸入密碼"
          class="mt-2 p-2 border  w-full"
        />
        <button class="mt-2 px-3 py-1 bg-red-500 text-white ">刪除資料</button>
      </div>
    </BlockArea>
  </div>
</template>

<script setup>
import { IconLock } from '@tabler/icons-vue'
</script>
```

  </template>
</Demo>

## 綜合示例

展示 BlockArea 在複雜佈局中的應用場景。

<Demo>
  <ComprehensiveDemo />
  
  <template #code>

```vue
<template>
  <div class="space-y-4">
    <!-- 複雜內容禁用 -->
    <BlockArea :disabled="true" :icon="IconShieldLock" text="安全保護中">
      <div class="p-6 bg-white border -lg shadow">
        <h5 class="text-lg font-semibold mb-4">用戶設定</h5>
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium mb-1">用戶名稱</label>
            <input type="text" value="john_doe" class="w-full p-2 border " />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">電子郵件</label>
            <input
              type="email"
              value="john@example.com"
              class="w-full p-2 border "
            />
          </div>
          <div class="flex gap-2">
            <button class="px-4 py-2 bg-blue-500 text-white ">保存</button>
            <button class="px-4 py-2 bg-gray-500 text-white ">取消</button>
          </div>
        </div>
      </div>
    </BlockArea>

    <!-- 卡片式佈局 -->
    <div class="grid grid-cols-2 gap-4">
      <BlockArea :disabled="false">
        <div class="p-4 bg-green-50 border border-green-200 -lg">
          <h6 class="font-semibold text-green-800">可用功能</h6>
          <p class="text-sm text-green-600 mt-1">此功能已啟用</p>
          <button class="mt-2 px-3 py-1 bg-green-500 text-white  text-sm">
            使用
          </button>
        </div>
      </BlockArea>

      <BlockArea :disabled="true" :icon="IconClock" text="開發中">
        <div class="p-4 bg-yellow-50 border border-yellow-200 -lg">
          <h6 class="font-semibold text-yellow-800">開發中功能</h6>
          <p class="text-sm text-yellow-600 mt-1">即將推出</p>
          <button class="mt-2 px-3 py-1 bg-yellow-500 text-white  text-sm">
            使用
          </button>
        </div>
      </BlockArea>
    </div>
  </div>
</template>

<script setup>
import { IconShieldLock, IconClock } from '@tabler/icons-vue'
</script>
```

  </template>
</Demo>

## API

### 屬性

| 屬性名 | 說明                                   | 類型        | 默認值      |
| ------ | -------------------------------------- | ----------- | ----------- |
| active | 是否啟用區域 (true: 正常, false: 禁用) | `boolean`   | `true`      |
| icon   | 要顯示的圖示組件                       | `Component` | `undefined` |
| text   | 要顯示的文字                           | `string`    | `undefined` |

### 插槽 Slots

| 插槽名  | 說明     |
| ------- | -------- |
| default | 預設內容 |
| icon    | 圖示內容 |
| text    | 文字內容 |

<script setup>
import { SHConfigProvider } from '@/index'
import BasicDemo from '@/components/BlockArea/demos/BasicDemo.vue'
import IconDemo from '@/components/BlockArea/demos/IconDemo.vue'
import TextDemo from '@/components/BlockArea/demos/TextDemo.vue'
import ComprehensiveDemo from '@/components/BlockArea/demos/ComprehensiveDemo.vue'
</script>
