<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">加載狀態</h3>
      <SHSelect
        v-model:value="loadingValue"
        :options="[]"
        placeholder="載入中..."
        loading
        style="width: 200px"
      />
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">空數據狀態</h3>
      <SHSelect
        v-model:value="emptyValue"
        :options="[]"
        placeholder="無數據"
        no-data-text="沒有可用選項"
        style="width: 200px"
      />
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">搜索無結果</h3>
      <SHSelect
        v-model:value="noMatchValue"
        :options="options"
        placeholder="搜索試試"
        filterable
        no-match-text="找不到匹配的選項"
        style="width: 200px"
      />
      <p class="mt-1 text-xs text-gray-500">試試搜索 "xyz" 看看無結果狀態</p>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">自定義位置</h3>
      <div class="flex gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">向上展開</label>
          <SHSelect
            v-model:value="topValue"
            :options="options"
            placeholder="向上展開"
            placement="top"
            style="width: 150px"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">向下展開</label>
          <SHSelect
            v-model:value="bottomValue"
            :options="options"
            placeholder="向下展開"
            placement="bottom"
            style="width: 150px"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">自動判斷</label>
          <SHSelect
            v-model:value="autoValue"
            :options="options"
            placeholder="自動判斷"
            placement="auto"
            style="width: 150px"
          />
        </div>
      </div>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">自定義尺寸</h3>
      <div class="flex gap-4 items-end">
        <div>
          <label class="block text-sm font-medium mb-1">固定寬度 300px</label>
          <SHSelect
            v-model:value="customWidthValue"
            :options="options"
            placeholder="固定寬度"
            width="300px"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">最大高度 100px</label>
          <SHSelect
            v-model:value="customHeightValue"
            :options="longOptions"
            placeholder="限制高度"
            max-height="100px"
            width="200px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '../types'

const loadingValue = ref('')
const emptyValue = ref('')
const noMatchValue = ref('')
const topValue = ref('')
const bottomValue = ref('')
const autoValue = ref('')
const customWidthValue = ref('')
const customHeightValue = ref('')

const options: SelectOption[] = [
  { value: 'option1', label: '選項一' },
  { value: 'option2', label: '選項二' },
  { value: 'option3', label: '選項三' },
]

const longOptions: SelectOption[] = Array.from({ length: 20 }, (_, i) => ({
  value: `option${i + 1}`,
  label: `選項 ${i + 1}`,
}))
</script>
