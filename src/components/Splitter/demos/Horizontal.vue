<template>
  <div class="demo-section">
    <div class="demo-wrapper">
      <Splitter direction="horizontal" class="h-64">
        <SplitterPanel :default-size="30" class="demo-panel">
          <div class="panel-content">
            <h5>左側面板</h5>
            <p>這是左側的內容區域</p>
          </div>
        </SplitterPanel>

        <SplitterResizeHandle />

        <SplitterPanel :default-size="70" class="demo-panel">
          <div class="panel-content">
            <h5>右側面板</h5>
            <p>這是右側的內容區域，可以通過拖拽中間的分割線來調整大小。</p>
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
  @apply w-full border border-gray-200 rounded-[6px] overflow-hidden;
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
