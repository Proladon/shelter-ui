<template>
  <div class="flex flex-col gap-4">
    <p class="text-text.primary text-sm">
      Disabled state — no interaction possible.
    </p>
    <SHUploadZone v-model="files" disabled />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SHUploadZone from '../index.vue'
import type { UploadZoneFile } from '../types'

const files = ref<UploadZoneFile[]>([])
</script>
