<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">多選模式</h3>
      <SHSelect
        v-model="multipleValue"
        :options="options"
        placeholder="請選擇多個選項"
        multiple
        clearable
        style="width: 300px"
      />
      <p class="mt-2 text-sm text-gray-600">
        選中的值: <code>{{ multipleValue }}</code>
      </p>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">限制選擇數量 (最多3個)</h3>
      <SHSelect
        v-model="limitedValue"
        :options="options"
        placeholder="最多選擇3個選項"
        multiple
        :max-selections="3"
        clearable
        style="width: 300px"
      />
      <p class="mt-2 text-sm text-gray-600">
        選中的值: <code>{{ limitedValue }}</code>
      </p>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">多選 + 搜索</h3>
      <SHSelect
        v-model="searchMultipleValue"
        :options="searchOptions"
        placeholder="可搜索多選"
        multiple
        filterable
        clearable
        style="width: 300px"
      />
      <p class="mt-2 text-sm text-gray-600">
        選中的值: <code>{{ searchMultipleValue }}</code>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '../types'

const multipleValue = ref<(string | number)[]>([])
const limitedValue = ref<(string | number)[]>(['option1'])
const searchMultipleValue = ref<(string | number)[]>([])

const options: SelectOption[] = [
  { value: 'option1', label: '選項一' },
  { value: 'option2', label: '選項二' },
  { value: 'option3', label: '選項三' },
  { value: 'option4', label: '選項四' },
  { value: 'option5', label: '選項五' },
]

const searchOptions: SelectOption[] = [
  { value: 'frontend', label: '前端開發' },
  { value: 'backend', label: '後端開發' },
  { value: 'fullstack', label: '全端開發' },
  { value: 'mobile', label: '行動開發' },
  { value: 'ui', label: 'UI設計' },
  { value: 'ux', label: 'UX設計' },
  { value: 'devops', label: 'DevOps' },
  { value: 'testing', label: '測試' },
  { value: 'pm', label: '專案管理' },
  { value: 'data', label: '數據分析' },
]
</script>
