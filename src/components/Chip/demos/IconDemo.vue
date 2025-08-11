<template>
  <div class="demo-container">
    <SHChip label="Apple" :icon="IconApple" />
    <SHChip label="Brand Facebook" :icon="IconBrandFacebook" />
    <SHChip label="Brand Google" :icon="IconBrandGoogle" />
    <SHChip label="Brand Windows" :icon="IconBrandWindows" removable />
    <SHChip label="Brand GitHub" :icon="IconBrandGithub" removable>
      <template #removeicon="{ removeCallback, keydownCallback }">
        <icon-minus
          @click="removeCallback"
          @keydown="keydownCallback"
          class="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity"
        />
      </template>
    </SHChip>
  </div>
</template>

<script setup lang="ts">
import {
  IconApple,
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandWindows,
  IconBrandGithub,
  IconMinus,
} from '@tabler/icons-vue'
</script>

<style scoped>
.demo-container {
  display: flex;
  gap: 12px;
  padding: 20px 0;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
