<template>
  <div class="demo-container">
    <h3>Collapsible 基本示例</h3>

    <div class="demo-section">
      <h4>基本折疊面板</h4>
      <Collapsible v-model:open="basicOpen">
        <template #trigger>
          <span>點擊展開/收合內容</span>
        </template>
        <div class="demo-content">
          <p>這是一段可以展開和收合的內容。</p>
          <p>你可以在這裡放置任何內容，比如表單、列表或其他組件。</p>
        </div>
      </Collapsible>
    </div>

    <div class="demo-section">
      <h4>不同變體</h4>
      <div class="space-y-4">
        <div>
          <h5 class="mb-2">默認變體</h5>
          <Collapsible variant="default" v-model:open="defaultOpen">
            <template #trigger>
              <span>默認樣式折疊面板</span>
            </template>
            <div class="demo-content">
              <p>這是默認樣式的折疊面板內容。</p>
            </div>
          </Collapsible>
        </div>

        <div>
          <h5 class="mb-2">卡片變體</h5>
          <Collapsible variant="card" v-model:open="cardOpen">
            <template #trigger>
              <span>卡片樣式折疊面板</span>
            </template>
            <div class="demo-content">
              <p>這是卡片樣式的折疊面板內容。</p>
            </div>
          </Collapsible>
        </div>

        <div>
          <h5 class="mb-2">幽靈變體</h5>
          <Collapsible variant="ghost" v-model:open="ghostOpen">
            <template #trigger>
              <span>幽靈樣式折疊面板</span>
            </template>
            <div class="demo-content">
              <p>這是幽靈樣式的折疊面板內容。</p>
            </div>
          </Collapsible>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>不同尺寸</h4>
      <div class="space-y-4">
        <div>
          <h5 class="mb-2">小尺寸</h5>
          <Collapsible size="small" v-model:open="smallOpen">
            <template #trigger>
              <span>小尺寸折疊面板</span>
            </template>
            <div class="demo-content">
              <p>這是小尺寸的折疊面板內容。</p>
            </div>
          </Collapsible>
        </div>

        <div>
          <h5 class="mb-2">大尺寸</h5>
          <Collapsible size="large" v-model:open="largeOpen">
            <template #trigger>
              <span>大尺寸折疊面板</span>
            </template>
            <div class="demo-content">
              <p>這是大尺寸的折疊面板內容。</p>
            </div>
          </Collapsible>
        </div>
      </div>
    </div>

    <div class="demo-section">
      <h4>自定義觸發器</h4>
      <Collapsible v-model:open="customOpen">
        <template #trigger>
          <div class="custom-trigger">
            <IconInfoCircle :size="20" />
            <span>查看詳細信息</span>
            <IconChevronDown
              :size="16"
              class="ml-auto transition-transform duration-200"
              :class="{ 'rotate-180': customOpen }"
            />
          </div>
        </template>
        <div class="demo-content">
          <h6 class="font-semibold mb-2">詳細信息</h6>
          <ul class="list-disc list-inside space-y-1">
            <li>這是第一項詳細信息</li>
            <li>這是第二項詳細信息</li>
            <li>這是第三項詳細信息</li>
          </ul>
        </div>
      </Collapsible>
    </div>

    <div class="demo-section">
      <h4>嵌套折疊面板</h4>
      <Collapsible variant="card" v-model:open="nestedOpen1">
        <template #trigger>
          <span>第一層折疊面板</span>
        </template>
        <div class="demo-content">
          <p class="mb-4">這是第一層的內容。</p>

          <Collapsible variant="default" v-model:open="nestedOpen2">
            <template #trigger>
              <span>第二層折疊面板</span>
            </template>
            <div class="demo-content">
              <p>這是嵌套在第一層內的第二層內容。</p>
            </div>
          </Collapsible>
        </div>
      </Collapsible>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IconInfoCircle, IconChevronDown } from '@tabler/icons-vue'
import Collapsible from '../index.vue'

const basicOpen = ref(false)
const defaultOpen = ref(false)
const cardOpen = ref(false)
const ghostOpen = ref(false)
const smallOpen = ref(false)
const largeOpen = ref(false)
const customOpen = ref(false)
const nestedOpen1 = ref(false)
const nestedOpen2 = ref(false)
</script>

<style lang="postcss" scoped>
.demo-container {
  @apply p-6 space-y-6;
}

.demo-section {
  @apply space-y-3;
}

.demo-content {
  @apply text-gray-700;
}

.custom-trigger {
  @apply flex items-center gap-3 p-3 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer;
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

.space-y-1 > * + * {
  @apply mt-1;
}

h5 {
  @apply text-sm font-medium text-gray-900;
}

h6 {
  @apply text-sm font-semibold text-gray-900;
}
</style>
