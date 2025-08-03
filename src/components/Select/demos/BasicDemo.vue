<template>
  <div class="space-y-4">
    <div>
      <h3 class="text-lg font-medium mb-2">基本選擇器</h3>
      <s-select
        v-model="value1"
        :options="basicOptions"
        placeholder="請選擇一個選項"
        style="width: 200px"
      />
      <p class="mt-2 text-sm text-gray-600">
        選中的值: <code>{{ value1 }}</code>
      </p>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">可清空</h3>
      <s-select
        v-model="value2"
        :options="basicOptions"
        placeholder="請選擇一個選項"
        clearable
        style="width: 200px"
      />
      <p class="mt-2 text-sm text-gray-600">
        選中的值: <code>{{ value2 }}</code>
      </p>
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">禁用狀態</h3>
      <s-select
        v-model="value3"
        :options="basicOptions"
        placeholder="請選擇一個選項"
        disabled
        style="width: 200px"
      />
    </div>

    <div>
      <h3 class="text-lg font-medium mb-2">可搜索</h3>
      <s-select
        v-model="value4"
        :options="searchOptions"
        placeholder="輸入關鍵字搜索"
        filterable
        style="width: 200px"
      />
      <p class="mt-2 text-sm text-gray-600">
        選中的值: <code>{{ value4 }}</code>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '../types'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('option1')
const value4 = ref('')

const basicOptions: SelectOption[] = [
  { value: 'option1', label: '選項一' },
  { value: 'option2', label: '選項二' },
  { value: 'option3', label: '選項三' },
  { value: 'option4', label: '選項四' },
]

const searchOptions: SelectOption[] = [
  { value: 'apple', label: '蘋果' },
  { value: 'banana', label: '香蕉' },
  { value: 'cherry', label: '櫻桃' },
  { value: 'date', label: '棗子' },
  { value: 'elderberry', label: '接骨木果' },
  { value: 'fig', label: '無花果' },
  { value: 'grape', label: '葡萄' },
  { value: 'honeydew', label: '蜜瓜' },
]
</script>
