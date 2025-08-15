<template>
  <div class="demo-container">
    <h3>Splitter 基本示例</h3>

    <div class="demo-section">
      <h4>水平分割</h4>
      <div class="demo-wrapper">
        <Splitter direction="horizontal" class="h-64">
          <SplitterPanel :default-size="30">
            <SHBorderContainer class="bg-bg.primary" height="100%">
              <h5>左側面板</h5>
              <p>這是左側的內容區域</p>
            </SHBorderContainer>
          </SplitterPanel>

          <SplitterResizeHandle />

          <SplitterPanel :default-size="70">
            <SHBorderContainer class="bg-bg.primary" height="100%">
              <h5>右側面板</h5>
              <p>這是右側的內容區域，可以通過拖拽中間的分割線來調整大小。</p>
            </SHBorderContainer>
          </SplitterPanel>
        </Splitter>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Splitter from '../index.vue'
import SplitterPanel from '../SplitterPanel.vue'
import SplitterResizeHandle from '../SplitterResizeHandle.vue'
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply space-y-6;
}

.demo-section {
  @apply space-y-3;
}

.demo-wrapper {
  @apply w-full border border-gray-200 rounded-[6px] overflow-hidden;
}

.panel-content {
  @apply p-4 h-full flex flex-col justify-center items-center text-center;
}

.space-y-4 > * + * {
  @apply mt-4;
}

.space-y-3 > * + * {
  @apply mt-3;
}

.space-y-6 > * + * {
  @apply mt-6;
}

p {
  @apply text-sm text-text.base;
}
</style>
