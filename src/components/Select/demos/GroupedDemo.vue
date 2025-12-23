<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">分組選項</h3>
      <SHSelect
        v-model:value="groupedValue"
        :options="groupedOptions"
        placeholder="請選擇一個選項"
        clearable
        style="width: 250px"
      />
      <p class="mt-2 text-sm text-gray-600">
        選中的值: <code>{{ groupedValue }}</code>
      </p>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">分組 + 多選</h3>
      <SHSelect
        v-model:value="groupedMultipleValue"
        :options="groupedOptions"
        placeholder="請選擇多個選項"
        multiple
        clearable
        style="width: 300px"
      />
      <p class="mt-2 text-sm text-gray-600">
        選中的值: <code>{{ groupedMultipleValue }}</code>
      </p>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">分組 + 搜索</h3>
      <SHSelect
        v-model:value="groupedSearchValue"
        :options="groupedOptions"
        placeholder="可搜索分組選項"
        filterable
        clearable
        style="width: 250px"
      />
      <p class="mt-2 text-sm text-gray-600">
        選中的值: <code>{{ groupedSearchValue }}</code>
      </p>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">禁用選項</h3>
      <SHSelect
        v-model:value="disabledValue"
        :options="disabledOptions"
        placeholder="某些選項被禁用"
        clearable
        style="width: 250px"
      />
      <p class="mt-2 text-sm text-gray-600">
        選中的值: <code>{{ disabledValue }}</code>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '../types'

const groupedValue = ref('')
const groupedMultipleValue = ref<(string | number)[]>([])
const groupedSearchValue = ref('')
const disabledValue = ref('')

const groupedOptions: SelectOption[] = [
  // 前端技術
  { value: 'vue', label: 'Vue.js', group: '前端框架' },
  { value: 'react', label: 'React', group: '前端框架' },
  { value: 'angular', label: 'Angular', group: '前端框架' },
  { value: 'svelte', label: 'Svelte', group: '前端框架' },

  // 後端技術
  { value: 'nodejs', label: 'Node.js', group: '後端技術' },
  { value: 'python', label: 'Python', group: '後端技術' },
  { value: 'java', label: 'Java', group: '後端技術' },
  { value: 'go', label: 'Go', group: '後端技術' },

  // 數據庫
  { value: 'mysql', label: 'MySQL', group: '數據庫' },
  { value: 'postgresql', label: 'PostgreSQL', group: '數據庫' },
  { value: 'mongodb', label: 'MongoDB', group: '數據庫' },
  { value: 'redis', label: 'Redis', group: '數據庫' },

  // 工具
  { value: 'vite', label: 'Vite', group: '構建工具' },
  { value: 'webpack', label: 'Webpack', group: '構建工具' },
  { value: 'rollup', label: 'Rollup', group: '構建工具' },
]

const disabledOptions: SelectOption[] = [
  { value: 'available1', label: '可用選項 1' },
  { value: 'disabled1', label: '禁用選項 1', disabled: true },
  { value: 'available2', label: '可用選項 2' },
  { value: 'disabled2', label: '禁用選項 2', disabled: true },
  { value: 'available3', label: '可用選項 3' },
  { value: 'disabled3', label: '禁用選項 3', disabled: true },
]
</script>
