<template>
  <div class="demo-container">
    <s-chip label="Apple" :icon="IconApple" />
    <s-chip label="Brand Facebook" :icon="IconBrandFacebook" />
    <s-chip label="Brand Google" :icon="IconBrandGoogle" />
    <s-chip label="Brand Windows" :icon="IconBrandWindows" removable />
    <s-chip label="Brand GitHub" :icon="IconBrandGithub" removable>
      <template #removeicon="{ removeCallback, keydownCallback }">
        <icon-minus
          @click="removeCallback"
          @keydown="keydownCallback"
          class="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity"
        />
      </template>
    </s-chip>
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
} from "@tabler/icons-vue"
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
