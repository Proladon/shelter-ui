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

    <h3 class="demo-title">複製事件</h3>
    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=7"
      username="Henry"
      time="10:44"
      content="Hover 後點複製 icon 可複製此訊息。"
      @copy="onCopy"
    />
    <p v-if="lastCopied" class="demo-copy-hint">已複製：{{ lastCopied }}</p>

    <h3 class="demo-title">
      控制顯示（show-username / show-time / show-copy-button）
    </h3>
    <div class="demo-label">預設（全部顯示）</div>
    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=2"
      username="Diana"
      time="11:00"
      content="名稱、時間、複製按鈕皆顯示（預設行為）。"
    />
    <div class="demo-label">:show-username="false"</div>
    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=3"
      username="Eve"
      time="11:01"
      content="不顯示使用者名稱。"
      :show-username="false"
    />
    <div class="demo-label">:show-time="false"</div>
    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=4"
      username="Frank"
      time="11:02"
      content="不顯示時間。"
      :show-time="false"
    />
    <div class="demo-label">:show-copy-button="false"</div>
    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=6"
      username="Grace"
      time="11:03"
      content="不顯示複製按鈕（hover 也不會出現）。"
      :show-copy-button="false"
    />
    <div class="demo-label">全部關閉</div>
    <SHChatMessage
      avatar="https://i.pravatar.cc/40?img=8"
      username="Hank"
      time="11:04"
      content="只顯示訊息本體。"
      :show-username="false"
      :show-time="false"
      :show-copy-button="false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHChatMessage from '../index.vue'

const lastCopied = ref('')
const onCopy = (content: string) => {
  lastCopied.value = content
}
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

.demo-label {
  font-size: var(--sh-font-size-xs);
  color: var(--sh-text-primary);
  font-family: monospace;
  margin-bottom: -8px;
}

.demo-copy-hint {
  font-size: var(--sh-font-size-xs);
  color: var(--sh-status-success);
  margin: 0;
}
</style>
