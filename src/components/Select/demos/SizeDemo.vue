<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center gap-2">
      <span class="w-16 text-sm text-text.primary">small</span>
      <SHSelect
        v-model:value="small"
        :options="options"
        size="small"
        style="width: 200px"
      />
    </div>

    <div class="flex items-center gap-2">
      <span class="w-16 text-sm text-text.primary">medium</span>
      <SHSelect
        v-model:value="medium"
        :options="options"
        size="medium"
        style="width: 200px"
      />
    </div>

    <div class="flex items-center gap-2">
      <span class="w-16 text-sm text-text.primary">large</span>
      <SHSelect
        v-model:value="large"
        :options="options"
        size="large"
        style="width: 200px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '../types'
import { SHSelect } from '@/index'

const small = ref('')
const medium = ref('')
const large = ref('')

const options: SelectOption[] = [
  { value: 'option1', label: '選項一' },
  { value: 'option2', label: '選項二' },
  { value: 'option3', label: '選項三' },
]
</script>
