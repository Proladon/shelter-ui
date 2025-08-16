# Notification 通知組件

通知組件提供了一個完整的通知系統，包含 `NotificationProvider` 和 `Notification` 兩個組件，以及 `useNotification` 組合函數。

## 功能特性

- 🎯 **多種類型**：支持 info、success、warning、error 四種通知類型
- 🎨 **自定義圖標**：支持使用自定義圖標或使用預設的 Tabler Icons
- ⏰ **自動關閉**：可設置自動關閉時間，支持滑鼠懸停暫停計時
- 📍 **靈活定位**：支持 6 種不同的顯示位置

## 演示範例

下面使用 `<Demo>` 容器引用並顯示實際的 demo 組件，便於在文檔站點中直接運行。

<Demo>
  <BasicDemo />
  
<template #code>

```vue
<template>
  <BasicDemo />
</template>

<script setup lang="ts">
import BasicDemo from '@/components/Notification/demos/BasicDemo.vue'
</script>
```

</template>

</Demo>

<Demo>
  <DurationDemo />
  
<template #code>

```vue
<template>
  <DurationDemo />
</template>

<script setup lang="ts">
import DurationDemo from '@/components/Notification/demos/DurationDemo.vue'
</script>
```

</template>

</Demo>

<Demo>
  <CustomDemo />
  
<template #code>

```vue
<template>
  <CustomDemo />
</template>

<script setup lang="ts">
import CustomDemo from '@/components/Notification/demos/CustomDemo.vue'
</script>
```

</template>

</Demo>

<Demo>
  <PlacementDemo />
  
<template #code>

```vue
<template>
  <PlacementDemo />
</template>

<script setup lang="ts">
import PlacementDemo from '@/components/Notification/demos/PlacementDemo.vue'
</script>
```

</template>

</Demo>

### 完整演示組件

一個整合所有 demo 的組件（在示例站中可直接演示）：

<Demo>
  <AllDemo />
  
<template #code>

```vue
<template>
  <SHNotificationProvider placement="top-right" :max="5">
    <AllDemo />
  </SHNotificationProvider>
</template>

<script setup lang="ts">
import { SHNotificationProvider } from 'shelter-ui'
import AllDemo from '@/components/Notification/demos/AllDemo.vue'
</script>
```

</template>

</Demo>

### 自定義內容演示

展示如何使用自定義圖標、回調函數等進階功能。

```vue
<template>
  <div class="demo-section">
    <div class="demo-controls">
      <SHButton @click="showWithCustomIcon">自定義圖標</SHButton>
      <SHButton @click="showWithActions">帶操作按鈕</SHButton>
      <SHButton @click="showWithCallback">帶回調函數</SHButton>
      <SHButton @click="showRichContent">豐富內容</SHButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from 'shelter-ui'
import { IconHeart, IconBell } from '@tabler/icons-vue'

const notification = useNotification()

const showWithCustomIcon = () => {
  notification.create({
    title: '自定義圖標',
    message: '這個通知使用了自定義的愛心圖標。',
    type: 'success',
    icon: IconHeart,
  })
}

const showWithActions = () => {
  notification.info({
    title: '系統更新可用',
    message: '新版本已發布，建議您更新到最新版本以獲得更好的使用體驗。',
    duration: 0,
    onClick: () => {
      console.log('通知被點擊了')
      alert('您點擊了通知！在實際應用中，這裡可以執行相應的操作。')
    },
  })
}

const showWithCallback = () => {
  notification.success({
    title: '帶回調的通知',
    message: '這個通知有點擊和關閉的回調函數。',
    onClick: () => {
      console.log('通知被點擊')
      alert('通知被點擊了！')
    },
    onClose: () => {
      console.log('通知被關閉')
      alert('通知被關閉了！')
    },
  })
}

const showRichContent = () => {
  notification.create({
    title: '📢 重要公告',
    message:
      '我們的系統將在今晚 23:00-01:00 進行維護升級，期間服務可能會短暫中斷。感謝您的耐心等候！如有疑問，請聯繫客服團隊。',
    type: 'warning',
    icon: IconBell,
    duration: 8000,
  })
}
</script>
```

