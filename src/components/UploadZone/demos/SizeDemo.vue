<template>
  <div class="flex flex-col gap-6">
    <div>
      <p class="text-text.primary text-sm mb-2">Small</p>
      <SHUploadZone v-model:value="filesS" size="small" />
    </div>
    <div>
      <p class="text-text.primary text-sm mb-2">Medium (default)</p>
      <SHUploadZone v-model:value="filesM" size="medium" />
    </div>
    <div>
      <p class="text-text.primary text-sm mb-2">Large</p>
      <SHUploadZone v-model:value="filesL" size="large" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHUploadZone from '../index.vue'
import type { UploadZoneFile } from '../types'

const filesS = ref<UploadZoneFile[]>([])
const filesM = ref<UploadZoneFile[]>([])
const filesL = ref<UploadZoneFile[]>([])
</script>
