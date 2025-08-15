<template>
  <div class="demo-container">
    <h3>Splitter 基本示例</h3>

    <div class="demo-section">
      <h4>水平分割</h4>
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

    <div class="demo-section">
      <h4>垂直分割</h4>
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

    <div class="demo-section">
      <h4>嵌套分割</h4>
      <div class="demo-wrapper">
        <Splitter direction="horizontal" class="h-64">
          <SplitterPanel :default-size="30" class="demo-panel">
            <div class="panel-content">
              <h5>左側面板</h5>
              <p>這是左側固定寬度的面板</p>
            </div>
          </SplitterPanel>

          <SplitterResizeHandle />

          <SplitterPanel :default-size="70">
            <Splitter direction="vertical">
              <SplitterPanel :default-size="50" class="demo-panel">
                <div class="panel-content">
                  <h5>右上面板</h5>
                  <p>這是右上方的面板</p>
                </div>
              </SplitterPanel>

              <SplitterResizeHandle />

              <SplitterPanel :default-size="50" class="demo-panel">
                <div class="panel-content">
                  <h5>右下面板</h5>
                  <p>這是右下方的面板</p>
                </div>
              </SplitterPanel>
            </Splitter>
          </SplitterPanel>
        </Splitter>
      </div>
    </div>

    <div class="demo-section">
      <h4>不同變體</h4>
      <div class="space-y-4">
        <div>
          <h5 class="mb-2">默認變體</h5>
          <div class="demo-wrapper">
            <Splitter direction="horizontal" variant="default" class="h-32">
              <SplitterPanel :default-size="50" class="demo-panel">
                <div class="panel-content">面板 A</div>
              </SplitterPanel>
              <SplitterResizeHandle />
              <SplitterPanel :default-size="50" class="demo-panel">
                <div class="panel-content">面板 B</div>
              </SplitterPanel>
            </Splitter>
          </div>
        </div>

        <div>
          <h5 class="mb-2">邊框變體</h5>
          <div class="demo-wrapper">
            <Splitter direction="horizontal" variant="bordered" class="h-32">
              <SplitterPanel
                :default-size="50"
                variant="bordered"
                class="demo-panel"
              >
                <div class="panel-content">面板 A</div>
              </SplitterPanel>
              <SplitterResizeHandle />
              <SplitterPanel
                :default-size="50"
                variant="bordered"
                class="demo-panel"
              >
                <div class="panel-content">面板 B</div>
              </SplitterPanel>
            </Splitter>
          </div>
        </div>

        <div>
          <h5 class="mb-2">卡片變體</h5>
          <div class="demo-wrapper">
            <Splitter direction="horizontal" variant="card" class="h-32">
              <SplitterPanel
                :default-size="50"
                variant="card"
                class="demo-panel"
              >
                <div class="panel-content">面板 A</div>
              </SplitterPanel>
              <SplitterResizeHandle />
              <SplitterPanel
                :default-size="50"
                variant="card"
                class="demo-panel"
              >
                <div class="panel-content">面板 B</div>
              </SplitterPanel>
            </Splitter>
          </div>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>可收縮面板</h4>
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
  </div>
</template>

<script setup lang="ts">
import Splitter from '../index.vue'
import SplitterPanel from '../SplitterPanel.vue'
import SplitterResizeHandle from '../SplitterResizeHandle.vue'
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply p-6 space-y-6;
}

.demo-section {
  @apply space-y-3;
}

.demo-wrapper {
  @apply w-full border border-gray-200 rounded-lg overflow-hidden;
}

.demo-panel {
  @apply min-h-0;
}

.panel-content {
  @apply p-4 h-full flex flex-col justify-center items-center text-center bg-gray-50;
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

h5 {
  @apply text-sm font-medium text-gray-900 mb-2;
}

p {
  @apply text-sm text-gray-600;
}
</style>
