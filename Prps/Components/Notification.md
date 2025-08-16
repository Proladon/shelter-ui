## Goal

建立新的組件，名為 `Notification`，並更新組件文檔

## What

Notification 包含了 NotificationProvider 和 Notification 兩個組件，提供一個完整的通知系統。
NotificationProvider 組件是 Notification 系統的核心組件，負責管理通知實例的狀態和提供程式化 API
Notification 組件是一個用於顯示通知信息的組件，可以用於提示用戶重要信息或狀態更新。

### NotificationProvider 主要功能

1. 狀態管理
   NotificationProvider 維護一個響應式的通知列表，管理所有通知實例的生命週期。當創建新通知時，會生成唯一的 key 並添加到列表中。

2. API 注入
   通過 Vue 的 provide/inject 模式，向子組件提供通知 API。API 包含創建不同類型通知的方法：

- create: 創建通用通知
- info, success, warning, error: 創建特定類型的通知
- destroyAll: 銷毀所有通知

3. 數量限制控制
   支持通過 max 屬性限制同時顯示的通知數量。當超過限制時，會自動移除最舊的通知。

4. 渲染管理
   負責渲染通知容器和所有通知實例，使用 Teleport 將通知掛載到指定位置。

### 使用方式

需要將調用通知方法的組件包裹在 SHCotificationProvider 內部，並使用 useNotification 獲取 API：

```vue
<SHCotificationProvider>  
  <content />  
</SHCotificationProvider>
```

## Important

- use Chinese Traditional all the time

- All icons should use the icons from '@tabler/icons-vue'
