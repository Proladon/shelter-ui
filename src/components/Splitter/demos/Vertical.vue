<template>
  <div class="demo-section">
    <div class="demo-wrapper">
      <Splitter direction="vertical" class="h-64">
        <SplitterPanel :default-size="40" class="demo-panel">
          <div class="panel-content">
            <h5>上方面板</h5>
            <p>這是上方的內容區域</p>
          </div>
        </SplitterPanel>

        <SplitterResizeHandle />

        <SplitterPanel :default-size="60" class="demo-panel">
          <div class="panel-content">
            <h5>下方面板</h5>
            <p>這是下方的內容區域</p>
          </div>
        </SplitterPanel>
      </Splitter>
    </div>
  </div>
</template>

<script setup lang="ts">
import Splitter from '../index.vue'
import SplitterPanel from '../SplitterPanel.vue'
import SplitterResizeHandle from '../SplitterResizeHandle.vue'
</script>

<style lang="postcss" scoped>
.demo-wrapper {
  @apply w-full border border-gray-200 rounded-lg overflow-hidden;
}
.demo-panel {
  @apply min-h-0 border-solid border-border.base border;
}
.panel-content {
  @apply p-4 h-full flex flex-col justify-center items-center text-center bg-bg.primary;
}

p {
  @apply text-sm text-gray-600;
}
</style>
