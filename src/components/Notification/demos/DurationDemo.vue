<template>
  <div class="demo-section">
    <div class="demo-controls">
      <SHButton @click="showShortDuration">短時間 (2秒)</SHButton>
      <SHButton @click="showNormalDuration">普通時間 (4.5秒)</SHButton>
      <SHButton @click="showLongDuration">長時間 (10秒)</SHButton>
      <SHButton @click="showNeverClose">永不關閉</SHButton>
      <SHButton @click="showNonClosable" type="warning">不可手動關閉</SHButton>
    </div>

    <div class="demo-controls">
      <SHButton @click="destroyAll" type="danger">清除所有通知</SHButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotification } from '../useNotification'
import SHButton from '../../Button/index.vue'

const notification = useNotification()

const showShortDuration = () => {
  notification.info({
    title: '短時間通知',
    message: '這個通知將在 2 秒後自動關閉。',
    duration: 2000,
  })
}

const showNormalDuration = () => {
  notification.success({
    title: '普通時間通知',
    message: '這個通知將在 4.5 秒後自動關閉（預設時間）。',
  })
}

const showLongDuration = () => {
  notification.warning({
    title: '長時間通知',
    message: '這個通知將在 10 秒後自動關閉，給您更多時間閱讀內容。',
    duration: 10000,
  })
}

const showNeverClose = () => {
  notification.info({
    title: '永不自動關閉',
    message:
      '這個通知不會自動關閉，只能手動關閉。滑鼠懸停會暫停其他通知的自動關閉計時器。',
    duration: 0,
  })
}

const showNonClosable = () => {
  notification.warning({
    title: '不可手動關閉',
    message: '這個通知無法手動關閉，只會在 5 秒後自動關閉。',
    duration: 5000,
    closable: false,
  })
}

const destroyAll = () => {
  notification.destroyAll()
}
</script>

<style lang="postcss" scoped>
.demo-section {
  @apply space-y-4;
}

.demo-controls {
  @apply flex gap-3 flex-wrap;
}
</style>
