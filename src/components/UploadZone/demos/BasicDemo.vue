<template>
  <div class="flex flex-col gap-4">
    <SHUploadZone v-model:value="files" multiple @change="onChange" />
    <pre class="text-text.primary text-xs">{{ summary }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SHUploadZone from '../index.vue'
import type { UploadZoneFile } from '../types'

const files = ref<UploadZoneFile[]>([])

const onChange = (list: UploadZoneFile[]) => {
  console.log('files changed', list)
}

const summary = computed(() =>
  files.value
    .map((f) => `${f.name} (${(f.size / 1024).toFixed(1)} KB) — ${f.status}`)
    .join('\n'),
)
</script>
