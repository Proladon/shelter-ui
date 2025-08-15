<template>
  <div class="demo-section">
    <div class="demo-wrapper">
      <Splitter direction="horizontal" class="h-32">
        <SplitterPanel :default-size="50" class="demo-panel">
          <div class="panel-content">面板 A</div>
        </SplitterPanel>

        <SplitterResizeHandle
          :visable="true"
          color="#f97316"
          hoverColor="#2f8552"
          dragColor="yellow"
        />

        <SplitterPanel :default-size="50" class="demo-panel">
          <div class="panel-content">面板 B</div>
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
