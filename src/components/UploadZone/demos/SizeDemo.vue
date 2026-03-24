<template>
  <div class="flex flex-col gap-6">
    <div>
      <p class="text-text.primary text-sm mb-2">Small</p>
      <SHUploadZone v-model="filesS" size="sm" />
    </div>
    <div>
      <p class="text-text.primary text-sm mb-2">Medium (default)</p>
      <SHUploadZone v-model="filesM" size="md" />
    </div>
    <div>
      <p class="text-text.primary text-sm mb-2">Large</p>
      <SHUploadZone v-model="filesL" size="lg" />
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
