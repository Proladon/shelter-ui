<template>
  <div class="demo-section">
    <div class="demo-wrapper">
      <Splitter direction="horizontal" class="h-64">
        <SplitterPanel
          :default-size="30"
          :min-size="20"
          :collapsible="true"
          :collapsed-size="5"
          class="demo-panel"
        >
          <div class="panel-content">
            <h5>可收縮面板</h5>
            <p>當拖拽到最小尺寸時，此面板會自動收縮</p>
          </div>
        </SplitterPanel>

        <SplitterResizeHandle />

        <SplitterPanel :default-size="70" class="demo-panel">
          <div class="panel-content">
            <h5>主內容面板</h5>
            <p>這是主要的內容區域</p>
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
