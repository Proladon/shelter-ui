<template>
  <SwitchRoot class="shelter-switch-root">
    <SwitchThumb class="shelter-switch-thumb" />
  </SwitchRoot>
</template>

<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'
</script>

<style scoped lang="postcss">
.shelter-switch-root {
  @apply border-border.base border-1 border-solid;
  @apply w-[32px] h-[20px] shadow-sm flex rounded-full relative transition-[background] border;
  @apply data-[state=unchecked]:(bg-bg.secondary) data-[state=checked]:(bg-primary);
  @apply dark:data-[state=unchecked]:(bg-bg.primary.lighten) dark:data-[state=checked]:(bg-primary);
  @apply border-bg.secondary data-[state=checked]:(border-border.base) dark:(border-border.base);
  @apply focus-within:outline-none focus-within:shadow-[0_0_0_1px] focus-within:border-border.base focus-within:shadow-stone-800;
}

.shelter-switch-thumb {
  @apply w-3.5 h-3.5 my-auto bg-text.base text-xs flex items-center justify-center shadow-xl rounded-full transition-transform translate-x-0.5 will-change-transform;
  @apply data-[state=checked]:(translate-x-full bg-gray-300);
}
</style>