### 位置演示

展示通知在不同位置的顯示效果（需要在 Provider 層級設置）。

```vue
<template>
  <div class="demo-section">
    <div class="demo-controls">
      <div class="placement-grid">
        <SHButton @click="() => showNotification('top-left')">左上角</SHButton>
        <SHButton @click="() => showNotification('top')">頂部中央</SHButton>
        <SHButton @click="() => showNotification('top-right')">右上角</SHButton>
        <SHButton @click="() => showNotification('bottom-left')"
          >左下角</SHButton
        >
        <SHButton @click="() => showNotification('bottom')">底部中央</SHButton>
        <SHButton @click="() => showNotification('bottom-right')"
          >右下角</SHButton
        >
      </div>
    </div>

    <div class="demo-note">
      <p class="text-sm">
        注意：此演示僅顯示右上角位置的通知，因為組件位於 Provider 內部。
        在實際使用中，您可以設置 NotificationProvider 的 placement
        屬性來控制位置。
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotification, type NotificationProviderProps } from 'shelter-ui'

const notification = useNotification()

const showNotification = (
  placement: NotificationProviderProps['placement'],
) => {
  notification.info({
    title: `${placement} 位置`,
    message: `這是一個顯示在 ${placement} 位置的通知。`,
    duration: 3000,
  })
}
</script>

<style scoped>
.placement-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  max-width: 24rem;
}

.demo-note {
  padding: 12px;
  background-color: var(--sh-bg-secondary);
  border-radius: 6px;
  border: 1px solid var(--sh-border-base);
}
</style>
```

### 完整演示組件

以下是一個整合了所有功能的演示組件：

```vue
<template>
  <SHNotificationProvider placement="top-right" :max="5">
    <div class="notification-demo">
      <h2>通知組件演示</h2>
      <p class="demo-description">
        這個演示展示了如何使用 SHNotificationProvider 和 useNotification API
      </p>

      <div class="demo-grid">
        <div class="demo-section">
          <h3>基本通知</h3>
          <BasicDemo />
        </div>

        <div class="demo-section">
          <h3>持續時間控制</h3>
          <DurationDemo />
        </div>

        <div class="demo-section">
          <h3>自定義內容</h3>
          <CustomDemo />
        </div>

        <div class="demo-section">
          <h3>位置演示說明</h3>
          <PlacementDemo />
        </div>
      </div>
    </div>
  </SHNotificationProvider>
</template>

<script setup lang="ts">
import { SHNotificationProvider } from 'shelter-ui'
// 導入各個演示組件
import BasicDemo from './BasicDemo.vue'
import DurationDemo from './DurationDemo.vue'
import CustomDemo from './CustomDemo.vue'
import PlacementDemo from './PlacementDemo.vue'
</script>

<style scoped>
.notification-demo {
  padding: 24px;
  max-width: 64rem;
  margin: 0 auto;
}

.demo-description {
  color: var(--sh-text-fade);
  font-size: 14px;
  margin-bottom: 24px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

.demo-section {
  padding: 16px;
  border: 1px solid var(--sh-border-base);
  border-radius: 8px;
  background: var(--sh-bg-primary);
}

.demo-section h3 {
  font-size: 18px;
  font-weight: 500;
  color: var(--sh-text-base);
  margin-bottom: 16px;
}
</style>
```

<script setup>
import BasicDemo from '@/components/Notification/demos/BasicDemo.vue'
import DurationDemo from '@/components/Notification/demos/DurationDemo.vue'
import CustomDemo from '@/components/Notification/demos/CustomDemo.vue'
import PlacementDemo from '@/components/Notification/demos/PlacementDemo.vue'
import AllDemo from '@/components/Notification/demos/AllDemo.vue'
</script>
