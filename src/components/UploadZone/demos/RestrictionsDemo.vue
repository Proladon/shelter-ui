<template>
  <div class="flex flex-col gap-4">
    <p class="text-text.primary text-sm">
      Only images, max 1 MB each, up to 3 files.
    </p>
    <SHUploadZone
      v-model:value="files"
      accept="image/*"
      multiple
      :max-count="3"
      :max-size="1 * 1024 * 1024"
      @exceed-size="onExceedSize"
      @exceed-count="onExceedCount"
    >
      <template #tip>
        <span>Supported: PNG, JPG, GIF · Max 1 MB · Up to 3 files</span>
      </template>
    </SHUploadZone>

    <p v-if="warning" class="text-status.danger text-xs">{{ warning }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHUploadZone from '../index.vue'
import type { UploadZoneFile } from '../types'

const files = ref<UploadZoneFile[]>([])
const warning = ref('')

const onExceedSize = (file: File) => {
  warning.value = `"${file.name}" exceeds the 1 MB limit.`
  setTimeout(() => (warning.value = ''), 4000)
}

const onExceedCount = (excess: File[]) => {
  warning.value = `${excess.length} file(s) were dropped because the 3-file limit was reached.`
  setTimeout(() => (warning.value = ''), 4000)
}
</script>
