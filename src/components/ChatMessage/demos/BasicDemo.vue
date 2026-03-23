<template>
  <div class="demo-wrapper">
    <h3 class="demo-title">收到的訊息（左對齊）</h3>
    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=1"
      username="Alice"
      time="10:30"
      content="嗨！最近怎麼樣？"
    />

    <SHChatMessage
      avatar-fallback="B"
      username="Bob"
      time="10:31"
      content="今天天氣真好，要不要一起去散步？"
    />

    <h3 class="demo-title">自己發送的訊息（右對齊）</h3>
    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=5"
      username="Me"
      time="10:32"
      content="好啊！我五分鐘後出發。"
      position="right"
      status="sent"
    />

    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=5"
      username="Me"
      time="10:33"
      content="傳送中的訊息…"
      position="right"
      status="sending"
    />

    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=5"
      username="Me"
      time="10:34"
      content="傳送失敗的訊息"
      position="right"
      status="failed"
    />

    <h3 class="demo-title">無頭像 fallback</h3>
    <SHChatMessage
      username="Charlie"
      time="10:35"
      content="沒有頭像時顯示使用者名稱首字。"
    />
  </div>
</template>

<script setup lang="ts">
import SHChatMessage from '../index.vue'
</script>

<style scoped>
.demo-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  max-width: 600px;
}

.demo-title {
  font-size: var(--sh-font-size-sm);
  color: var(--sh-text-primary);
  margin: 8px 0 4px;
  font-weight: 600;
}
</style>
